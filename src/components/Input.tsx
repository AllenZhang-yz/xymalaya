import React, {FC} from 'react';
import {View, TextInput, Text, TextInputProps, StyleSheet} from 'react-native';
import {FieldInputProps, FormikProps} from 'formik';

interface IProps extends TextInputProps {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
}

const Input: FC<IProps> = ({form, field, ...rest}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        {...rest}
        onChangeText={form.handleChange(field.name)}
        onBlur={form.handleBlur(field.name)}
        value={form.values[field.name]}
      />
      <View>
        <Text style={styles.error}>
          {form.touched[field.name] && form.errors[field.name]}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    marginTop: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  error: {
    position: 'absolute',
    color: 'red',
    marginTop: 5,
    marginLeft: 10,
    fontSize: 12,
  },
});

export default Input;
