import getNewBtn, { BtnClasses } from "./btn";
import {RANGE_TOO_LIGHT_COLOR} from './../data/data';

export default class Car {
  car: HTMLElement;
  id: number;
  name: string;
  color: string;
  nameCarEl?: HTMLElement;
  btnSelect?: HTMLElement;
  btnRemove?: HTMLElement;
  btnStartEngine?: HTMLElement;
  btnStopEngine?: HTMLElement;
  carPictureEl?: HTMLElement;
  carTrackEl?: HTMLElement;
  animation?: Animation;
  time?: number;
  numberStart: number;
  isStopped: boolean;


  constructor(id: number, name: string, color: string) {
    this.car = document.createElement('div');
    this.car.className = "car";

    this.id = id;
    this.name = name;
    this.color = color;
    this.numberStart = 0;
    this.isStopped = true;

    const carControls = this.getCarControls();
    this.setCarTrack();

    this.car.append(carControls, this.carTrackEl!);
  }

  getCarControls(): HTMLElement {
    const carControls = document.createElement('div');
    carControls.className = 'car__controls';

    const controlPanel = document.createElement('div');
    controlPanel.className = 'control-panel';

    this.btnSelect = getNewBtn(BtnClasses.SelectBtn, 'Select', null, false);
    this.btnRemove = getNewBtn(BtnClasses.RemoveBtn, 'Remove', null, false);

    controlPanel.append(this.btnSelect, this.btnRemove);

    this.nameCarEl = document.createElement('h2');
    this.nameCarEl.className = 'car__name';
    this.nameCarEl.textContent = this.name;

    carControls.append(controlPanel, this.nameCarEl);

    return carControls;
  }

  setCarTrack(): void {
    this.carTrackEl = document.createElement('div');
    this.setColorForCarTrackEl();

    const carEngineBtnsBlock = this.getCarEngineBtnsBlock();
    this.carPictureEl = document.createElement('div');
    this.carPictureEl.className = 'car__picture';
    this.changeCarPictureColor();

    const flagPicture = document.createElement('div');
    flagPicture.className = 'finish-flag';
    flagPicture.innerHTML = this.getFlagPicture();

    this.carTrackEl.append(carEngineBtnsBlock, this.carPictureEl, flagPicture);
  }

  isCarColorTooLight(): boolean {
    if (this.color.length !== 7) return false;

    const r = 255 - parseInt(this.color.slice(1, 3), 16);
    const g = 255 - parseInt(this.color.slice(3, 5), 16);
    const b = 255 - parseInt(this.color.slice(5), 16);

    if (r < RANGE_TOO_LIGHT_COLOR && g < RANGE_TOO_LIGHT_COLOR && b < RANGE_TOO_LIGHT_COLOR) return true;

    return false;
  }

  setColorForCarTrackEl(): void {
    if (this.isCarColorTooLight()) {
      this.carTrackEl!.className = 'car__track car__track_is_dark';
    } else {
      this.carTrackEl!.className = 'car__track';
    }
  }

  getCarEngineBtnsBlock(): HTMLElement {
    const carEngineBtnsBlock = document.createElement('div');
    carEngineBtnsBlock.className = 'car__engine-btns control-panel';

    this.btnStartEngine = getNewBtn(BtnClasses.EngineStartBtn, 'A', null, false);
    this.btnStopEngine = getNewBtn(BtnClasses.EngineStopBtn, 'B', null, true);

    carEngineBtnsBlock.append(this.btnStartEngine, this.btnStopEngine);

    return carEngineBtnsBlock;
  }

  changeCarPictureColor(): void {
    this.setColorForCarTrackEl();
    this.carPictureEl!.innerHTML = Car.getCarPicture(this.color);
  }

  changeNameCar(): void {
    this.nameCarEl!.textContent = this.name;
  }

