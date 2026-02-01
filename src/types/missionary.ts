export interface Missionary {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  profilePhoto: string;
  videoUrl?: string; // YouTube, Vimeo, or other video URL
  bio: string;
  location: MissionaryLocation;
  contact: ContactInfo;
  family: FamilyMember[];
  newsletterIds: string[];
  socialMedia: SocialMediaLinks;
  metadata: MissionaryMetadata;
}

export interface MissionaryLocation {
  country: string;
  region: string;
  city?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  regionId: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  mailingAddress?: Address;
  preferredContactMethod?: 'email' | 'phone' | 'mail';
}

export interface Address {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: 'spouse' | 'child' | 'other';
  birthday?: Date;
  photo?: string;
  age?: number;
}

export interface SocialMediaLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  blog?: string;
}

export interface MissionaryMetadata {
  startDate: Date;
  organization?: string;
  ministry: string;
  supportLevel?: 'full' | 'partial' | 'seeking';
  tags: string[];
  lastUpdated: Date;
}
