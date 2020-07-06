import React, {useReducer} from 'react';
import {
  FlatList,
  View,
  ListRenderItemInfo,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RootStackNavigation} from '@/navigator/index';
import realm, {IProgram} from '@/config/realm';
import {formatTime} from '../utils';
import Touchable from '@/components/Touchable';

interface IHomeProps {
  navigation: RootStackNavigation;
}

const Listen: React.FC<IHomeProps> = () => {
  const programs = realm.objects<IProgram>('Program');
  const [ignored, forceUpdate] = useReducer((x: number) => x + 1, 0);
  const updateFunc = () => {
    forceUpdate();
  };
  const deleteItem = (item: IProgram) => {
    realm.write(() => {
      const program = realm.objects('Program').filtered(`id='${item.id}'`);
      realm.delete(program);
    });
    updateFunc();
  };
  const renderItem = ({item}: ListRenderItemInfo<IProgram>) => {
    return (
      <View style={styles.item}>
        <Image source={{uri: item.thumbnailUrl}} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.bottom}>
            <Ionicons name="ios-timer" size={16} color="#999" />
            <Text style={styles.text}>{formatTime(item.duration)}</Text>
            <Text style={styles.rate}>Already played: {item.rate}%</Text>
          </View>
        </View>
        <Touchable style={styles.deleteBtn} onPress={() => deleteItem(item)}>
          <AntDesign name="delete" size={22} color="#999" />
        </Touchable>
      </View>
    );
  };
  return <FlatList data={programs} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginHorizontal: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 3,
    margin: 5,
  },
  title: {
    color: '#999',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#999',
    marginLeft: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
  },
  rate: {
    marginLeft: 20,
    color: '#F6A624',
  },
  deleteBtn: {
    padding: 10,
    justifyContent: 'center',
  },
});

export default Listen;
