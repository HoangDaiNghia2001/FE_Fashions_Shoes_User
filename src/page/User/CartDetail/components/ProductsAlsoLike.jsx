import ProductItem from "components/ProductItem"
import SectionHeading from "components/SectionHeading"
import { APP_URLS } from "constants/variable"
import { resetFilter } from "page/User/ShopNow/ShopNowSlice"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getProductsAlsoLikeAsync } from "../CartSlice"

const ProductAlsoLike = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [listProductsAlsoLike, setListProductsAlsoLike] = useState({
        data: [],
        visible: 4
    })

    const getProductsAlosLike = async () => {
        const response = await dispatch(getProductsAlsoLikeAsync())
        setListProductsAlsoLike({
            data: response.payload.results.listProducts,
            visible: 4
        })
    }

    const handleLoadMore = () => {
        setListProductsAlsoLike({ ...listProductsAlsoLike, visible: listProductsAlsoLike.visible + 4 })
    }

    const handleNavigateShopNow = async () => {
        await dispatch(resetFilter())
        navigate(APP_URLS.URL_SHOP_NOW)
    }
    useEffect(() => {
        getProductsAlosLike()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div className="product-also-like mb-12">
        <SectionHeading title='You might also like' />
        <div className="flex justify-between overflow-hidden flex-wrap">
            {
                listProductsAlsoLike.data.slice(0, listProductsAlsoLike.visible).map((item, index) => <ProductItem key={index} className='card-product__medium' product={item} />)
            }
        </div>
        <div className='text-center mt-5'>
            {
                listProductsAlsoLike.visible < listProductsAlsoLike.data.length ?
                    <button onClick={handleLoadMore} className='button-custom py-[8px] px-[70px] text-[18px]'>See more</button>
                    :
                    <button onClick={handleNavigateShopNow} className='button-custom py-[8px] px-[70px] text-[18px]'>Shop now</button>
            }
        </div>
    </div>
}

export default ProductAlsoLike