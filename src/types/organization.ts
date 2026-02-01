export interface Organization {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  email: string;
  phone?: string;
  address?: OrganizationAddress;
  subscriptionTier?: 'basic' | 'pro' | 'enterprise';
  subscriptionStatus?: 'active' | 'past_due' | 'canceled' | 'trialing';
}

export interface OrganizationAddress {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}
