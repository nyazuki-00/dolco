import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchController } from './search/search.controller';
import { SearchService } from './search/search.service';
import { MusicModule } from './music/music.module';
import { UserModule } from './user/user.module';
import { Music } from './music/entities/music.entity';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'dolco',
      autoLoadEntities: true,
      entities: [Music, User],
      synchronize: true, // 本番ではfalseにする
    }),
    MusicModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, SearchController],
  providers: [AppService, SearchService, JwtStrategy],
})
export class AppModule {}
