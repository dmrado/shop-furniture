export class UnauthorizedError extends Error {
    status = 401
    constructor(message = 'Not authenticated') {
        super(message)
        this.name = 'UnauthorizedError'
    }
}