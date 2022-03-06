import HttpStatus from "./enums/HttpStatus";
import ResponseError from "./exceptions/ResponseError";

class UserModel {
	constructor(
		public nickname: string,
		public email: string,
		public password: string,
		public thumbnail: string
	) {
		Object.entries(this).forEach(([key, value]) => {
			if (!value) {
				throw new ResponseError(
					HttpStatus.CONFLICT,
					`The field ${key} cannot be empty.`
				);
			}
		});
		if (email && !this.validateEmail(email)) {
			throw new ResponseError(
				HttpStatus.CONFLICT,
				`The e-mail ${email} is invalid.`
			);
		}
	}

	validateEmail(email: string): boolean {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			return true;
		}
		return false;
	}
}

export default UserModel;
