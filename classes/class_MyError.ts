export class MyError extends Error {
    public statusCode?: number;
    public status?: string;
    public message: string;
    //public myMessage: string;
    public stack?: string;

    constructor(message: string, statusCode: number) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}