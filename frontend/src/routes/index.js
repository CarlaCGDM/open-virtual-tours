import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { useAuth } from "../provider/authProvider.js"
import { ProtectedRoute } from "./ProtectedRoute.js"
import React, {Suspense, Loader} from "react"

import Home from "../pages/Home.js"
import Admin from "../pages/Admin.js"
import Login from "../pages/Login.js"
import Logout from "../pages/Logout.js"

const Routes = () => {
    const { token } = useAuth();
    const routesForPublic = [
        {
            path: "/",
            element: <Home />,
        },
    ]

    const routesForAuthenticatedOnly = [
        {
            path: "/admin",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "/admin",
                    element: <Suspense fallback={<Loader />}><Admin /></Suspense>,
                }
            ],
            path: "/logout",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "/logout",
                    element: <Logout />,
                }
            ],
        },
    ]

    const routesForNotAuthenticatedOnly = [
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/admin",
            element: <div>You need to login to see this page.</div>,
        }
    ]

    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ])

    return <RouterProvider router={router} />

}

export default Routes
