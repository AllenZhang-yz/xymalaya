import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import _ from 'lodash';
import {DragSortableView} from 'react-native-drag-sort';
import {RootState} from '@/models/index';
import {useSelector, useDispatch} from 'react-redux';
import {ICategory} from '@/models/Category';
import {RootStackNavigation} from '@/navigator/index';
import Item, {parentWidth, itemWidth, itemHeight, margin} from './Item';
import HeaderRightBtn from './HeaderRightBtn';
import Touchable from '@/components/Touchable';

interface ICategoryProps {
  navigation: RootStackNavigation;
}

const fixedItems = [0, 1];

const Category: React.FC<ICategoryProps> = ({navigation}) => {
  const dispatch = useDispatch();

  const myCategories = useSelector<RootState, ICategory[]>(
    (state) => state.category.myCategories,
  );
  const categories = useSelector<RootState, ICategory[]>(
    (state) => state.category.categories,
  );
  const isEdit = useSelector<RootState, boolean>(
    (state) => state.category.isEdit,
  );

  const [myCategoriesState, setMyCategoriesState] = useState<ICategory[]>(
    myCategories,
  );

  const onSubmit = useCallback(() => {
    dispatch({
      type: 'category/toggle',
      payload: {
        myCategoriesState,
      },
    });
    if (isEdit) {
      navigation.goBack();
    }
  }, [dispatch, myCategoriesState, isEdit, navigation]);

  navigation.setOptions({
    headerRight: () => <HeaderRightBtn onSubmit={onSubmit} />,
  });

  useEffect(() => {
    return () => {
      dispatch({
        type: 'category/setState',
        payload: {
          isEdit: false,
        },
      });
    };
  }, [dispatch]);

  const classifyGroup = _.groupBy(categories, (item) => item.classify);

  const onPress = (item: ICategory, index: number, selected: boolean) => {
    const disabled = fixedItems.indexOf(index) > -1;

    if (isEdit) {
      if (selected) {
        if (disabled) {
          return;
        }
        setMyCategoriesState(
          myCategoriesState.filter(
            (selectedItem) => selectedItem.id !== item.id,
          ),
        );
      } else {
        setMyCategoriesState(myCategoriesState.concat(item));
      }
    }
  };

  const renderItem = (item: ICategory, index: number) => {
    const disabled = fixedItems.indexOf(index) > -1;
    return (
      // <Touchable
      //   key={item.id}
      //   onLongPress={onLongPress}
      //   onPress={() => onPress(item, index, true)}>
      <Item item={item} isEdit={isEdit} disabled={disabled} selected />
      // </Touchable>
    );
  };

  const renderUnselectedItem = (item: ICategory, index: number) => (
    <Touchable
      key={item.id}
      onLongPress={onLongPress}
      onPress={() => onPress(item, index, false)}>
      <Item item={item} isEdit={isEdit} selected={false} />
    </Touchable>
  );

  const onLongPress = () => {
    dispatch({
      type: 'category/setState',
      payload: {
        isEdit: true,
      },
    });
  };

  const onDataChange = (data: ICategory[]) => {
    setMyCategoriesState(data);
  };

  const onClickItem = (data: ICategory[], item: ICategory) => {
    onPress(item, data.indexOf(item), true);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.classifyName}>My Category</Text>
      <View style={styles.classifyView}>
        {/* {myCategoriesState.map(renderItem)} */}
        <DragSortableView
          dataSource={myCategoriesState}
          fixedItems={fixedItems}
          renderItem={renderItem}
          sortable={isEdit}
          keyExtractor={(item) => item.id}
          onDataChange={onDataChange}
          parentWidth={parentWidth}
          childrenWidth={itemWidth}
          childrenHeight={itemHeight}
          marginChildrenTop={margin}
          onClickItem={onClickItem}
        />
      </View>
      <View>
        {Object.keys(classifyGroup).map((classify) => (
          <View key={classify}>
            <Text style={styles.classifyName}>{classify}</Text>
            <View style={styles.classifyView}>
              {classifyGroup[classify].map((item, index) => {
                if (
                  myCategoriesState.find(
                    (selectedItem) => selectedItem.id === item.id,
                  )
                ) {
                  return null;
                }
                return renderUnselectedItem(item, index);
              })}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f6f6',
  },
  classifyName: {
    fontSize: 16,
    marginTop: 14,
    marginBottom: 8,
    marginLeft: 10,
  },
  classifyView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
});

export default Category;
