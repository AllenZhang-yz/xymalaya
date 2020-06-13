import React, {memo, useEffect, createRef, useRef} from 'react';
import {
  View,
  Image,
  Text,
  Animated,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import {BlurView} from '@react-native-community/blur';
import {RootState} from '@/models/index';
import {IAuthor, IProgram} from '@/models/Album';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList, ModalStackNavigation} from '@/navigator/index';
import coverRight from '@/assets/cover-right.png';
import Tab from './Tab';
import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  State,
  TapGestureHandler,
  NativeViewGestureHandler,
} from 'react-native-gesture-handler';
import {viewportHeight} from '@/utils/index';

interface IAlbumProps {
  route: RouteProp<RootStackParamList, 'Album'>;
  navigation: ModalStackNavigation;
}

const HEADER_HEIGHT = 260;
const USE_NATIVE_DRIVER = true;

const Album: React.FC<IAlbumProps> = memo(({route, navigation}) => {
  const panRef = createRef<PanGestureHandler>();
  const tapRef = createRef<TapGestureHandler>();
  const nativeRef = createRef<NativeViewGestureHandler>();

  const headerHeight = useHeaderHeight();

  const RANGE = [-(HEADER_HEIGHT - headerHeight), 0];

  const {id, title, image} = route.params.item;

  const translationYz = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(new Animated.Value(0)).current;
  let lastScrollYValue = useRef(0).current;
  const reverseLastScrollY = Animated.multiply(
    new Animated.Value(-1),
    lastScrollY,
  );
  let translationYValue = useRef(0).current;
  const translationYOffset = useRef(new Animated.Value(0)).current;
  const translateTraceY = Animated.add(
    Animated.add(translationYz, reverseLastScrollY),
    translationYOffset,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'album/fetchAlbum',
      payload: {id},
    });
    navigation.setParams({
      opacity: translateTraceY.interpolate({
        inputRange: RANGE,
        outputRange: [1, 0],
      }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const author = useSelector<RootState, IAuthor>((state) => state.album.author);
  const summary = useSelector<RootState, string>(
    (state) => state.album.summary,
  );
  const list = useSelector<RootState, IProgram[]>((state) => state.album.list);

  const renderHeader = () => {
    return (
      <View style={[[styles.header, {paddingTop: headerHeight}]]}>
        <Image source={{uri: image}} style={styles.background} />
        <BlurView
          blurType="light"
          blurAmount={5}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.leftView}>
          <Image source={{uri: image}} style={styles.thumbnail} />
          <Image source={coverRight} style={styles.coverRight} />
        </View>
        <View style={styles.rightView}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.summary}>
            <Text numberOfLines={1} style={styles.summaryText}>
              {summary}
            </Text>
          </View>
          <View style={styles.author}>
            <Image source={{uri: author.avatar}} style={styles.avatar} />
            <Text style={styles.name}>{author.name}</Text>
          </View>
        </View>
      </View>
    );
  };

  const onItemPress = (data: IProgram, index: number) => {
    const previousItem = list[index - 1];
    const nextItem = list[index + 1];
    dispatch({
      type: 'player/setState',
      payload: {
        previousId: previousItem ? previousItem.id : '',
        nextId: nextItem ? nextItem.id : '',
        title: data.title,
        thumbnailUrl: route.params.item.image,
        sounds: list.map((item) => ({id: item.id, title: item.title})),
      },
    });
    navigation.navigate('Detail', {id: data.id});
  };

  const onScrollDrag = Animated.event(
    [{nativeEvent: {contentOffset: {y: lastScrollY}}}],
    {
      useNativeDriver: USE_NATIVE_DRIVER,
      listener: ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
        lastScrollYValue = nativeEvent.contentOffset.y;
      },
    },
  );

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translationYz,
        },
      },
    ],
    {
      useNativeDriver: USE_NATIVE_DRIVER,
    },
  );
  const onHandlerStateChange = ({
    nativeEvent,
  }: PanGestureHandlerStateChangeEvent) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      let {translationY} = nativeEvent;
      translationY -= lastScrollYValue;
      translationYOffset.extractOffset(); //清空
      translationYOffset.setValue(translationY); //设置value
      translationYOffset.flattenOffset();
      translationYz.setValue(0);
      translationYValue += translationY;
      let maxDeltaY = -RANGE[0] - translationYValue;
      if (translationYValue < RANGE[0]) {
        translationYValue = RANGE[0];
        Animated.timing(translationYOffset, {
          toValue: RANGE[0],
          // duration: 1000,
          useNativeDriver: USE_NATIVE_DRIVER,
        }).start();
        maxDeltaY = RANGE[1];
      } else if (translationYValue > RANGE[1]) {
        translationYValue = RANGE[1];
        Animated.timing(translationYOffset, {
          toValue: RANGE[1],
          // duration: 1000,
          useNativeDriver: USE_NATIVE_DRIVER,
        }).start();
        maxDeltaY = -RANGE[0];
      }
      if (tapRef.current) {
        const tap: any = tapRef.current;
        tap.setNativeProps({maxDeltaY});
      }
    }
  };

  return (
    <TapGestureHandler ref={tapRef} maxDeltaY={-RANGE[0]}>
      <View style={styles.container}>
        <PanGestureHandler
          ref={panRef}
          simultaneousHandlers={[tapRef, nativeRef]}
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}>
          <Animated.View
            style={[
              styles.container,
              {
                transform: [
                  {
                    translateY: translateTraceY.interpolate({
                      inputRange: RANGE,
                      outputRange: RANGE,
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}>
            {renderHeader()}
            <View style={{height: viewportHeight - headerHeight}}>
              <Tab
                panRef={panRef}
                tapRef={tapRef}
                nativeRef={nativeRef}
                onScrollDrag={onScrollDrag}
                onItemPress={onItemPress}
              />
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </TapGestureHandler>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#eee',
  },
  leftView: {
    marginRight: 26,
  },
  thumbnail: {
    width: 98,
    height: 98,
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  coverRight: {
    height: 98,
    position: 'absolute',
    right: -23,
    resizeMode: 'contain',
  },
  rightView: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  summary: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    marginVertical: 10,
    borderRadius: 4,
  },
  summaryText: {
    color: '#fff',
  },
  avatar: {
    height: 26,
    width: 26,
    borderRadius: 13,
    marginRight: 8,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: '#fff',
  },
});

export default Album;
