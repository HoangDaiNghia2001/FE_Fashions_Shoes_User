import ProductItem from "components/ProductItem";
import SectionHeading from "components/SectionHeading";
import { APP_URLS } from "constants/variable";
import { resetFilter } from "page/User/ShopNow/ShopNowSlice";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getListProsductsFeaturedAsync } from "../HomeSilce";

const FeaturedProducts = (props) => {

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const [productsFeatured, setProductsFeatures] = useState({ data: [], visible: 0 })

    const getListProductsFeatured = async () => {
        const response = await dispatch(getListProsductsFeaturedAsync())
        setProductsFeatures({
            data: response.payload.results.listProducts,
            visible: 4
        })
    }

    const handleLoadmore = () => {
        setProductsFeatures({ ...productsFeatured, visible: productsFeatured.visible + 4 })
    }

    const handleNavigateShopnow = async () => {
        await dispatch(resetFilter())
        navigate(APP_URLS.URL_SHOP_NOW)
    }

    useEffect(() => {
        getListProductsFeatured()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div className="featured-products pb-12 pt-7">
        <SectionHeading title='Featured products' />
        <div className="flex justify-between overflow-hidden flex-wrap">
            {
                productsFeatured.data.slice(0, productsFeatured.visible).map((item, index) => <ProductItem className='card-product__medium' key={index} product={item} />)
            }
        </div>
        <div className="text-center mt-5">
            {
                productsFeatured.visible < productsFeatured.data.length ?
                    <button onClick={handleLoadmore} className="button-custom py-[8px] px-[70px] text-[18px]">see more</button>
                    :
                    <button onClick={handleNavigateShopnow} className="button-custom py-[8px] px-[70px] text-[18px]">shop now</button>
            }
        </div>
    </div>
}

export default FeaturedProducts