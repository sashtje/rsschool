import ControllerTree from '../controller/controllertree';
import data from '../models/data';
import { TREE_NUMBER, BG_NUMBER, DEFAULT_TREE, DEFAULT_BG } from '../models/types';

export default class ViewTree {
  controllerTree: ControllerTree;

  rootElem: HTMLElement;

  audio: HTMLAudioElement;

  timerSnow?: NodeJS.Timer;

  snowContainerWidth?: number;

  snowContainerHeight?: number;

  constructor(controllerTree: ControllerTree, rootElem: HTMLElement) {
    this.controllerTree = controllerTree;
    this.rootElem = rootElem;
    this.audio = new Audio('./public/audio/audio.mp3');
    this.audio.loop = true;
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

    const snowflakesContainer = document.createElement('div');
    snowflakesContainer.className = 'tree__snowflakes';
    treeContainer.append(snowflakesContainer);

    window.addEventListener('resize', this.handleResizeWindow);

    this.snowContainerWidth = snowflakesContainer.offsetWidth;
    this.snowContainerHeight = snowflakesContainer.offsetHeight;

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
      return;
    }

    this.snowContainerWidth = snowflakesContainer.offsetWidth;
    this.snowContainerHeight = snowflakesContainer.offsetHeight;
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
}
