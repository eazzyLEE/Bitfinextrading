import { StatusBar, StyleSheet } from 'react-native';
import { hp, wp } from '../../components';
import { DeepTeal } from '../../components/Colors';

export const orderStyles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
    backgroundColor: DeepTeal,
  },

  orderTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    backgroundColor: '#001a1a',
    height: hp(35),
    borderWidth: 1,
  },
  orderHeader: {
    fontSize: 14,
  },

  orderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  orderGrid: {
    width: '50%',
    borderWidth: 1,
  },
  orderColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#008080',
    // backgroundColor: '#001bba',
    height: hp(25),
    paddingLeft: wp(5),
    borderBottomWidth: 1,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#008080',
    // backgroundColor: '#001bba',
    height: hp(25),
    paddingLeft: wp(5),
    borderBottomWidth: 1,
  },
  header: {
    width: '52%',
  },

  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
