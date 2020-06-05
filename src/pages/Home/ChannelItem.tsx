import React, {memo} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IChannel} from '@/models/Home';
import Touchable from '@/components/Touchable';

interface IChannelItem {
  data: IChannel;
  onPress: (data: IChannel) => void;
}

const ChannelItem: React.FC<IChannelItem> = memo(({data, onPress}) => {
  return (
    <Touchable style={styles.container} onPress={() => onPress(data)}>
      <Image source={{uri: data.image}} style={styles.image} />
      <View style={styles.rightContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {data.title}
        </Text>
        <Text style={styles.remark} numberOfLines={2}>
          {data.remark}
        </Text>
        <View style={styles.bottom}>
          <View style={styles.played}>
            <Ionicons name="ios-headset" size={16} color="red" />
            <Text style={styles.number}>{data.played}</Text>
          </View>
          <View style={styles.playing}>
            <Ionicons name="ios-musical-notes" size={16} color="red" />
            <Text style={styles.number}>{data.playing}</Text>
          </View>
        </View>
      </View>
    </Touchable>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#dedede',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
  },
  remark: {
    backgroundColor: '#f8f8f8',
    padding: 5,
    marginBottom: 5,
  },
  bottom: {
    flexDirection: 'row',
  },
  played: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  playing: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    marginLeft: 5,
  },
});

export default ChannelItem;
