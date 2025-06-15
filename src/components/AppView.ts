import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

interface IAppView {
    catalog: HTMLElement[];
    countInBasket: number;
}

export class AppView extends Component<IAppView> {
    protected _catalog: HTMLElement;
    protected basketCounter: HTMLElement;
    protected basketButton: HTMLElement;
    protected events: IEvents;

    constructor(container: HTMLElement, events:IEvents) {
        super(container);
        this.events = events;

        this._catalog = ensureElement('.gallery');
        this.basketButton = ensureElement('.header__basket');
        this.basketCounter = ensureElement('.header__basket-counter');

        this.basketButton.addEventListener('click', () => {
            this.events.emit(`basket:open`);
        })

    }

    set catalog(cards: HTMLElement[]) {
        this.container.replaceChildren(...cards);
    }

    set countInBasket(value: number) {
        this.basketCounter.textContent = String(value);
    }
}