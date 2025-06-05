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
}

interface IBasket {
    cards: TBasketItem[];
    cardIndex: number | null;
    counter: number;
    totalPrice: number | null;
    addCard(card: ICard): void;
    updateBasket(card: ICard): void
    deleteCard(cardId: string): void;
}

interface ICardsData {
    container: ICard[];
    preview: string | null;
    getCard(cardId: string): ICard;
}

type TBasketItem = Pick<ICard, 'title' | 'price'>

type TPayment = 'online' | 'personally'

type TFormValidation = Pick<IUserData, 'address' | 'email' | 'phone'>