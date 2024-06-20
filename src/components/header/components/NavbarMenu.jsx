import { NAVBAR_MENU } from 'constants/variable'
import { NavLink } from 'react-router-dom'
import { ReplaceSpaceToTake } from 'utils/ReplaceSpaceToTake'

const NavbarMenu = () => {
    return <>
        <div>
            <ul className='flex items-center'>
                {
                    NAVBAR_MENU.map((item, index) =>
                        <NavLink key={index} to={'/' + ReplaceSpaceToTake(item.name)}>
                            <li className='relative uppercase px-5 text-lg flex items-center tracking-widest cursor-pointer text-gray-custom font-normal '>
                                <span className='hover:text-red-custom ease-linear duration-100 navbar--item'>
                                    {item.name}
                                </span>
                                <span className='underline'></span>
                            </li>
                        </NavLink>

                    )
                }
            </ul>
        </div>
    </>
}

export default NavbarMenu