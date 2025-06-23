import { CardView } from "./base/CardView";
import { IEvents } from "./base/events";

export class CardCatalog extends CardView {
    constructor(protected container: HTMLElement, events: IEvents) {
        super(container, events);

        this.container.addEventListener('click', () => {
            this.events.emit(`card:select`, {cardId: this._id});
        })
    }
}