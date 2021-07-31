import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { View, Text, SafeAreaView } from 'react-native';
import Orders from './screens/orders';
import { store } from './store';

const App = () => (
  <Provider store={store}>
    <SafeAreaView>
      <StatusBar style="auto" />
      <Orders />
    </SafeAreaView>
  </Provider>
);

export default App;
