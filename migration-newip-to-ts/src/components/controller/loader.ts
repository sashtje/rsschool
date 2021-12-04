interface IOptions {
  "apiKey"?: string;
  "sources"?: string;
}

class Loader {
  baseLink: string;
  options: Partial<IOptions>;

  constructor(baseLink: string, options: Partial<IOptions>) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint, options = {} }: {endpoint: string, options: Partial<IOptions>},
    callback = () => {
      console.error('No callback for GET response');
    },
  ) {
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

  makeUrl(options: Partial<IOptions>, endpoint: string) {
    const urlOptions: {[index: string]: string} = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key: string) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load(method, endpoint: string, callback, options: Partial<IOptions> = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
