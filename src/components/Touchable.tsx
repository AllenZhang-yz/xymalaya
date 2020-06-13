import React, {memo} from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';

const Touchable: React.FC<TouchableOpacityProps> = memo(
  ({style, ...restProps}) => {
    const touchableStyle = restProps.disabled
      ? [style, styles.disabled]
      : style;
    return (
      <TouchableOpacity
        style={touchableStyle}
        activeOpacity={0.8}
        {...restProps}
      />
    );
  },
);
const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});
export default Touchable;
