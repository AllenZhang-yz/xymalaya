import React, {memo} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

const Touchable: React.FC<TouchableOpacityProps> = memo((props) => (
  <TouchableOpacity activeOpacity={0.8} {...props} />
));

export default Touchable;
