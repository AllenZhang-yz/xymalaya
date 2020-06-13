import {DvaLoadingState} from 'dva-loading-ts';
import home from './Home';
import category from './Category';
import album from './Album';
import player from './Player';

const models = [home, category, album, player];

export type RootState = {
  home: typeof home.state;
  category: typeof category.state;
  album: typeof album.state;
  player: typeof player.state;
  loading: DvaLoadingState;
} & {
  [key: string]: typeof home.state;
};
export default models;
