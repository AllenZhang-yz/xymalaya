import React from 'react';
import {ListRenderItemInfo, Alert, Animated, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '@/models/index';
import {IProgram} from '@/models/Album';
import Item from './Item';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
import {ITabProps} from '../Tab';

const List: React.FC<ITabProps> = ({
  panRef,
  tapRef,
  nativeRef,
  onScrollDrag,
}) => {
  const list = useSelector<RootState, IProgram[]>((state) => state.album.list);
  const onPress = (data: IProgram) => {
    Alert.alert('album clicked');
  };
  const renderItem = ({item, index}: ListRenderItemInfo<IProgram>) => {
    return <Item data={item} index={index} onPress={onPress} />;
  };
  return (
    <NativeViewGestureHandler
      simultaneousHandlers={panRef}
      ref={nativeRef}
      waitFor={tapRef}>
      <Animated.FlatList
        data={list}
        renderItem={renderItem}
        bounces={false}
        keyExtractor={(item: IProgram) => item.id}
        style={styles.container}
        onScrollBeginDrag={onScrollDrag}
        onScrollEndDrag={onScrollDrag}
      />
    </NativeViewGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default List;
