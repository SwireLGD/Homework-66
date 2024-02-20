import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosApi from "../../axiosApi";
import Loader from "../../Components/Loader/Loader";

const AddMeal = () => {
    const [meal, setMeal] = useState( {time: '', description: '', calories: ''} );
    const params = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
    
        try {
            if (params.id) {
                await axiosApi.put('/meals/' + params.id + '.json', meal);
            } else {
                await axiosApi.post('/meals.json', meal);
                navigate('/');
            }
        } catch (error) {
            console.error("Failed to submit post", error);
        } finally {
            setIsLoading(false);
        }

    }, [params.id, meal, navigate]);

    return (
        <div className="d-flex flex-column align-items-start w-100 mt-4">
            <h1 className="mb-4">{params.id ? 'Edit Meal' : 'New Meal'}</h1>
            <form onSubmit={handleSubmit} className="w-75">
                <div>
                    <select
                        className="form-select w-75 mb-3"
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
                    <input
                        className="input-group-text w-75 mb-3 text-start"
                        name="description"
                        type="text"
                        value={meal.description}
                        onChange={handleChange}
                        placeholder="Meal description"
                        required
                    />
                </div>
                <div className="d-flex align-items-center">
                    <input
                        className="input-group-text w-25 text-start"
                        name="calories"
                        type="number"
                        value={meal.calories}
                        onChange={handleChange}
                        placeholder="calories"
                        required
                    />
                    <span className="ms-1">kcal</span>
                </div>
                <button type="submit" className="btn btn-primary mt-3" disabled={isLoading}>
                    {isLoading ? <Loader /> : (params.id ? 'Edit' : 'Save')}
                </button>
            </form>
        </div>
    );
};

export default AddMeal;