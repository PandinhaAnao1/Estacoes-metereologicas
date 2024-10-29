export class APIErro extends Error {
    constructor(code = 400, errors = []) {
        super();
        this.code = code;
        this.errors = errors;
    }
    toJson() {
        return {
            code: this.code,
            errors: this.errors,
        }
    }


}

