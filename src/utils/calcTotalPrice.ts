import { addItem } from "../redux/slices/cardSlice";

export const calcTotalPrice = (addItem: []) => {
  return addItem.reduce((sum: any, obj: any) => obj.price * obj.count + sum, 0);
};
