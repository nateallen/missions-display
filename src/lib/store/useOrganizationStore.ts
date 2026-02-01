import { create } from 'zustand';
import { Organization } from '@/types';

interface OrganizationStore {
  organization: Organization;
  setOrganization: (org: Organization) => void;
}

// Mock organization data - will be replaced with API call in Phase 2A
const MOCK_ORGANIZATION: Organization = {
  id: 'org-lighthouse-001',
  name: 'Lighthouse Baptist Church',
  slug: 'lighthouse',
  logoUrl: '/images/logo/lighthouse.png',
  email: 'missions@lighthouse.org',
  phone: '(555) 123-4567',
  address: {
    street: '123 Church Street',
    city: 'Springfield',
    state: 'IL',
    postalCode: '62701',
    country: 'USA',
  },
};

export const useOrganizationStore = create<OrganizationStore>((set) => ({
  organization: MOCK_ORGANIZATION,
  setOrganization: (org) => set({ organization: org }),
}));
