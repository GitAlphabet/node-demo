import { useCallback } from 'react';
import { transformDataToProTable } from '@/utils/request';

const useTableRequest = (
  dataLoader?: (params: any) => Promise<any>,
  getParams?: (params: any) => any,
) => {
  const request = useCallback(
    async (params: any) => {
      const newParams = {
        ...params,
        pageNo: params.current,
        ...getParams?.(params),
        current: undefined,
      };
      let result: any = await dataLoader?.(newParams);
      if (result?.data?.list.length === 0 && newParams.pageNo > 1) {
        result = await dataLoader?.({ ...newParams, pageNo: newParams.pageNo - 1 });
      }
      const transformedResult = transformDataToProTable(result);
      return Promise.resolve(transformedResult);
    },
    [dataLoader],
  );
  return request;
};

export default useTableRequest;
