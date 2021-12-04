import './sources.css';
import { ISource } from '../../controller/controller';

class Sources {
  draw(data: ISource[]) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp');

    data.forEach((item) => {
      const sourceClone = (sourceItemTemp as HTMLTemplateElement).content.cloneNode(true) as HTMLElement;

      sourceClone.querySelector('.source__item-name').textContent = item.name;
      sourceClone.querySelector('.source__item').setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    document.querySelector('.sources').append(fragment);
  }
}

export default Sources;
