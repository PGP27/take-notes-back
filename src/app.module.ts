import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { NoteModule } from './modules/note/note.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(process.env.STRING_CONNECTION),
    AuthModule,
    UserModule,
    NoteModule,
  ],
})
export class AppModule {}
