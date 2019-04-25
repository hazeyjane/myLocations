import React from 'react';
import { Text, View, StyleSheet, Image, FlatList, Alert, TouchableHighlight, Modal, Button } from 'react-native';
import { connect } from 'react-redux';
import CategoryItem from './CategoryItem';
import ToolBar from './ToolBar';
import { addCategory, updateCategory, removeCategory } from '../store/actions/category';

class CategoryList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inEdit: false,
			selectedItem: undefined,
		};
	}

	componentWillMount(){
		// Testing data
		this.props.addCategory({ name: 'shopping' });
		this.props.addCategory({ name: 'hiking' });
		this.props.addCategory({ name: 'sport' });
	}	

	handleListItemClick = (key) => {
		if (this.state.selectedItem == -1){
			this.props.removeCategory(-1);
		}
		if (this.state.selectedItem == key) {
			this.setState({inEdit: false, selectedItem: undefined})	
		} else {
			this.setState({inEdit: false, selectedItem: key})		
		}		
	};

	handleAddClick = () => {
		if (this.state.selectedItem == -1){
			return;
		}
		const newItem = { name: '' }
		this.props.addCategory(newItem, -1);
		this.setState({selectedItem: -1, inEdit: true});
	}

	handleEditClick = () => {
		this.setState({inEdit: true});
	}

	handleRemoveClick = () => {
		this.props.removeCategory(this.state.selectedItem);
		this.setState({inEdit: false, selectedItem: undefined});
	}

	handleSaveClick = (newItem) => {
		const giveNewId = newItem.key == -1;
		this.props.updateCategory(newItem, giveNewId);		
		this.setState({selectedItem: undefined, inEdit: undefined});
	}

	renderSeparator = () => {
		return (
			<View style={styles.separator} />
		);
	};

	render() {
		return (
			<View style={styles.container}>
				<ToolBar title="Categories" isItemSelected={this.state.selectedItem != undefined}
					onAddClick={this.handleAddClick}
					onEditClick={this.handleEditClick}
					onRemoveClick={this.handleRemoveClick} 
					showToggleListModeButton={false}/>
				<FlatList
					style={styles.list}
					data={this.props.categories}
					extraData={this.state} 
					ItemSeparatorComponent={this.renderSeparator}
					renderItem={({ item }) => <CategoryItem id={item.key} name={item.name} inEdit={this.state.inEdit && item.key == this.state.selectedItem} onClick={() => this.handleListItemClick(item.key)}
					onSaveClick={item => this.handleSaveClick(item)} selected={this.state.selectedItem == item.key} />}
				>
				</FlatList>
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
	}
});

const mapStateToProps = state => {
	return {
		categories: state.category.categories
	};
}

export default connect(mapStateToProps, { addCategory, updateCategory, removeCategory })(CategoryList);

