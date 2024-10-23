export class APIErro extends Error {
    constructor(code = 400, errors = undefined) {
        this.code = code;
        this.errors = errors;
    }
    toJson() {
        return {
            code: this.code,
            errors: this.errors ?? [],
        }
    }

    get getErrors() {
        return this.errors ?? [];
    }

    get getCode() {
        return this.errors ?? [];
    }
}

