import { COUNTRY_ISO } from '../constants/countryIsoLookup';

const getCountryISO = (serverName: string): string => {
    const countryName = serverName.split(' #')[0].trim();
    return COUNTRY_ISO[countryName].toLowerCase() || '';
};

export default getCountryISO;