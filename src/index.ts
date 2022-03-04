import env from "config/env";
import express from "express";

const app = express();
const PORT = env.PORT;

app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`));

export default app;
