import { APP_URLS } from 'constants/variable';
import { Navigate, Outlet } from 'react-router-dom';

const AnonymousRoutes = () => {
    const user = localStorage.getItem("user")

    return user ? <Navigate to={APP_URLS.URL_HOME} /> : <Outlet />;
}

export default AnonymousRoutes