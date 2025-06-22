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
const mongoose_1 = require("mongoose");
const book_model_1 = __importDefault(require("../book/book.model"));
const orderAddressSchema = new mongoose_1.Schema({
    zipCode: { type: String, required: true },
    street: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
});
const orderSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "user", required: true },
    mango: { type: mongoose_1.Schema.Types.ObjectId, ref: "mango", required: true },
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
}, { timestamps: true });
orderSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const mango = yield book_model_1.default.findById(this.mango);
        if (!mango) {
            throw new Error("Mango not Found");
        }
        this.totalPrice = mango.price * this.quantity;
    });
});
orderSchema.method("checkStock", function checkStock(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = this;
        const product = yield book_model_1.default.findById(order.mango);
        if (!product)
            throw new Error("Product Not found");
        if (product.stock < order.quantity)
            throw new Error("Insufficient stock");
        return true;
    });
});
const Order = (0, mongoose_1.model)("Order", orderSchema);
exports.default = Order;
