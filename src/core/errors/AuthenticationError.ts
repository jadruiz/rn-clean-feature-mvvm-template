// src/core/errors/AuthenticationError.ts
export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
    // Establece el prototipo explícitamente para mantener la instancia de la clase
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}
