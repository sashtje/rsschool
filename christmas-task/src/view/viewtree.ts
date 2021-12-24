import ControllerTree from '../controller/controllertree';

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
  }

  initSettings(): void {
    const sound = document.getElementById('sound') as HTMLInputElement;
    const isSoundOn = this.controllerTree.getSoundSettings();

    if (isSoundOn) {
      sound.checked = true;
      this.playSound();
    }

    sound.addEventListener('change', this.handleSoundOnOff);


    /* const snow
    const trash */
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
}
