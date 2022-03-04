import dotenv from "dotenv";

//C:\Users\emarques\Desktop\todo-backend\src\config

dotenv.config({
	path: `${__dirname.replace("\\src\\config", "")}\\.env`,
});

export default {
	PORT: process.env.PORT || 5000,
};
