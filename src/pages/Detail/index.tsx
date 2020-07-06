import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RouteProp} from '@react-navigation/native';
import {ModalStackParamList, ModalStackNavigation} from '@/navigator/index';
import {RootState} from '@/models/index';
import Touchable from '@/components/Touchable';
import PlaySlider from './PlaySlider';
import {viewportWidth} from '@/utils/index';
import LinearGradient from 'react-native-linear-gradient';
import {IBarrage} from '@/components/Barrage';

const DATA: string[] = [
  '最灵繁的人也看不见自己的背脊',
  '朝闻道，夕死可矣',
  '阅读是人类进步的阶梯',
  '内外相应, 言行相称',
  '人的一生是短的',
  '抛弃时间的人，时间也抛弃他',
  '自信在于沉稳',
  '过犹不及',
  '开卷有益',
  '有志者事竟成',
  '合理安排时间，就等于节约时间',
  '成功源于不懈的努力',
];

interface IDetailProps {
  navigation: ModalStackNavigation;
  route: RouteProp<ModalStackParamList, 'Detail'>;
}

const IMAGE_WIDTH = 180;
const PADDING_TOP = (viewportWidth - IMAGE_WIDTH) / 2;
const SCALE = viewportWidth / IMAGE_WIDTH;

const Detail: React.FC<IDetailProps> = ({route, navigation}) => {
  const [showBarrage, setShowBarrage] = useState(false);
  const [barrageData, setBarrageData] = useState<IBarrage[]>([]);

  const dispatch = useDispatch();
  const title = useSelector<RootState, string>((state) => state.player.title);
  const thumbnail = useSelector<RootState, string>(
    (state) => state.player.thumbnailUrl,
  );
  const playState = useSelector<RootState, string>(
    (state) => state.player.playState,
  );
  const prevId = useSelector<RootState, string>(
    (state) => state.player.previousId,
  );
  const nextId = useSelector<RootState, string>((state) => state.player.nextId);
  const id = useSelector<RootState, string>((state) => state.player.id);

  useEffect(() => {
    if (route.params && route.params.id !== id) {
      dispatch({
        type: 'player/fetchShow',
        payload: {
          id: route.params.id,
        },
      });
    } else {
      dispatch({
        type: 'player/play',
      });
    }

    addBarrage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    navigation.setOptions({headerTitle: title});
  }, [navigation, title]);
  // useEffect(() => {
  //   return () => {
  //     dispatch({
  //       type: 'player/pause',
  //     });
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const anim = useRef(new Animated.Value(1)).current;

  const randomIndex = (length: number) => {
    return Math.floor(Math.random() * length);
  };

  const getText = () => {
    return DATA[randomIndex(DATA.length)];
  };

  const togglePlay = () => {
    dispatch({
      type: playState === 'playing' ? 'player/pause' : 'player/play',
    });
  };
  const previous = () => {
    dispatch({
      type: 'player/previous',
    });
  };
  const next = () => {
    dispatch({
      type: 'player/next',
    });
  };
  const barrage = () => {
    setShowBarrage(!showBarrage);
    Animated.timing(anim, {
      toValue: showBarrage ? 1 : SCALE,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const addBarrage = () => {
    setInterval(() => {
      if (showBarrage) {
        const id = Date.now();
        const barrageTitle = getText();
        setBarrageData((data) => [...data, {id, barrageTitle}]);
      }
    }, 1000);
  };
  console.log('barrage data', barrageData);
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Animated.Image
          source={{uri: thumbnail}}
          style={[styles.image, {transform: [{scale: anim}]}]}
        />
      </View>
      {showBarrage && (
        <>
          <LinearGradient
            colors={['rgba(128,104,102,0.5)', '#807c66']}
            style={styles.linear}
          />
          {/* <Barrage data={barrageData} maxTrack={5} /> */}
        </>
      )}
      <Touchable style={styles.barrage} onPress={barrage}>
        <Text style={styles.barrageText}>Bullet Screen</Text>
      </Touchable>
      <PlaySlider />
      <View style={styles.control}>
        <Touchable disabled={!prevId} onPress={previous} style={styles.button}>
          <Ionicons name="ios-skip-backward" size={30} color="#fff" />
        </Touchable>
        <Touchable onPress={togglePlay} style={styles.button}>
          <Ionicons
            name={playState === 'playing' ? 'ios-pause' : 'ios-play'}
            size={40}
            color="#fff"
          />
        </Touchable>
        <Touchable disabled={!nextId} onPress={next} style={styles.button}>
          <Ionicons name="ios-skip-forward" size={30} color="#fff" />
        </Touchable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: PADDING_TOP,
  },
  control: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 90,
  },
  button: {
    marginHorizontal: 10,
  },
  imageView: {
    alignItems: 'center',
    height: IMAGE_WIDTH,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  barrage: {
    height: 20,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    marginLeft: 10,
  },
  barrageText: {
    color: '#fff',
  },
  linear: {
    position: 'absolute',
    top: 0,
    height: viewportWidth,
    width: viewportWidth,
  },
});

export default Detail;
