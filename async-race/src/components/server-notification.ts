export enum ServNotClasses {
  IsHidden = 'server-notification_is_hidden',
  IsShown = 'server-notification_is_shown',
}

class ServerNotification {
  elem: HTMLElement;

  constructor() {
    this.elem = document.createElement('div');
    this.elem.className = `server-notification ${ServNotClasses.IsHidden}`;
    this.elem.innerHTML = this.getInnerLayout();

    this.elem.addEventListener('click', this.closeServerNotification);
  }

  getInnerLayout(): string {
    return `
    <div class="server-notification__message">
      <p>Нет связи с сервером.</p>
      <p>Проверьте включен ли сервер и попробуйте повторить желаемое действие.</p>
      <p>Чтобы закрыть это сообщение, нажмите в любом месте экрана.</p>
    </div>`;
  }

  showServerNotification() {
    this.elem.classList.remove(ServNotClasses.IsHidden);
    this.elem.classList.add(ServNotClasses.IsShown);
  }

  closeServerNotification = (): void => {
    this.elem.addEventListener('transitionend', this.hideServerNotification);
    this.elem.classList.remove(ServNotClasses.IsShown);
  };

  hideServerNotification = (): void => {
    this.elem.classList.add(ServNotClasses.IsHidden);
  };
}

const serverNotification = new ServerNotification();

export default serverNotification;
