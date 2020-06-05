import React, {useEffect, useState, useMemo, useCallback, memo} from 'react';
import {
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootStackNavigation} from '@/navigator/index';
import {hp} from '@/utils/index';
import {RootState} from '@/models/index';
import {IChannel, IGuess} from '@/models/Home';
import Carousel from './Carousel';
import Guess from './Guess';
import ChannelItem from './ChannelItem';

interface IHomeProps {
  navigation: RootStackNavigation;
}

const Home: React.FC<IHomeProps> = memo(({navigation}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const goAlbum = useCallback(
    (data: IChannel | IGuess) => {
      navigation.navigate('Album', {item: data});
    },
    [navigation],
  );

  const channels = useSelector<RootState, IChannel[]>(
    (state) => state.home.channels,
  );

  const hasMore = useSelector<RootState, boolean>(
    (state) => state.home.pagination.hasMore,
  );

  const loading = useSelector<RootState, boolean | undefined>(
    (state) => state.loading.effects['home/fetchChannels'],
  );

  const gradientVisible = useSelector<RootState, boolean>(
    (state) => state.home.gradientVisible,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'home/fetchCarousels'});
    dispatch({type: 'home/fetchChannels'});
  }, [dispatch]);

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<IChannel>) => (
      <ChannelItem data={item} onPress={goAlbum} />
    ),
    [goAlbum],
  );

  const onScroll = useCallback(
    ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = nativeEvent.contentOffset.y;
      let newGradientVisible = offsetY < hp(26);
      if (gradientVisible !== newGradientVisible) {
        dispatch({
          type: 'home/setState',
          payload: {
            gradientVisible: newGradientVisible,
          },
        });
      }
    },
    [dispatch, gradientVisible],
  );

  const header = useMemo(
    () => (
      <View>
        <Carousel />
        <View style={styles.background}>
          <Guess goAlbum={goAlbum} />
        </View>
      </View>
    ),
    [goAlbum],
  );

  const footer = useMemo(() => {
    if (!hasMore) {
      return (
        <View style={styles.end}>
          <Text>No More...</Text>
        </View>
      );
    }
    if (loading && hasMore && channels.length > 0) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size={10} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    }
  }, [hasMore, loading, channels]);

  const empty = useMemo(() => {
    if (loading) {
      return;
    }
    return (
      <View style={styles.empty}>
        <Text>No data available</Text>
      </View>
    );
  }, [loading]);

  const onRefresh = useCallback(() => {
    //set refreshing status to true
    setRefreshing(true);
    //fetch data
    dispatch({
      type: 'home/fetchChannels',
      callback: () => {
        //set refreshing status to false
        setRefreshing(false);
      },
    });
  }, [dispatch]);

  const onEndReached = useCallback(() => {
    if (loading || !hasMore) {
      return;
    }
    dispatch({type: 'home/fetchChannels', payload: {loadMore: true}});
  }, [dispatch, hasMore, loading]);

  return (
    <FlatList
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      ListEmptyComponent={empty}
      data={channels}
      renderItem={renderItem}
      keyExtractor={(item: IChannel) => item.id}
      onRefresh={onRefresh} //down scroll refresh
      refreshing={refreshing} //down scroll refresh
      onEndReached={onEndReached} //up scroll load more
      onEndReachedThreshold={0.2} //up scroll load more
      onScroll={onScroll}
    />
  );
});

const styles = StyleSheet.create({
  end: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  loading: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  loadingText: {
    color: '#6f6f6f',
    fontSize: 10,
    marginTop: 7,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 100,
  },
  background: {
    backgroundColor: '#fff',
  },
});

export default Home;
