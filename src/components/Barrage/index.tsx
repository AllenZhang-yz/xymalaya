import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Item from '@/components/Barrage/Item';

export interface IBarrage {
  id: number;
  barrageTitle: string;
}

interface IProps {
  data: IBarrage[];
}

const Barrage: React.FC<IProps> = ({data}) => {
  const [barrageData, setBarrageData] = useState<IBarrage[]>(data);
  const [list, setList] = useState<IBarrage[]>(data);

  useEffect(() => {
    if (data !== barrageData) {
      setList(list.concat(data));
    }
  }, [barrageData, data, list]);

  // console.log('list', list);

  const renderItem = (item: IBarrage, index: number) => {
    return <Item key={item.id} data={item} />;
  };

  return <View>{list.map(renderItem)}</View>;
};

export default Barrage;
