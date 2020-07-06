import React, {FC, useRef, useEffect} from 'react';
import {Animated, StyleSheet, Image, Easing} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {RootState} from '@/models/index';
import Touchable from '@/components/Touchable';
import Progress from './Progress';

interface IProps {
  onPress: () => void;
}

const Play: FC<IProps> = ({onPress}) => {
  const thumbnailUrl = useSelector<RootState, string>(
    (state) => state.player.thumbnailUrl,
  );
  const playState = useSelector<RootState, string>(
    (state) => state.player.playState,
  );

  const anim = useRef(new Animated.Value(0)).current;

  const timing = Animated.loop(
    Animated.timing(anim, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    {iterations: -1},
  );
  const rotate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    if (playState === 'playing') {
      timing.start();
    } else if (playState === 'paused') {
      timing.stop();
    }
  });

  const onPressHandler = () => {
    if (thumbnailUrl && onPress) {
      onPress();
    }
  };

  return (
    <Touchable style={styles.play} onPress={onPressHandler}>
      <Progress>
        <Animated.View style={{transform: [{rotate}]}}>
          {thumbnailUrl ? (
            <Image source={{uri: thumbnailUrl}} style={styles.image} />
          ) : (
            <Ionicons
              name="ios-play"
              color="#ededed"
              size={40}
              style={styles.btn}
            />
          )}
        </Animated.View>
      </Progress>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  play: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  btn: {
    left: 3,
  },
});

export default Play;
