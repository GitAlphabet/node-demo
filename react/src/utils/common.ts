import moment from 'moment';
import _forEach from 'lodash/forEach';
import type { Moment } from 'moment';
import type { EnumListType } from '@/interface';

/**
 * a 标签下载
 * @param {string} url   完整地址
 * @param {string} fileName  文件名称
 */
export const aDownload = (url: string, fileName?: string): void => {
  const link = document.createElement('a');
  link.setAttribute('target', '_blank');
  link.setAttribute('href', url);
  if (fileName) {
    link.setAttribute('download', fileName);
  }
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
/**
 * blob 文件下载
 * @param {string} url   完整地址
 * @param {string} fileName  文件名称
 */
export const blobDownLoad = (res: any, fileName?: string) => {
  const blob = new Blob([res]);
  const url = window.URL.createObjectURL(blob);
  aDownload(url, fileName);
  window.URL.revokeObjectURL(url);
};

/**
 * moment 格式化为字符串
 * @param {any} value moment 时间
 * @param {string} formatType  格式化的类型
 * @returns {string} 格式化的时间
 */
export const formatMomentToStr = (value: Moment | string, formatType: string = 'YYYY-MM-DD') => {
  return moment(value).format(formatType);
};

/**
 * 字符串格式化为 moment
 * @param {any} value string
 * @returns {string} 格式化的时间
 */
export const formatStrToMoment = (value: string) => {
  return moment(value);
};

/**
 * 格式化枚举
 * @param {array} list 数组
 * @param {string} valueKey value对应的key
 * @param {string} labelKey label对应的key
 * @returns 符合select组件列表
 */
export const formatOptionList = (
  list: Record<string, any>[] = [],
  valueKey: string = 'key',
  labelKey: string = 'value',
) =>
  list.map((item: any) => ({
    value: item[valueKey],
    label: item[labelKey],
  }));

/**
 * 图表的 y 轴根据数据动态设置最大值、最小值
 * @param {number} value  最大值 / 最小值
 * @param {boolean} flag true 最大值， false 最小值
 * @returns {number} 最大值/最小值
 */
export const calcMaxAndMin = (value: number = 0, flag: boolean = true): number => {
  if (!value) {
    return 0;
  }
  const harfLen = Math.ceil(String(value.toFixed(0)).length / 2);
  if (flag) {
    return Math.ceil((value + 10 ** harfLen) / 10 ** harfLen) * 10 ** harfLen;
  }
  return Math.floor((value - 10 ** harfLen) / 10 ** harfLen) * 10 ** harfLen;
};

/**
 * 格式化表格的查询列表的枚举
 * @param {EnumListType[]} data  元数据
 * @returns {object}   // 返回的枚举
 */
export const formatEnum = (data: EnumListType[]) => {
  const valueEnum = {};
  _forEach(data, (item: EnumListType) => {
    valueEnum[item.key] = item.label;
  });
  return valueEnum;
};
