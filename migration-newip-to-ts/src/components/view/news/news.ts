import './news.css';
import { IArticles } from '../../controller/controller';

class News {
  draw(data: IArticles[]): void {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector('#newsItemTemp');

    news.forEach((item, idx) => {
      // eslint-disable-next-line max-len
      const newsClone = (newsItemTemp as HTMLTemplateElement).content.cloneNode(true) as HTMLTemplateElement;

      if (idx % 2) (newsClone.querySelector('.news__item') as Element).classList.add('alt');

      const newsMetaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLTemplateElement;
      newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
      (newsClone.querySelector('.news__meta-author') as Element).textContent = item.author || item.source.name;
      (newsClone.querySelector('.news__meta-date') as Element).textContent = item.publishedAt
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-');

      (newsClone.querySelector('.news__description-title') as Element).textContent = item.title;
      (newsClone.querySelector('.news__description-source') as Element).textContent = item.source.name;
      (newsClone.querySelector('.news__description-content') as Element).textContent = item.description;
      (newsClone.querySelector('.news__read-more a') as Element).setAttribute('href', item.url);

      fragment.append(newsClone);
    });

    (document.querySelector('.news') as Element).innerHTML = '';
    (document.querySelector('.news') as Element).appendChild(fragment);
  }
}

export default News;
