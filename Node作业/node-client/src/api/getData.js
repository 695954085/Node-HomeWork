import fetch from '@/utils/fetch';

export const getListData = data => fetch('/admin', data);

export const getPicData = data => fetch('/getpicdata',data);
