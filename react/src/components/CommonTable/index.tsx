import React, { useState, useCallback } from 'react';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import ProTable from '@ant-design/pro-table';
import type { ProTableProps } from '@ant-design/pro-table';

export type CommonTableProps<T, U> = ProTableProps<T, U>;

const scroll: { x: string } = { x: 'max-content' };

const CommonTable = <T, U extends Record<string, any> = {}>(props: CommonTableProps<T, U>) => {
  const [size, setSize] = useState<SizeType>('middle');

  const handleSizeChange = useCallback((s: SizeType) => setSize(s), []);

  return (
    <ProTable
      scroll={scroll}
      rowKey="id"
      tableAlertRender={false}
      rowSelection={false}
      columnEmptyText="--"
      size={size}
      onSizeChange={handleSizeChange}
      {...props}
    />
  );
};

const MemodCommonTable = React.memo(CommonTable) as typeof CommonTable;

export default MemodCommonTable;
