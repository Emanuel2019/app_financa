// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';

// @Module({
//   imports: [
//     PassportModule,
//     JwtModule.register({
//       secret: process.env.JWT_SECRET || 'default-secret',
//       signOptions: { expiresIn: '1h' },
//     }),
//   ],
//   providers: [AuthService],
//   controllers: [AuthController],
// })
// export class AuthModule {}


import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constant';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
