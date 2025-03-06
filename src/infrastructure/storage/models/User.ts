// src/infrastructure/storage/models/User.ts
import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class User extends Model {
  static table = 'users';

  @field('username') username!: string;
  @field('password') password!: string;
  @field('first_name') firstName!: string;
  @field('last_name') lastName!: string;
  @field('maternal_name') maternalName?: string;
  @field('status') status!: string;
  @field('created_at') createdAt!: number;
  @field('updated_at') updatedAt!: number;
  @field('last_login_at') lastLoginAt?: number | null;

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
