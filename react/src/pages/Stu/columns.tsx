import type { ProColumns } from '@ant-design/pro-table';
import moment from 'moment';
import type { StuListItem } from './data';

const defaultColumn: Record<string, ProColumns> = {
  index: {
    title: '序号',
    dataIndex: 'index',
    width: 10,
    search: false,
    fixed: 'left',
    className: 'nowrap',
    renderText: (_: any, record: StuListItem, index: number, action: any): string => {
      return `${(action?.pageInfo?.current - 1) * action?.pageInfo?.pageSize + index + 1}`;
    },
  },
  name: {
    title: '姓名',
    dataIndex: 'name',
    className: 'nowrap',
  },
  nickname: {
    title: '外号',
    search: false,
    dataIndex: 'nickname',
    className: 'nowrap',
  },

  gender: {
    title: '性别',
    dataIndex: 'gender',
    className: 'nowrap',
    search: false,
    renderText: (val: number) => {
      const genderObj = {
        0: '女',
        1: '男',
      };
      return genderObj[val];
    },
  },
  balance: {
    title: '余额(RMB)',
    search: false,
    dataIndex: 'balance',
    className: 'nowrap',
  },

  age: {
    title: '年龄',
    search: false,
    dataIndex: 'age',
    className: 'nowrap',
  },
  pos_name: {
    title: '职位',
    search: false,
    dataIndex: 'pos_name',
    className: 'nowrap',
  },
  level: {
    title: '职级',
    search: false,
    dataIndex: 'level',
    className: 'nowrap',
  },
  hobbies: {
    title: '爱好',
    search: false,
    dataIndex: 'hobbies',
    className: 'nowrap',
  },
  createTime: {
    title: '添加时间',
    search: false,
    dataIndex: 'createTime',
    className: 'nowrap',
    renderText: (val) => moment(val).format('YYYY-MM-DD'),
  },
  option: {
    title: '操作',
    className: 'nowrap',
    dataIndex: 'option',
    search: false,
    fixed: 'right',
    width: 10,
  },
};
export default defaultColumn;
