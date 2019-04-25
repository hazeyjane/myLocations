import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import CategoryList from './CategoryList';
import LocationList from './LocationList';

const TabNavigator = createBottomTabNavigator(
  {
    Locations: LocationList,
    Categories: CategoryList,
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 14,
		  marginBottom: 15
      },
    },
  }
);

export default createAppContainer(TabNavigator);
