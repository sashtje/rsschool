import { CallbackType, dataType } from 'controller';

interface IOptions {
  apiKey?: string;
  sources?: string;
}

class Loader {
  baseLink: string;

  options: Partial<IOptions>;

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
    this.load('GET', endpoint, callback, options);
  }

  errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) {
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      }
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: Partial<IOptions>, endpoint: string): string {
    const urlOptions: { [index: string]: string } = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key: string) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

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
