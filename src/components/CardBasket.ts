import { CardView } from "./base/CardView";
import { IEvents } from "./base/events";

export class CardBasket extends CardView {
    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);

        this._deleteButton.addEventListener('click', () => {
            this.events.emit('card:delete', {cardId: this._id});
        })
    }
}