import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView } from 'react-native';
import Orders from './screens/orders';

const App = () => (
  <SafeAreaView>
    <StatusBar style="auto" />
    <Orders />
  </SafeAreaView>
);

export default App;
