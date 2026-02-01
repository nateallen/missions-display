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
    backgroundImage: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1600',
  },
  Kenya: {
    name: 'Kenya',
    flag: '🇰🇪',
    population: '54.0 million',
    language: 'Swahili & English',
    religion: 'Christianity (majority)',
    backgroundImage: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1600',
  },
  Peru: {
    name: 'Peru',
    flag: '🇵🇪',
    population: '33.7 million',
    language: 'Spanish & Quechua',
    religion: 'Catholic (majority)',
    backgroundImage: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1600',
  },
  Philippines: {
    name: 'Philippines',
    flag: '🇵🇭',
    population: '115.6 million',
    language: 'Filipino & English',
    religion: 'Catholic (majority)',
    backgroundImage: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=1600',
  },
  France: {
    name: 'France',
    flag: '🇫🇷',
    population: '67.8 million',
    language: 'French',
    religion: 'Catholic (traditional)',
    backgroundImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600',
  },
  Lebanon: {
    name: 'Lebanon',
    flag: '🇱🇧',
    population: '5.5 million',
    language: 'Arabic & French',
    religion: 'Muslim & Christian',
    backgroundImage: 'https://images.unsplash.com/photo-1580922656858-47f428849156?w=1600',
  },
  'South Korea': {
    name: 'South Korea',
    flag: '🇰🇷',
    population: '51.7 million',
    language: 'Korean',
    religion: 'Christianity & Buddhism',
    backgroundImage: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1600',
  },
  Mexico: {
    name: 'Mexico',
    flag: '🇲🇽',
    population: '128.9 million',
    language: 'Spanish',
    religion: 'Catholic (majority)',
    backgroundImage: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=1600',
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
