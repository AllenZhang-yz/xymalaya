import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '@/models/index';
import {ModalStackNavigation} from '@/navigator/index';
import defaultAvatarImg from '@/assets/default_avatar.png';
import Touchable from '@/components/Touchable';
import {IUser} from '@/models/user';

interface IHomeProps {
  navigation: ModalStackNavigation;
}

const Account: React.FC<IHomeProps> = ({navigation}) => {
  const user = useSelector<RootState, IUser | undefined>(
    (state) => state.user.user,
  );
  const dispatch = useDispatch();
  const onPress = () => {
    navigation.navigate('Login');
  };
  const logout = () => {
    dispatch({
      type: 'user/logout',
    });
  };
  if (user) {
    return (
      <View style={styles.loginView}>
        <Image source={{uri: user.avatar}} style={styles.avatar} />
        <View style={styles.right}>
          <Text>{user.name}</Text>
        </View>
        <Touchable style={(styles.loginBtn, {marginLeft: 15})} onPress={logout}>
          <Text style={styles.loginBtnText}>Logout</Text>
        </Touchable>
      </View>
    );
  }
  return (
    <View style={styles.loginView}>
      <Image source={defaultAvatarImg} style={styles.avatar} />
      <View style={styles.right}>
        <Touchable style={styles.loginBtn} onPress={onPress}>
          <Text style={styles.loginBtnText}>Login</Text>
        </Touchable>
        <Text style={styles.tip}>All records will be synced after login</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginView: {
    flexDirection: 'row',
    margin: 15,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  right: {
    flex: 1,
    marginLeft: 15,
  },
  loginBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 26,
    width: 76,
    borderRadius: 13,
    borderColor: '#f86442',
    borderWidth: 1,
    marginBottom: 12,
  },
  loginBtnText: {
    color: '#f86442',
    fontWeight: '900',
  },
  tip: {
    color: '#999',
  },
});

export default Account;
