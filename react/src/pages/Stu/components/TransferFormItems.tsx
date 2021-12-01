import React from 'react';
import { Form, InputNumber, Select } from 'antd';
import type { TransferInfo, TransferObj } from '../data';

type TransferFormItemsProps = {
  transferInfo: TransferInfo;
};

const { Option } = Select;

const Index: React.FC<TransferFormItemsProps> = ({ transferInfo }) => {
  return (
    <>
      <Form.Item
        name="debit"
        label="借方姓名"
        rules={[
          {
            required: true,
            message: '请选择借方姓名',
          },
        ]}
      >
        <Select placeholder="请选择借方姓名">
          {transferInfo?.list?.map((d: TransferObj) => (
            <Option value={d.id} key={d.id}>
              {d.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="balance"
        label="转账金额"
        rules={[
          {
            required: true,
            message: '请输入转账金额',
          },
        ]}
      >
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          max={transferInfo?.balance}
          precision={2}
          placeholder="请输入转账金额"
        />
      </Form.Item>
    </>
  );
};

export default Index;
