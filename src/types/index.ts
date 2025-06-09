interface ICard {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

interface IUserData {
    payment: TPayment;
    address: string;
    email: string;
    phone: number;
    checkValidation(data: Record<keyof TFormValidation, string>): boolean;
    setUserData(userData: IUserData): void;
    getUserData(): void;
}

interface IBasket {
    cards: TBasketItem[];
    addCard(card: ICard): void;
    deleteCard(cardId: string): void;
    getCount(): number;
    getTotalPrice(): number
}

interface ICardsData {
    cards: ICard[];
    preview: string | null;
    getCard(cardId: string): ICard;
}

type TBasketItem = Pick<ICard, 'title' | 'price'>

type TPayment = 'online' | 'personally'

type TFormValidation = Pick<IUserData, 'address' | 'email' | 'phone'>