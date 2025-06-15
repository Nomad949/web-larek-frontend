import { IUserData, TPayment, TFormValidation } from "../types";
import { IEvents } from "./base/events";

export class UserData implements IUserData{
     payment: TPayment;
     address: string;
     email: string;
     phone: number;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    setUserData(userData: IUserData) {
        this.payment = userData.payment;
        this.address = userData.address;
        this.email = userData.email;
        this.phone = userData.phone;
        this.events.emit('userData:changed');
    };

    getUserData() {
        return { payment: this.payment, address: this.address, email: this.email, phone: this.phone};
    };

    orderValidation(data: Record<keyof TFormValidation, string>) {
        let message = '';
        let valid = true; 
        if(!this.payment) {
            valid = false;
            message = 'Выберите способ оплаты.';
        }

        if(!data.address) {
            valid = false;
            message = 'Введите свой адресс.';
        }
    };
}