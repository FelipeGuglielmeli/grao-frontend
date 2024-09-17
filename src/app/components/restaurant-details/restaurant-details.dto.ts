export interface RestaurantDto {
    id: number;
    name: string;
    description: string;
    averageRating: number;
    deliveryFee: number
    phone: string;
    address: {
        street: string;
        city: string;
        number: string;
        neighborhood: string;
    };
}

export interface MenuItemDto {
    id: number;
    name: string;
    description: string;
    price: number;
}

export interface MenuDto {
    dishes: MenuItemDto[];
    drinks: MenuItemDto[];
}


export interface RatingDto {
    id: number;
    comment: string;
    rating: number;
    user: {
        name: string;
    };
    createdAt: Date;
    updatedAt: Date;
}
