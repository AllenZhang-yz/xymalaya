import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IProgram} from '@/models/Album';
import Touchable from '@/components/Touchable';

interface IItemProps {
  data: IProgram;
  index: number;
  onPress: (data: IProgram, index: number) => void;
}

const Item: React.FC<IItemProps> = ({data, index, onPress}) => {
  const {title, playVolume, duration, date} = data;
  const itemOnPress = () => {
    if (typeof onPress === 'function') {
      onPress(data, index);
    }
  };
  return (
    <Touchable style={styles.item} onPress={itemOnPress}>
      <Text style={styles.serial}>{index + 1}</Text>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.info}>
          <View style={styles.iconView}>
            <Ionicons name="ios-headset" size={16} color="red" />
            <Text style={styles.iconText}>{playVolume}</Text>
          </View>
          <View style={styles.iconView}>
            <Ionicons name="ios-timer" size={16} color="red" />
            <Text style={styles.iconText}>{duration}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.date}>{date}</Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginHorizontal: 25,
  },
  serial: {
    fontSize: 14,
    color: '#838383',
    fontWeight: '800',
  },
  title: {
    fontWeight: '500',
    marginBottom: 15,
  },
  info: {
    flexDirection: 'row',
  },
  iconView: {
    flexDirection: 'row',
    marginRight: 10,
  },
  iconText: {
    marginHorizontal: 5,
    color: '#939393',
  },
  date: {
    color: '#939393',
  },
});

export default Item;
