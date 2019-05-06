import React from 'react';
import { Text, View, StyleSheet, Image, FlatList, SectionList, Alert, TouchableHighlight, Modal, Button } from 'react-native';
import { connect } from 'react-redux';
import LocationItem from './LocationItem';
import ToolBar from './ToolBar';
import { addLocation, removeLocation, updateLocation } from '../store/actions/location';
import { addCategory } from '../store/actions/category';

// this component is a list of LocationItem components

class LocationList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inEdit: false,
			selectedItem: undefined,
			sectionListMode: false
		};
	}

	componentWillMount() {
		// testing data
    this.props.addCategory({ name: 'shopping' });
		this.props.addCategory({ name: 'hiking' });
		this.props.addCategory({ name: 'sport' });
		this.props.addLocation({ name: 'Loc1', lat: 37, lon: -122, category: 1 });		
		this.props.addLocation({ name: 'Loc2', lat: 25, lon: -24, category: 1 });
		this.props.addLocation({ name: 'Loc3', lat: 37, lon: -122, category: 2 });
		this.props.addLocation({ name: 'Loc4', lat: 37, lon: -122, category: 2 });
	}

  // click handler for a LocationItem in the list
  // when clicking away from a newely added item, it will be removed
  // when clicking on the currently selected item, it will collapse
  // when clicking on any other LocationItem, it will expand
	handleListItemClick = (key) => {
		if (this.state.selectedItem == -1) {
			this.props.removeLocation(-1);
		}
		if (this.state.selectedItem == key) {
			this.setState({ inEdit: false, selectedItem: undefined })
		} else {
			this.setState({ inEdit: false, selectedItem: key })
		}
	}

  // click handler for the add button
  // a new LocationItem will be added to the list and
  // state will be set to edit mode
	handleAddClick = () => {
		if (this.state.selectedItem == -1) {
			return;
		}
		const newItem = { name: '', lat: '', lon: '', category: undefined }
		this.props.addLocation(newItem, -1);
		this.setState({ selectedItem: -1, inEdit: true });
	}

  // click handler for the edit button
  // the state will be set to edit mode
	handleEditClick = () => {
		this.setState({ inEdit: true });
	}

  // click handler for the remove button
  // selected item will be removed from the redux store
  // edit mode will be set to false in the state
	handleRemoveClick = () => {
		this.props.removeLocation(this.state.selectedItem);
		this.setState({ inEdit: false, selectedItem: undefined });
	}

  // click handler for the save button
  // the category is saved to the redux store
  // if the item is a newely added item, it will be given a newely generated id
	handleSaveClick = (newItem) => {
		const giveNewId = newItem.key == -1;
		this.props.updateLocation(newItem, giveNewId);
		this.setState({ selectedItem: undefined, inEdit: undefined });
	}

	handleToggleListModeClick = () => {
		this.setState({ sectionListMode: !this.state.sectionListMode });
	}

	renderSeparator = () => {
		return (
			<View style={styles.separator} />
		);
	}

	getSectionedData = () => {
		const categories = this.props.locations.map(item => item.category);
		const uniqueCategories = Array.from(new Set(categories));
		const sections = uniqueCategories.map(cat => {      
			const data = this.props.locations.filter(item => item.category === cat)
      const catItem = this.props.categories.find(item => item.key == cat)
      const catName = cat == undefined ? '' : catItem.name;
      return { title: catName, data: data }          		
		});
		return sections;
	}

	getSortedLocations = () => {
		let locations = [...this.props.locations];
		locations.sort((a, b) => {
			const keyA = a.name;
			const keyB = b.name;
			if (keyA < keyB) return -1;
			if (keyA > keyB) return 1;
			return 0;
		});
		return locations;
	}

	render() {
		const locations = this.getSortedLocations();
		const sections = this.getSectionedData();
		return (
			<View style={styles.container}>
				<ToolBar title="Locations" isItemSelected={this.state.selectedItem != undefined}
					onAddClick={this.handleAddClick}
					onEditClick={this.handleEditClick}
					onRemoveClick={this.handleRemoveClick}
					onToggleListModeClick={this.handleToggleListModeClick}
					showToggleListModeButton={true} />
				{this.state.sectionListMode &&
					<SectionList
						style={styles.list}
						ItemSeparatorComponent={this.renderSeparator}
						renderItem={({ item }) => (<LocationItem id={item.key} name={item.name} lat={item.lat} lon={item.lon} category={item.category}
							inEdit={this.state.inEdit && item.key == this.state.selectedItem} selected={this.state.selectedItem == item.key}
							onClick={() => this.handleListItemClick(item.key)} onSaveClick={item => this.handleSaveClick(item)} />)}
						renderSectionHeader={({ section: { title } }) => (
							<Text style={{ fontWeight: 'bold', padding: 10, backgroundColor: 'whitesmoke'}}>{title}</Text>
						)}
						sections={sections}
						keyExtractor={(item, index) => item + index}
					/>
				}
				{!this.state.sectionListMode &&
					<FlatList
						style={styles.list}
						data={locations}
						extraData={this.state}
						ItemSeparatorComponent={this.renderSeparator}
						renderItem={({ item }) => (<LocationItem id={item.key} name={item.name} lat={item.lat} lon={item.lon} category={item.category}
							inEdit={this.state.inEdit && item.key == this.state.selectedItem} selected={this.state.selectedItem == item.key}
							onClick={() => this.handleListItemClick(item.key)} onSaveClick={item => this.handleSaveClick(item)} />)}
					>
					</FlatList>
				}

			</View>

		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 10,
	},
	separator: {
		height: 1,
		backgroundColor: "gainsboro"
	},
	list: {
		flex: 1,
	},
	sectionedList: {
		flex: 1,
		padding: 10
	}
});

const mapStateToProps = state => {
	return {
		locations: state.location.locations,
		categories: state.category.categories
	};
}

// this componenr connects to redux store and gets the categories and locations data as props
// it also gets the methods: addLocation, removeLocation, updateLocation
export default connect(mapStateToProps, { addLocation, removeLocation, updateLocation, addCategory })(LocationList);