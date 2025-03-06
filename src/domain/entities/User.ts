// src/domain/entities/User.ts
export type UserStatus = 'pending_verification' | 'active' | 'inactive';

export interface NewUserData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  maternalName?: string;
}

export class UserEntity {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  maternalName?: string;
  status: UserStatus;
  createdAt: number;
  updatedAt: number;
  lastLoginAt?: number;

  constructor(data: {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    maternalName?: string;
    status: UserStatus;
    createdAt: number;
    updatedAt: number;
    lastLoginAt?: number;
  }) {
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.maternalName = data.maternalName;
    this.status = data.status;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.lastLoginAt = data.lastLoginAt;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
