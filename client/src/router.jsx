import { createBrowserRouter } from "react-router-dom";
import SignInPage from "./pages/auth-page/signin-page";
import LoginPage from './pages/auth-page/login-page';
import ForgerPasswordPage from "./pages/auth-page/forger-password-page";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <SignInPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/forget-password",
        element: <ForgerPasswordPage />,
    },
]);