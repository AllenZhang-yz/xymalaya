import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from 'react-native-slider-x';
import {useSelector} from 'react-redux';
import {RootState} from '@/models/index';
import {formatTime} from '@/utils/index';

const PlaySlider: React.FC = () => {
  const currentTime = useSelector<RootState, number>(
    (state) => state.player.cTime,
  );
  const duration = useSelector<RootState, number>(
    (state) => state.player.duration,
  );

  const renderThumb = () => {
    return (
      <View>
        <Text style={styles.text}>
          {formatTime(currentTime)}/{formatTime(duration)}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Slider
        value={currentTime}
        maximumValue={duration}
        maximumTrackTintColor="rgba(255,255,255,0.3)"
        minimumTrackTintColor="#fff"
        renderThumb={renderThumb}
        thumbStyle={styles.thumb}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  thumb: {
    backgroundColor: '#fff',
    width: 76,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
  },
});

export default PlaySlider;
