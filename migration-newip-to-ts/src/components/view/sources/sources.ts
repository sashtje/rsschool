import './sources.css';
import { ISource } from '../../controller/controller';

class Sources {
  draw(data: ISource[]) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp');

    data.forEach((item) => {
      // eslint-disable-next-line max-len
      const sourceClone = (sourceItemTemp as HTMLTemplateElement).content.cloneNode(true) as HTMLElement;

      (sourceClone.querySelector('.source__item-name') as Element).textContent = item.name;
      (sourceClone.querySelector('.source__item') as Element).setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    (document.querySelector('.sources') as Element).append(fragment);
  }
}

export default Sources;
