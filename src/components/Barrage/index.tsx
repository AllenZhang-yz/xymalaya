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
    setList((prevList) => prevList.concat(data));
  }, []);

  // console.log('list', list);
  const outside = (barrage: IBarrage) => {
    const newList = list.slice();
    if (newList.length > 0) {
      const deleteIndex = newList.indexOf(barrage);
      if (deleteIndex > -1) {
        newList.splice(deleteIndex, 1);
        setList(newList);
      }
    }
  };

  const renderItem = (item: IBarrage, index: number) => {
    return <Item key={item.id} data={item} outside={outside} />;
  };

  return <View>{list.map(renderItem)}</View>;
};

export default Barrage;
