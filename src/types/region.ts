export interface Region {
  id: string;
  name: string;
  code: RegionCode;
  countries: string[];
  missionaryCount: number;
  color: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export type RegionCode = 'AS' | 'AF' | 'EU' | 'NA' | 'SA' | 'OC' | 'ME';
