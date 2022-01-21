import getNewBtn, { BtnClasses } from '../components/btn';

class Header {
  header: HTMLElement;

  btnGarage: HTMLElement;

  btnWinners: HTMLElement;

  constructor() {
    this.header = document.createElement('header');
    this.header.className = 'header';

    const nav = document.createElement('nav');
    nav.className = 'control-panel';

    this.btnGarage = getNewBtn(BtnClasses.MainBtn, 'To garage', this.handleClickGarage, true);
    this.btnWinners = getNewBtn(BtnClasses.MainBtn, 'To winners', this.handleClickWinners, false);

    nav.append(this.btnGarage, this.btnWinners);
    this.header.append(nav);
  }

  handleClickGarage = (): void => {
    (this.btnGarage as HTMLButtonElement).disabled = true;
    (this.btnWinners as HTMLButtonElement).disabled = false;

    const event = new Event('show-garage-page', { bubbles: true });
    this.btnGarage.dispatchEvent(event);
  };

  handleClickWinners = (): void => {
    (this.btnGarage as HTMLButtonElement).disabled = false;
    (this.btnWinners as HTMLButtonElement).disabled = true;

    const event = new Event('show-winners-page', { bubbles: true });
    this.btnWinners.dispatchEvent(event);
  };
}

const header = new Header();

export default header;
