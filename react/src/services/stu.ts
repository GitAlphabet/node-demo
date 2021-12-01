import request from '@/utils/request';

// 列表
export async function findStuList(params?: any) {
  return request('/api/stu/list', {
    params,
  });
}

// 删除
export async function delStuItem(params?: any) {
  return request('/api/stu/del', {
    params,
  });
}

// 添加/更新
export async function updateItem(params?: any) {
  return request('/api/stu/update', {
    method:"POST",
    data:params,
  });
}

// 获取详情
export async function getStuItemDetail(params?: any) {
  return request('/api/stu/getDetail', {
    params,
  });
}

// 获取转账信息
export async function getTransferInfo(params: any) {
  return request('/api/stu/getTransferInfo', {
    params,
  });
}
// 转账
export async function transferToOther(params: any) {
  return request('/api/stu/transferToOther', {
    method: 'POST',
    data: params,
  });
}
