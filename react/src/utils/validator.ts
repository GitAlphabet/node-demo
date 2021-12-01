export default class ValidatorUtils {
  // 手机号正则
  private static REGEXP_PHONE_NUMBER = /^(\+?0?86-?)?1[3456789]\d{9}$/;

  /**
   * 验证是否为手机号码
   * @param phoneNumber 检测的字符串
   */
  public isMobilePhone(phoneNumber: string): boolean {
    return ValidatorUtils.REGEXP_PHONE_NUMBER.test(phoneNumber);
  }
}
