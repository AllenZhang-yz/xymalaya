import React, {memo, useRef, useEffect} from 'react';
import {Animated, Text, Easing} from 'react-native';
import {viewportWidth} from '@/utils/index';
import {IBarrage} from './index';

interface IProps {
  data: IBarrage;
}

const Item: React.FC<IProps> = memo(({data}) => {
  const translatedX = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(translatedX, {
      toValue: 10,
      duration: 6000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
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
