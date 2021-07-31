import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { orderStyles as styles } from './styles';

export default class Orders extends Component {
  render() {
    return (
      <View style={styles.background}>
        <Text>BTC/USD 34, 289</Text>
      </View>
    );
  }
}
