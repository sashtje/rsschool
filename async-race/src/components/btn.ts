export enum BtnClasses {
  Btn = 'btn',
  MainBtn = 'btn btn_is_main-btn',
  EngineStartBtn = 'btn btn_style_engine btn-start',
  EngineStopBtn = 'btn btn_style_engine btn-stop',
  SelectBtn = 'btn btn-select',
  RemoveBtn = 'btn btn-remove',
}

const getNewBtn = (
  classStr: string,
  content: string,
  handleClick: (() => void) | null,
  disabledBtn: boolean,
): HTMLElement => {
  const btn = document.createElement('button');

  btn.className = classStr;
  btn.textContent = content;
  if (handleClick) {
    btn.addEventListener('click', handleClick);
  }
  btn.disabled = disabledBtn;

  return btn;
};

export default getNewBtn;
