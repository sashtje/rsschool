(()=>{"use strict";const e=!0,t=!1,s=new class{lang=0;sound=t;volumeSound=0;time=t;durationTime=5;constructor(){this.downloadSettings(),window.addEventListener("beforeunload",this.writeSettingsToLocalStorage)}downloadSettings(){if(localStorage.getItem("settings")){let e=JSON.parse(localStorage.getItem("settings"));for(let t of Object.keys(e))this[t]=e[t]}}writeSettingsToLocalStorage=()=>{localStorage.setItem("settings",JSON.stringify({lang:this.lang,sound:this.sound,volumeSound:this.volumeSound,time:this.time,durationTime:this.durationTime}))};saveSettings(){let s=document.querySelector(".settings-lang__checkbox"),a=document.querySelector(".settings-sound__checkbox"),i=document.querySelector(".settings-time__checkbox"),r=document.querySelector(".settings-sound__range"),n=document.querySelector(".settings-time__range");s.checked?this.lang=1:this.lang=0,a.checked?this.sound=e:this.sound=t,this.volumeSound=r.value,i.checked?this.time=e:this.time=t,this.durationTime=n.value}};function a(e,t){e.style.background="linear-gradient(to right, #b14c00 0%, #b14c00 "+100*t+"%, #6d6d6d "+100*t+"%, #6d6d6d 100%)"}function i(e,t,s,a){0!==t&&25!==t?t=(46+36*(t/5-1))/2:t*=4,e.style.background="linear-gradient(to right, #b14c00 0%, #b14c00 "+t+"%, #6d6d6d "+t+"%, #6d6d6d 100%)",s.textContent=a}class r{wasPlayed=!1;results=[];numberRightAnswers=0;pictures=10;constructor(e,t,s,a){this.number=e,this.firstPic=t,this.srcCategoryCover=s,this.typeCategory=a;for(let e=0;e<this.pictures;e++)this.results.push(0);this.downloadResults(),window.addEventListener("beforeunload",this.writeResultsToLocalStorage)}downloadResults(){let e=`${this.typeCategory} - ${this.number}`;if(localStorage.getItem(e)){let t=JSON.parse(localStorage.getItem(e));this.wasPlayed=t.wasPlayed,this.numberRightAnswers=t.numberRightAnswers,this.results=t.results.slice(0)}}writeResultsToLocalStorage=()=>{let e=`${this.typeCategory} - ${this.number}`;localStorage.setItem(e,JSON.stringify({wasPlayed:this.wasPlayed,numberRightAnswers:this.numberRightAnswers,results:this.results}))}}let n=[],o=[];for(let e=1;e<=12;e++){let t=1+10*(e-1),s=`../assets/img/artist-covers/cover-${e}.jpg`,a=121+10*(e-1),i=`../assets/img/picture-covers/cover-${e}.jpg`;n.push(new r(e,t,s,"artist")),o.push(new r(e,a,i,"picture"))}class c{constructor(){this.app=document.getElementById("app"),this.app.addEventListener("transitionend",this.handleTransitionEndForPage)}switchPage(e,t,s,a,i){this.from=e,this.to=t,this.fromPageID=this.getPageID(e),this.toPageID=this.getPageID(t),this.categoryNumber=s,this.fileJSON=a,this.gameObj=i,this.app.classList.toggle("app_is-hide")}getPageID(e){switch(e){case 0:return"main-page";case 1:return"settings";case 2:return"art-cat";case 3:return"pic-cat";case 4:return"art-game";case 5:return"pic-game";case 6:return"res-game"}}handleTransitionEndForPage=t=>{if(t.target===this.app)if(this.app.classList.contains("app_is-hide")){let e=document.getElementById(this.fromPageID),t=document.getElementById(this.toPageID);e.classList.add(this.fromPageID+"_is-not-visible"),t.classList.remove(this.toPageID+"_is-not-visible"),this.translateToPage(),this.app.classList.toggle("app_is-hide")}else if(s.time===e)switch(this.to){case 4:case 5:let e=new Event("start-timer");t.target.dispatchEvent(e)}};translateToPage(){switch(this.to){case 0:this.translateHomePage();break;case 1:this.downloadSettings(),this.translateSettingsPage();break;case 2:this.prepareCategoriesToShow(this.getPageID(2),n,"public/assets/icons/artist.png"),this.translateArtistCategoriesPage();break;case 3:this.prepareCategoriesToShow(this.getPageID(3),o,"public/assets/icons/picture.png"),this.translatePictureCategoriesPage();break;case 4:this.generateArtistQuizPage();break;case 5:this.generatePictureQuizPage();break;case 6:this.generateResultsPage()}}translateHomePage(){let e=document.querySelector(".main-page__artist-quiz-subtitle"),t=document.querySelector(".main-page__picture-quiz-subtitle");switch(s.lang){case 0:e.textContent="Artist Quiz",t.textContent="Picture Quiz";break;case 1:e.textContent="Художники",t.textContent="Картины"}}downloadSettings(){let r=document.querySelector(".settings-lang__checkbox"),n=document.querySelector(".settings-sound__checkbox"),o=document.querySelector(".settings-time__checkbox"),c=document.querySelector(".settings-sound__range"),d=document.querySelector(".settings-time__range"),l=document.querySelector(".settings-time__time-value");switch(s.lang){case 0:r.checked=!1;break;case 1:r.checked=!0}switch(s.sound){case e:n.checked=!0,c.disabled=!1,c.value=s.volumeSound,a(c,c.value);break;case t:n.checked=!1,c.disabled=!0,c.value=s.volumeSound}switch(s.time){case e:o.checked=!0,d.disabled=!1,d.value=s.durationTime,i(d,d.value-5,l,d.value);break;case t:o.checked=!1,d.disabled=!0,d.value=s.durationTime}}translateSettingsPage(){let e=document.querySelector(".settings-lang__checkbox"),t=document.querySelector(".settings__title"),s=document.querySelector(".settings-lang__title"),a=document.querySelector(".settings-sound__title"),i=document.querySelector(".settings-sound__off"),r=document.querySelector(".settings-sound__on"),n=document.querySelector(".settings-time__title"),o=document.querySelector(".settings-time__off"),c=document.querySelector(".settings-time__on"),d=document.querySelector(".settings__btn-save"),l=0;switch(e.checked&&(l=1),l){case 0:t.textContent="Settings",s.textContent="Language",a.textContent="Sound",i.textContent="off",r.textContent="on",n.textContent="Time",o.textContent="off",c.textContent="on",d.textContent="Save";break;case 1:t.textContent="Настройки",s.textContent="Язык",a.textContent="Звук",i.textContent="выкл",r.textContent="вкл",n.textContent="Время",o.textContent="выкл",c.textContent="вкл",d.textContent="Сохранить"}}prepareCategoriesToShow(e,t,s){let a=document.querySelectorAll(`.${e} .category`);if(12===a.length)for(let e=0;e<12;e++)t[e].wasPlayed&&(a[e].classList.contains("category_was-not-played")&&a[e].classList.remove("category_was-not-played"),a[e].querySelector(".category__res-number").textContent=t[e].numberRightAnswers);else{let a=document.querySelector(`.${e} .cat__container`);for(let i=0;i<12;i++){let r=document.createElement("div");t[i].wasPlayed?r.className="cat__category category":r.className="cat__category category category_was-not-played";let n="artist";"pic-cat"===e&&(n="picture"),r.style.backgroundImage=`url("public/assets/img/${n}-covers/cover-${i+1}.jpg")`,r.innerHTML=`<div class="category__container">\n                <div class="category__body">\n                  <button class="category__res-btn">\n                    <img\n                      src="${s}"\n                      alt="icon"\n                      class="category__res-icon"\n                    />\n                    <span class="category__res-number">${t[i].numberRightAnswers}</span>\n                  </button>\n\n                  <div class="category__number">${t[i].number}</div>\n                </div>\n              </div>`,a.append(r)}}}translateArtistCategoriesPage(){let e=document.querySelector(".art-cat .cat__title");switch(s.lang){case 0:e.textContent="Artist categories";break;case 1:e.textContent="Категории художников"}}translatePictureCategoriesPage(){let e=document.querySelector(".pic-cat .cat__title");switch(s.lang){case 0:e.textContent="Picture categories";break;case 1:e.textContent="Категории картин"}}generateResultsPage(){let e=document.querySelector(".res-game__title"),t=document.querySelector(".res-game__category");switch(s.lang){case 0:e.textContent="Results",t.textContent="Category";break;case 1:e.textContent="Результаты",t.textContent="Категория"}document.querySelector(".res-game__category-number").textContent=this.categoryNumber;let a,i=document.querySelector(".res-game__right-answers-number"),r=document.querySelector(".res-game__right-answers-icon");switch(this.from){case 2:a=n[this.categoryNumber-1],r.classList.contains("res-game__right-answers-icon_picture")&&r.classList.remove("res-game__right-answers-icon_picture"),r.classList.contains("res-game__right-answers-icon_artist")||r.classList.add("res-game__right-answers-icon_artist");break;case 3:a=o[this.categoryNumber-1],r.classList.contains("res-game__right-answers-icon_artist")&&r.classList.remove("res-game__right-answers-icon_artist"),r.classList.contains("res-game__right-answers-icon_picture")||r.classList.add("res-game__right-answers-icon_picture")}i.textContent=a.numberRightAnswers,this.fillContainerWithResultsGallery(a)}fillContainerWithResultsGallery(e){let t=document.querySelector(".res-game__container");t.innerHTML="";for(let a=1;a<=e.pictures;a++){let i=document.createElement("div");i.className="res-game__rs-pic rs-pic",0===e.results[a-1]&&(i.className+=" rs-pic_was-wrong-answer");let r=e.firstPic+a-1,n=this.fileJSON[r-1],o=n.nameEn,c=n.authorEn;1===s.lang&&(o=n.name,c=n.author);let d=n.year;i.innerHTML=`<div class="rs-pic__container">\n                <div class="rs-pic__back">\n                  <div class="rs-pic__icon-answer"></div>\n                  <div class="rs-pic__picture-title">\n                    "${o}"\n                  </div>\n                  <div class="rs-pic__author">${c}</div>\n                  <div class="rs-pic__year">${d}</div>\n                </div>\n\n                <div class="rs-pic__front">\n                  <button class="rs-pic__full-screen-btn"></button>\n                  <button class="rs-pic__download-btn"></button>\n                </div>\n              </div>`,i.querySelector(".rs-pic__front").style.setProperty("--back-image",`url("https://raw.githubusercontent.com/sashtje/image-data/master/img/${r}.webp")`),t.append(i)}}generateArtistQuizPage(){if(0===this.gameObj.curPicture){let e=document.querySelector(".art-game .header-game__question");switch(s.lang){case 0:e.textContent="Who is the author of this picture?";break;case 1:e.textContent="Кто автор этой картины?"}this.gameObj.generateSetsArtists();let t=document.querySelectorAll(".art-game__dots .game-dots__item");for(let e=0;e<t.length;e++)t[e].className="game-dots__item"}let t=document.querySelector(".art-game .header-game__timer");s.time===e?(t.classList.add("header-game__timer_is-shown"),t.querySelector(".header-game__time").textContent=s.durationTime.toString().padStart(2,"0")):t.classList.contains("header-game__timer_is-shown")&&t.classList.remove("header-game__timer_is-shown");let a=document.querySelector(".art-game__picture-container"),i=`https://raw.githubusercontent.com/sashtje/image-data/master/img/${this.gameObj.categoryObj.firstPic+this.gameObj.curPicture}.webp`;a.style.backgroundImage=`url("${i}")`;let r=this.gameObj.generateAnswerOptionsForArtistQuiz(),n=document.querySelectorAll(".art-game__answer-item");for(let e=0;e<4;e++)n[e].textContent=r[e]}generatePictureQuizPage(){if(0===this.gameObj.curPicture){let e=document.querySelectorAll(".pic-game__dots .game-dots__item");for(let t=0;t<e.length;t++)e[t].className="game-dots__item"}let t=document.querySelector(".pic-game .header-game__timer");s.time===e?(t.classList.add("header-game__timer_is-shown"),t.querySelector(".header-game__time").textContent=s.durationTime.toString().padStart(2,"0")):t.classList.contains("header-game__timer_is-shown")&&t.classList.remove("header-game__timer_is-shown");let a,i=document.querySelector(".pic-game .header-game__question"),r=this.gameObj.categoryObj.firstPic+this.gameObj.curPicture,n=r-1;switch(s.lang){case 0:a=this.fileJSON[n].authorEn,i.textContent=`Which is a picture by ${a}?`;break;case 1:a=this.fileJSON[n].author,i.textContent=`Какую из этих картин написал ${a}?`}let o=this.gameObj.generateAnswerOptionsForPictureQuiz(r),c=document.querySelectorAll(".pic-game__answer-item");for(let e=0;e<4;e++){let t=`https://raw.githubusercontent.com/sashtje/image-data/master/img/${o[e]}.webp`;c[e].style.backgroundImage=`url("${t}")`}}}class d{numberRightAnswers=0;curPicture=0;results=[];constructor(e,t){this.categoryObj=e,this.fileJSON=t;for(let e=0;e<10;e++)this.results.push(-1)}generateSetsArtists(){let e=new Set;for(let t=0;t<this.fileJSON.length;t++)switch(s.lang){case 0:e.add(this.fileJSON[t].authorEn);break;case 1:e.add(this.fileJSON[t].author)}this.arrUniqArtist=Array.from(e)}generateAnswerOptionsForArtistQuiz(){let e,t=[];switch(s.lang){case 0:e=this.fileJSON[this.categoryObj.firstPic+this.curPicture-1].authorEn;break;case 1:e=this.fileJSON[this.categoryObj.firstPic+this.curPicture-1].author}return t.push(e),this.addWrongAnswersForArtQuiz(t),this.shuffleAnswers(t),this.indexRightAnswer=t.indexOf(e),t}addWrongAnswersForArtQuiz(e){let t,s;for(;e.length<4;)t=this.getRandomIndex(0,this.arrUniqArtist.length-1),s=this.arrUniqArtist[t],-1===e.indexOf(s)&&e.push(s)}getRandomIndex(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}shuffleAnswers(e){for(let t=e.length-1;t>0;t--){let s=Math.floor(Math.random()*(t+1));[e[t],e[s]]=[e[s],e[t]]}}generateAnswerOptionsForPictureQuiz(e){let t=[],s=this.fileJSON[e-1].author;return this.addWrongAnswersForPicQuiz(t,s),t.push(e),this.shuffleAnswers(t),this.indexRightAnswer=t.indexOf(e),t}addWrongAnswersForPicQuiz(e,t){let s,a;for(;e.length<3;){a=!0,s=this.getRandomIndex(1,240);for(let i=0;i<e.length;i++)if(s===e[i]||this.fileJSON[s-1].author===t){a=!1;break}a&&e.push(s)}}}new class{dataImages=[];currPageType=0;appSwitcher={};wereAlreadyOpened=[];constructor(){this.appSwitcher=new c,this.appSwitcher.translateHomePage(),this.addListenersForMainPage(),this.addSounds(),this.downloadDataImages(),console.log('Здравствуйте!\n-------------------------------------------------------------\n  Моя самооценка:\n\n  1. Стартовая страница и навигация +20\n    ☑ вёрстка, дизайн, UI стартовой страницы приложения. Выполняются требования к вёрстке и оформлению приложения (+10)\n    ☑ реализована навигация по страницам приложения (+10)\n\n  2. Настройки +40\n    ☑ в настройках есть возможность включать/выключать звук, есть регулятор громкости звука. Если звук включён, есть звуковая индикация разная для правильных и неправильных ответов, звуковое сопровождение окончания раунда (+10)\n    ☑ в настройках есть возможность включать/выключать игру на время. Если выбрана игра на время, на странице с вопросами викторины отображается таймер, отсчитывающий время, которое отведено для ответа на вопрос (+10)\n    ☑ в настройках можно указать время для ответа на вопрос в интервале от 5 до 30 секунд с шагом в 5 секунд. Если время истекает, а ответа нет, это засчитывается как неправильный ответ на вопрос (+10)\n    ☑ при перезагрузке страницы приложения выбранные настройки сохраняются (+10)\n\n  3. Страница категорий +30\n    ☑ вёрстка, дизайн, UI страницы категории. Выполняются требования к вёрстке и оформлению приложения (+10)\n    ☑ карточка сыгранной категории внешне отличается от карточки категории, которая ещё не игралась (+10)\n    ☑ на карточке сыгранной категории отображается результат прохождения раунда - количество вопросов, на которые был дан правильный ответ (+10)\n\n  4. Страница с вопросами +50\n    ☑ вёрстка, дизайн, UI страницы с вопросами. Выполняются требования к вёрстке и оформлению приложения (+10)\n    ☑ варианты ответов на вопросы генерируются случайным образом (+10)\n    ☑ правильным и неправильным ответам пользователя соответствуют индикаторы разного цвета (+10)\n    ☑ после того, как ответ выбран, появляется модальное окно с правильным ответом на вопрос и кнопкой "Продолжить". При клике по кнопке "Продолжить" пользователь переходит к следующему вопросу категории (+10)\n    ☑ после окончания раунда выводится уведомление об окончании раунда и его результат - количество вопросов, на которые был дан правильный ответ. Есть кнопка "Продолжить" при клике по которой пользователь перенаправляется на страницу категорий данного типа вопросов (+10)\n\n  5. Страница с результатами +50\n    ☑ вёрстка, дизайн, UI страницы с результатами. Выполняются требования к вёрстке и оформлению приложения (+10)\n    ☑ страница с результатами содержит превью всех картин категории (+10)\n    ☑ картины, на вопросы про которые или про их авторов был дан правильный ответ, цветные; картины, на вопросы про которые или про их авторов был дан неправильный ответ, черно-белые (+10)\n    ☑ при клике по картине выводится информация о ней - название, автор, год создания (+10)\n    ☑ если раунд переигрывался, и результаты изменились, эти изменения отображаются на странице с результатами (+10)\n\n  6. Плавная смена изображений; картинки сначала загружаются, потом отображаются; нет ситуации, когда пользователь видит частично загрузившиеся изображения. Плавную смену изображений не проверяем: 1) при загрузке и перезагрузке приложения 2) при открытой консоли браузера (+0)\n\n  ======== не успела доделать данный пункт, пока есть только прелоадер для начального экрана =========\n\n  7. Реализована анимация отдельных деталей интерфейса, также анимированы переходы и взаимодействия, чтобы работа с приложением шла плавным и непрерывным потоком (+20)\n\n  Анимации: смена страниц приложения, \n  кнопка с Ripple-эффектом на странице настроек, \n  3Д - анимация на странице с результатами, \n  окно с правильным ответом.\n\n  8. Дополнительный функционал на выбор (+14)\n    ☑ разные уведомления по окончанию раунда в зависимости от результата (+2)\n    от 0 до 5 правильных ответов - Game Over,\n    от 6 до 9 - Good job,\n    10 правильный ответов Victory.\n    ☑ перевод приложения на два языка (+5)\n    ☑ возможность скачать картину на компьютер (+5)\n    ☑ возможность посмотреть картины в полном размере на экране на странице с результатами (+2)\n\n  Итого: 224 балла\n-------------------------------------------------------------\n  ')}addSounds(){this.audioSwitch=new Audio,this.audioSwitch.src="./public/assets/sound/sound-for-switching-pages.mp3",this.rightAnswerAudio=new Audio,this.rightAnswerAudio.src="./public/assets/sound/right-answer.mp3",this.wrongAnswerAudio=new Audio,this.wrongAnswerAudio.src="./public/assets/sound/wrong-answer.mp3",this.gameOverAudio=new Audio,this.gameOverAudio.src="./public/assets/sound/game-over.mp3",this.goodJobAudio=new Audio,this.goodJobAudio.src="./public/assets/sound/good-job.mp3",this.victoryAudio=new Audio,this.victoryAudio.src="./public/assets/sound/victory.mp3"}checkForSwitchingSoundEffect(t){if(s.sound===e)switch(t){case"switch-page":this.audioSwitch.volume=s.volumeSound,this.audioSwitch.play();break;case"right-answer":this.rightAnswerAudio.volume=s.volumeSound,this.rightAnswerAudio.play();break;case"wrong-answer":this.wrongAnswerAudio.volume=s.volumeSound,this.wrongAnswerAudio.play();break;case"game-over":this.gameOverAudio.volume=s.volumeSound,this.gameOverAudio.play();break;case"good-job":this.goodJobAudio.volume=s.volumeSound,this.goodJobAudio.play();break;case"victory":this.victoryAudio.volume=s.volumeSound,this.victoryAudio.play()}}openSettingsPage=()=>{this.checkForSwitchingSoundEffect("switch-page"),this.appSwitcher.switchPage(this.currPageType,1),this.currPageType=1,this.wereAlreadyOpened.includes("settings")||this.addListenersForSettingsPage()};returnToHomePageFromSettings=e=>{let t=document.querySelector(".settings__btn-save");const a=e.clientX,i=e.clientY,r=e.target.getBoundingClientRect(),n=r.top,o=a-r.left,c=i-n,d=document.createElement("span");d.classList.add("settings__btn-save-circle"),d.style.top=c+"px",d.style.left=o+"px",t.appendChild(d),s.saveSettings(),setTimeout((()=>{d.remove(),this.returnToHomePage()}),100)};addListenersForMainPage(){this.wereAlreadyOpened.push("main-page"),document.querySelector(".main-page__btn-settings").addEventListener("click",this.openSettingsPage),document.querySelector(".main-page__body").addEventListener("click",(e=>{let t=e.target;t.closest(".main-page__artist-quiz-btn")?this.openCategoriesPage(2,"artist-category",".art-cat"):t.closest(".main-page__picture-quiz-btn")&&this.openCategoriesPage(3,"picture-category",".pic-cat")}))}addListenersForSettingsPage(){this.wereAlreadyOpened.push("settings"),document.querySelector(".settings__btn-save").addEventListener("click",this.returnToHomePageFromSettings);let e=document.querySelector(".settings-lang__checkbox"),t=document.querySelector(".settings-sound__checkbox"),s=document.querySelector(".settings-time__checkbox"),r=document.querySelector(".settings-sound__range"),n=document.querySelector(".settings-time__range"),o=document.querySelector(".settings-time__time-value");e.addEventListener("change",(()=>{this.appSwitcher.translateSettingsPage()})),t.addEventListener("change",(()=>{t.checked?r.disabled=!1:(r.disabled=!0,r.style.background="",r.value=0)})),s.addEventListener("change",(()=>{s.checked?n.disabled=!1:(n.disabled=!0,n.style.background="",n.value=5,o.textContent="5")})),r.addEventListener("input",(function(){a(this,this.value)})),n.addEventListener("input",(function(){i(this,this.value-5,o,this.value)}))}async downloadDataImages(){try{let e=await fetch("https://raw.githubusercontent.com/sashtje/image-data/master/images.json");this.dataImages=await e.json(),this.turnOffPreloader()}catch(e){console.log("Failed to download images.json: "),console.log(e)}}turnOffPreloader(){let e=document.querySelector(".preloader");e.addEventListener("transitionend",(function t(){e.style.display="none",e.classList.remove("preloader_is-hiding"),e.removeEventListener("transitionend",t)})),e.classList.add("preloader_is-hiding")}openCategoriesPage=(e,t,s)=>{this.checkForSwitchingSoundEffect("switch-page"),this.appSwitcher.switchPage(this.currPageType,e),this.currPageType=e,this.wereAlreadyOpened.includes(t)||this.addListenersForCategoryPage(e,t,s)};addListenersForCategoryPage(e,t,s){this.wereAlreadyOpened.push(t),document.querySelector(`${s} .cat__btn-home`).addEventListener("click",this.returnToHomePage),document.querySelector(`${s} .cat__container`).addEventListener("click",(t=>{let s=t.target,a=s.closest(".category__res-btn"),i=s.closest(".category");if(!a&&!i)return;let r=i.querySelector(".category__number").textContent;a?this.openResultsPage(e,r):this.startGame(e,r)}))}returnToHomePage=()=>{this.appSwitcher.switchPage(this.currPageType,0),this.checkForSwitchingSoundEffect("switch-page"),this.currPageType=0};openResultsPage=(e,t)=>{this.checkForSwitchingSoundEffect("switch-page"),this.appSwitcher.switchPage(this.currPageType,6,t,this.dataImages),this.currPageType=6;let s=document.querySelector(".res-game__btn-categories");switch(this.wereAlreadyOpened.includes("results")||this.addListenersForResultsPage(),e){case 2:try{s.removeEventListener("click",this.handleBackToPictureCategories)}catch(e){}s.addEventListener("click",this.handleBackToArtistCategories);break;case 3:try{s.removeEventListener("click",this.handleBackToArtistCategories)}catch(e){}s.addEventListener("click",this.handleBackToPictureCategories)}};addListenersForResultsPage(){this.wereAlreadyOpened.push("results"),document.querySelector(".res-game__btn-home").addEventListener("click",this.returnToHomePage),document.querySelector(".res-game__btn-close-modal-window").addEventListener("click",(function(){document.querySelector(".res-game__modal-window").classList.remove("res-game__modal-window_is-shown")})),document.querySelector(".res-game__container").addEventListener("click",(e=>{let t=e.target,s=t.closest(".rs-pic__full-screen-btn"),a=t.closest(".rs-pic__download-btn"),i=t.closest(".rs-pic");(s||a||i)&&(s?this.showPictureOnFullScreen(i):a?this.downloadPicture(i):i.classList.toggle("rs-pic_is-turned-around"))}))}handleBackToArtistCategories=()=>{this.returnToCategoriesPage(2)};handleBackToPictureCategories=()=>{this.returnToCategoriesPage(3)};returnToCategoriesPage=e=>{this.checkForSwitchingSoundEffect("switch-page"),this.appSwitcher.switchPage(this.currPageType,e),this.currPageType=e};getOriginalPictureURL=e=>{let t=e.querySelector(".rs-pic__front"),s=getComputedStyle(t).getPropertyValue("--back-image").split("."),a=s.slice(0,-1).join(".")+"full."+s[s.length-1];return s=a.split("/"),a=s.slice(0,-2).join("/")+"/full/"+s[s.length-1],a};showPictureOnFullScreen=e=>{let t=this.getOriginalPictureURL(e),s=document.querySelector(".res-game__modal-window");s.style.backgroundImage=t,s.classList.add("res-game__modal-window_is-shown")};downloadPicture=e=>{let t=this.getOriginalPictureURL(e).slice(5,-2),s=new Image;s.onload=()=>{let e=document.createElement("canvas");e.width=s.width,e.height=s.height,e.getContext("2d").drawImage(s,0,0);let t=document.createElement("a");t.download="picture.jpg",t.href=e.toDataURL(),t.click(),t.delete},s.src=t,s.crossOrigin="anonymous"};startGame=(e,t)=>{let s;switch(e){case 2:s=n[t-1];break;case 3:s=o[t-1]}switch(this.gameObj=new d(s,this.dataImages),this.wereAlreadyOpened.includes("start-timer")||document.getElementById("app").addEventListener("start-timer",this.handleStartTimer),e){case 2:this.openArtGamePage();break;case 3:this.openPicGamePage()}};handleStartTimer=()=>{let e;switch(this.wereAlreadyOpened.push("start-timer"),this.currPageType){case 4:e=".art-game .header-game__time";break;case 5:e=".pic-game .header-game__time"}let t=document.querySelector(e);this.timer=setInterval((()=>{let e=+t.textContent-1;t.textContent=e.toString().padStart(2,"0"),0===e&&(clearInterval(this.timer),this.handleTimeIsOver())}),1e3)};handleTimeIsOver(){let e;switch(this.currPageType){case 4:e=".art-game";break;case 5:e=".pic-game"}document.querySelectorAll(`${e} .game-dots__item`)[this.gameObj.curPicture].classList.add("game-dots__item_is-wrong-answer"),this.gameObj.results[this.gameObj.curPicture]=0,this.checkForSwitchingSoundEffect("wrong-answer");let t=document.querySelector(".answer-modal-window");t.classList.add("modal-window_is-shown");let a=document.querySelector(".answer-modal-window__icon-answer"),i=document.querySelector(".answer-modal-window__picture-container"),r=document.querySelector(".answer-modal-window__picture-name"),n=document.querySelector(".answer-modal-window__picture-author"),o=document.querySelector(".answer-modal-window__picture-year");a.style.backgroundImage='url("./public/assets/svg/wrong-answer.svg")';let c=this.gameObj.categoryObj.firstPic+this.gameObj.curPicture,d=`https://raw.githubusercontent.com/sashtje/image-data/master/img/${c}.webp`;switch(i.style.backgroundImage=`url("${d}")`,o.textContent=this.dataImages[c-1].year,s.lang){case 0:r.textContent=this.dataImages[c-1].nameEn,n.textContent=this.dataImages[c-1].authorEn;break;case 1:r.textContent=this.dataImages[c-1].name,n.textContent=this.dataImages[c-1].author}let l=document.querySelector(".answer-modal-window__btn-next");this.wereAlreadyOpened.includes("nextBtn")||l.addEventListener("click",this.handleBtnNext),setTimeout((()=>{t.classList.add("modal-window_is-shown-background"),t.classList.add("modal-window_is-shown-window")}),1)}openArtGamePage(){this.checkForSwitchingSoundEffect("switch-page"),this.appSwitcher.switchPage(this.currPageType,4,void 0,this.dataImages,this.gameObj),this.currPageType=4,this.wereAlreadyOpened.includes("art-game")||this.addListenersForArtGamePage()}openPicGamePage(){this.checkForSwitchingSoundEffect("switch-page"),this.appSwitcher.switchPage(this.currPageType,5,void 0,this.dataImages,this.gameObj),this.currPageType=5,this.wereAlreadyOpened.includes("pic-game")||this.addListenersForPicGamePage()}addListenersForArtGamePage(){this.wereAlreadyOpened.push("art-game"),document.querySelector(".art-game .header-game__btn-categories").addEventListener("click",(()=>{void 0!==this.timer&&clearInterval(this.timer),this.openCategoriesPage(2,"artist-category",".art-cat")})),document.querySelector(".art-game .header-game__btn-home").addEventListener("click",(()=>{void 0!==this.timer&&clearInterval(this.timer),this.returnToHomePage()})),document.querySelector(".art-game__answers").addEventListener("click",(e=>{let t,a,i=e.target.closest(".art-game__answer-item");if(!i)return;void 0!==this.timer&&clearInterval(this.timer);let r=document.querySelectorAll(".art-game__answer-item");for(let e=0;e<r.length;e++)if(r[e]===i){a=e;break}t=a===this.gameObj.indexRightAnswer;let n,o,c=document.querySelectorAll(".art-game__dots .game-dots__item");t?(i.classList.add("art-game__answer-item_is-right-answer"),c[this.gameObj.curPicture].classList.add("game-dots__item_is-right-answer"),this.gameObj.results[this.gameObj.curPicture]=1,this.gameObj.numberRightAnswers++,n="right-answer",o='url("./public/assets/svg/right-answer.svg")'):(i.classList.add("art-game__answer-item_is-wrong-answer"),c[this.gameObj.curPicture].classList.add("game-dots__item_is-wrong-answer"),this.gameObj.results[this.gameObj.curPicture]=0,n="wrong-answer",o='url("./public/assets/svg/wrong-answer.svg")'),this.checkForSwitchingSoundEffect(n);let d=document.querySelector(".answer-modal-window");d.classList.add("modal-window_is-shown");let l=document.querySelector(".answer-modal-window__icon-answer"),u=document.querySelector(".answer-modal-window__picture-container"),g=document.querySelector(".answer-modal-window__picture-name"),h=document.querySelector(".answer-modal-window__picture-author"),m=document.querySelector(".answer-modal-window__picture-year");l.style.backgroundImage=o;let w=this.gameObj.categoryObj.firstPic+this.gameObj.curPicture,_=`https://raw.githubusercontent.com/sashtje/image-data/master/img/${w}.webp`;switch(u.style.backgroundImage=`url("${_}")`,m.textContent=this.dataImages[w-1].year,s.lang){case 0:g.textContent=this.dataImages[w-1].nameEn,h.textContent=this.dataImages[w-1].authorEn;break;case 1:g.textContent=this.dataImages[w-1].name,h.textContent=this.dataImages[w-1].author}let p=document.querySelector(".answer-modal-window__btn-next");this.wereAlreadyOpened.includes("nextBtn")||p.addEventListener("click",this.handleBtnNext),setTimeout((()=>{d.classList.add("modal-window_is-shown-background"),d.classList.add("modal-window_is-shown-window")}),1)}))}handleBtnNext=()=>{let e,t;switch(this.wereAlreadyOpened.push("nextBtn"),this.currPageType){case 4:t="art-game__answer-item";break;case 5:t="pic-game__answer-item"}e=document.querySelectorAll(`.${t}`);for(let s=0;s<e.length;s++)e[s].className=t;this.gameObj.curPicture++;let s=document.querySelector(".answer-modal-window");s.classList.remove("modal-window_is-shown-background"),s.classList.remove("modal-window_is-shown-window"),setTimeout((()=>{if(s.classList.remove("modal-window_is-shown"),10===this.gameObj.curPicture)this.showEndModalWindow();else switch(this.currPageType){case 4:this.openArtGamePage();break;case 5:this.openPicGamePage()}}),800)};showEndModalWindow(){this.gameObj.categoryObj.wasPlayed=!0,this.gameObj.categoryObj.results=this.gameObj.results.slice(0),this.gameObj.categoryObj.numberRightAnswers=this.gameObj.numberRightAnswers;let e=document.querySelector(".end-game-modal-window");e.classList.add("modal-window_is-shown");let t=document.querySelector(".end-game-modal-window__icon-result"),s=document.querySelector(".end-game-modal-window__number-right-answers"),a=document.querySelector(".end-game-modal-window__message");this.gameObj.numberRightAnswers<=5?(this.checkForSwitchingSoundEffect("game-over"),t.style.backgroundImage='url("./public/assets/icons/skull-and-bones.png")',a.textContent="Game Over"):this.gameObj.numberRightAnswers<=9?(this.checkForSwitchingSoundEffect("good-job"),t.style.backgroundImage='url("./public/assets/icons/good-job.png")',a.textContent="Good job!"):(this.checkForSwitchingSoundEffect("victory"),t.style.backgroundImage='url("./public/assets/icons/cup.png")',a.textContent="Victory!"),s.textContent=this.gameObj.numberRightAnswers,setTimeout((()=>{e.classList.add("modal-window_is-shown-background"),e.classList.add("modal-window_is-shown-window")}),1),this.wereAlreadyOpened.includes("end-game-modal-window")||this.addEventListenersForEndGameModalWindow()}addEventListenersForEndGameModalWindow(){this.wereAlreadyOpened.push("end-game-modal-window");let e=document.querySelector(".end-game-modal-window__btn-categories"),t=document.querySelector(".end-game-modal-window__btn-home"),s=document.querySelector(".end-game-modal-window");e.addEventListener("click",(()=>{s.classList.remove("modal-window_is-shown-background"),s.classList.remove("modal-window_is-shown-window"),setTimeout((()=>{switch(s.classList.remove("modal-window_is-shown"),this.currPageType){case 4:this.returnToCategoriesPage(2);break;case 5:this.returnToCategoriesPage(3)}}),800)})),t.addEventListener("click",(()=>{s.classList.remove("modal-window_is-shown-background"),s.classList.remove("modal-window_is-shown-window"),setTimeout((()=>{s.classList.remove("modal-window_is-shown"),this.returnToHomePage()}),800)}))}addListenersForPicGamePage(){this.wereAlreadyOpened.push("pic-game"),document.querySelector(".pic-game .header-game__btn-categories").addEventListener("click",(()=>{void 0!==this.timer&&clearInterval(this.timer),this.openCategoriesPage(3,"picture-category",".pic-cat")})),document.querySelector(".pic-game .header-game__btn-home").addEventListener("click",(()=>{void 0!==this.timer&&clearInterval(this.timer),this.returnToHomePage()})),document.querySelector(".pic-game__answers").addEventListener("click",(e=>{let t,a,i=e.target.closest(".pic-game__answer-item");if(!i)return;void 0!==this.timer&&clearInterval(this.timer);let r=document.querySelectorAll(".pic-game__answer-item");for(let e=0;e<r.length;e++)if(r[e]===i){a=e;break}t=a===this.gameObj.indexRightAnswer;let n,o,c=document.querySelectorAll(".pic-game__dots .game-dots__item");t?(i.classList.add("pic-game__answer-item_is-right-answer"),c[this.gameObj.curPicture].classList.add("game-dots__item_is-right-answer"),this.gameObj.results[this.gameObj.curPicture]=1,this.gameObj.numberRightAnswers++,n="right-answer",o='url("./public/assets/svg/right-answer.svg")'):(i.classList.add("pic-game__answer-item_is-wrong-answer"),c[this.gameObj.curPicture].classList.add("game-dots__item_is-wrong-answer"),this.gameObj.results[this.gameObj.curPicture]=0,n="wrong-answer",o='url("./public/assets/svg/wrong-answer.svg")'),this.checkForSwitchingSoundEffect(n);let d=document.querySelector(".answer-modal-window");d.classList.add("modal-window_is-shown");let l=document.querySelector(".answer-modal-window__icon-answer"),u=document.querySelector(".answer-modal-window__picture-container"),g=document.querySelector(".answer-modal-window__picture-name"),h=document.querySelector(".answer-modal-window__picture-author"),m=document.querySelector(".answer-modal-window__picture-year");l.style.backgroundImage=o;let w=this.gameObj.categoryObj.firstPic+this.gameObj.curPicture,_=`https://raw.githubusercontent.com/sashtje/image-data/master/img/${w}.webp`;switch(u.style.backgroundImage=`url("${_}")`,m.textContent=this.dataImages[w-1].year,s.lang){case 0:g.textContent=this.dataImages[w-1].nameEn,h.textContent=this.dataImages[w-1].authorEn;break;case 1:g.textContent=this.dataImages[w-1].name,h.textContent=this.dataImages[w-1].author}let p=document.querySelector(".answer-modal-window__btn-next");this.wereAlreadyOpened.includes("nextBtn")||p.addEventListener("click",this.handleBtnNext),setTimeout((()=>{d.classList.add("modal-window_is-shown-background"),d.classList.add("modal-window_is-shown-window")}),1)}))}}})();
//# sourceMappingURL=main.js.map