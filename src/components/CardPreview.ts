import { CardView } from "./base/CardView";
import { IEvents } from "./base/events";

export class CardPreview extends CardView {
    constructor(protected container: HTMLElement, events: IEvents) {
        super(container, events);

        this._addButton.addEventListener('click', () => {
            this.events.emit(`card:add`, {cardId: this._id});
        })
    }
}