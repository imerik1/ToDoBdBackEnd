import env from "config/env";
import userRouter from "controllers/UserController";
import express from "express";
import NodeCache from "node-cache";

const app = express();
const PORT = env.PORT;
export const cache = new NodeCache({
	checkperiod: 60,
	stdTTL: 604800,
	deleteOnExpire: true,
	maxKeys: 100,
});

app.use(express.json());
app.use("/users", userRouter);

app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`));

export default app;
