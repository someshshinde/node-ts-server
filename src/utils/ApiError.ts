class ApiError extends Error {
    public statusCode: number;
   
    public data: null | any;
    public errors: any[];
    public success: boolean;

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        errors: any[] = [],
        stack: string = "",
        name: string = "ApiError"
    ) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.data = null;
        this.errors = errors;
        this.success = false;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };