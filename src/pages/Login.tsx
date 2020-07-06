import React, {FC} from 'react';
import {ScrollView, View, Text, TextInput, StyleSheet} from 'react-native';
import {Formik, Field} from 'formik';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import Touchable from '@/components/Touchable';
import Input from '@/components/Input';

interface IValues {
  account: string;
  password: string;
}

const initialValues: IValues = {
  account: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  account: Yup.string().trim().required('Please enter your account'),
  password: Yup.string().trim().required('Please enter your password'),
});

const Login: FC = () => {
  const dispatch = useDispatch();
  const onSubmit = (values: IValues) => {
    dispatch({
      type: 'user/login',
      payload: values,
    });
  };
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Text style={styles.logo}>Listening book</Text>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {({handleSubmit}) => {
          return (
            <View>
              <Field
                name="account"
                component={Input}
                placeholder="Enter your account..."
              />
              <Field
                name="password"
                component={Input}
                secureTextEntry
                placeholder="Enter your password..."
              />
              {/* <TextInput
                onChangeText={handleChange('account')}
                onBlur={handleBlur('account')}
                value={values.account}
              />
              {errors.account && <Text>{errors.account}</Text>}
              <TextInput
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
              {errors.password && <Text>{errors.password}</Text>} */}
              <Touchable onPress={handleSubmit} style={styles.loginBtn}>
                <Text style={styles.loginBtnText}>Log In</Text>
              </Touchable>
            </View>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logo: {
    color: '#ff4000',
    fontWeight: 'bold',
    fontSize: 50,
    textAlign: 'center',
    marginTop: 40,
  },
  loginBtn: {
    marginTop: 40,
    margin: 10,
    height: 40,
    borderRadius: 20,
    borderColor: '#ff4000',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnText: {
    color: '#ff4000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Login;
