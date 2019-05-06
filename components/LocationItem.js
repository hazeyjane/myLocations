import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import ModalDropdown from 'react-native-modal-dropdown';
import { connect } from 'react-redux';
import Map from './Map';

// this component represents a location in the location list
// props:
// name: the category name
// lat: the latitude of the location
// lon: the longitude of the location
// category: the category of the location
// onClick: a function to call when clicked
// onSaveClick: a fucntion to call when save button is clicked
// selected: should the item appear as selected
// inEdit: should be in edit mode

class LocationItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      lat: this.props.lat,
      lon: this.props.lon,
      category: this.props.category,
      error: { name: false, lat: false, lon: false },
      mapVisible: false,
    };
  }

  // click handler for the LocationItem
  // any undaved changes are reverted to the original state (from the initial props)
  handleItemClick = () => {
    this.setState({ ...this.props }); 
    this.props.onClick();
  };

  handleCategoryChanged = (index, value) => {
    const result = this.props.categories.find(item => item.name == value);
    this.setState({ category: result.key });
  };

  handleNameChanged = value => {
    this.setState({ name: value });
  };

  // latitude text changed handler
  // limiting the input text to coordinate format using regex
  handleLatChanged = value => {
    const reg = new RegExp(/^\-*([0-9])*\.?([0-9])*$/);
    if (reg.test(value) || value === '') {
      this.setState({ lat: value });
    }
  };

  // longitude text changed handler
  // limiting the input text to coordinate format using regex
  handleLonChanged = value => {
    const reg = new RegExp(/^\-*([0-9])*\.?([0-9])*$/);
    if (reg.test(value) || value === '') {
      this.setState({ lon: value });
    }
  };

  // save button click handler
  // checking for input errors, if there are any - the state is updated 
  handleSaveClick = () => {
    let error = {};
    this.state.name.toString().trim() === '' ? (error.name = true) : (error.name = false);
    this.state.lat.toString().trim() === '' ? (error.lat = true) : (error.lat = false);
    this.state.lon.toString().trim() === '' ? (error.lon = true) : (error.lon = false);
    this.setState({ error: error });
    if (error.name || error.lat || error.lon) return;
    this.props.onSaveClick({
      key: this.props.id,
      name: this.state.name,
      lat: this.state.lat,
      lon: this.state.lon,
      category: this.state.category,
    });
  };

  handleMapClick = () => {
    this.setState({ mapVisible: true });
  };

  handleNameInputFocus = () => {
    this.setState({ error: { ...this.state.error, name: false } });
  };

  handleLatInputFocus = () => {
    this.setState({ error: { ...this.state.error, lat: false } });
  };

  handleLonInputFocus = () => {
    this.setState({ error: { ...this.state.error, lon: false } });
  };

  handleMapCloseAreaClick = coords => {
    this.setState({ mapVisible: false, lat: coords.lat, lon: coords.lon });
  };

  render() {
    const categories = this.props.categories.map(item => item.name);
    const containerStyle = !this.props.selected ? {} : styles.selected;
    let categoryText = 'Select category..';
    if (this.state.category !== undefined) {
      const result = this.props.categories.find(
        item => item.key == this.state.category
      );
      if (result != undefined) categoryText = `Category: ${result.name}`;
    }
    let categoryTextStyle =
      this.state.category === '' ? [styles.text, styles.grayedOut] : styles.text;
    let nameInputStyle;
    let latInputStyle;
    let lonInputStyle;
    let categoryInputStyle;
    if (this.props.inEdit) {
      if (!this.state.error.name) {
        nameInputStyle = [styles.name, styles.editable];
      } else {
        nameInputStyle = [styles.name, styles.editable, styles.error];
      }
      if (!this.state.error.lat) {
        latInputStyle = [styles.input, styles.editable];
      } else {
        latInputStyle = [styles.input, styles.editable, styles.error];
      }
      if (!this.state.error.lon) {
        lonInputStyle = [styles.input, styles.editable];
      } else {
        lonInputStyle = [styles.input, styles.editable, styles.error];
      }
      categoryInputStyle = [styles.categoryInput, styles.editable];
    } else {
      latInputStyle = styles.input;
      lonInputStyle = styles.input;
      categoryInputStyle = styles.categoryInput;
    }
    const nameElement = this.props.inEdit ? (
      <TextInput
        style={nameInputStyle}
        placeholder="Name"
        value={this.state.name}
        onChangeText={this.handleNameChanged}
        onFocus={this.handleNameInputFocus}
      />
    ) : (
      <Text style={styles.name} onPress={this.handleItemClick}>
        {' '}
        {this.state.name}{' '}
      </Text>
    );
    const lat = this.state.lat;
    const saveButton = this.props.inEdit ? (
      <Button title="save" onPress={this.handleSaveClick} />
    ) : null;

    return (
      <View style={containerStyle}>
        {nameElement}
        <Collapsible
          style={styles.collapsible}
          collapsed={!this.props.selected}>
          <View style={styles.inputRow}>
            <TextInput
              style={latInputStyle}
              editable={this.props.inEdit}
              placeholder="Latitude"
              keyboardType="numbers-and-punctuation"
              value={this.props.inEdit ? this.state.lat + '' : `Lat: ${this.state.lat}`}
              onChangeText={this.handleLatChanged}
              onFocus={this.handleLatInputFocus}
            />
            <View style={styles.spacer} />
            <TextInput
              style={lonInputStyle}
              editable={this.props.inEdit}
              placeholder="Longitude"
              keyboardType="numbers-and-punctuation"
              value={this.props.inEdit ? this.state.lon + '' : `Lon: ${this.state.lon}`}
              onChangeText={this.handleLonChanged}
              onFocus={this.handleLonInputFocus}
            />
          </View>
          <View style={styles.inputRow2}>
            <ModalDropdown
              disabled={!this.props.inEdit}
              dropdownTextStyle={styles.dropDownText}
              options={categories}
              onSelect={(index, value) =>
                this.handleCategoryChanged(index, value)
              }>
              <View style={styles.categoryInput}>
                <Text style={categoryTextStyle}>{categoryText}</Text>
              </View>
            </ModalDropdown>
            <Button title="map" onPress={this.handleMapClick} />
            {saveButton}
          </View>
        </Collapsible>
        <Map
          visible={this.state.mapVisible}
          lat={this.state.lat}
          lon={this.state.lon}
          onCloseAreaClick={this.handleMapCloseAreaClick}
          inEdit={this.props.inEdit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selected: {
    backgroundColor: 'whitesmoke',
  },
  collapsible: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 10,
  },
  name: {
    margin: 10,
    borderRadius: 5,
    fontSize: 18,
    height: 25,
    paddingLeft: 3,
    paddingRight: 3,
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  inputRow2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    //alignItems: 'stretch'
  },
  input: {
    backgroundColor: 'whitesmoke',
    flex: 1,
    height: 25,
    fontSize: 16,
    padding: 3,
    borderRadius: 5,
    marginBottom: 8,
    paddingLeft: 3,
    paddingRight: 3,
  },
  categoryInput: {
    height: 25,
    fontSize: 16,
    padding: 3,
    borderRadius: 5,
    marginBottom: 15,
  },
  editable: {
    backgroundColor: 'white',
  },
  spacer: {
    flex: 0.1,
  },
  text: {
    fontSize: 16,
  },
  dropDownText: {
    fontSize: 16,
    paddingRight: 30,
  },
  grayedOut: {
    color: 'silver',
  },
  error: {
    borderWidth: 1,
    borderColor: 'red',
  },
});

const mapStateToProps = state => {
  return {
    categories: state.category.categories,
  };
};

// this component connects to redux store and gets the categories data as props
export default connect(
  mapStateToProps,
  {}
)(LocationItem);
