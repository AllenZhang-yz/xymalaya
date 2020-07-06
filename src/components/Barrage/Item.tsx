import React, {memo, useRef, useEffect} from 'react';
import {Animated, Text, Easing} from 'react-native';
import {viewportWidth} from '@/utils/index';
import {IBarrage} from './index';

interface IProps {
  data: IBarrage;
  outside: (data: IBarrage) => void;
}

const Item: React.FC<IProps> = memo(({data, outside}) => {
  const translatedX = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(translatedX, {
      toValue: 10,
      duration: 6000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        outside(data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: Math.random() * 100,
        transform: [
          {
            translateX: translatedX.interpolate({
              inputRange: [0, 10],
              outputRange: [viewportWidth, 0],
            }),
          },
        ],
      }}>
      <Text>{data.barrageTitle}</Text>
    </Animated.View>
  );
});

export default Item;
