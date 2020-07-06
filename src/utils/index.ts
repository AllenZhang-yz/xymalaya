import React from 'react';
import {Dimensions} from 'react-native';
import {
  NavigationState,
  Route,
  PartialState,
  NavigationContainerRef,
} from '@react-navigation/native';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

//get width from percentage
const wp = (percentage: number) => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};

//get height from percentage
const hp = (percentage: number) => {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
};

const formatTime = (seconds: number) => {
  const m = parseInt((seconds % (60 * 60)) / 60 + '', 10);
  const s = parseInt((seconds % 60) + '', 10);
  return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
};

const findRouteNameFromNavigatorState = ({routes, index}: NavigationState) => {
  let route = routes[index];
  while (route.state) {
    route = route.state.routes[route.state.index!] as Route<string> & {
      state?: NavigationState | PartialState<NavigationState> | undefined;
    };
  }
  return route.name;
};

const navigationRef = React.createRef<NavigationContainerRef>();

const navigate = (name: string, params?: any) => {
  navigationRef.current?.navigate(name, params);
};

const goBack = () => {
  navigationRef.current?.goBack();
};

export {
  viewportWidth,
  viewportHeight,
  wp,
  hp,
  formatTime,
  findRouteNameFromNavigatorState,
  navigationRef,
  navigate,
  goBack,
};
