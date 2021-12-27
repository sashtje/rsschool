import ControllerTree from '../controller/controllertree';
import { IMap, map } from '../models/data';
import { TREE_NUMBER, BG_NUMBER, DEFAULT_TREE, DEFAULT_BG, MAX_WIDTH_TREE, MAX_HEIGHT_TREE, NUM_GARLAND_ROPES } from '../models/types';

export default class ViewTree {
  controllerTree: ControllerTree;

  rootElem: HTMLElement;

  audio: HTMLAudioElement;

  timerSnow?: NodeJS.Timer;

  snowContainerWidth?: number;

  snowContainerHeight?: number;

  map: IMap[];

  constructor(controllerTree: ControllerTree, rootElem: HTMLElement) {
    this.controllerTree = controllerTree;
    this.rootElem = rootElem;
    this.audio = new Audio('./public/audio/audio.mp3');
    this.audio.loop = true;

    this.map = map;

    window.addEventListener('dragend', this.handleWindowDragEnd);
  }

  async showPage(): Promise<void> {
    const url = './public/pages/tree-page.html';
    const response = await fetch(url);
    const htmlText = await response.text();

    this.rootElem.innerHTML = htmlText;

    const body = document.querySelector('body') as HTMLElement;
    body.className = 'tree-page';

    this.initSettings();
    this.initTreesForChoice();
    this.initBgForChoice();
    this.addListenersForGarlands();
    this.initTreeContainer();
    this.initToys();
    this.initReadyTrees();
  }

  initSettings(): void {
    const sound = document.getElementById('sound') as HTMLInputElement;
    const isSoundOn = this.controllerTree.getSoundSettings();

    if (isSoundOn) {
      sound.checked = true;
      this.playSound();
    }

    sound.addEventListener('change', this.handleSoundOnOff);

    const trash = document.querySelector('.tree-controls__btn') as HTMLElement;

    trash.addEventListener('click', this.handleClickTrash);
  }

  handleClickWindow = (): void => {
    const isSoundOn = this.controllerTree.getSoundSettings();

    if (isSoundOn) {
      this.playSound();
    }

    window.removeEventListener('click', this.handleClickWindow);
  }

