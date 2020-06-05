import {DvaLoadingState} from 'dva-loading-ts';
import home from './Home';
import category from './Category';
import album from './Album';

const models = [home, category, album];

export type RootState = {
  home: typeof home.state;
  category: typeof category.state;
  album: typeof album.state;
  loading: DvaLoadingState;
} & {
  [key: string]: typeof home.state;
};
export default models;
