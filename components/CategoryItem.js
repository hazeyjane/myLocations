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
import Map from './Map';

// this component represents a catgory in the category list
// props:
// name: the category name
// onClick: a function to call when clicked
// onSaveClick: a fucntion to call when save button is clicked
// selected: should the item appear as selected
// inEdit: should be in edit mode

export default class CategoryItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      error: false,
    };
  }

  // click handler for the CategoryItem
  // any undaved changes are reverted to the original state (from the initial props)
  handleItemClick = () => {
    this.setState({ ...this.props });
    this.props.onClick();
  };

  handleNameChanged = value => {
    this.setState({ name: value });
  };

  // save button click handler
  // checking for input errors, if there are any - the state is updated  
  handleSaveClick = () => {
    let error = {};
    this.state.name.toString().trim() === '' ? (error = true) : (error = false);
    this.setState({ error: error });
    if (error) return;
    this.props.onSaveClick({ name: this.state.name, key: this.props.id });
  };

  // name box focused handler
  // removing any errors from the state for the user to re enter a value
  handleNameInputFocus = () => {
    this.setState({ error: false });
  };

  render() {
    const containerStyle = !this.props.selected
      ? styles.container
      : [styles.container, styles.selected];
    let nameInputStyle;
    if (this.props.inEdit) {
      if (!this.state.error) {
        nameInputStyle = [styles.name, styles.editable];
      } else {
        nameInputStyle = [styles.name, styles.editable, styles.error];
      }
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
    return (
      <View style={containerStyle}>
        {nameElement}
        {this.props.inEdit && (
          <View style={styles.buttonRow}>
            <Button title="save" onPress={this.handleSaveClick} />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 3,
  },
  selected: {
    backgroundColor: 'whitesmoke',
  },
  name: {
    borderRadius: 5,
    fontSize: 18,
    height: 25,
    paddingLeft: 3,
    paddingRight: 3,
  },
  editable: {
    backgroundColor: 'white',
  },
  error: {
    borderWidth: 1,
    borderColor: 'red',
  },
});
