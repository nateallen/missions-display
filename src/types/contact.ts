export interface EmailRequest {
  to: string;
  from: string;
  subject: string;
  body: string;
  type: 'newsletter' | 'profile' | 'contact';
  newsletterId?: string;
  missionaryId?: string;
}

export interface SMSRequest {
  to: string;
  message: string;
  type: 'newsletter' | 'subscription';
  newsletterId?: string;
}

export interface SubscriptionRequest {
  email?: string;
  phone?: string;
  missionaryIds: string[];
  frequency: 'immediate' | 'weekly' | 'monthly';
  method: 'email' | 'sms' | 'both';
}

export interface SubscriptionResponse {
  success: boolean;
  subscriptionId?: string;
  message: string;
}
