import './scss/all-styles.scss';

function turnOffPreloader(): void {
  const preloader: HTMLElement = document.querySelector('.preloader') as HTMLElement;

  function handlePreloaderTransitionEnd(): void {
    preloader.style.display = 'none';
    preloader.classList.remove('preloader_is-hiding');
    preloader.removeEventListener('transitionend', handlePreloaderTransitionEnd);
  }

  preloader.addEventListener('transitionend', handlePreloaderTransitionEnd);
  preloader.classList.add('preloader_is-hiding');
}

turnOffPreloader();
