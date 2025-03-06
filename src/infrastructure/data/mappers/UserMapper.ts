// src/infrastructure/data/mappers/UserMapper.ts
import { UserEntity } from '@domain/entities/User';
import WatermelonUser from '@infrastructure/storage/models/User';

export class UserMapper {
  static toEntity(user: WatermelonUser): UserEntity {
    return new UserEntity({
      id: user.id,
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      maternalName: user.maternalName,
      status: user.status as any,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLoginAt: user.lastLoginAt || undefined,
    });
  }
}
