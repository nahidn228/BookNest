import { model, Schema } from "mongoose";
import { IOrder, IOrderMethods, IOrderModel } from "./order.interface";
import Mango from "../book/book.model";

const orderAddressSchema = new Schema({
  zipCode: { type: String, required: true },
  street: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
});

const orderSchema = new Schema<IOrder, IOrderModel, IOrderMethods>(
  {
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    mango: { type: Schema.Types.ObjectId, ref: "mango", required: true },
    quantity: { type: Number, min: 0, required: true },
    totalPrice: { type: Number, min: 0 },
    // address: {
    //   zipCode: { type: String, required: true },
    //   street: { type: String, required: true },
    //   state: { type: String, required: true },
    //   country: { type: String, required: true },
    // },
    address: { type: orderAddressSchema, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

orderSchema.pre("save", async function () {
  const mango = await Mango.findById(this.mango);
  if (!mango) {
    throw new Error("Mango not Found");
  }

  this.totalPrice = mango.price * this.quantity;
});

orderSchema.method("checkStock", async function checkStock(id) {
  const order = this as IOrder;
  const product = await Mango.findById(order.mango);
  if (!product) throw new Error("Product Not found");

  if (product.stock < order.quantity) throw new Error("Insufficient stock");

  return true;
});

const Order = model<IOrder, IOrderModel>("Order", orderSchema);

export default Order;
