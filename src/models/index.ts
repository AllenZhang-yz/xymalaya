import {DvaLoadingState} from 'dva-loading-ts';
import home from './Home';
import category from './Category';
import album from './Album';
import player from './Player';
import found from './Found';
import user from './user';

const models = [home, category, album, player, found, user];

export type RootState = {
  home: typeof home.state;
  category: typeof category.state;
  album: typeof album.state;
  player: typeof player.state;
  user: typeof user.state;
  loading: DvaLoadingState;
} & {
  [key: string]: typeof home.state;
};
export default models;
