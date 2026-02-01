import { EmailRequest, SMSRequest, SubscriptionRequest, SubscriptionResponse } from '@/types';
import { api } from './api';
import { config } from '@/config/env';

class EmailService {
  async sendNewsletter(request: EmailRequest): Promise<void> {
    if (config.features.useMockData) {
      // eslint-disable-next-line no-console
      console.log('📧 [MOCK] Sending email:', request);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    }

    await api.post('/email/send', request);
  }

  async sendProfile(request: EmailRequest): Promise<void> {
    if (config.features.useMockData) {
      // eslint-disable-next-line no-console
      console.log('📧 [MOCK] Sending profile:', request);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    }

    await api.post('/email/send-profile', request);
  }
}

class SMSService {
  async sendNewsletter(request: SMSRequest): Promise<void> {
    if (config.features.useMockData) {
      // eslint-disable-next-line no-console
      console.log('💬 [MOCK] Sending SMS:', request);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    }

    await api.post('/sms/send', request);
  }
}

class SubscriptionService {
  async subscribe(request: SubscriptionRequest): Promise<SubscriptionResponse> {
    if (config.features.useMockData) {
      // eslint-disable-next-line no-console
      console.log('🔔 [MOCK] Creating subscription:', request);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        success: true,
        subscriptionId: `sub_${Date.now()}`,
        message: 'Successfully subscribed to updates!',
      };
    }

    return await api.post<SubscriptionResponse>('/subscriptions', request);
  }

  async unsubscribe(subscriptionId: string): Promise<void> {
    if (config.features.useMockData) {
      // eslint-disable-next-line no-console
      console.log('🔕 [MOCK] Unsubscribing:', subscriptionId);
      await new Promise((resolve) => setTimeout(resolve, 500));
      return Promise.resolve();
    }

    await api.delete(`/subscriptions/${subscriptionId}`);
  }
}

export const emailService = new EmailService();
export const smsService = new SMSService();
export const subscriptionService = new SubscriptionService();
