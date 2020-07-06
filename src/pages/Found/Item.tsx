import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import VideoControls from 'react-native-video-custom-controls';
import {IFound} from '@/models/Found';

interface IProps {
  data: IFound;
  paused: boolean;
  setCurrentId: (id: string) => void;
}

const Item: FC<IProps> = ({data, setCurrentId, paused}) => {
  const onPlay = () => {
    setCurrentId(data.id);
  };
  const onPause = () => {
    setCurrentId('');
  };
  return (
    <View>
      <Text>{data.title}</Text>
      <VideoControls
        paused={paused}
        onPlay={onPlay}
        onPause={onPause}
        source={{uri: data.videoUrl}}
        style={styles.video}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    height: 220,
  },
});

export default Item;
