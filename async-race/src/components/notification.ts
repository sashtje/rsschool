enum NotificationClasses {
  IsHidden = 'notification_is_hidden',
  IsShown = 'notification_is_shown',
}

export default class CustomNotification {
  elem: HTMLElement;

  constructor() {
    this.elem = document.createElement('div');
    this.elem.className = `notification ${NotificationClasses.IsHidden}`;
  }

  showNotification(): void {
    this.elem.classList.remove(NotificationClasses.IsHidden);
    this.elem.classList.add(NotificationClasses.IsShown);
  }

  closeNotification(): void {
    this.elem.addEventListener('transitionend', this.hideNotification);
    this.elem.classList.remove(NotificationClasses.IsShown);
  }

  hideNotification = (): void => {
    this.elem.classList.add(NotificationClasses.IsHidden);
  };

  changeMessage(message: string): void {
    this.elem.textContent = message;
  }
}
