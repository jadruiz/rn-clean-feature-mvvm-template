// src/infrastructure/data/factories/RepositoryFactory.ts
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { DrizzleUserRepository } from '../repositories/DrizzleUserRepository';
import { Config } from '@core/config/environment/EnvConfig';
import { initializeDatabase } from '@infrastructure/storage/Database';

export enum RepositoryType {
  DRIZZLE = 'drizzle',
  WATERMELON = 'watermelon',
  REALM = 'realm',
}

export class RepositoryFactory {

  private static getRepositoryType(): RepositoryType {
    const repoType = Config.get<string>('DB_REPOSITORY_TYPE')?.toLowerCase();
    if (Object.values(RepositoryType).includes(repoType as RepositoryType)) {
      return repoType as RepositoryType;
    }

    console.warn(
      `⚠️ Unknown repository type: "${repoType}". Using default: DRIZZLE.`,
    );
    return RepositoryType.DRIZZLE;
  }

  static async createUserRepository(): Promise<IUserRepository> {
    const dbClient = await initializeDatabase();

    if (!dbClient) {
      throw new Error('❌ Database client initialization failed.');
    }

    switch (this.getRepositoryType()) {
      case RepositoryType.DRIZZLE:
        return new DrizzleUserRepository(dbClient);
      case RepositoryType.WATERMELON:
        throw new Error('🚨 WatermelonDB repository is not yet implemented.');
      case RepositoryType.REALM:
        throw new Error('🚨 Realm repository is not yet implemented.');
      default:
        throw new Error(
          '❌ Invalid repository type. Check DB_REPOSITORY_TYPE in your config.',
        );
    }
  }
}
