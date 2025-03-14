'use server';

import { tasks } from '@trigger.dev/sdk/v3';

export async function subscribeAction({ name, email }: { name: string; email: string }) {
  try {
    const handle = await tasks.trigger('send-email', {
      name,
      email,
    });

    return {
      success: true,
      handle,
      message: 'Subscription successful',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Subscription failed',
    };
  }
}
