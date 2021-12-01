import React from 'react';
import { Form, Input, InputNumber, Select } from 'antd';

const { Option } = Select;

const Index: React.FC = () => {
  return (
    <>
      <Form.Item
        name="name"
        label="姓名"
        rules={[
          {
            required: true,
            message: '请输入姓名',
          }
        ]}
      >
        <Input maxLength={15} placeholder="请输入姓名" />
      </Form.Item>
      <Form.Item
        name="nickname"
        label="外号"
        rules={[
          {
            required: true,
            message: '请输入外号',
          },
        ]}
      >
        <Input maxLength={15} placeholder="请输入外号" />
      </Form.Item>
      <Form.Item
        name="gender"
        label="性别"
        rules={[
          {
            required: true,
            message: '请选择性别',
          },
        ]}
      >
        <Select placeholder="请选择性别">
          <Option value={0}>女</Option>
          <Option value={1}>男</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="age"
        label="年龄"
        rules={[
          {
            required: true,
            message: '请输入年龄',
          },
        ]}
      >
        <InputNumber style={{ width: '100%' }} min={0} max={140} placeholder="请输入年龄" />
      </Form.Item>
      <Form.Item
        name="pos_name"
        label="职位"
        rules={[
          {
            required: true,
            message: '请输入职位',
          },
        ]}
      >
        <Input maxLength={15} placeholder="请输入职位" />
      </Form.Item>
      <Form.Item
        name="level"
        label="职级"
        rules={[
          {
            required: true,
            message: '请输入职级',
          },
        ]}
      >
        <InputNumber style={{ width: '100%' }} max={10} min={0} placeholder="请输入职级" />
      </Form.Item>
      <Form.Item
        name="hobbies"
        label="爱好"
        rules={[
          {
            required: true,
            message: '请输入爱好',
          },
        ]}
      >
        <Input.TextArea maxLength={50} rows={4} placeholder="请输入爱好" />
      </Form.Item>
    </>
  );
};

export default Index;
