export class ApiResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data?: T;
    error?:any;
    constructor(statusCode: number, success:boolean, message: string ,data?: T,error?:any) {
        this.statusCode = statusCode;
        this.success = statusCode < 400;
        this.message = message;
        this.data = data;
        this.error=error;
    }
}
