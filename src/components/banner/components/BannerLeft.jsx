import { APP_URLS } from "constants/variable"
import { filter } from "page/User/ShopNow/ShopNowSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const BannerLeft = (props) => {

    const { url, title, brand, brandId } = props

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleNavigate = async () => {
        await dispatch(filter({ brandId: brandId }))
        navigate(APP_URLS.URL_SHOP_NOW)
    }

    return <button onClick={handleNavigate} className="overflow-hidden mr-2 w-[49.2%] h-[49.4%] relative rounded banner__left">
        <img src={url} alt="" className="object-center object-cover w-full h-full duration-1000" />
        <div className="absolute bottom-5 left-7 text-white align-left">
            <p className="text-2xl tracking-wide">{title}</p>
            <p className="text-base uppercase flex items-center tracking-wide">
                {brand}
                <i className='bx bx-chevron-right text-base' ></i>
            </p>
        </div>
    </button>
}

export default BannerLeft