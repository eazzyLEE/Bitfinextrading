import React, { Component } from 'react';
import { StatusBar, Text, View } from 'react-native';
import each from 'lodash.foreach';
import {
  RegularDouble,
  RegularText,
  SemiBoldText,
  White,
} from '../../components';
import { orderStyles as styles } from './styles';
import { object } from 'prop-types';

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
  state = {
    BOOK: {},
  };

  BOOK = {};
  seq = null;

  componentDidMount() {
    const socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

    socket.onopen = () => {
      let msg = JSON.stringify({
        event: 'subscribe',
        channel: 'book',
        symbol: 'tBTCUSD',
        len: 100,
        prec: 'P0',
      });
      console.log('WS open');
      // connecting = false;
      // connected = true;
      // this.state.BOOK.bids = {};
      // this.state.BOOK.asks = {};
      // this.state.BOOK.psnap = {};
      socket.send(msg);
    };

    socket.onmessage = msg => {
      let arm = this.state.BOOK;
      arm.bids = {};
      arm.asks = {};
      arm.psnap = {};
      // console.log('sock', msg);

      msg = JSON.parse(msg.data);
      // console.log('msgCHECK', msg[1]);
      // if (msg.event) return;
      each(msg[1], function (pp) {
        if (typeof pp === 'object') {
          // console.log('PP', typeof msg[1], pp);
          // console.log('arm', arm);
          pp = { price: pp[0], cnt: pp[1], amount: pp[2] };
          console.log('armxx', pp);
          const side = pp.amount >= 0 ? 'bids' : 'asks';
          pp.amount = Math.abs(pp.amount);

          arm[side][pp.price] = pp;
        }
      });
      this.setState({ BOOK: arm });
    };
  }

  render() {
    // console.log('book', this.state.BOOK);
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
