export interface RestaurantDto {
    id: number
    name: string;
    description: string;
    deliveryFee: number;
    averageRating: number;
}

export interface RestaurantListDto {
    data: RestaurantDto[];
    total: number;
    page: number;
    lastPage: number;
}
