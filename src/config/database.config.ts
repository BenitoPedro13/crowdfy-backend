import { registerAs } from '@nestjs/config';
import { Campaign } from 'src/graphql/models/Campaign';
import { User } from 'src/graphql/models/User';
import { DataSource, DataSourceOptions } from 'typeorm';

export const getDatabaseConfig = (): DataSourceOptions => {
  if (process.env.NODE_ENV === 'development') {
    return {
      type: 'postgres',
      host: process.env.LOCAL_DATABASE_HOST,
      port: parseInt(process.env.LOCAL_DATABASE_PORT as string, 10) || 5432,
      username: process.env.LOCAL_DATABASE_USERNAME,
      password: process.env.LOCAL_DATABASE_PASSWORD,
      database: process.env.LOCAL_DATABASE_NAME,
      entities: [User, Campaign],
      synchronize: true,
      logging: process.env.LOCAL_DATABASE_LOGGING === 'true',
      poolErrorHandler: (err) => {
        console.error('Pool Error Handler', err);
      },
    };
  }

  return {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT as string, 10) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, Campaign],
    synchronize: false,
    logging: process.env.DATABASE_LOGGING === 'true',
    extra: {
      poolSize: 200,
      connectionTimeoutMillis: 5000,
    },
    poolErrorHandler: (err) => {
      console.error('Pool Error Handler', err);
    },
  };
};

export const databaseConfigFactory = registerAs('database', getDatabaseConfig);

let connectionReadyPromise: Promise<DataSource | null> | null = null;

export const prepareConnection = async () => {
  if (connectionReadyPromise) {
    const connection = await connectionReadyPromise;

    if (connection?.isInitialized) {
      return connectionReadyPromise;
    }
  }

  connectionReadyPromise = (async () => {
    let connection: DataSource | null = null;
    try {
      const dataSource = new DataSource(getDatabaseConfig());

      await dataSource.destroy();

      connection = await dataSource.initialize();
    } catch (error) {
      console.error('Error establishing connection:', error);
    }
    return connection;
  })();

  return connectionReadyPromise;
};
