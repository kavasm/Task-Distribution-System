
export class HandleResponse {
	public handleResponse(response: any): any {
		if (response) {
			console.log(response);
		} else {
			console.log('Hey could not process your request. Please try again :(');
			console.log('\x1b[33m Example:\x1b[0m addTask 1 program.c c:/users/kavya/program.c parametersifany / status taskId / result taskId');
		}
	}
}