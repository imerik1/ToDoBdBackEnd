import HttpStatus from "model/enums/HttpStatus";

export class ResponseError {
	constructor(public httpStatus: HttpStatus, public message: string) {}
}

export default ResponseError;
