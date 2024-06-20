import { APP_URLS } from "constants/variable"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoutes = () => {
    const user = localStorage.getItem("user")

    return user ? <Outlet /> : <Navigate to={APP_URLS.URL_LOGIN} />
}

export default PrivateRoutes