// src/domain/entities/User.ts
export interface User {
  id: string;
  username: string;
  password?: string;
  token: string;
  timestamp: number;
}
