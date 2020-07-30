export class FetchError extends Error {
  constructor(response, ...params) {
    super(params)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError)
    }
    this.name = 'FetchError'
    this.response = response
  }

  toJSON() {
    return {
      error: {
        name: this.name,
        message: this.message,
        stacktrace: this.stack,
      },
    }
  }
}
