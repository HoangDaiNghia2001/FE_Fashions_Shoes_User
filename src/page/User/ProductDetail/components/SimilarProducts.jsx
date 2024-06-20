import ProductItem from "components/ProductItem"
import SectionHeading from "components/SectionHeading"
import { APP_URLS } from "constants/variable"
import { filter } from "page/User/ShopNow/ShopNowSlice"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getSimilarProductsAsync } from "../ProductSlice"

const SimilarProduct = (props) => {

    const { brandId, productId } = props

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [listSimilarProducts, setListSimilarProducts] = useState({
        data: [],
        visible: 4
    })

    const getSimilarProducts = async (values) => {
        const response = await dispatch(getSimilarProductsAsync(values))
        setListSimilarProducts({ data: response.payload.results.listProducts, visible: 4 })
    }

    const handleLoadMore = () => {
        setListSimilarProducts({ ...listSimilarProducts, visible: listSimilarProducts.visible + 4 })
    }

    const handleShopNow = async () => {
        await dispatch(filter({ brandId: brandId }))
        navigate(APP_URLS.URL_SHOP_NOW)
    }

    useEffect(() => {
        getSimilarProducts({
            brandId: brandId,
            productId: productId
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId])

    return <div className='similar-products mt-5 mb-16'>
        <SectionHeading title='Similar Product' />
        <div className="flex justify-between overflow-hidden flex-wrap">
            {
                listSimilarProducts.data.slice(0, listSimilarProducts.visible).map((item, index) => <ProductItem key={index} className='card-product__medium' product={item} />)
            }
        </div>
        {
            listSimilarProducts.visible < listSimilarProducts.data.length ?
                <div className="text-center mt-5">
                    <button onClick={handleLoadMore} className="button-custom py-[8px] px-[70px] text-[18px]">See more</button>
                </div>
                :
                <div className="text-center mt-5">
                    <button onClick={handleShopNow} className="button-custom py-[8px] px-[70px] text-[18px]">Shop now</button>
                </div>
        }
    </div>
}

export default SimilarProduct