import { fetch } from '@/config/fetch';

export const getListItems = data => fetch('/admin', data);