  static getCarPicture(color: string): string {
    return `<svg xmlns="http://www.w3.org/2000/svg"
              width="1280.000000pt" height="640.000000pt" viewBox="0 0 1280.000000 640.000000"
              preserveAspectRatio="xMidYMid meet">
              <g fill="${color}" transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)">
              <path d="M3525 5341 c-72 -18 -79 -28 -90 -121 -4 -30 -11 -62 -16 -71 -4 -9
              -97 -51 -206 -94 -774 -304 -1348 -540 -1603 -661 -163 -77 -222 -91 -421
              -104 -85 -5 -170 -14 -189 -20 -101 -32 -362 -58 -620 -63 l-115 -2 -47 -80
              c-47 -78 -47 -80 -29 -100 34 -36 35 -77 5 -177 -30 -99 -34 -178 -19 -370 5
              -67 4 -88 -6 -88 -29 0 -83 -56 -110 -114 -50 -106 -74 -343 -48 -467 13 -58
              13 -62 3 -159 -5 -54 16 -238 28 -244 2 -1 29 -20 61 -41 73 -49 123 -103 132
              -143 17 -79 167 -155 355 -181 104 -15 969 -97 1087 -104 l32 -2 5 160 c7 230
              50 394 146 559 281 479 917 673 1405 429 316 -159 530 -424 598 -742 22 -106
              29 -365 13 -519 l-8 -82 3002 0 c2855 0 3002 1 2995 18 -33 87 -56 325 -45
              461 28 320 177 567 459 759 399 273 847 282 1243 24 239 -157 397 -392 460
              -687 18 -84 15 -341 -5 -430 -8 -38 -14 -71 -12 -73 7 -8 386 20 478 34 180
              28 253 65 304 152 24 41 28 57 28 127 -1 44 -9 117 -20 163 -18 79 -18 88 -2
              190 31 199 40 306 41 497 1 176 -1 195 -23 260 -46 135 -103 190 -283 274
              -222 104 -633 220 -1168 330 -523 108 -1524 210 -2054 211 l-229 0 -236 139
              c-813 477 -1593 884 -1852 966 -498 157 -1598 195 -2892 100 l-188 -14 -47 30
              c-92 58 -223 89 -297 70z m1912 -311 c13 -45 58 -305 88 -515 33 -226 74 -539
              71 -542 -7 -7 -1672 40 -2054 58 -357 16 -464 56 -573 215 -62 91 -87 225 -59
              326 12 40 56 74 192 148 369 198 799 289 1618 340 246 15 290 16 510 16 l194
              -1 13 -45z m649 10 c383 -36 717 -86 934 -139 210 -52 451 -163 720 -332 141
              -88 379 -259 380 -271 0 -5 -14 -8 -32 -8 -48 0 -114 -37 -140 -78 -24 -39
              -30 -113 -15 -189 l9 -43 -904 0 -904 0 -176 540 -175 540 47 0 c25 0 141 -9
              256 -20z"/>
              <path d="M2617 3125 c-431 -82 -774 -440 -838 -875 -17 -117 -7 -292 24 -410
              113 -436 497 -751 947 -777 507 -29 959 313 1076 813 28 117 26 348 -4 467
              -94 378 -383 670 -760 768 -105 27 -336 34 -445 14z m378 -310 c84 -21 209
              -85 280 -142 116 -94 210 -242 251 -393 23 -87 24 -260 0 -355 -58 -237 -242
              -439 -473 -519 -531 -186 -1074 277 -969 828 30 152 94 274 206 386 111 110
              237 178 385 206 84 16 235 11 320 -11z"/>
              <path d="M2918 2568 c2 -90 7 -167 12 -172 17 -17 108 58 201 166 l51 57 -48
              31 c-52 33 -131 65 -185 75 l-34 6 3 -163z"/>
              <path d="M2591 2700 c-62 -22 -167 -82 -164 -94 3 -13 237 -216 249 -216 7 0
              15 7 18 16 8 20 8 127 -1 232 -7 95 -8 96 -102 62z"/>
              <path d="M3209 2355 c-57 -64 -105 -123 -107 -131 -6 -25 46 -35 157 -29 58 3
              121 8 139 11 33 5 34 6 27 42 -7 44 -64 167 -92 201 l-19 24 -105 -118z"/>
              <path d="M2260 2409 c-31 -44 -68 -133 -77 -186 l-6 -33 155 0 c165 0 201 9
              181 44 -13 24 -204 216 -214 216 -5 0 -22 -18 -39 -41z"/>
              <path d="M2786 2354 c-36 -35 0 -87 44 -64 26 14 26 56 1 70 -25 13 -27 13
              -45 -6z"/>
              <path d="M2751 2186 c-57 -32 -68 -111 -22 -157 43 -42 101 -43 143 -1 42 42
              41 100 -1 143 -33 32 -78 38 -120 15z"/>
              <path d="M2560 2136 c-19 -23 -8 -61 18 -64 44 -7 67 32 36 62 -19 20 -38 20
              -54 2z"/>
              <path d="M3002 2124 c-27 -19 -28 -36 -3 -58 25 -23 61 -6 61 29 0 33 -30 49
              -58 29z"/>
              <path d="M2245 1993 c-77 -6 -76 -5 -59 -65 16 -55 61 -146 92 -186 l18 -23
              103 122 c57 67 104 129 105 138 1 14 -14 16 -104 17 -58 0 -127 -1 -155 -3z"/>
              <path d="M3165 1981 c-44 -4 -61 -10 -63 -22 -3 -16 210 -229 228 -229 22 0
              86 141 105 228 l7 32 -109 -2 c-59 -1 -135 -4 -168 -7z"/>
              <path d="M2776 1914 c-19 -18 -19 -20 -6 -45 6 -11 21 -19 35 -19 20 0 45 24
              45 44 0 10 -32 36 -45 36 -7 0 -21 -7 -29 -16z"/>
              <path d="M2589 1743 c-86 -90 -139 -151 -139 -162 0 -25 179 -101 236 -101
              l27 0 -7 143 c-9 166 -13 187 -35 187 -9 0 -46 -30 -82 -67z"/>
              <path d="M2936 1801 c-6 -10 -24 -168 -29 -258 -3 -60 -2 -63 19 -63 79 0 262
              68 248 92 -5 7 -53 64 -108 126 -93 105 -117 124 -130 103z"/>
              <path d="M10723 3125 c-318 -58 -597 -266 -743 -555 -223 -441 -98 -996 289
              -1288 112 -84 188 -125 311 -166 274 -91 545 -70 802 61 552 282 735 983 392
              1500 -225 339 -651 521 -1051 448z m385 -315 c348 -98 579 -443 532 -796 -67
              -508 -596 -796 -1055 -574 -239 116 -396 352 -412 620 -20 335 192 640 516
              745 122 40 289 42 419 5z"/>
              <path d="M11017 2568 c3 -90 9 -167 14 -172 13 -14 53 18 155 122 l95 97 -23
              18 c-50 40 -189 97 -235 97 -10 0 -11 -33 -6 -162z"/>
              <path d="M10705 2706 c-50 -16 -133 -58 -163 -82 l-23 -19 121 -107 c67 -60
              128 -108 135 -108 23 0 27 39 20 186 -8 162 -4 157 -90 130z"/>
              <path d="M11307 2354 c-59 -65 -107 -126 -107 -136 0 -11 11 -18 38 -22 44 -7
              278 7 289 17 15 16 -51 183 -94 236 l-19 24 -107 -119z"/>
              <path d="M10362 2413 c-39 -62 -70 -134 -78 -184 l-7 -39 152 0 c86 0 161 5
              172 10 17 10 18 13 5 38 -8 15 -59 71 -114 125 l-99 99 -31 -49z"/>
              <path d="M10888 2359 c-24 -14 -23 -56 2 -69 44 -23 80 29 44 64 -18 19 -23
              19 -46 5z"/>
              <path d="M10851 2187 c-49 -29 -66 -101 -35 -146 9 -13 32 -29 50 -37 29 -12
              39 -12 68 0 99 41 85 180 -19 192 -24 3 -50 -1 -64 -9z"/>
              <path d="M10660 2136 c-19 -23 -8 -61 18 -64 44 -7 67 32 36 62 -19 20 -38 20
              -54 2z"/>
              <path d="M11096 2124 c-9 -8 -16 -22 -16 -29 0 -13 26 -45 36 -45 20 0 44 25
              44 45 0 14 -8 29 -19 35 -25 13 -27 13 -45 -6z"/>
              <path d="M10335 1991 c-60 -6 -60 -6 -57 -36 9 -69 104 -248 122 -229 57 61
              210 250 207 258 -4 12 -176 17 -272 7z"/>
              <path d="M11267 1983 c-68 -5 -79 -19 -47 -60 23 -31 200 -193 210 -193 3 0
              20 24 37 53 29 48 52 111 67 180 l6 27 -107 -2 c-60 -1 -134 -3 -166 -5z"/>
              <path d="M10870 1910 c-16 -31 4 -62 38 -58 21 2 28 9 30 32 5 45 -47 65 -68
              26z"/>
              <path d="M10651 1703 c-56 -59 -101 -113 -101 -120 0 -28 172 -103 237 -103
              l26 0 -7 123 c-10 179 -15 207 -36 207 -10 0 -63 -48 -119 -107z"/>
              <path d="M11035 1801 c-7 -12 -23 -144 -29 -243 -4 -77 -4 -78 19 -78 45 0
              130 22 193 51 l64 29 -19 23 c-65 82 -198 227 -209 227 -7 0 -15 -4 -19 -9z"/>
              </g>
              </svg>`;
  }

