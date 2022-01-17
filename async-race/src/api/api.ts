import {IGetCars} from './../data/data';

const base = 'http://127.0.0.1:3000';
const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

export const getCars = async (page: number, limit: number): Promise<IGetCars> => {
  const resp = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  const totalCars = resp.headers.get('X-Total-Count');
  const arrCars = await resp.json();

  return {total: +totalCars!, cars: arrCars};
};