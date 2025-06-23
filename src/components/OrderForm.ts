import { IUserData, TPayment } from "../types";
import { FormView } from "./base/FormView";
import { IEvents } from "./base/events";

export class OrderForm extends FormView<IUserData> {
    protected _paymentType: TPayment;
    protected _address: HTMLInputElement;
    protected _cashButton: HTMLButtonElement;
    protected _cardButton: HTMLButtonElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events)

        this._address = this.container.querySelector('input[name="address"]');
        this._cashButton = this.container.querySelector('button[name="cash"]');
        this._cardButton = this.container.querySelector('button[name="card"]');

        this._cashButton.addEventListener('click', () => {
            this._paymentType = 'cash';
            this._cardButton.classList.remove('button_alt-active');
            this._cashButton.classList.add('button_alt-active');
            this.events.emit(`${this.formName}:change`, {field: 'payment', value: this._paymentType})
        });

        this._cardButton.addEventListener('click', () => {
            this._paymentType = 'card';
            this._cardButton.classList.add('button_alt-active');
            this._cashButton.classList.remove('button_alt-active');
            this.events.emit(`${this.formName}:change`, {field: 'payment', value: this._paymentType});
        });
    }

    set payment(value: TPayment) {
        this._paymentType = value;
    };

    set address(value: string) {
        this._address.value = value;
    };
}
