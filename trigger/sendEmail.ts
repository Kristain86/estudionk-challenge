import { logger, task } from '@trigger.dev/sdk/v3';
import { Resend } from 'resend';

const resend = new Resend('re_H46Rzkfc_8b2P7oGg2NVNJDE5rs7RCYnU');

export const sendEmailTask = task({
  id: 'send-email',
  maxDuration: 300,
  retry: {
    maxAttempts: 3,
    factor: 2,
    minTimeoutInMs: 1000,
    maxTimeoutInMs: 10000,
  },
  run: async (payload: any, { ctx }) => {
    try {
      logger.log('Sending email...', { payload, ctx });

      const { name, email } = payload;

      const data = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: `Hi ${name}!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333;">Your Journey Begins Here 🎉</h1>
            <p style="color: #666; font-size: 16px; line-height: 1.5;">
              Thank you for subscribing to our newsletter! We're excited to have you join our community.
            </p>
            <p style="color: #666; font-size: 16px; line-height: 1.5;">
              Stay tuned for exciting updates, news, and valuable content coming your way.
            </p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
              © 2025 estudio/nk. All rights reserved.
            </div>
          </div>
        `,
      });

      logger.log('Email sent successfully', { data });

      return {
        success: true,
        data,
      };
    } catch (error) {
      logger.error('Error sending email', { error });

      return {
        success: false,
        error,
      };
    }
  },
});
