import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import {goBack} from '@/utils/index';
import storage, {load} from '@/config/storage';

const USER_URL = '/mock/11/bear/login';

export interface IUser {
  name: string;
  avatar: string;
}

export interface UserModelState {
  user?: IUser;
}

export interface UserModel extends Model {
  namespace: 'user';
  state: UserModelState;
  effects: {
    login: Effect;
    logout: Effect;
    // loadStorage: Effect;
  };
  reducers: {
    setState: Reducer<UserModelState>;
  };
  // subscriptions: SubscriptionsMapObject;
}

const initialState = {
  user: undefined,
};

const userModel: UserModel = {
  namespace: 'user',
  state: initialState,
  reducers: {
    setState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *login({payload}, {call, put}) {
      const {data, status, msg} = yield call(axios.post, USER_URL, payload);
      if (status === 100) {
        yield put({
          type: 'setState',
          payload: {
            user: data,
          },
        });
        storage.save({key: 'user', data});
        goBack();
      } else {
        console.log(msg);
      }
    },
    *logout(_, {put}) {
      yield put({
        type: 'setState',
        payload: {
          user: undefined,
        },
      });
      storage.save({key: 'user', data: null});
    },
    // *loadStorage(_, {put, call}) {
    //   const user = yield call(load, {key: 'user'});
    //   yield put({
    //     type: 'setState',
    //     payload: {
    //       user,
    //     },
    //   });
    // },
  },
  // subscriptions: {
  //   setup({dispatch}) {
  //     dispatch({
  //       type: 'loadStorage',
  //     });
  //   },
  // },
};

export default userModel;
