
export type StuListItem = {
  id: number;
  name: string;
  nickname: string;
  gender: number;
  hobbies?: string;
};
export type TransferObj = {
  id: number;
  name: string;
}
export type TransferInfo = {
  list: TransferObj[];
  balance: number;
};
