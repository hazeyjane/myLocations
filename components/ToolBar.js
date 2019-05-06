import React from 'react';
import { Text, View, StyleSheet, Button, TouchableHighlight } from 'react-native';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons';

// a top toolbar component with 4 buttons: add, edit, remove, toggle list group mode
// props:
// title: the title of the toolbar
// onAddClick: a function to call when add button is clicked
// onEditClick: a function to call when edit button is clicked
// onRemoveClick: a function to call when remove button is clicked
// isItemSelected: indicationg weather an item is selected in the list (locations or categories) or not
// onToggleListModeClick: a function to call when toggle list mode button is clicked (grouping) 

export default class ToolBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: this.props.title
		};
	}

	render() {
		const onEditClick = this.props.isItemSelected ? this.props.onEditClick : () => {}
		const onRemoveClick = this.props.isItemSelected ? this.props.onRemoveClick : () => {}
		const color = this.props.isItemSelected ? 'black' : 'gainsboro';
		return (
			<View style={styles.container}>
				<Text style={styles.title}> {this.state.title} </Text>
				<View style={styles.toolBar}>
					<TouchableHighlight onPress={this.props.onAddClick}>
						<FontAwesome name="plus" size={30} color="black" />
					</TouchableHighlight>
					<TouchableHighlight onPress={onEditClick}>
						<Feather name="edit" size={30} color={color} />
					</TouchableHighlight>				
					<TouchableHighlight onPress={onRemoveClick}>
						<Feather name="trash-2" size={30} color={color} />
					</TouchableHighlight>								
					{this.props.showToggleListModeButton && 
					<TouchableHighlight onPress={this.props.onToggleListModeClick}>
						<FontAwesome name="list-ul" size={30} color="black" />
					</TouchableHighlight>	
					}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 0.13,
		flexDirection: 'column',
		justifyContent: 'space-between',
		paddingRight: 20,
		paddingLeft: 20,
		borderBottomWidth: 1,
		borderBottomColor: 'gainsboro',
		//marginBottom: 10
	},
	toolBar: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		paddingBottom: 3,
	},
	title: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 18,
	}
});