import React, {Component} from 'react';
import {Platform, Animated, StyleSheet} from 'react-native';
import {
  NavigationContainer,
  NavigationState,
  RouteProp,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomTabs from './BottomTabs';
import Category from '@/pages/Category';
import Album from '@/pages/Album';
import Detail from '@/pages/Detail';
import PlayView from '@/pages/Views/PlayView';
import {findRouteNameFromNavigatorState, navigationRef} from '@/utils/index';
import Login from '@/pages/Login';
import SplashScreen from 'react-native-splash-screen';

export type RootStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  Category: undefined;
  Album: {
    item: {
      id: string;
      title: string;
      image: string;
    };
    opacity?: Animated.Value;
  };
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

const RootStackScreen = () => {
  const getAlbumOptions = ({
    route,
  }: {
    route: RouteProp<RootStackParamList, 'Album'>;
  }) => {
    return {
      headerTitle: route.params.item.title,
      headerTransparent: true,
      headerTitleStyle: {
        opacity: route.params.opacity,
      },
      headerBackground: () => (
        <Animated.View
          style={[
            styles.headerBackground,
            {
              opacity: route.params.opacity,
            },
          ]}
        />
      ),
    };
  };
  return (
    <Stack.Navigator
      headerMode="float"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        headerBackTitleVisible: false,
        headerTintColor: '#333',
        headerStyle: {
          ...Platform.select({
            android: {
              elevation: 0,
              borderBottomWidth: StyleSheet.hairlineWidth,
            },
          }),
        },
      }}>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{headerTitle: 'Home'}}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{headerTitle: 'Category'}}
      />
      <Stack.Screen name="Album" options={getAlbumOptions} component={Album} />
    </Stack.Navigator>
  );
};

export type ModalStackParamList = {
  Root: undefined;
  Detail: {
    id: string;
  };
  Login: undefined;
};

const ModalStack = createStackNavigator<ModalStackParamList>();

export type ModalStackNavigation = StackNavigationProp<ModalStackParamList>;

const ModalStackScreen = () => {
  return (
    <ModalStack.Navigator
      mode="modal"
      headerMode="screen"
      screenOptions={{
        headerTitleAlign: 'center',
        gestureEnabled: true,
        ...TransitionPresets.ModalSlideFromBottomIOS,
        headerBackTitleVisible: false,
        headerTintColor: '#333',
      }}>
      <ModalStack.Screen
        name="Root"
        component={RootStackScreen}
        options={{headerShown: false}}
      />
      <ModalStack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerTintColor: '#fff',
          headerTitle: '',
          headerTransparent: true,
          cardStyle: {backgroundColor: '#807c66'},
          headerBackImage: ({tintColor}) => (
            <Ionicons
              name="ios-arrow-down"
              size={30}
              color={tintColor}
              style={styles.headerBackImage}
            />
          ),
        }}
      />
      <ModalStack.Screen
        name="Login"
        component={Login}
        options={{headerTitle: 'Login'}}
      />
    </ModalStack.Navigator>
  );
};

class Navigator extends Component {
  state = {
    routeName: 'home',
  };
  componentDidMount() {
    SplashScreen.hide();
  }
  onStateChange = (state: NavigationState | undefined) => {
    if (typeof state !== 'undefined') {
      const routeName = findRouteNameFromNavigatorState(state);
      this.setState({routeName});
    }
  };
  render() {
    const {routeName} = this.state;
    return (
      <NavigationContainer
        ref={navigationRef}
        onStateChange={this.onStateChange}>
        <ModalStackScreen />
        <PlayView routeName={routeName} />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    backgroundColor: '#fff',
    opacity: 0,
  },
  headerBackImage: {
    marginHorizontal: Platform.OS === 'android' ? 0 : 8,
  },
});

export default Navigator;
