import logo from 'assets/Image/logo.jpg'
import { Link } from 'react-router-dom'
const HeaderLogo = () => {
    return <div className="w-64">
        <Link to='/home' className="flex align-center justify-center h-full">
            <img src={logo}
                alt="" className="" />
        </Link>
    </div>
}

export default HeaderLogo