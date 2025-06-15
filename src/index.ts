import { AppApi } from './components/AppApi';
import { AppView } from './components/AppView';
import { Api } from './components/base/api';
import { EventEmitter, IEvents } from './components/base/events';
import { Basket } from './components/Basket';
import { CardsData } from './components/CardsData';
import { CardBasket, CardCatalog, CardPreview, CardView } from './components/CardView';
import './scss/styles.scss';
import { API_URL, settings } from './utils/constants';
import { testCards } from './utils/tempConstants';
import { cloneTemplate } from './utils/utils';

const events: IEvents = new EventEmitter();
const cardsData = new CardsData(events);
const basket = new Basket(events);

const baseApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

const cardTemp:HTMLTemplateElement = document.querySelector('#card-catalog');
const cardsContainer = new AppView(document.querySelector('.gallery'), events);


//Запрос карточек с серва 
api.getCatalog()
    .then(data =>{
        cardsData.cards = data;
        const cardsArray = cardsData.cards.map((card) => {
            const cardCatalog = new CardCatalog(cloneTemplate(cardTemp), events);
            return cardCatalog.render(card);
        })
    
        cardsContainer.render({catalog: cardsArray});
        // events.emit('cards:loaded');
        // console.log(data);
    })
    .catch(err => {
        console.log('Ошибка получения товаров: ',err);
    })





//Тест вывода карточек на главную

// const card1 = new CardCatalog(cloneTemplate(cardTemp), events);
// const card2 = new CardCatalog(cloneTemplate(cardTemp), events);
// const card3 = new CardCatalog(cloneTemplate(cardTemp), events);
// const cardsArr = [];
// cardsArr.push(card1.render(testCards[0]))
// cardsArr.push(card2.render(testCards[1]))
// cardsArr.push(card3.render(testCards[1]))
// cardsContainer.render({catalog: cardsArr})

// events.on('cards:loaded', () => {
//     const cardsArray = cardsData.cards.map((card) => {
//         const cardCatalog = new CardCatalog(cloneTemplate(cardTemp), events);
//         return cardCatalog.render(card);
//     })

//     cardsContainer.render({catalog: cardsArray});
// })