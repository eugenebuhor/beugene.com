export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message || 'Resource not found');
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends Error {
  constructor(message?: string) {
    super(message || 'Validation error');
    this.name = 'ValidationError';
  }
}

export class InternalError extends Error {
  constructor(message?: string) {
    super(message || 'Internal error');
    this.name = 'InternalError';
  }
}
