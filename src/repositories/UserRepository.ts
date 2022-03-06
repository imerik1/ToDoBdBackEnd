import { PrismaClient } from "@prisma/client";
import UserModel from "model/UserModel";

class UserRepository {
	private prisma = new PrismaClient();
	async getAllUser() {
		const users = await this.prisma.user.findMany({
			include: {
				tasks: true,
			},
		});
		return users;
	}
	async getUserById(id: number) {
		const user = await this.prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				tasks: true,
			},
		});
		return user;
	}
	async createUser(user: UserModel) {
		await this.prisma.user.create({
			data: user,
		});
	}
	async updateUser(params: { [key: string]: any }, id: number) {
		await this.prisma.user.update({
			where: {
				id: id,
			},
			data: params,
		});
	}
}

const userRepository = new UserRepository();

export default userRepository;
