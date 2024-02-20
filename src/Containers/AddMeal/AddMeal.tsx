import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosApi from "../../axiosApi";

const AddMeal = () => {
    const [meal, setMeal] = useState( {time: '', description: '', calories: ''} );
    const params = useParams();

    useEffect(() => {
        const fetchMeal = async () => {
            if (params.id) {
                try {
                    const response = await axiosApi.get('/meals/' + params.id + '.json');
                    setMeal({ time: response.data.time, description: response.data.description, calories: response.data.calories })
                } catch (error) {
                    console.error('Failed to fetch data', error);
                }
            }
        };

        fetchMeal();
    }, [params.id]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setMeal(prev => ({...prev, [name]: value}));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
          if (params.id) {
            await axiosApi.put('/meals/' + params.id + '.json', meal);
          } else {
            await axiosApi.post('/meals.json', meal);
          }
        } catch (error) {
          console.error("Failed to submit post", error);
        }

    }, [params.id, meal]);

    return (
        <div className="d-flex flex-column align-items-center text-center w-100 mt-5">
            <h1>{params.id ? 'Edit Meal' : 'New Meal'}</h1>
            <form onSubmit={handleSubmit} className="w-75">
                <div>
                    <label htmlFor="time" className="form-label">Time</label>
                    <select
                        className="form-select w-100 mb-3"
                        id="time"
                        name="time"
                        value={meal.time}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Choose a category</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="snack">Snack</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        className="input-group-text w-100 mb-3"
                        id="description"
                        name="description"
                        type="text"
                        value={meal.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="calories" className="form-label">calories</label>
                    <input
                        className="input-group-text w-100 mb-3"
                        id="calories"
                        name="calories"
                        type="text"
                        value={meal.calories}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">{params.id ? 'Edit' : 'Save'}</button>
            </form>
        </div>
    );
};

export default AddMeal;