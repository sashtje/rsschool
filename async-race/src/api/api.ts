import {
  IGetCars,
  IGetWinners,
  StatusEngine,
  Sort,
  OrderSort,
  ICar,
  IWinner,
  IEngineAnswer,
  NUMBER_IN_BUNDLE,
} from '../data/data';
import brandsCars from '../data/brands-cars';
import modelsCars from '../data/models-cars';

const base = 'http://127.0.0.1:3000';
const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

export const getCars = async (page: number, limit: number): Promise<IGetCars> => {
  const resp = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  const totalCars = resp.headers.get('X-Total-Count') as string;
  const arrCars = (await resp.json()) as ICar[];

  return { total: +totalCars, cars: arrCars };
};

export const getCar = async (id: number): Promise<ICar> => {
  const resp = await fetch(`${garage}/${id}`);
  const car = (await resp.json()) as ICar;

  return car;
};

export const createCar = async (name: string, color: string): Promise<ICar> => {
  const data = {
    name,
    color,
  };

  const resp = await fetch(`${garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const car = (await resp.json()) as ICar;

  return car;
};

/* functions for create bundle cars */
function getRandomIntInclusive(min: number, max: number) {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
}

function generateRandomColor(): string {
  const r = getRandomIntInclusive(0, 255).toString(16).padStart(2, '0');
  const g = getRandomIntInclusive(0, 255).toString(16).padStart(2, '0');
  const b = getRandomIntInclusive(0, 255).toString(16).padStart(2, '0');

  return `#${r}${g}${b}`;
}

function generateRandomName(): string {
  const brandInd = getRandomIntInclusive(0, brandsCars.length - 1);
  const modelInd = getRandomIntInclusive(0, modelsCars.length - 1);

  return `${brandsCars[brandInd]} ${modelsCars[modelInd]}`;
}

export const createBundleCars = async (): Promise<void> => {
  const promises = [];
  for (let i = 0; i < NUMBER_IN_BUNDLE; i += 1) {
    const newCarName = generateRandomName();
    const newCarColor = generateRandomColor();
    promises.push(createCar(newCarName, newCarColor));
  }

  await Promise.all(promises);
};

export const deleteCar = async (id: number): Promise<void> => {
  const resp = await fetch(`${garage}/${id}`, {
    method: 'DELETE',
  });
  await resp.json();
};

export const updateCar = async (id: number, name: string, color: string): Promise<ICar> => {
  const data = {
    name,
    color,
  };

  const resp = await fetch(`${garage}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const car = (await resp.json()) as ICar;

  return car;
};

export const startStopEngine = async (id: number, status: StatusEngine): Promise<IEngineAnswer> => {
  const resp = await fetch(`${engine}?id=${id}&status=${status}`, {
    method: 'PATCH',
  });
  const params = (await resp.json()) as IEngineAnswer;

  return params;
};

export const switchToDriveMode = async (id: number): Promise<{ success: boolean }> => {
  const resp = await fetch(`${engine}?id=${id}&status=drive`, {
    method: 'PATCH',
  });
  const result = (await resp.json()) as { success: boolean };

  return result;
};

export const getWinners = async (
  page: number,
  limit: number,
  sort: Sort,
  order: OrderSort,
): Promise<IGetWinners> => {
  const resp = await fetch(
    `${winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
  );
  const totalWinners = resp.headers.get('X-Total-Count') as string;
  const arrWinners = (await resp.json()) as IWinner[];

  return {
    total: +totalWinners,
    winners: arrWinners,
  };
};

export const getWinner = async (id: number): Promise<IWinner> => {
  const resp = await fetch(`${winners}/${id}`);
  const winner = (await resp.json()) as IWinner;

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
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const winner = (await resp.json()) as IWinner;

  return winner;
};

export const deleteWinner = async (id: number): Promise<void> => {
  const resp = await fetch(`${winners}/${id}`, {
    method: 'DELETE',
  });
  await resp.json();
};

export const updateWinner = async (id: number, wins: number, time: number): Promise<IWinner> => {
  const data = {
    wins,
    time,
  };

  const resp = await fetch(`${winners}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const winner = (await resp.json()) as IWinner;

  return winner;
};
