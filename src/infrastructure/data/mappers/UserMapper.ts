// src/infrastructure/data/mappers/UserMapper.ts
import { User, UserStatus } from '@domain/entities/User';

/**
 * Mapper para convertir entre DTOs de la base de datos y la entidad de dominio User.
 */
export class UserMapper {
  /**
   * Convierte un objeto proveniente de la base de datos en una instancia de User.
   */
  toDomain(dbUser: any): User {
    return new User({
      id: dbUser.id,
      username: dbUser.username,
      password: dbUser.password,
      firstName: dbUser.first_name,
      lastName: dbUser.last_name,
      maternalName: dbUser.maternal_name || undefined,
      status: dbUser.status as UserStatus,
      createdAt: new Date(dbUser.created_at),
      updatedAt: new Date(dbUser.updated_at),
      lastLoginAt: dbUser.last_login_at ? new Date(dbUser.last_login_at) : undefined,
    });
  }

  /**
   * Convierte una instancia de User a un objeto para persistir en la base de datos.
   */
  toPersistence(user: User): any {
    return {
      id: user.id,
      username: user.username,
      password: user.password,
      first_name: user.firstName,
      last_name: user.lastName,
      maternal_name: user.maternalName,
      status: user.status,
      created_at: user.createdAt.getTime(),
      updated_at: user.updatedAt.getTime(),
      last_login_at: user.lastLoginAt?.getTime(),
    };
  }
}
