import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { cache } from "index";
import HttpStatus from "model/enums/HttpStatus";
import ResponseError from "model/exceptions/ResponseError";
import UserModel from "model/UserModel";
import userRepository from "repositories/UserRepository";

export class UserService {
	private userRepository = userRepository;
	async getAllUser() {
		try {
			if (cache.get("users-all")) return cache.get("users-all");
			const users = await this.userRepository.getAllUser();
			cache.set("users-all", users);
			return users;
		} catch (err) {
			throw err;
		}
	}
	async getUserById(id: string) {
		try {
			if (Number(id) === NaN) {
				throw new ResponseError(HttpStatus.BAD_REQUEST, "Params id invalid.");
			}
			if (cache.get(`user-id-${id}`)) return cache.get(`user-id-${id}`);
			const user = await this.userRepository.getUserById(Number(id));
			if (!user) {
				throw new ResponseError(HttpStatus.NOT_FOUND, "User not found.");
			}
			cache.set(`user-id-${id}`, user);
			return user;
		} catch (err) {
			throw err;
		}
	}
	async createUser(user: UserModel) {
		try {
			await this.userRepository.createUser(user);
			cache.del("users-all");
		} catch (err) {
			if (err instanceof PrismaClientKnownRequestError) {
				if (err.code === "P2002")
					return new ResponseError(
						HttpStatus.BAD_REQUEST,
						`User already exists.`
					);
			}
			return err;
		}
	}
	async updateUser(fields: { [key: string]: any }, id: string) {
		try {
			if (Number(id) === NaN) {
				throw new ResponseError(HttpStatus.BAD_REQUEST, "Params id invalid.");
			}
			const user = await this.userRepository.getUserById(Number(id));
			if (!user) {
				throw new ResponseError(HttpStatus.NOT_FOUND, "User not found.");
			}
			await this.userRepository.updateUser(fields, Number(id));
			cache.del("users-all");
			cache.del(`user-id-${id}`);
		} catch (err) {
			throw err;
		}
	}
}

const userService = new UserService();

export default userService;
