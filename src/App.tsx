import { NavLink, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import 'bootstrap/dist/css/bootstrap.css';
import AddMeal from "./Containers/AddMeal/AddMeal";

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
          <Route path="/new-meal" element={<AddMeal />} />
        </Routes>
      </main>
    </>
  );
};

export default App;