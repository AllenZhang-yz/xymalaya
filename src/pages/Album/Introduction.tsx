import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '@/models/index';

const Introduction: React.FC = () => {
  const introduction = useSelector<RootState, string>(
    (state) => state.album.introduction,
  );
  return (
    <View style={styles.container}>
      <Text>{introduction}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Introduction;
