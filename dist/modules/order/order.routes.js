"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const orderRoute = (0, express_1.Router)();
orderRoute.post("/", order_controller_1.orderController.createOrder);
orderRoute.get("/", order_controller_1.orderController.gateOrders);
exports.default = orderRoute;
