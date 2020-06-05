import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {useSelector} from 'react-redux';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import LinearAnimatedGradientTransition from 'react-native-linear-animated-gradient-transition';
import Touchable from '@/components/Touchable';
import {RootState} from '@/models/index';

interface ITopTabBarWrapperProps extends MaterialTopTabBarProps {}

const TopTabBarWrapper: React.FC<ITopTabBarWrapperProps> = (props) => {
  const linearColors = useSelector<RootState, [string, string]>((state) =>
    state.home.carousels
      ? state.home.carousels[state.home.activeCarouselIndex]
        ? state.home.carousels[state.home.activeCarouselIndex].colors
        : ['#ccc', '#e2e2e2']
      : ['#ccc', '#e2e2e2'],
  );
  const gradientVisible = useSelector<RootState, boolean>(
    (state) => state.home.gradientVisible,
  );
  const textStyle = gradientVisible ? styles.whiteText : styles.text;
  const activeTintColor = gradientVisible ? '#fff' : '#f86442';
  const indicatorStyle = gradientVisible
    ? StyleSheet.compose(props.indicatorStyle, styles.whiteBackgroundColor)
    : props.indicatorStyle;
  const goCategory = () => {
    const {navigation} = props;
    navigation.navigate('Category');
  };
  return (
    <View style={styles.container}>
      {gradientVisible && (
        <LinearAnimatedGradientTransition
          colors={linearColors}
          style={styles.gradient}
        />
      )}
      <View style={styles.topTabBarView}>
        <MaterialTopTabBar
          {...props}
          indicatorStyle={indicatorStyle}
          activeTintColor={activeTintColor}
          style={styles.tabBar}
        />
        <Touchable style={styles.categoryButton} onPress={goCategory}>
          <Text style={textStyle}>Categories</Text>
        </Touchable>
      </View>
      <View style={styles.bottom}>
        <Touchable style={styles.searchButton}>
          <Text style={textStyle}>Search</Text>
        </Touchable>
        <Touchable style={styles.historyButton}>
          <Text style={textStyle}>History</Text>
        </Touchable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: getStatusBarHeight(),
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    height: 260,
  },
  tabBar: {
    flex: 1,
    elevation: 0,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  topTabBarView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryButton: {
    paddingHorizontal: 10,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#ccc',
  },
  bottom: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  searchButton: {
    flex: 1,
    paddingLeft: 12,
    height: 30,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  historyButton: {
    marginLeft: 24,
  },
  text: {
    color: '#333',
  },
  whiteText: {
    color: '#fff',
  },
  whiteBackgroundColor: {
    backgroundColor: '#fff',
  },
});

export default TopTabBarWrapper;
