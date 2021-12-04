import AppLoader from './appLoader';

/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }] */
export type CallbackType<T> = (_data?: T) => void;

export interface ISource {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
}
export interface IDataSource {
  status: string;
  sources: ISource[];
}

export interface IArticles {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string; name: string };
  title: string;
  url: string;
  urlToImage: string;
}
export interface IDataNews {
  status: string;
  totalResults: number;
  articles: IArticles[];
}

export type dataType = IDataSource | IArticles | IDataNews;

class AppController extends AppLoader {
  getSources(callback: CallbackType<IDataSource>): void {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback,
    );
  }

  getNews(e: Event, callback: CallbackType<IDataNews>) {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLElement;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId: string = target.getAttribute('data-source-id');
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback,
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;
