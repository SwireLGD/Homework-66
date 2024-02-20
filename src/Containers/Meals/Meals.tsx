import { useCallback, useEffect, useState } from "react";
import { ApiMeals, Meal } from "../../types";
import axiosApi from "../../axiosApi";
import { Link } from "react-router-dom";

const Meals = () => {
    const [meals, setMeals] = useState<Meal[]>([]);

    const fetchMeals = useCallback(async () => {
        try {
            const response = await axiosApi.get<ApiMeals | null>('/meals.json');
            const meals = response.data;

            if (meals) {
                setMeals(Object.keys(meals).map(id => ({
                    ...meals[id],
                    id
                })));
            } else {
                setMeals([]);
            }
        } catch (error) {
            console.error('An error occurred while fetching the posts', error);
        }
    }, []);

    useEffect (() => {
        void fetchMeals();
    }, [fetchMeals]);

    const handleDelete = useCallback(async (id: string) => {
        try {
            await axiosApi.delete(`/meals/${id}.json`);
            await fetchMeals();
        } catch (error) {
            console.error('Failed to delete the meal', error);
        }
    }, [fetchMeals]);

    const totalCalories = meals.reduce((sum, meal) => sum + Number(meal.calories), 0);

    return (
        <div className="mt-3 d-flex flex-column gap-3">
            <span>Total Calories: {totalCalories} kcal</span>
            {meals.map(meal => (
                <div key={meal.id} className="card">
                    <div className="card-body d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-between align-items-center w-75">
                            <div>
                                <h6 className="text-secondary">{meal.time}</h6>
                                <p className="fw-bold">{meal.description}</p>
                            </div>
                            <span className="fw-bold fs-5">{meal.calories} kcal</span>
                        </div>
                        <div>
                            <Link to={`/meals/${meal.id}/edit`} className="btn btn-success me-3">Edit</Link>
                            <button className="btn btn-danger" onClick={() => handleDelete(meal.id)}>Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Meals;