import {IGetCars, IGetWinners, StatusEngine, Sort, OrderSort, ICar, IWinner, IEngineAnswer} from './../data/data';

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

export const getCar = async (id: number): Promise<ICar> => {
  const resp = await fetch(`${garage}/${id}`);
  const car = await resp.json();

  return car;
};

export const createCar = async (name: string, color: string): Promise<ICar> => {
  const data = {
    name,
    color
  };

  const resp = await fetch(`${garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const car = await resp.json();

  return car;
};

export const deleteCar = async (id: number): Promise<{}> => {
  const resp = await fetch(`${garage}/${id}`, {
    method: 'DELETE'
  });
  const result = await resp.json();

  return result;
};

export const updateCar = async (id: number, name: string, color: string): Promise<ICar> => {
  const data = {
    name,
    color
  };

  const resp = await fetch(`${garage}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const car = await resp.json();

  return car;
};

export const startStopEngine = async (id: number, status: StatusEngine): Promise<IEngineAnswer> => {
  const resp = await fetch(`${engine}?id=${id}&status=${status}`, {
    method: 'PATCH'
  });
  const params = await resp.json();

  return params;
};

export const switchToDriveMode = async (id: number): Promise<{"success": boolean}> => {
  const resp = await fetch(`${engine}?id=${id}&status=drive`, {
    method: 'PATCH'
  });
  const result = await resp.json();

  return result;
};

export const getWinners = async (page: number, limit: number, sort: Sort, order: OrderSort): Promise<IGetWinners> => {
  const resp = await fetch(`${winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
  const totalWinners = resp.headers.get('X-Total-Count');
  const arrWinners = await resp.json();

  return {
    total: +totalWinners!,
    winners: arrWinners
  };
};

export const getWinner = async (id: number): Promise<IWinner> => {
  const resp = await fetch(`${winners}/${id}`);
  const winner = await resp.json();

  return winner;
};

export const createWinner = async (id: number, wins: number, time: number): Promise<IWinner> => {
  const data = {
    id,
    wins,
    time,
  };

  const resp = await fetch(`${winners}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const winner = await resp.json();

  return winner;
};

export const deleteWinner = async (id: number): Promise<{}> => {
  const resp = await fetch(`${winners}/${id}`, {
    method: 'DELETE'
  });
  const result = await resp.json();

  return result;
};

export const updateWinner = async (id: number, wins: number, time: number): Promise<IWinner> => {
  const data = {
    wins,
    time,
  };

  const resp = await fetch(`${winners}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const winner = await resp.json();

  return winner;
};