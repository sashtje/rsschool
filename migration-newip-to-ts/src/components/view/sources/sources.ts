import './sources.css';
import { ISource } from '../../controller/controller';

class Sources {
  data: ISource[] = [];

  initSources(data: ISource[]): void {
    // save data
    this.data = data;

    // generate alphabet buttons
    const alphabetElem = document.querySelector('.alphabet') as HTMLElement;
    alphabetElem.addEventListener('click', this.chooseBtnHandler);
    const alphabet = new Set<string>();
    data.forEach((item) => {
      alphabet.add(item.name[0]);
    });

    const alphabetArr = Array.from(alphabet);
    if (alphabetArr.length === 0) return;

    const fragment = document.createDocumentFragment();

    const btnActive = document.createElement('button');
    btnActive.className = 'letter-btn letter-btn_active';
    [btnActive.textContent] = alphabetArr;
    fragment.append(btnActive);

    for (let i = 1; i < alphabetArr.length; i += 1) {
      const btn = document.createElement('button');
      btn.className = 'letter-btn';
      btn.textContent = alphabetArr[i];
      fragment.append(btn);
    }

    alphabetElem.append(fragment);

    this.draw(this.filterSources(alphabetArr[0]));
  }

  chooseBtnHandler = (e: Event): void => {
    const target = (e.target as HTMLElement).closest('.letter-btn');
    if (!target) return;

    const activeBtn = document.querySelector('.letter-btn_active');
    activeBtn?.classList.remove('letter-btn_active');

    target.classList.add('letter-btn_active');

    this.draw(this.filterSources(target.textContent as string));
  };

  filterSources(letter: string): ISource[] {
    const resSources = this.data.filter((item) => item.name[0] === letter);

    return resSources;
  }

  draw(data: ISource[]): void {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

      (sourceClone.querySelector('.source__item-name') as Element).textContent = item.name;
      (sourceClone.querySelector('.source__item') as Element).setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    const sources = document.querySelector('.sources');
    (sources as HTMLElement).innerHTML = '';
    (sources as HTMLElement).append(fragment);
  }
}

export default Sources;
