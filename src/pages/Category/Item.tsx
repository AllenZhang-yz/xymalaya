import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ICategory} from '@/models/Category';
import {viewportWidth} from '@/utils/index';

interface IItemProps {
  item: ICategory;
  selected: boolean;
  isEdit: boolean;
  disabled?: boolean;
}

export const parentWidth = viewportWidth - 10;
export const itemWidth = (viewportWidth - 10) / 4;
export const itemHeight = 48;
export const margin = 5;

const Item: React.FC<IItemProps> = ({item, isEdit, selected, disabled}) => {
  return (
    <View key={item.id} style={styles.itemWrapper}>
      <View style={[styles.item, disabled && styles.disabled]}>
        <Text>{item.name}</Text>
        {isEdit && !disabled && (
          <View style={styles.icon}>
            <Text style={styles.iconText}>{selected ? '-' : '+'}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    width: itemWidth,
    height: itemHeight,
  },
  item: {
    flex: 1,
    backgroundColor: '#fff',
    margin: margin,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  icon: {
    position: 'absolute',
    top: -5,
    right: -5,
    height: 16,
    width: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f86442',
    borderRadius: 8,
  },
  iconText: {
    color: '#fff',
    lineHeight: 15,
  },
});

export default Item;
