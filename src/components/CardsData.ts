import { ICard, ICardsData } from "../types";
import { IEvents } from "./base/events";

export class CardsData implements ICardsData {
     _cards: ICard[];
    _preview: string | null;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    set cards(cards: ICard[]) {
        this._cards = cards;
        this.events.emit('cards:changed');
    }

    get cards() {
        return this._cards;
    }

    get preview() {
        return this._preview;
    }

    getCard(cardId: string) {
        return this._cards.find((item) => item.id === cardId)
    }
}