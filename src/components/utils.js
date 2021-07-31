import {
  widthPercentageToDP as wdp,
  heightPercentageToDP as hdp,
} from 'react-native-responsive-screen';

const CustomHeight = 812 - 44;
const CustomWidth = 375;

export const hp = value => {
  const dimension = (value / CustomHeight) * 100;
  return hdp(`${dimension}%`);
};

export const wp = value => {
  const dimension = (value / CustomWidth) * 100;
  return wdp(`${dimension}%`);
};

export const isIPhoneX = () => {
  const checkHeight = hdp('100%') === 812 || hdp('100%') === 896;
  return Platform.OS === 'ios' && checkHeight;
};
