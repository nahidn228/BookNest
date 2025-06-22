import { Model, Types } from "mongoose";

export interface IOrder {
  user: Types.ObjectId;
  mango: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  status: string;
  address: {
    zipCode: string;
    street: string;
    state: string;
    country: string;
  };
}

export interface IOrderMethods {
  checkStock(id: string): Promise<any>;
}
export interface IOrderModel extends Model<IOrder, {}, IOrderMethods> {}
