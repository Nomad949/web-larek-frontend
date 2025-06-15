import { ICard } from "../types";
import { CDN_URL } from "../utils/constants";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class CardView extends Component<ICard> {
    protected _id: string;
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _category?: HTMLElement;
    protected _cardImage?: HTMLImageElement;
    protected _description?: HTMLElement;
    protected events: IEvents;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this._title = this.container.querySelector('.card__title');
        this._price = this.container.querySelector('.card__price');
        this._category = this.container.querySelector('.card__category');
        this._cardImage = this.container.querySelector('.card__image');
        this._description = this.container.querySelector('.card__text');

        this.container.addEventListener('click', () => {
            this.events.emit(`card:select`, {cardId: this._id});
        })
    }

    set id(value: string) {
        this._id = value;
    }

    set category(value: string) {
        if(this._category) {
            this._category.textContent = value;
        }
    }

    set cardImage(value: string) {
        if (this._cardImage) {
            this._cardImage.src = CDN_URL + value;
        }
    }

    set price(value: number | null) {
        if(value) {
            this._price.textContent = `${value} синапсов`;
        } else {
            this._price.textContent = `Бесценно`;
        }
        // this._price.textContent = (value ? `${value} синапсов` : `Бесценно`);
    }

    set description(value: string) {
        if(this._description) {
            this._description.textContent = value;
        }
    }

    set title(value: string) {
        this._title.textContent = value;
    }
}

export class CardCatalog extends CardView {
    constructor(protected container: HTMLElement, events: IEvents) {
        super(container, events);
        this._category = this.container.querySelector('.card__category');
        this._cardImage = this.container.querySelector('.card__image');

        this.container.addEventListener('click', () => {
            this.events.emit(`card:preview`, {cardId: this._id});
        })
    }
}

export class CardBasket extends CardView {
    protected deleteButton: HTMLElement;
    protected cardIndex: HTMLElement;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container, events);
        this.cardIndex = this.container.querySelector('.basket__item-index');
        this.deleteButton = this.container.querySelector('.basket__item-delete');

        this.deleteButton.addEventListener('click', () => {
            this.events.emit(`card:delete`, {cardId: this._id});
        })
    }
}

export class CardPreview extends CardView {
    protected addButton: HTMLElement;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container, events);
        this._description = this.container.querySelector('.card__text');
        this.addButton = this.container.querySelector('.card__button');

        this.addButton.addEventListener('click', () => {
            this.events.emit(`card:add`, {cardId: this._id});
        })
    }
}