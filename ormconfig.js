module.exports = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: ['dist/modules/**/infra/database/*.entity.js'],
    migrations: ['./src/shared/migrations/*.ts'],
    cli: {
      migrationsDir: './src/shared/migrations',
    },
    synchronize: process.env.DB_SYNC == 'true',
    ...(process.env.ISLOCALHOST === 'false' && {
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        },
      },
    }),
  };