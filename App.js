import * as React from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { Constants } from 'expo';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { configureStore } from './store';
import NavBar from './components/NavBar';

// initiating and configuring our redux store
const store = configureStore();

export default class App extends React.Component {
  componentWillMount() {
    // the app state is being persisted using 'redux-persist'
    persistStore(store, { storage: AsyncStorage });
  }

  render() {
    // wrapping our app with a provider so we can access the redux store
    // from child components
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
  },
});
