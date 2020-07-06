import React, {useState, useEffect} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {useDispatch} from 'react-redux';
// import {RootStackNavigation} from '@/navigator/index';
import {IFound} from '@/models/Found';
import Item from './Item';

const Found: React.FC = () => {
  const dispatch = useDispatch();
  const [list, setList] = useState<IFound[]>([]);
  const [cId, setCId] = useState('');
  useEffect(() => {
    dispatch({
      type: 'found/fetchList',
      callback: (data: IFound[]) => {
        setList(data);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCurrentId = (id: string) => {
    setCId(id);
    if (id) {
      dispatch({
        type: 'player/pause',
      });
    }
  };

  const renderItem = ({item}: ListRenderItemInfo<IFound>) => {
    const paused = item.id !== cId;
    return <Item data={item} paused={paused} setCurrentId={setCurrentId} />;
  };

  return <FlatList data={list} renderItem={renderItem} />;
};

export default Found;
