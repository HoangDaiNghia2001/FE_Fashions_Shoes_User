import ProductItem from "components/ProductItem";
import SectionHeading from "components/SectionHeading";
import { APP_URLS } from "constants/variable";
import { resetFilter } from "page/User/ShopNow/ShopNowSlice";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getListProsductsBestSellerAsync } from "../HomeSilce";

const BestSeller = (props) => {

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const [productsBestSeller, setProductsBestSeller] = useState({ data: [], visible: 0 })

    const getListProductsBestSeller = async () => {
        const response = await dispatch(getListProsductsBestSellerAsync())

        setProductsBestSeller({
            data: response.payload.results.listProducts,
            visible: 4
        })
    }

    const handleLoadmore = () => {
        setProductsBestSeller({ ...productsBestSeller, visible: productsBestSeller.visible + 4 })
    }

    const handleNavigateShopnow = async () => {
        await dispatch(resetFilter())
        navigate(APP_URLS.URL_SHOP_NOW)
    }

    useEffect(() => {
        getListProductsBestSeller()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div className="best-seller pb-5">
        <SectionHeading title='Best Seller' />
        <div className="flex justify-between overflow-hidden flex-wrap">
            {
                productsBestSeller.data.slice(0, productsBestSeller.visible).map((item, index) => <ProductItem key={index} className='card-product__medium'
                    discountedPercent={item.discountedPercent} discountedPrice={item.discountedPrice} name={item.name} title={item.title} product={item} />)
            }
        </div>
        <div className="text-center mt-5">
            {
                productsBestSeller.visible < productsBestSeller.data.length ?
                    <button onClick={handleLoadmore} className="button-custom py-[8px] px-[70px] text-[18px]">see more</button>
                    :
                    <button onClick={handleNavigateShopnow} className="button-custom py-[8px] px-[70px] text-[18px]">shop now</button>
            }
        </div>
    </div>
}

export default BestSeller