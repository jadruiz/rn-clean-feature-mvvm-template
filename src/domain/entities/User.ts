// src/domain/entities/User.ts
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending_verification';

export interface NewUserData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  maternalName?: string;
  status: UserStatus;
}

export class User {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  maternalName?: string;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;

  constructor(params: {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    maternalName?: string;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
    lastLoginAt?: Date;
  }) {
    this.id = params.id;
    this.username = params.username;
    this.password = params.password;
    this.firstName = params.firstName;
    this.lastName = params.lastName;
    this.maternalName = params.maternalName;
    this.status = params.status;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.lastLoginAt = params.lastLoginAt;
  }

  /**
   * Devuelve el nombre completo del usuario.
   */
  getFullName(): string {
    return `${this.firstName} ${this.lastName}${this.maternalName ? ` ${this.maternalName}` : ''}`;
  }

  /**
   * Indica si la cuenta está activa.
   */
  isActive(): boolean {
    return this.status === 'active';
  }
}
