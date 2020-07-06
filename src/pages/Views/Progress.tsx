import React, {FC} from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {useSelector} from 'react-redux';
import {RootState} from '@/models/index';

const Progress: FC = ({children}) => {
  const currentTime = useSelector<RootState, number>(
    (state) => state.player.cTime,
  );
  const duration = useSelector<RootState, number>(
    (state) => state.player.duration,
  );
  return (
    <AnimatedCircularProgress
      size={50}
      width={3}
      tintColor="#00e0ff"
      backgroundColor="#ededed"
      rotation={0}
      fill={duration ? (currentTime / duration) * 100 : 0}>
      {() => <>{children}</>}
    </AnimatedCircularProgress>
  );
};

export default Progress;
