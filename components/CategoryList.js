import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import CategoryItem from './CategoryItem';
import ToolBar from './ToolBar';
import {
  addCategory,
  updateCategory,
  removeCategory,
} from '../store/actions/category';

// this component is a list of CategoryItem components

class CategoryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inEdit: false, // is the user in item edit mode or not
      selectedItem: undefined, // selected item key
    };
  }

  // click handler for a CategoryItem in the list
  // when clicking away from a newely added item, it will be removed
  // when clicking on the currently selected item, it will collapse
  // when clicking on any other CategoryItem, it will expand
  handleListItemClick = key => {
    if (this.state.selectedItem == -1) {
      this.props.removeCategory(-1);
    }
    if (this.state.selectedItem == key) {
      this.setState({ inEdit: false, selectedItem: undefined });
    } else {
      this.setState({ inEdit: false, selectedItem: key });
    }
  };

  // click handler for the add button
  // a new CategoryItem will be added to the list and
  // state will be set to edit mode
  handleAddClick = () => {
    if (this.state.selectedItem == -1) {
      return;
    }
    const newItem = { name: '' };
    this.props.addCategory(newItem, -1);
    this.setState({ selectedItem: -1, inEdit: true });
  };

  // click handler for the edit button
  // the state will be set to edit mode
  handleEditClick = () => {
    this.setState({ inEdit: true });
  };

  // click handler for the remove button
  // selected item will be removed from the redux store
  // edit mode will be set to false in the state
  handleRemoveClick = () => {
    this.props.removeCategory(this.state.selectedItem);
    this.setState({ inEdit: false, selectedItem: undefined });
  };

  // click handler for the save button
  // the category is saved to the redux store
  // if the item is a newely added item, it will be given a newely generated id
  handleSaveClick = newItem => {
    const giveNewId = newItem.key == -1;
    this.props.updateCategory(newItem, giveNewId);
    this.setState({ selectedItem: undefined, inEdit: undefined });
  };

  renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <ToolBar
          title="Categories"
          isItemSelected={this.state.selectedItem != undefined}
          onAddClick={this.handleAddClick}
          onEditClick={this.handleEditClick}
          onRemoveClick={this.handleRemoveClick}
          showToggleListModeButton={false}
        />
        <FlatList
          style={styles.list}
          data={this.props.categories}
          extraData={this.state}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) => (
            <CategoryItem
              id={item.key}
              name={item.name}
              inEdit={this.state.inEdit && item.key == this.state.selectedItem}
              onClick={() => this.handleListItemClick(item.key)}
              onSaveClick={item => this.handleSaveClick(item)}
              selected={this.state.selectedItem == item.key}
            />
          )}
        />
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
    backgroundColor: 'gainsboro',
  },
  list: {
    flex: 1,
  },
});

const mapStateToProps = state => {
  return {
    categories: state.category.categories,
  };
};

export default connect(
  mapStateToProps,
  { addCategory, updateCategory, removeCategory }
)(CategoryList);
