import { Router } from "express";
import userRouts from "../user/user.routs";

import orderRoute from "../order/order.routes";
import bookRoutes from "../book/book.routes";

const routes = Router();

routes.use("/api", userRouts);
routes.use("/api", bookRoutes);
routes.use("/api", orderRoute);

export default routes;
