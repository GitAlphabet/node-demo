import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import welcomeImg from '@/assets/img/welcome.png';

const Index: React.FC = () => {
  return (
    <PageHeaderWrapper>
      <div
        style={{
          background: `url(${welcomeImg}) center no-repeat`,
          height: 600,
          width: '100%',
        }}
      ></div>
    </PageHeaderWrapper>
  );
};

export default Index;
