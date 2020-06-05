import React from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';
import {RootState} from '@/models/index';

interface IHeaderRightBtnProps {
  onSubmit: () => void;
}

const HeaderRightBtn: React.FC<IHeaderRightBtnProps> = ({onSubmit}) => {
  const isEdit = useSelector<RootState, boolean>(
    (state) => state.category.isEdit,
  );
  return (
    <HeaderButtons>
      <Item title={isEdit ? 'Done' : 'Edit'} onPress={onSubmit} />
    </HeaderButtons>
  );
};

export default HeaderRightBtn;
