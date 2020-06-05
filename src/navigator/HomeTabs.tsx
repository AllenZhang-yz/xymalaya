import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';
import Home from '@/pages/Home';
import TopTabBarWrapper from '@/pages/Views/TopTabBarWrapper';
import {RootState} from '@/models/index';
import {ICategory} from '@/models/Category';
import {createHomeModel} from '@/config/dva';

export type HomeParamList = {
  [key: string]: {namespace: string};
};

const Tab = createMaterialTopTabNavigator<HomeParamList>();

const renderScreen = (item: ICategory) => {
  createHomeModel(item.id);
  return (
    <Tab.Screen
      key={item.id}
      name={item.id}
      component={Home}
      options={{tabBarLabel: item.name}}
      initialParams={{namespace: item.id}}
    />
  );
};

const HomeTabs: React.FC = () => {
  const myCategories = useSelector<RootState, ICategory[]>(
    (state) => state.category.myCategories,
  );
  const renderTabBar = (props: MaterialTopTabBarProps) => {
    return <TopTabBarWrapper {...props} />;
  };

  return (
    <Tab.Navigator
      lazy
      tabBar={renderTabBar}
      pager={(props) => <ViewPagerAdapter {...props} />}
      sceneContainerStyle={styles.sceneContainer}
      tabBarOptions={{
        scrollEnabled: true,
        tabStyle: {
          width: 80,
        },
        indicatorStyle: {
          height: 4,
          width: 20,
          marginLeft: 30,
          borderRadius: 2,
          backgroundColor: '#f86442',
        },
        activeTintColor: '#f86442',
        inactiveTintColor: '#333',
      }}>
      {myCategories.map(renderScreen)}
      {/* <Tab.Screen
        name="Home"
        component={Home}
        options={{tabBarLabel: '推荐'}}
      /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: 'transparent',
  },
});

export default HomeTabs;
