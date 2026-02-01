export interface CountryInfo {
  name: string;
  flag: string; // Emoji flag
  population: string;
  language: string;
  religion: string;
  backgroundImage: string;
}

export const countryData: Record<string, CountryInfo> = {
  Japan: {
    name: 'Japan',
    flag: '🇯🇵',
    population: '125.7 million',
    language: 'Japanese',
    religion: 'Shinto & Buddhism (majority)',
    backgroundImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&q=80',
  },
  Kenya: {
    name: 'Kenya',
    flag: '🇰🇪',
    population: '54.0 million',
    language: 'Swahili & English',
    religion: 'Christianity (majority)',
    backgroundImage: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1600&q=80',
  },
  Peru: {
    name: 'Peru',
    flag: '🇵🇪',
    population: '33.7 million',
    language: 'Spanish & Quechua',
    religion: 'Catholic (majority)',
    backgroundImage: '/images/countries/peru.jpg',
  },
  Philippines: {
    name: 'Philippines',
    flag: '🇵🇭',
    population: '115.6 million',
    language: 'Filipino & English',
    religion: 'Catholic (majority)',
    backgroundImage: '/images/countries/philippines.jpg',
  },
  France: {
    name: 'France',
    flag: '🇫🇷',
    population: '67.8 million',
    language: 'French',
    religion: 'Catholic (traditional)',
    backgroundImage: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=1600&q=80',
  },
  Lebanon: {
    name: 'Lebanon',
    flag: '🇱🇧',
    population: '5.5 million',
    language: 'Arabic & French',
    religion: 'Muslim & Christian',
    backgroundImage: 'https://images.unsplash.com/photo-1584277261846-c6a1672ed979?w=1600&q=80',
  },
  'South Korea': {
    name: 'South Korea',
    flag: '🇰🇷',
    population: '51.7 million',
    language: 'Korean',
    religion: 'Christianity & Buddhism',
    backgroundImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1600&q=80',
  },
  Mexico: {
    name: 'Mexico',
    flag: '🇲🇽',
    population: '128.9 million',
    language: 'Spanish',
    religion: 'Catholic (majority)',
    backgroundImage: '/images/countries/mexico.jpg',
  },
  Belize: {
    name: 'Belize',
    flag: '🇧🇿',
    population: '0.4 million',
    language: 'English & Spanish',
    religion: 'Catholic (majority)',
    backgroundImage: '/images/countries/belize.jpg',
  },
  Jamaica: {
    name: 'Jamaica',
    flag: '🇯🇲',
    population: '2.8 million',
    language: 'English & Patois',
    religion: 'Protestant (majority)',
    backgroundImage: '/images/countries/jamaica.jpg',
  },
  'Dominican Republic': {
    name: 'Dominican Republic',
    flag: '🇩🇴',
    population: '11.1 million',
    language: 'Spanish',
    religion: 'Catholic (majority)',
    backgroundImage: '/images/countries/dominican-republic.jpg',
  },
  Thailand: {
    name: 'Thailand',
    flag: '🇹🇭',
    population: '71.6 million',
    language: 'Thai',
    religion: 'Buddhism (majority)',
    backgroundImage: '/images/countries/thailand.jpg',
  },
  Argentina: {
    name: 'Argentina',
    flag: '🇦🇷',
    population: '46.2 million',
    language: 'Spanish',
    religion: 'Catholic (majority)',
    backgroundImage: '/images/countries/argentina.jpg',
  },
  'El Salvador': {
    name: 'El Salvador',
    flag: '🇸🇻',
    population: '6.3 million',
    language: 'Spanish',
    religion: 'Catholic (majority)',
    backgroundImage: '/images/countries/el-salvador.jpg',
  },
  Nigeria: {
    name: 'Nigeria',
    flag: '🇳🇬',
    population: '223.8 million',
    language: 'English & Hausa',
    religion: 'Muslim & Christian',
    backgroundImage: '/images/countries/nigeria.jpg',
  },
};

export function getCountryInfo(countryName: string): CountryInfo {
  return (
    countryData[countryName] || {
      name: countryName,
      flag: '🌍',
      population: 'N/A',
      language: 'N/A',
      religion: 'N/A',
      backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600',
    }
  );
}