  handleSoundOnOff = (e: Event): void => {
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      this.controllerTree.changeSoundSettings(true);
      this.playSound();
    } else {
      this.controllerTree.changeSoundSettings(false);
      this.pauseSound();
    }
  }

  playSound(): void {
    this.audio.currentTime = 0;
    this.audio.play().catch(() => {
      window.addEventListener('click', this.handleClickWindow);
    });
  }

  pauseSound(): void {
    this.audio.pause();
  }

  handleSnowOnOff = (e: Event): void => {
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      this.controllerTree.changeSnowSettings(true);
      this.turnOnSnow();
    } else {
      this.controllerTree.changeSnowSettings(false);
      this.turnOffSnow();
    }
  }

  handleClickTrash = (): void => {
    this.controllerTree.clearTreeSettings();
    this.pauseSound();

    const sound = document.getElementById('sound') as HTMLInputElement;
    sound.checked = false;

    const snow = document.getElementById('snow') as HTMLInputElement;
    if (snow.checked) {
      this.turnOffSnow();
    }
    snow.checked = false;

    const prevActiveTree = document.querySelector('.tree-settings__item_is_active') as HTMLElement;
    prevActiveTree.classList.remove('tree-settings__item_is_active');

    const firstTree = document.querySelector('.tree-settings__item') as HTMLElement;
    firstTree.classList.add('tree-settings__item_is_active');


    const prevActiveBg = document.querySelector('.bg-settings__item_is_active') as HTMLElement;
    prevActiveBg.classList.remove('bg-settings__item_is_active');

    const firstBg = document.querySelector('.bg-settings__item') as HTMLElement;
    firstBg.classList.add('bg-settings__item_is_active');

    this.changeTree(DEFAULT_TREE);
    this.changeBg(DEFAULT_BG);
  }

  initTreesForChoice(): void {
    const treeSettingsContainer = document.querySelector('.tree-settings__container') as HTMLElement;
    const activeTree = this.controllerTree.getActiveTreeNumber();

    treeSettingsContainer.innerHTML = '';

    for (let i = 1; i <= TREE_NUMBER; i += 1) {
      const div = document.createElement('div');
      if (+activeTree == i) {
        div.className = "tree-settings__item tree-settings__item_is_active";
      } else {
        div.className = "tree-settings__item";
      }
      div.dataset.tree = i.toString();
      div.style.backgroundImage = `url('./public/tree/${i}.webp')`;
      treeSettingsContainer.append(div);
    }

    treeSettingsContainer.addEventListener('click', this.handleChoiceOfTree);
  }

  handleChoiceOfTree = (e: Event): void => {
    const tree = (e.target as HTMLElement).closest('.tree-settings__item');

    if (!tree) return;

    if (tree.classList.contains('tree-settings__item_is_active')) return;

    const prevActiveTree = document.querySelector('.tree-settings__item_is_active') as HTMLElement;
    prevActiveTree.classList.remove('tree-settings__item_is_active');

    tree.classList.add('tree-settings__item_is_active');
    const value = (tree as HTMLElement).dataset.tree as string;
    this.controllerTree.changeActiveTree(value);

    this.changeTree(value);
  }

  changeTree(value: string) {
    const treeImg = document.querySelector('.tree__main-tree') as HTMLMediaElement;

    treeImg.src = `./public/tree/${value}.webp`;;
  }

  initBgForChoice(): void {
    const bgSettingsContainer = document.querySelector('.bg-settings__container') as HTMLElement;
    const activeBg = this.controllerTree.getActiveBgNumber();

    bgSettingsContainer.innerHTML = '';

    for (let i = 1; i <= BG_NUMBER; i += 1) {
      const div = document.createElement('div');
      if (+activeBg == i) {
        div.className = "bg-settings__item bg-settings__item_is_active";
      } else {
        div.className = "bg-settings__item";
      }
      div.dataset.bg = i.toString();
      div.style.backgroundImage = `url('./public/bg/${i}.webp')`;
      bgSettingsContainer.append(div);
    }

    bgSettingsContainer.addEventListener('click', this.handleChoiceOfBg);
  }

  handleChoiceOfBg = (e: Event): void => {
    const bg = (e.target as HTMLElement).closest('.bg-settings__item');

    if (!bg) return;

    if (bg.classList.contains('bg-settings__item_is_active')) return;

    const prevActiveBg = document.querySelector('.bg-settings__item_is_active') as HTMLElement;
    prevActiveBg.classList.remove('bg-settings__item_is_active');

    bg.classList.add('bg-settings__item_is_active');
    const value = (bg as HTMLElement).dataset.bg as string;
    this.controllerTree.changeActiveBg(value);

    this.changeBg(value);
  }

  changeBg(value: string) {
    const treeContainer = document.querySelector('.tree__tree-container') as HTMLElement;

    treeContainer.style.backgroundImage = `url('./public/bg/${value}.webp')`;
  }

  addListenersForGarlands(): void {
    const garlandSettingsContainer = document.querySelector('.garland-settings__container') as HTMLElement;

    garlandSettingsContainer.addEventListener('change', this.handleChangeSettingsGarland);
  }

  handleChangeSettingsGarland = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    const garlandCheckbox = document.querySelector('.garland-settings__checkbox') as HTMLInputElement;
    const garlandContainer = document.querySelector('.tree__garland') as HTMLElement;

    if (target.type == 'radio') {
      if (garlandCheckbox.checked) {
        this.showGarland();
      }
    } else if (target.type == 'checkbox') {
      if (target.checked) {
        this.showGarland();
      } else {
        garlandContainer.innerHTML = '';
      }
    }
  }

  initTreeContainer(): void {
    const treeContainer = document.querySelector('.tree__tree-container') as HTMLElement;

    treeContainer.style.backgroundImage = `url('./public/bg/${DEFAULT_BG}.webp')`;

    const activeTree = this.controllerTree.getActiveTreeNumber();
    const mainTree = document.createElement('img');
    mainTree.src = `./public/tree/${activeTree}.webp`;
    mainTree.alt = 'tree';
    mainTree.className = 'tree__main-tree';
    mainTree.useMap = '#tree-map';
    mainTree.onload = this.handleResizeWindow;

    treeContainer.append(mainTree);

    const garlandContainer = document.createElement('div');
    garlandContainer.className = 'tree__garland';
    treeContainer.append(garlandContainer);

    const snowflakesContainer = document.createElement('div');
    snowflakesContainer.className = 'tree__snowflakes';
    treeContainer.append(snowflakesContainer);

    window.addEventListener('resize', this.handleResizeWindow);

    this.snowContainerWidth = snowflakesContainer.offsetWidth;
    this.snowContainerHeight = snowflakesContainer.offsetHeight;
    this.addOrChangeImgMap();

    const snow = document.getElementById('snow') as HTMLInputElement;
    const isSnowOn = this.controllerTree.getSnowSettings();

    if (isSnowOn) {
      snow.checked = true;
      this.turnOnSnow();
    }

    snow.addEventListener('change', this.handleSnowOnOff);
  }

  handleResizeWindow = (): void => {
    const snowflakesContainer = document.querySelector('.tree__snowflakes') as HTMLElement;

    if (snowflakesContainer === null) {
      window.removeEventListener('resize', this.handleResizeWindow);
    } else {
      this.snowContainerWidth = snowflakesContainer.offsetWidth;
      this.snowContainerHeight = snowflakesContainer.offsetHeight;
      this.addOrChangeImgMap();
    }

    const garlandCheckbox = document.querySelector('.garland-settings__checkbox') as HTMLInputElement;
    if (garlandCheckbox !== null && garlandCheckbox.checked) {
      this.showGarland();
    }
  }

  addOrChangeImgMap(): void {
    const imgMap = document.querySelector('map') as HTMLElement;
    const coords: number[] = [];
    const treeContainer = document.querySelector('.tree__tree-container') as HTMLElement;
    let { widthTree, heightTree } = this.getSizeTree();

    const area = document.createElement('area');
    area.shape = 'poly';

    for (let i = 0; i < this.map.length; i += 1) {
      let dotX = Math.round(widthTree * this.map[i].x / MAX_WIDTH_TREE);
      coords.push(dotX);

      let dotY = Math.round(heightTree * this.map[i].y / MAX_HEIGHT_TREE);
      coords.push(dotY);
    }

    area.coords = coords.join(',');

    if (imgMap === null) {
      /* const mapContainer = document.createElement('div');
      mapContainer.className = 'tree__map-container'; */
      const imgMapNew = document.createElement('map');
      imgMapNew.name = 'tree-map';
      imgMapNew.append(area);
      /* mapContainer.append(imgMapNew);
      treeContainer.append(mapContainer); */
      treeContainer.append(imgMapNew);

      area.addEventListener('dragover', this.handleOverDrop);
      area.ondrop = this.handleDrop;
    } else {
      const oldArea = document.querySelector('area') as HTMLAreaElement;
      oldArea.coords = area.coords;
    }

    
  }

  initToys(): void {
    const decorToysContainer = document.querySelector('.decor-toys__container') as HTMLElement;
    let dataToPrint = this.controllerTree.getToysToPrint();

    for (let i = 0; i < dataToPrint.length; i += 1) {
      let num = dataToPrint[i].num;
      let count = dataToPrint[i].count;
      let div = document.createElement('div');

      div.className = 'decor-toys__toy';
      div.dataset.num = num;

      for (let j = +count; j >= 1; j -= 1) {
        let img = document.createElement('img');
        img.className = 'decor-toys__toy-img';
        img.src = `./public/toys/${num}.webp`;
        img.alt = 'toy';
        img.id = `${num}-${j}`;
        img.draggable = true;
        img.dataset.imgnum = num;

        div.append(img);

        img.addEventListener('dragstart', this.handleDragStart);
      }

      let span = document.createElement('span');
      span.className = 'decor-toys__number-toys';
      span.textContent = count;
      div.append(span);

      decorToysContainer.append(div);
    }
  }

  initReadyTrees(): void {
    const decorTreesContainer = document.querySelector('.decor-trees__container') as HTMLElement;

    decorTreesContainer.innerHTML = '';

    for (let i = 1; i <= TREE_NUMBER; i += 1) {
      const div = document.createElement('div');
      div.className = "decor-trees__tree";
      div.dataset.tree = i.toString();
      div.style.backgroundImage = `url('./public/tree/${i}.webp')`;
      decorTreesContainer.append(div);
    }
  }

  turnOnSnow(): void {
    const snowflakesContainer = document.querySelector('.tree__snowflakes') as HTMLElement;

    if (snowflakesContainer.classList.contains('tree__snowflakes_is_hiding')) {
      snowflakesContainer.classList.remove('tree__snowflakes_is_hiding');
    }
    this.timerSnow = setInterval(this.createSnowflake, 50);
  }

  createSnowflake = (): void => {
    const snowflakesContainer = document.querySelector('.tree__snowflakes') as HTMLElement;
    const snowFlake = document.createElement('i');

    snowFlake.className = 'bi bi-snow2 tree__snowflakes-item';
    snowFlake.style.left = Math.random() * this.snowContainerWidth! + 'px';
    snowFlake.style.animationDuration = Math.random() * 3 + 4 + 's';
    snowFlake.style.fontSize = Math.random() * 10 + 10 + 'px';

    snowflakesContainer.style.setProperty('--bottom', this.snowContainerHeight! + 50 + 'px');

    snowflakesContainer.append(snowFlake);

    setTimeout(() => {
      try {
        snowFlake.remove();
      } catch {}
    }, 7000);
  }

  turnOffSnow(): void {
    clearInterval(this.timerSnow as NodeJS.Timer);
    const snowflakesContainer = document.querySelector('.tree__snowflakes') as HTMLElement;
    snowflakesContainer.classList.add('tree__snowflakes_is_hiding');
    snowflakesContainer.innerHTML = '';
  }

  showGarland(): void {
    const garlandContainer = document.querySelector('.tree__garland') as HTMLElement;
    garlandContainer.innerHTML = '';
    const radioGarland = document.querySelector('.garland-settings__radio:checked') as HTMLElement;
    let colorGarland = radioGarland.id;
    let { heightTree } = this.getSizeTree();
    let chunk;
    let marginBottom = 20;

    chunk = heightTree / 9;

    for (let i = 1; i <= NUM_GARLAND_ROPES; i += 1) {
      const rope = document.createElement('ul');
      rope.className = 'tree__garland-lightrope';
      rope.style.bottom = marginBottom + chunk * i + 'px';
      const widthSquare = (heightTree - chunk * i) * 2;
      const radius = widthSquare / 2;
      rope.style.width = widthSquare + 'px';
      rope.style.height = widthSquare + 'px';

      const lightbulb = document.createElement('li');

      lightbulb.className = `tree__garland-lightrope-item tree__garland-lightrope-item_is_${colorGarland === 'rainbow' ? this.getRandomColor() : colorGarland}`;
      lightbulb.style.transform = `rotate(90deg) translate(${widthSquare / 2 + 'px'})`;

      rope.append(lightbulb);

      let angleBase = 90;
      let angleStep = 15 * 360 / (2 * Math.PI * radius);
      let newAngleBig = angleBase + angleStep;
      let newAngleSmall = angleBase - angleStep;

      while (newAngleBig <= 107.5) {
        const newLightbulbBig = document.createElement('li');

        newLightbulbBig.className = `tree__garland-lightrope-item tree__garland-lightrope-item_is_${colorGarland === 'rainbow' ? this.getRandomColor() : colorGarland}`;
        newLightbulbBig.style.transform = `rotate(${newAngleBig + 'deg'}) translate(${widthSquare / 2 + 'px'})`;

        rope.append(newLightbulbBig);

        const newLightbulbSmall = document.createElement('li');

        newLightbulbSmall.className = `tree__garland-lightrope-item tree__garland-lightrope-item_is_${colorGarland === 'rainbow' ? this.getRandomColor() : colorGarland}`;
        newLightbulbSmall.style.transform = `rotate(${newAngleSmall + 'deg'}) translate(${widthSquare / 2 + 'px'})`;

        rope.append(newLightbulbSmall);

        newAngleBig += angleStep;
        newAngleSmall -= angleStep;
      }

      garlandContainer.append(rope);
    }
  }

  getSizeTree(): {widthTree: number, heightTree: number} {
    let widthTree;
    let heightTree;

    if (this.snowContainerWidth! >= 625) {
      widthTree = MAX_WIDTH_TREE;
      heightTree = MAX_HEIGHT_TREE;
    } else {
      widthTree = this.snowContainerWidth! / 100 * 80;
      heightTree = widthTree * MAX_HEIGHT_TREE / MAX_WIDTH_TREE;
    }

    return { widthTree, heightTree };
  }

  getRandomColor(): string {
    let random = Math.floor(Math.random() * 4) + 1;
    let color = '';

    switch(random) {
      case 1:
        color = 'red';
        break;

      case 2:
        color = 'blue';
        break;

      case 3:
        color = 'green';
        break;

      case 4:
        color = 'yellow';
        break;
      
      default:
        //
    }

    return color;
  }

  handleDrop = (e: Event): void => {
    e.preventDefault();

    const target = e.target as HTMLElement;
    
    if (target.nodeName == 'IMG') {
      return;
    }
    const area = target.closest('area') as HTMLElement;

    const draggedId = (e as DragEvent).dataTransfer!.getData('idToy');
    const draggedToy = document.getElementById(draggedId) as HTMLElement;

    draggedToy.parentElement!.removeChild(draggedToy);

    /* draggedToy.style.width = '12%';
    draggedToy.style.height = '8.4%'; */

    draggedToy.style.width = '50px';
    draggedToy.style.height = '50px';

    //calc top and left coords in %
    let { widthTree, heightTree } = this.getSizeTree();
    let left = (e as MouseEvent).offsetX * 100 / widthTree;
    let top = (e as MouseEvent).offsetY * 100 / heightTree;
    // draggedToy.style.left = left + '%';
    // draggedToy.style.top = top + '%';
    draggedToy.style.left = (e as Event).layerX + 'px';
    draggedToy.style.top = (e as MouseEvent).layerY + 'px';

    console.log(e);

    area.appendChild(draggedToy);

    this.showNumberToys(draggedToy.dataset.imgnum as string);
  }

  handleDragStart = (e: Event): void => {
    const target = e.target as HTMLElement;

    (e as DragEvent).dataTransfer!.setData('idToy', target.id);
  }

  handleOverDrop = (e: Event): void => {
    e.preventDefault();
  }

  handleWindowDragEnd = (e: Event): void => {
    const target = e.target as HTMLElement;

    if (!target.classList.contains('decor-toys__toy-img')) {
      return;
    }

    // remove toys from the tree
    if (target.parentNode!.nodeName == 'AREA' && (e as DragEvent).dataTransfer!.dropEffect == 'none') {
      target.parentElement!.removeChild(target);
      const num = target.dataset.imgnum as string;
      const toysSlot = document.querySelector(`.decor-toys__container [data-num='${num}']`) as HTMLElement;
      target.style.top = '50%';
      target.style.left = '50%';
      target.style.width = 'auto';
      target.style.height = 'auto';

      toysSlot.prepend(target);

      this.showNumberToys(num);
    }
  }

  showNumberToys(number: string): void {
    const toySlot = document.querySelector(`.decor-toys__container [data-num = '${number}']`) as HTMLElement;
    const toysInSlot = toySlot.querySelectorAll('img').length;
    const numberToysSpan = toySlot.querySelector('.decor-toys__number-toys') as HTMLElement;

    numberToysSpan.textContent = toysInSlot.toString();
  }
}
