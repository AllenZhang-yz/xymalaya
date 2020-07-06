import React, {FC} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '@/models/index';
import Play from './Play';
import {viewportWidth, navigate} from '@/utils/index';

interface IProps {
  routeName: string;
}

const PlayView: FC<IProps> = ({routeName}) => {
  const playState = useSelector<RootState, string>(
    (state) => state.player.playState,
  );
  if (
    routeName === 'home' ||
    routeName === 'Listen' ||
    routeName === 'Found' ||
    routeName === 'Account' ||
    routeName === 'Detail' ||
    playState === 'paused'
  ) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Play onPress={() => navigate('Detail')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 50,
    height: 70,
    bottom: 0,
    left: (viewportWidth - 50) / 2,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 4,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOpacity: 0.85,
        shadowRadius: 5,
        shadowOffset: {
          width: StyleSheet.hairlineWidth,
          height: StyleSheet.hairlineWidth,
        },
      },
    }),
  },
});

export default PlayView;
