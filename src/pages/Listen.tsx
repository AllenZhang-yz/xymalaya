import React from 'react';
import {View, Text, Button} from 'react-native';
import {RootStackNavigation} from '@/navigator/index';

interface IHomeProps {
  navigation: RootStackNavigation;
}

const Listen: React.FC<IHomeProps> = ({navigation}) => {
  const onPress = () => {
    navigation.navigate('Detail', {id: 100});
  };
  return (
    <View>
      <Text>Listen</Text>
      <Button title="跳转到详情页" onPress={onPress} />
    </View>
  );
};

export default Listen;
