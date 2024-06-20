import './Style.css'
import ImageProduct from "./components/ImageProduct"
import InformationProduct from "./components/InformationProduct"
import { useEffect } from 'react'
import { TabTitle } from 'utils/TabTitle'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDetailProductAsync, productSelector } from './ProductSlice'
import { Spin } from 'antd'
import SimilarProduct from './components/SimilarProducts'

const ProductDetail = (props) => {

    const { openNotification } = props

    const { id } = useParams()

    const dispatch = useDispatch()

    const product = useSelector(productSelector)

    const getDetailProduct = async (id) => {
        await dispatch(getDetailProductAsync(id))
    }

    useEffect(() => {
        TabTitle('Product Detail')
        window.scrollTo(0, 0)
        if (product.productInfor.name === undefined) {
            getDetailProduct(id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return <Spin tip="Loading" size="large" spinning={product.isLoading}>
        <div className="product__detail min-h-screen pt-3">
            {
                product.loadInfor &&
                <div className="flex justify-between py-[30px] px-40">
                    <ImageProduct
                        lstImageOfProduct={[product.productInfor?.mainImageBase64, ...product.productInfor?.imageSecondaries]}
                        discountedPercent={product.productInfor?.discountedPercent} />
                    <InformationProduct product={product.productInfor} openNotification={openNotification} />
                </div>
            }
        </div>

        {
            product.loadInfor && <SimilarProduct brandId={product.productInfor.brandProduct.id} productId={product.productInfor.id} />
        }
    </Spin>
}

export default ProductDetail