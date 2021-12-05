import { CallbackType, dataType } from 'controller';

interface IOptions {
  apiKey: string;
  sources: string;
}

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^Re|^Un|^Not" }] */
export enum ResponseStatus {
  Unauthorized = 401,
  NotFound = 404,
}

class Loader {
  private readonly baseLink: string;

  private readonly options: Partial<IOptions>;

  constructor(baseLink: string, options: Partial<IOptions>) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint, options = {} }: { endpoint: string; options?: Partial<IOptions> },
    callback: CallbackType<dataType> = () => {
      console.error('No callback for GET response');
    },
  ): void {
    console.log('getResp');
    console.log(this);
    this.load('GET', endpoint, callback, options);
  }

  errorHandler = (res: Response): Response => {
    if (!res.ok) {
      if (res.status === ResponseStatus.Unauthorized || res.status === ResponseStatus.NotFound) {
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      }
      throw Error(res.statusText);
    }

    return res;
  };

  makeUrl(options: Partial<IOptions>, endpoint: string): string {
    const urlOptions: { [index: string]: string } = {
      ...this.options,
      ...options,
    };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key: string) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  // eslint-disable-next-line max-len
  load(method: string, endpoint: string, callback: CallbackType<dataType>, options: Partial<IOptions> = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res: Response) => res.json())
      .then((data: dataType) => {
        callback(data);
      })
      .catch((err: Error) => console.error(err));
  }
}

export default Loader;
