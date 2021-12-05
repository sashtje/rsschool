import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://nodenews.herokuapp.com/', {
      apiKey: 'd95e349eddc04386b5c2f246bb35ca20', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
