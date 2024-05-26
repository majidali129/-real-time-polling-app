export class apiError extends Error{
    constructor(statusCode, message, stack) {
        super(message);
        this.statusCode = statusCode;
        this.success = statusCode < 400;
        this.message = message;
        this.data = {};

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor )
        }
    }
}