"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_model_1 = __importDefault(require("./order.model"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const order = await Order.create(req.body);
        const order = new order_model_1.default(req.body);
        const orderStock = order.checkStock(req.body.mango);
        if (!orderStock)
            throw new Error("Insufficient Stock");
        yield order.save();
        res.send({
            success: true,
            message: "order placed successful",
            order,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: "order place Unsuccessful",
            error,
        });
    }
});
const gateOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_model_1.default.find().populate("user").populate("mango");
        res.send({
            success: true,
            message: "order getting successful",
            order,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: "order getting Unsuccessful",
            error,
        });
    }
});
exports.orderController = {
    createOrder,
    gateOrders,
};
