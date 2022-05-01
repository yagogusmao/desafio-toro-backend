import { Module } from '@nestjs/common';
import { getConnectionOptions } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@modules/user/user.module';
import { TransferModule } from '@modules/transfer/transfer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    UserModule,
    TransferModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
