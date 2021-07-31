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
import { store } from '../../store';
import { connect } from 'react-redux';
import { updateState } from '../../store/actions/tradeAction';

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

const RowItem = ({ reverse, price, amount }) => (
  <View style={styles.orderRow}>
    <View style={styles.header}>
      <RegularText title={reverse ? price : amount} />
    </View>
    <View style={styles.header}>
      <RegularText title={reverse ? amount : price} />
    </View>
  </View>
);

class Orders extends Component {
  state = {
    BOOK: {
      bids: this.props.bids || {},
      asks: this.props.asks || {},
      psnap: this.props.psnap || {},
      mcnt: this.props.mcnt || 0,
    },
  };

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
      socket.send(msg);
    };

    socket.onmessage = msg => {
      const { BOOK } = this.state;

      // when count > 0 then you have to add or update the price level
      // 3.1 if amount > 0 then add/update bids
      // 3.2 if amount < 0 then add/update asks
      // when count = 0 then you have to delete the price level.
      // 4.1 if amount = 1 then remove from bids
      // 4.2 if amount = -1 then remove from asks

      console.log('mrg', msg);
      msg = JSON.parse(msg.data);
      if (msg.event) return;

      if (BOOK.mcnt === 0) {
        // console.log('xxcxc', msg);
        // console.log('xop', msg[1]);
        if (msg[1] !== undefined && typeof msg[1] === 'object') {
          console.log('msg', msg[1]);
          msg[1].forEach(element => {
            console.log('el', element);
            // console.log('pp', element);
            let el = element;
            if (el !== undefined && typeof el === 'object') {
              let pp = { price: el[0], cnt: el[1], amount: el[2] };
              // console.log('armxx', pp);
              const side = pp.amount >= 0 ? 'bids' : 'asks';
              pp.amount = Math.abs(pp.amount);

              BOOK[side][pp.price] = pp;
              const state = BOOK;
              state[side][pp.price] = pp;

              this.setState({ BOOK: state });
            }
          });
        }
      } else {
        let pp = msg[1];
        // console.log('pxxc', pp);
        const state = BOOK;

        pp = { price: pp[0], cnt: pp[1], amount: pp[2] };
        // count is zero
        if (!pp.cnt) {
          let exists = true;

          if (pp.amount > 0) {
            if (state['bids'][pp.price]) {
              delete state['bids'][pp.price];
            } else {
              exists = false;
            }
          } else if (pp.amount < 0) {
            if (state['asks'][pp.price]) {
              delete state['asks'][pp.price];
            } else {
              exists = false;
            }
          }
          this.setState({ BOOK: state });
        } else {
          const state = BOOK;
          let side = pp.amount >= 0 ? 'bids' : 'asks';
          pp.amount = Math.abs(pp.amount);

          state[side][pp.price] = pp;
          this.setState({ BOOK: state });
        }
      }
      // setState({ BOOK: arm });

      const state = BOOK;
      // this.setState({ BOOK: state });

      ['bids', 'asks'].forEach(side => {
        let bookSide = state[side];
        let bookPrices = Object.keys(bookSide);

        let prices = bookPrices.sort(function (a, b) {
          if (side === 'bids') {
            return +a >= +b ? -1 : 1;
          } else {
            return +a <= +b ? -1 : 1;
          }
        });

        state.psnap[side] = prices;
      });
      state.mcnt += 1;

      this.props.updateState(state);
    };
  }

  // TODO :

  // ADD TIMEOUT to reduce update

  render() {
    console.log('props', this.props.psnap);
    const { asks, bids, psnap } = this.props;
    console.log('PSNAP', psnap);
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
              {psnap.bids ? (
                psnap.bids.map((price, index) => {
                  if (index < 11)
                    return (
                      <RowItem price={price} amount={bids[price].amount} />
                    );
                })
              ) : (
                <View />
              )}
            </View>

            <View style={styles.orderGrid}>
              <Header reverse />
              {psnap.asks ? (
                psnap.asks.map((price, index) => {
                  if (index < 11)
                    return (
                      <RowItem
                        price={price}
                        amount={asks[price].amount}
                        reverse
                      />
                    );
                })
              ) : (
                <View />
              )}
            </View>
          </View>
        </View>
      </>
    );
  }
}

const mapStateToTrops = state => ({
  bids: state.trades.book.bids,
  asks: state.trades.book.asks,
  psnap: state.trades.book.psnap,
  mcnt: state.trades.book.mcnt,
});

const mapDispatchToProps = {
  updateState,
};

export default connect(mapStateToTrops, mapDispatchToProps)(Orders);
