import React from 'react';
import { Modal } from 'antd';
import type { ModalProps } from 'antd/lib/modal';

type TypeProps = {
  children: React.ReactNode;
} & ModalProps;

const Index: React.FC<TypeProps> = ({ children, ...rest }) => {
  return (
    <Modal maskClosable={false} {...rest}>
      {children}
    </Modal>
  );
};

export default React.memo(Index);
