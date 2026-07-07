import axios from 'axios';
import { base_url, environment } from './config';

const fetcher = (url) => {
  const fullUrl = url.includes('?') 
    ? `${base_url}${url}${environment === 'staging' ? '&env=stage' : ''}`
    : `${base_url}${url}${environment === 'staging' ? '?env=stage' : ''}`;
  
  return axios.get(fullUrl).then((res) => res.data);
};

export default fetcher;
