export enum BtnClasses {
  Btn = 'btn',
  MainBtn = 'btn btn_is_main-btn',
  EngineBtn = 'btn btn_style_engine',
};

const getNewBtn = (classStr: string, content: string, handleClick: () => void, disabledBtn: boolean): HTMLElement => {
    const btn = document.createElement('button');

    btn.className = classStr;
    btn.textContent = content;
    btn.addEventListener('click', handleClick);
    btn.disabled = disabledBtn;

    return btn;
  };

export default getNewBtn;