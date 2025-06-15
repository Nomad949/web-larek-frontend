export interface ICard {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IUserData {
    payment: TPayment;
    address: string;
    email: string;
    phone: number;
    orderValidation(data: Record<keyof TFormValidation, string>): void;
    setUserData(userData: IUserData): void;
    getUserData(): void;
}

export interface IBasket {
    _cards: TBasketItem[];
    addCard(card: ICard): void;
    deleteCard(cardId: string): void;
    getCount(): number;
    getTotalPrice(): number | null;
    inBasket(cardId: string): boolean;
}

export interface ICardsData {
    _cards: ICard[];
    _preview: string | null;
    getCard(cardId: string): ICard;
}

export interface IApi {
    baseUrl: string;
    get<T>(uri:string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TBasketItem = Pick<ICard, 'id' | 'title' | 'price'>

export type TPayment = 'online' | 'personally'

export type TFormValidation = Pick<IUserData, 'address' | 'email' | 'phone'>

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE' | 'PATCH'
