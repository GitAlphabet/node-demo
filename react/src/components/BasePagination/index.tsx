import React from 'react';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd/lib/pagination';
import styles from './index.less';

const Index: React.FC<PaginationProps> = ({ current, pageSize, total, ...restProps }) => {
  const showTotal = (totalCount: number) => {
    return `第${((current as number) - 1) * (pageSize as number) + 1}-${
      (current as number) * (pageSize as number)
    }条/总共${totalCount}条`;
  };
  return (
    <div className={styles.wrapper}>
      <Pagination
        size="small"
        total={total || 0}
        showTotal={showTotal}
        showSizeChanger
        current={current}
        pageSize={pageSize}
        pageSizeOptions={['10', '20', '50']}
        {...restProps}
      />
    </div>
  );
};

export default React.memo(Index);