  getFlagPicture(): string {
    return `<svg data-name="Layer 1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><path d="M448.24,140.92l-.77-.77c-19.39-19.2-39.75-31.51-62.15-37.62v0l-1.8-.47h0l-2.06-.53v0c-17.63-4.21-36.52-4.7-59-1.51v0l-2.73.42h0l-1.43.21v0c-15.69,2.48-31.56,6.39-46.92,10.19-4.94,1.22-9.88,2.44-14.81,3.62h0c-20,4.76-41.36,9.16-62.57,9.16h0c-21.56,0-40.81-4.58-58.74-14l3.58-20.32A8,8,0,1,0,123,86.54L63.75,422.68A8,8,0,0,0,70.24,432a7.34,7.34,0,0,0,1.39.13,8,8,0,0,0,7.87-6.62l24.33-137.95c17.08,15.13,35,25.12,54.48,30.43v0l1.79.46h0l2.08.53v0a135,135,0,0,0,31.66,3.59,194.88,194.88,0,0,0,27.36-2.07v0l2.73-.41h0l1.42-.21v0c15.69-2.48,31.56-6.39,46.92-10.19,4.94-1.22,9.88-2.44,14.81-3.61h0c20-4.76,41.35-9.16,62.57-9.16h0c22.89,0,43.19,5.16,62.05,15.76l2.43,1.37.52-2.74c3.74-19.76,7.48-39.28,11.11-58l0-.13c3.72-19.19,7.45-38.14,11.08-56.32l0-.15c3.72-18.66,7.45-37,11.08-54.66ZM348,292.87c-20,.22-40.05,4.15-58.88,8.57,0-.1,0-.19,0-.28q5.19-31.52,10.36-62.94c16.48-3.58,37.66-7.31,58.93-6.05-.22,1.29-.45,2.59-.67,3.89l-.42,2.39q-.48,2.81-1,5.62l-.36,2.09C353.39,261.45,350.7,277.09,348,292.87Zm-161.71-111,.84-4.88c.16-.88.31-1.75.46-2.64.42-2.43.84-4.88,1.26-7.33a1.06,1.06,0,0,0,0-.19c2.22-12.88,4.47-26,6.73-39.19,20-.21,40-4.15,58.88-8.56l0,.15q-5.19,31.58-10.38,63.06c-16.49,3.58-37.66,7.31-58.93,6.05l.48-2.79C185.87,184.28,186.08,183.06,186.29,181.83Zm109.73,53h0c-8.25,1.84-16.6,3.89-24.69,5.89-11.2,2.77-22.75,5.62-34.14,7.89q5.2-31.44,10.41-63h0c8.25-1.84,16.6-3.89,24.69-5.89,11.2-2.77,22.75-5.62,34.15-7.89q-5.22,31.44-10.42,63ZM180.47,192c-.13.75-.25,1.49-.38,2.24-.28,1.58-.55,3.17-.83,4.76-.17,1-.33,1.91-.5,2.87-.29,1.69-.59,3.39-.88,5.09l-.21,1.18c-2.55,14.68-5.09,29.2-7.58,43.38-20-3.54-38.17-11.82-55.46-25.24l9.42-53.45A125.09,125.09,0,0,0,180.47,192Zm242,57.54a125.52,125.52,0,0,0-59.3-21c.11-.63.21-1.25.32-1.88q.48-2.72.94-5.41l.27-1.53c.36-2.1.73-4.21,1.09-6.3l.06-.34q1.44-8.26,2.86-16.43.54-3,1.06-6.06l0-.1c.45-2.56.89-5.11,1.34-7.65.05-.3.1-.6.16-.9l1.23-7,.08-.43c.32-1.83.64-3.64.95-5.45,21.41,3.8,40.81,13.05,59.22,28.24C429.37,214.13,425.91,231.71,422.45,249.52ZM380.73,105.46q-1.17,6.5-2.34,13.12l-.08.43q-2.06,11.51-4.13,23.29c-.05.24-.09.49-.13.74q-1.87,10.58-3.76,21.3h0v0c-17.22-2.51-36.09-1.73-59,2.43q1.9-11.47,3.8-22.93l1.38-8.27c.39-2.37.78-4.73,1.18-7.1q2-12.18,4.05-24.34C344.37,100.82,363.21,101.24,380.73,105.46ZM162.89,315q1.19-6.6,2.38-13.3l0-.27c2.65-14.86,5.34-30,8-45.34h.13c2,.3,4.08.54,6.16.75l.42,0c4.45.42,9,.65,13.74.65a215.59,215.59,0,0,0,38.51-3.87q-.93,5.56-1.85,11.13-4.27,25.82-8.56,51.52C199.25,319.65,180.41,319.23,162.89,315Z"/></svg>`;
  }

  setAnimation(): void {
    const endPos = this.getAnimationEndPos();

    this.animation = this.carPictureEl?.animate([
    {
        transform: 'translateX(0)'
    },
    {
        transform: `translateX(${endPos})`
    }
    ], {
        duration: this.time,
        fill: 'forwards'
    });
  }

  getAnimationEndPos(): string {
    const bodyWidth = document.body.offsetWidth;
    const sizeCar = this.carPictureEl?.getBoundingClientRect();
    const left = sizeCar?.left;
    const widthCar = sizeCar?.width;
    const bodyPadding = 10;
    const distanceAnimation = bodyWidth - widthCar! - left! - bodyPadding;

    return `${distanceAnimation}px`;
  }
}