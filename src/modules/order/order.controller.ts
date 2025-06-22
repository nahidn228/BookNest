import { Request, Response } from "express";
import Order from "./order.model";

const createOrder = async (req: Request, res: Response) => {
  try {
    // const order = await Order.create(req.body);

    const order = new Order(req.body);
    const orderStock = order.checkStock(req.body.mango);
    if (!orderStock) throw new Error("Insufficient Stock");

    await order.save();

    res.send({
      success: true,
      message: "order placed successful",
      order,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "order place Unsuccessful",
      error,
    });
  }
};
const gateOrders = async (req: Request, res: Response) => {
  try {
    const order = await Order.find().populate("user").populate("mango");
    res.send({
      success: true,
      message: "order getting successful",
      order,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "order getting Unsuccessful",
      error,
    });
  }
};

export const orderController = {
  createOrder,
  gateOrders,
};
