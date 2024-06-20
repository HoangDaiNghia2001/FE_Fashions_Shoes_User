import { Empty, Pagination } from "antd"
import ProductItem from "components/ProductItem"
import { useSelector } from "react-redux"
import { shopNowSelector } from "../../ShopNowSlice"

const Container = (props) => {
    const { showNavbar, paging, onChangePage, } = props

    const shopNow = useSelector(shopNowSelector)

    return <div className={`${showNavbar ? 'w-[80%]' : 'w-full'} flex flex-wrap justify-between duration-150`}>

        {
            shopNow.listProducts.map((item, index) => <ProductItem key={index} className={`${showNavbar ? 'card-product__max' : 'card-product__max'}`} product={item} />)
        }
        {
            shopNow.listProducts.length > 0 ?
                <div className="pagination text-center mt-6 w-full">
                    <Pagination current={paging.pageIndex} onChange={onChangePage} pageSize={paging.pageSize} total={shopNow.totalProduct} showSizeChanger={false} />
                </div>
                :
                <div className="text-center w-full h-full mt-[100px]">
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
        }
    </div>
}

export default Container