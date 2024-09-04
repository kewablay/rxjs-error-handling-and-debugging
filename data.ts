export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}


export const products = [
    {
        id: 1,
        name: 'IPhone 15 pro max',
        price: 799,
        image: 'assets/Apple-iPhone-15-Pro-Max.jpg',
        description: 'A large phone with one of the best screens'
    },
    {
        id: 2,
        name: 'Samsung Galaxy S24',
        price: 699,
        image: 'assets/samsung-galaxy-s24.jpg',
        description: 'A great phone with one of the best cameras'
    },
    {
        id: 3,
        name: 'Pixel 9 Pro',
        price: 299,
        image: 'assets/Pixel-9-Pro.jpg',
        description: 'A great phone, with one of the best processors'
    }

]