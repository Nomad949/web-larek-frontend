import { ICard, TCategory, categoryType } from "../../types";
import { CDN_URL } from "../../utils/constants";
import { Component } from "./Component";
import { IEvents } from "./events";

interface ICardView extends ICard{
    cardIndex: number;
    checkBasket: boolean;
}

export class CardView extends Component<ICardView> {
    protected _id: string;
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _category: HTMLElement;
    protected _cardImage: HTMLImageElement;
    protected _description: HTMLElement;
    protected _cardIndex: HTMLElement;
    protected _addButton: HTMLButtonElement;
    protected _deleteButton: HTMLButtonElement;
    protected events: IEvents;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this._title = this.container.querySelector('.card__title');
        this._price = this.container.querySelector('.card__price');
        this._category = this.container.querySelector('.card__category');
        this._cardImage = this.container.querySelector('.card__image');
        this._description = this.container.querySelector('.card__text');
        this._cardIndex = this.container.querySelector('.basket__item-index');
        this._addButton = this.container.querySelector('.card__button');
        this._deleteButton = this.container.querySelector('.basket__item-delete');
    }

    set id(value: string) {
        this._id = value;
    };

    set title(value: string) {
        this._title.textContent = value;
    };

    set price(value: number | null) {
        if(value) {
            this._price.textContent = `${value} синапсов`;
        } else {
            this._price.textContent = `Бесценно`;
        }
    };

    set category(value: TCategory) {
        if(this._category) {
            this._category.textContent = value;
            this._category.classList.add(`card__category_${categoryType[value]}`)
        }
    };

    set cardImage(value: string) {
        if (this._cardImage) {
            this._cardImage.src = CDN_URL + value;
        }
    };

    set description(value: string) {
        if(this._description) {
            this._description.textContent = value;
        }
    };

    set cardIndex(index: number) {
        this._cardIndex.textContent = String(index);
    };

    set checkBasket(value: boolean) {
        this.isDisabled(this._addButton, value);
        if(value) {
            this._addButton.textContent = 'Товар в корзине';
        } else {
            this._addButton.textContent = 'Купить';
        }

        if(this._price.textContent === 'Бесценно') {
            this.isDisabled(this._addButton, true);
        }
    };
}
