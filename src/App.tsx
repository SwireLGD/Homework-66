import { NavLink, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import 'bootstrap/dist/css/bootstrap.css';
import AddMeal from "./Containers/AddMeal/AddMeal";
import Meals from "./Containers/Meals/Meals";

function App() {

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <button>
        <NavLink to="/new-meal" className={({ isActive }) => isActive ? 'active' : undefined}>Add new meal</NavLink>
        </button>
        <Routes>
          <Route path="/" element={<Meals />} />
          <Route path="/new-meal" element={<AddMeal />} />
          <Route path="/meals/:id/edit" element={<AddMeal />} />
        </Routes>
        <Meals />
      </main>
    </>
  );
};

export default App;