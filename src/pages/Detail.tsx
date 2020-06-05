import React from 'react';
import {View, Text} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '@/navigator/index';

interface IDetailPops {
  route: RouteProp<RootStackParamList, 'Detail'>;
}

const Detail: React.FC<IDetailPops> = ({route}) => {
  return (
    <View>
      <Text>Detail</Text>
      <Text>{route.params.id}</Text>
    </View>
  );
};

export default Detail;
