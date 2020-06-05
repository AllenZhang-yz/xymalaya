import React, {useEffect, memo, useCallback} from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {RootState} from '@/models/index';
import {IGuess} from '@/models/Home';
import Touchable from '@/components/Touchable';

interface IGuessProps {
  goAlbum: (item: IGuess) => void;
}

const Guess: React.FC<IGuessProps> = memo(({goAlbum}) => {
  const guesses = useSelector<RootState, IGuess[]>(
    (state) => state.home.guesses,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'home/fetchGuesses'});
  }, [dispatch]);

  const renderItem = useCallback(
    ({item}: {item: IGuess}) => (
      <Touchable style={styles.item} onPress={() => goAlbum(item)}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text numberOfLines={2}>{item.title}</Text>
      </Touchable>
    ),
    [goAlbum],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <FontAwesome name="heart-o" size={16} />
          <Text style={styles.headerTitle}>Guess you like</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.headerMore}>More</Text>
          <Ionicons name="ios-arrow-forward" size={16} />
        </View>
      </View>
      <FlatList
        style={styles.list}
        data={guesses}
        numColumns={3}
        renderItem={renderItem}
      />
      <Touchable
        onPress={() => dispatch({type: 'home/fetchGuesses'})}
        style={styles.changeGuess}>
        <SimpleLineIcons name="refresh" size={16} color="red" />
        <Text style={styles.changeGuessText}>Refresh to change</Text>
      </Touchable>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
  },
  item: {
    flex: 1,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomColor: '#efefef',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 5,
    color: '#333',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerMore: {
    marginRight: 5,
    color: '#6f6f6f',
  },
  changeGuess: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  changeGuessText: {
    marginLeft: 5,
  },
  list: {
    padding: 10,
  },
});

export default Guess;
