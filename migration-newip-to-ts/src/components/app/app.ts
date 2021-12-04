import AppController from '../controller/controller';
import { AppView } from '../view/appView';

interface AppI {
  controller: AppController;
  view: AppView;
  start(): void;
}
class App implements AppI {
  controller: AppController;
  view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start(): void {
    document
      .querySelector('.sources')
      .addEventListener('click', (e: Event) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
    this.controller.getSources((data) => this.view.drawSources(data));
  }
}

export default App;
