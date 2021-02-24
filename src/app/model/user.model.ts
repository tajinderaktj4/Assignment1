export class User {
    constructor(
        private email: string,
        private token: string,
        private localId: string
    ) { }
    getEmail(): string {
        return this.email;
    }
}
