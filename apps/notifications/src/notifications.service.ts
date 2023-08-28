import { Injectable } from '@nestjs/common';
import { NotifyEmailDTO } from './dto/NotifyEmail.dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}

  private readonly emailEmitterUser = this.configService.get('SMTP_USER');

  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.emailEmitterUser,
      clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
      refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
    },
  });

  async notifyEmail({ email, text }: NotifyEmailDTO) {
    console.log(`Sending email to ${email}`);
    await this.transporter.sendMail({
      from: this.emailEmitterUser,
      to: email,
      subject: 'Sleepr notification',
      text,
    });
  }
}
