import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import * as Colors from './Colors';
import { wp, hp } from './utils';

const HeaderText = ({ style, title }) => (
  <Text style={[styles.headerTextStyle, style]}>{title}</Text>
);

const MenuText = ({ style, title }) => (
  <Text style={[styles.menuTextStyle, style]}>{title}</Text>
);

const MediumText = ({ style, title }) => (
  <Text style={[styles.mediumTextStyle, style]}>{title}</Text>
);

const ParagraphText = ({ onPress, style, title, ...props }) => (
  <Text style={[styles.paragraphTextStyle, style]} onPress={onPress} {...props}>
    {title}
  </Text>
);

const BookText = ({ onPress, style, title }) => (
  <Text style={[styles.bookTextStyle, style]} onPress={onPress}>
    {title}
  </Text>
);

const RegularText = ({ onPress, style, title, ...props }) => (
  <Text style={[styles.regularTextStyle, style]} onPress={onPress} {...props}>
    {title}
  </Text>
);

const RegularDouble = ({ onPress, style, title, subTitle, subTitleColor }) => (
  <Text style={[styles.regularTextStyle, style]}>
    {title}
    <Text
      style={[
        styles.regularTextStyle,
        subTitleColor ? { color: subTitleColor } : { color: Colors.DarkBlue },
      ]}
      onPress={onPress}
    >
      {subTitle}
    </Text>
  </Text>
);

const ParagraphDouble = ({ style, title, subTitle }) => (
  <Text style={[styles.paragraphDoubleStyle, style]}>
    {title}
    <Text style={[styles.regularDoubleStyle]}>{subTitle}</Text>
  </Text>
);

const SemiBoldText = ({ onPress, style, title }) => (
  <Text style={[styles.semiBoldTextStyle, style]} onPress={onPress}>
    {title}
  </Text>
);
const BulletText = ({ style, title, titleStyle }) => (
  <View style={[styles.bulletView, style]}>
    <View style={[styles.infobullet]} />
    <Text style={[styles.instructionText, titleStyle]}>{title}</Text>
  </View>
);

export {
  BookText,
  RegularText,
  RegularDouble,
  HeaderText,
  MenuText,
  ParagraphDouble,
  ParagraphText,
  MediumText,
  SemiBoldText,
  BulletText,
};

const styles = StyleSheet.create({
  instructionText: {
    fontSize: 12,
    // fontFamily: 'Graphik-Regular',
    color: Colors.White,
    marginLeft: wp(15),
    marginTop: Platform.OS === 'android' ? hp(-7) : 0,
    alignSelf: 'center',
  },
  headerTextStyle: {
    // fontFamily: 'Graphik-Medium',
    fontSize: 22,
    color: Colors.White,
  },
  menuTextStyle: {
    // fontFamily: 'Graphik-Medium',
    fontSize: 20,
    color: Colors.White,
  },
  mediumTextStyle: {
    // fontFamily: 'Graphik-Medium',
    fontSize: 16,
    color: Colors.White,
    textAlign: 'center',
  },
  paragraphTextStyle: {
    // fontFamily: 'Graphik-Medium',
    fontSize: 12,
  },
  bookTextStyle: {
    // fontFamily: 'Graphik-Regular',
    fontSize: 14,
  },
  regularTextStyle: {
    // fontFamily: 'Graphik-Regular',
    fontSize: 12,
    fontStyle: 'normal',
  },
  doubleView: {
    flexDirection: 'row',
    width: wp(324),
  },
  regularDoubleStyle: {
    // fontFamily: 'Graphik-Regular',
    fontSize: 12,
    lineHeight: 26,
    color: Colors.White,
    fontWeight: '400',
  },
  paragraphDoubleStyle: {
    // fontFamily: 'Graphik-Bold',
    fontSize: 12,
    color: Colors.White,
  },
  semiBoldTextStyle: {
    // fontFamily: 'Graphik-Semibold',
    fontSize: 16,
    fontWeight: '800',
    color: Colors.White,
  },
});
