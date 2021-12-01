import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Modal, Button, Form, message } from 'antd';
import produce from 'immer';
import _values from 'lodash/values';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import CommonTable from '@/components/CommonTable';
import ActionList from '@/components/ActionList';
import BaseModal from '@/components/BaseModal';
import useTableRequest from '@/hooks/useTableRequest';
import { HandleTypeEnum, HandleTypeEnumMap } from '@/enum';
import { findStuList, delStuItem, getTransferInfo,transferToOther, updateItem } from '@/services/stu';
import FormItems from './components/FormItems';
import TransferFormItems from './components/TransferFormItems';
import defaultColumns from './columns';
import type { StuListItem, TransferInfo } from './data';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const Index: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<number>(HandleTypeEnum.Add);
  const [currId, setCurrId] = useState<number | undefined>(undefined);
  const [transferInfo, setTransferInfo] = useState<TransferInfo>({ list: [], balance: 0 });
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();

  const resetMethod = () => {
    form.resetFields();
    setVisible(false);
    setCurrId(undefined);
  };

  useEffect(() => {
    if (type === HandleTypeEnum.Transfer && currId) {
      getTransferInfo({ id: currId }).then(({ success, data }) => {
        if (success) {
          setTransferInfo(data);
        }
      });
    }
  }, [type, currId]);

  const onHandleClick = (handleType: number, record?: StuListItem) => {
    setVisible(true);
    setType(handleType);
    switch (handleType) {
      // 新增
      case HandleTypeEnum.Add:
        form.resetFields();
        break;
      // 编辑
      case HandleTypeEnum.Edit:
        setCurrId(record?.id);
        form.setFieldsValue({
          ...record,
        });
        break;
      // 转账
      default:
        setCurrId(record?.id);
        break;
    }
  };

  // 删除
  const onDelClick = useCallback((record: StuListItem) => {
    Modal.confirm({
      title: '删除提示',
      icon: <ExclamationCircleOutlined />,
      content: '您确认删除该条数据？',
      okType: 'danger',
      onOk: () => {
        delStuItem({ id: record.id }).then(({ success }) => {
          if (success) {
            message.success('删除成功!');
            actionRef.current?.reload();
          }
        });
      },
    });
  }, []);

  // 弹窗确定
  const handleOk = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const params = {
        ...values,
      };
      switch (type) {
        case HandleTypeEnum.Add:
          {
            const { success } = await updateItem(params);
            if (success) {
              message.success('添加成功');
              resetMethod();
              actionRef.current?.reload();
            }
          }
          break;
        case HandleTypeEnum.Edit:
          {
            params.id = currId;
            const { success } = await updateItem(params);
            if (success) {
              message.success('编辑成功');
              resetMethod();
              actionRef.current?.reload();
            }
          }
          break;

        default:
             {
               params.id = currId;
               const { success } = await transferToOther(params);
               if (success) {
                 message.success('转账成功');
                 resetMethod();
                 actionRef.current?.reload();
               }
             }
          break;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const columns = useMemo(
    () =>
      _values(
        produce(defaultColumns, (draft) => {
          draft.option.render = (_: any, record: StuListItem) => (
            <ActionList
              actions={[
                <a onClick={() => onHandleClick(HandleTypeEnum.Transfer, record)}>转账</a>,
                <a onClick={() => onHandleClick(HandleTypeEnum.Edit, record)}>编辑</a>,
                <a onClick={() => onDelClick(record)}>删除</a>,
              ]}
            />
          );
        }),
      ),
    [],
  );

  const queryList = useTableRequest(findStuList, (params) => ({
    ...params,
  }));

  return (
    <PageHeaderWrapper>
      <CommonTable
        actionRef={actionRef}
        request={queryList}
        columns={columns}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => onHandleClick(HandleTypeEnum.Add)}>
            新增
          </Button>,
        ]}
      />
      <BaseModal
        title={HandleTypeEnumMap[type]}
        visible={visible}
        onOk={handleOk}
        onCancel={resetMethod}
        confirmLoading={loading}
      >
        <Form form={form}>
          {type === HandleTypeEnum.Transfer ? (
            <TransferFormItems transferInfo={transferInfo} />
          ) : (
            <FormItems />
          )}
        </Form>
      </BaseModal>
    </PageHeaderWrapper>
  );
};

export default Index;
