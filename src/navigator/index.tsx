import React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import Category from '@/pages/Category';
import Album from '@/pages/Album';
import {Platform, Animated, StyleSheet} from 'react-native';

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

const Navigator: React.FC = () => {
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
    <NavigationContainer>
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
        <Stack.Screen
          name="Album"
          options={getAlbumOptions}
          component={Album}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    backgroundColor: '#fff',
    opacity: 0,
  },
});

export default Navigator;
