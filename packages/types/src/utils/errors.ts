export class FetchError extends Error {
  data?: unknown;
  status: number;
  cause?: unknown;

  constructor(
    message: string,
    status: number,
    cause?: unknown,
    data?: unknown
  ) {
    super(message);
    this.cause = cause;
    this.status = status;
    this.data = data;
    this.name = "FetchError";
  }
}

export class ValidationError extends Error {
  data?: unknown;
  cause?: unknown;
  constructor(message: string, cause?: unknown, data?: unknown) {
    super(message);
    this.cause = cause;
    this.data = data;
    this.name = "ValidationError";
  }
}

// SessionError

export class SessionError extends Error {
  cause?: unknown;

  constructor(message: string, cause?: unknown) {
    super(message);
    this.cause = cause;
    this.name = "SessionError";
  }
}
