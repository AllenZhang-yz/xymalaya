import React, {useState, RefObject} from 'react';
import {
  StyleSheet,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {TabView, TabBar, SceneRendererProps} from 'react-native-tab-view';
import Introduction from './Introduction';
import List from './List';
import {
  PanGestureHandler,
  TapGestureHandler,
  NativeViewGestureHandler,
} from 'react-native-gesture-handler';

interface IRoute {
  key: string;
  title: string;
}

interface IState {
  routes: IRoute[];
  index: number;
}

export interface ITabProps {
  panRef: RefObject<PanGestureHandler>;
  tapRef: RefObject<TapGestureHandler>;
  nativeRef: RefObject<NativeViewGestureHandler>;
  onScrollDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const Tab: React.FC<ITabProps> = ({
  panRef,
  tapRef,
  nativeRef,
  onScrollDrag,
}) => {
  const [index, setIndex] = useState(1);
  const onIndexChange = (tabIndex: number) => {
    setIndex(tabIndex);
  };
  const renderScene = ({route}: {route: IRoute}) => {
    switch (route.key) {
      case 'introduction':
        return <Introduction />;
      case 'albums':
        return (
          <List
            panRef={panRef}
            tapRef={tapRef}
            nativeRef={nativeRef}
            onScrollDrag={onScrollDrag}
          />
        );
    }
  };
  const renderTabBar = (
    props: SceneRendererProps & {navigationState: IState},
  ) => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        tabStyle={styles.tabStyle}
        labelStyle={styles.label}
        style={styles.tabBar}
        indicatorStyle={styles.indicator}
      />
    );
  };
  return (
    <TabView
      navigationState={{
        routes: [
          {key: 'introduction', title: 'intro'},
          {key: 'albums', title: 'albums'},
        ],
        index,
      }}
      onIndexChange={onIndexChange}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  tabStyle: {
    width: 80,
  },
  label: {
    color: '#333',
    fontSize: 12,
  },
  tabBar: {
    backgroundColor: '#fff',
    ...Platform.select({
      android: {
        elevation: 0,
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
    }),
  },
  indicator: {
    backgroundColor: '#eb6d48',
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderColor: '#fff',
  },
});

export default Tab;
