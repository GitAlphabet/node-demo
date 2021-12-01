import { useEffect, useReducer } from 'react';

export interface IDataLoader {
  (): Promise<any>;
}

export interface StateType<T> {
  isLoading: boolean;
  isError: boolean;
  data: T;
  timestamp: number;
}

export type ActionType<T> =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: StateType<T> }
  | { type: 'FETCH_FAILURE' }
  | { type: 'UPDATE_DATA'; payload: StateType<T> };

const dataFetchReducer =
  <T>() =>
  (state: StateType<T>, action: ActionType<T>): StateType<T> => {
    switch (action.type) {
      case 'FETCH_INIT':
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload.data,
          timestamp: action.payload.timestamp,
        };
      case 'FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case 'UPDATE_DATA':
        return {
          ...state,
          data: action.payload.data,
          timestamp: action.payload.timestamp,
        };
      default:
        throw new Error();
    }
  };

const useData = <T>(dataLoader: IDataLoader | null, initialData: T) => {
  // 或者下面方式使用泛型
  // useReducer<Reducer<StateType<T>, ActionType<T>>>
  const [state, dispatch] = useReducer(dataFetchReducer<T>(), {
    isLoading: true,
    isError: false,
    data: initialData,
    timestamp: -1,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await dataLoader!();

        if (!didCancel) {
          if (!result.code) {
            dispatch({ type: 'FETCH_SUCCESS', payload: result });
          } else {
            dispatch({ type: 'FETCH_FAILURE' });
          }
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    if (dataLoader !== null && dataLoader !== undefined) {
      fetchData();
    }
    return () => {
      didCancel = true;
    };
  }, [dataLoader]);

  return { ...state, dispatch };
};

export default useData;
