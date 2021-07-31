import React, { Component } from 'react';
import { StatusBar, Text, View } from 'react-native';
import {
  RegularDouble,
  RegularText,
  SemiBoldText,
  White,
} from '../../components';
import { orderStyles as styles } from './styles';

// import ws from 'ws';
// const w = new ws('wss://api-pub.bitfinex.com/ws/2');

// w.on('message', msg => console.log(msg));

// let msg = JSON.stringify({
//   event: 'subscribe',
//   channel: 'book',
//   symbol: 'tBTCUSD',
// });

// w.on('open', () => w.send(msg));

const Header = ({ reverse }) => (
  <View style={styles.orderColumn}>
    <View style={styles.header}>
      <RegularText title={reverse ? 'PRICE' : 'TOTAL'} />
    </View>
    <View style={styles.header}>
      <RegularText title={reverse ? 'TOTAL' : 'PRICE'} />
    </View>
  </View>
);

const RowItem = ({ reverse }) => (
  <View style={styles.orderRow}>
    <View style={styles.header}>
      <RegularText title={reverse ? '41,340' : '0.040'} />
    </View>
    <View style={styles.header}>
      <RegularText title={reverse ? '0.040' : '41,340'} />
    </View>
  </View>
);

export default class Orders extends Component {
  render() {
    return (
      <>
        <StatusBar />
        <View style={styles.background}>
          <SemiBoldText title="BTC/USD 34,289" />

          <View style={styles.orderTab}>
            <SemiBoldText title="ORDER BOOK" style={styles.orderHeader} />
            <View style={styles.buttons}>
              <Text style={{ color: White }}>-</Text>
              <Text style={{ color: White }}>+</Text>
            </View>
          </View>
          <View style={styles.orderContainer}>
            <View style={styles.orderGrid}>
              <Header />
              <RowItem />
              <RowItem />
              <RowItem />
              <RowItem />
              <RowItem />
            </View>

            <View style={styles.orderGrid}>
              <Header reverse />
              <RowItem />
              <RowItem />
              <RowItem />
              <RowItem />
              <RowItem />
            </View>
          </View>
        </View>
      </>
    );
  }
}
