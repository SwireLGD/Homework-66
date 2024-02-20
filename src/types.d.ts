export interface ApiMeal {
    time: string;
    description: string;
    calories: number;
}

export interface Meal extends ApiMeal {
    id: string;
}

export interface ApiMeals {
    [id: string]: ApiMeal;
}