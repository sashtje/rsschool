import ControllerTree from '../controller/controllertree';
import { TREE_NUMBER, BG_NUMBER } from '../models/types';

export default class ViewTree {
  controllerTree: ControllerTree;

  rootElem: HTMLElement;

  audio: HTMLAudioElement;

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
  }

  initSettings(): void {
    const sound = document.getElementById('sound') as HTMLInputElement;
    const isSoundOn = this.controllerTree.getSoundSettings();

    if (isSoundOn) {
      sound.checked = true;
      this.playSound();
    }

    sound.addEventListener('change', this.handleSoundOnOff);


    const snow = document.getElementById('snow') as HTMLInputElement;
    const isSnowOn = this.controllerTree.getSnowSettings();

    if (isSnowOn) {
      snow.checked = true;
      //start snow
    }

    snow.addEventListener('change', this.handleSnowOnOff);

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
      //start snow
    } else {
      this.controllerTree.changeSnowSettings(false);
      //stop snow
    }
  }

  handleClickTrash = (): void => {
    this.controllerTree.clearTreeSettings();
    this.pauseSound();

    const sound = document.getElementById('sound') as HTMLInputElement;
    sound.checked = false;

    const snow = document.getElementById('snow') as HTMLInputElement;
    snow.checked = false;

    const prevActiveTree = document.querySelector('.tree-settings__item_is_active') as HTMLElement;
    prevActiveTree.classList.remove('tree-settings__item_is_active');

    const firstTree = document.querySelector('.tree-settings__item') as HTMLElement;
    firstTree.classList.add('tree-settings__item_is_active');

    
    //make active 1 bg
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
    this.controllerTree.changeActiveTree((tree as HTMLElement).dataset.tree as string);

    //change active tree
  }

  initBgForChoice(): void {

  }

  addListenersForGarlands(): void {

  }
}
