import AsyncStorage from '@react-native-community/async-storage';
import Storage, {LoadParams} from 'react-native-storage';

const storage = new Storage({
  size: 1000, //max capacity
  storageBackend: AsyncStorage, //data engine
  defaultExpires: null,
  enableCache: true,
  sync: {},
});

export const load = (params: LoadParams) => {
  return storage.load(params);
};

export default storage;
