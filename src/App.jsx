import "./App.css";
import Login from "./pages/Login";
import NoPage from "./pages/nopage/NoPage";
import HomeLayout from "./pages/HomeLayout";
import Signup from "./pages/Signup";
import { isTokenExpired } from "./services/StorageService";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";



const isUserLoggedIn = () => !isTokenExpired();

const PrivateRoute = () => {
  return isUserLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
};

const PublicRoute = () => {
  return !isUserLoggedIn() ? <Outlet /> : <Navigate to="/" />;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [{ path: "/", element: <HomeLayout /> }],
  },
  {
    path: "/login",
    element: <PublicRoute />,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    path: "/signup",
    element: <PublicRoute />,
    children: [{ path: "/signup", element: <Signup /> }],
  },
  {
    path: "*", // Belirtilmeyen tüm yollar için joker karakter
    element: <NoPage />, // NoPage bileşenini burada kullanıyoruz
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}
export default App;
