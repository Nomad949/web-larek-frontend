import { IBasket, ICard, TBasketItem } from "../types";
import { IEvents } from "./base/events";

export class Basket implements IBasket {
     _cards: TBasketItem[];
    protected events: IEvents;
    
    constructor(events: IEvents) {
        this.events = events;
    }
    
    addCard(card: ICard) {
        if(this.inBasket(card.id)) {
            alert('Нельзя добавить больше одной штуки!');
            return;
        }
        this._cards.push(card);
        this.events.emit('cards:changed');
    };

    deleteCard(cardId: string) {
        this._cards = this._cards.filter((card) => card.id !== cardId);
        this.events.emit('cards:changed');
    };

    getCount() {
        return this._cards.length; 
    };

    getTotalPrice() {
        return this._cards.reduce((sum, card) => sum + card.price, 0);
    };

    inBasket(cardId: string) {
        return this._cards.some((card) => card.id === cardId);
    }

    get cards() {
        return this._cards;
    }
}