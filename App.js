import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import NavBar from './components/NavBar';

const store = configureStore();

export default class App extends React.Component {
  render() {
   return (
      <Provider store={store}>
        <View style={styles.container}>
          <NavBar />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',   
    paddingTop: Constants.statusBarHeight, 
    //backgroundColor: '#ecf0f1',
    // padding: 8,
  },
});
