import { Router } from "express";
import HttpStatus from "model/enums/HttpStatus";
import ResponseError from "model/exceptions/ResponseError";
import UserModel from "model/UserModel";
import userService from "services/UserService";

export class UserController {
	public router = Router();
	public service = userService;
}

const userController = new UserController();
const userRouter = userController.router;

userRouter.get("/", async (req, res) => {
	try {
		const users = await userController.service.getAllUser();
		return res.status(HttpStatus.OK).json(users);
	} catch (err) {
		console.error(`ERROR: ${(err as any).message}`);
		if (err instanceof ResponseError) {
			return res.status(err.httpStatus).json({ error: err.message });
		}
		return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json();
	}
});

userRouter.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const user = await userController.service.getUserById(id);
		return res.status(HttpStatus.OK).json(user);
	} catch (err) {
		console.error(err);
		if (err instanceof ResponseError) {
			return res.status(err.httpStatus).json({ error: err.message });
		}
		const e = err as Error;
		return res
			.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.json({ error: e.message });
	}
});

userRouter.post("/", async (req, res) => {
	try {
		const { nickname, email, password, thumbnail } = req.body as UserModel;
		const user = new UserModel(nickname, email, password, thumbnail);
		await userController.service.createUser(user);
		return res.status(HttpStatus.CREATED).json();
	} catch (err) {
		console.error(err);
		if (err instanceof ResponseError) {
			return res.status(err.httpStatus).json({ error: err.message });
		}
		const e = err as Error;
		return res
			.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.json({ error: e.message });
	}
});

userRouter.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await userController.service.updateUser(req.body, id);
		return res.status(HttpStatus.NO_CONTENT).json();
	} catch (err) {
		console.error(err);
		if (err instanceof ResponseError) {
			return res.status(err.httpStatus).json({ error: err.message });
		}
		const e = err as Error;
		return res
			.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.json({ error: e.message });
	}
});

export default userRouter;
