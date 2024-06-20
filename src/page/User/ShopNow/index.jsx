import Container from "./components/Container/Container"
import Navbar from "./components/Navbar/Navbar"
import { TabTitle } from '../../../utils/TabTitle'
import { useEffect, useState } from "react";
import './Style.css'
import FilterSection from "./components/FilterSection/FilterSection";
import { useDispatch, useSelector } from "react-redux";
import { filterProductsAsync, getBrandsAsync, getChildCategoryByParentCategoryAsync, getParentCategoryByBrandAsync, resetLisChildCategory, resetListParentCategory, shopNowSelector } from "./ShopNowSlice";
import { Spin } from "antd";
const ShopNow = () => {

    useEffect(() => {
        TabTitle('Shop Now')
        window.scrollTo(0, 0)
    }, [])

    const dispatch = useDispatch()

    const shopNow = useSelector(shopNowSelector)

    const [showNavbar, setShowNavbar] = useState(true)

    const [paging, setPaging] = useState({
        pageIndex: 1,
        pageSize: 9
    })

    const getBrands = async () => {
        await dispatch(getBrandsAsync())
    }

    const getPrantCategoryByBrand = async (brandId) => {
        await dispatch(getParentCategoryByBrandAsync({ brandId: brandId }))
    }

    const getChildCategoryByParentCategory = async (parentCategoryId) => {
        await dispatch(getChildCategoryByParentCategoryAsync({ parentCategoryId: parentCategoryId }))
    }

    const filterProducts = async () => {
        setPaging({
            pageIndex: 1,
            pageSize: 9
        })

        const values = {
            ...shopNow.filter,
            ...{
                pageIndex: 1,
                pageSize: 9
            }
        };
        await dispatch(filterProductsAsync(values))
    }

    const onChangePage = async (page) => {
        setPaging({
            pageIndex: page,
            pageSize: 9
        })

        const values = {
            ...shopNow.filter, ...{ pageIndex: page, pageSize: 9 }
        };

        await dispatch(filterProductsAsync(values))
        window.scrollTo(0, 0)
    };

    useEffect(() => {
        getBrands()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
        filterProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shopNow.filter])

    // gọi lại khi thay đổi brand
    useEffect(() => {
        if (shopNow.filter.brandId !== undefined) {
            getPrantCategoryByBrand(shopNow.filter.brandId)
        } else {
            dispatch(resetListParentCategory())
            dispatch(resetLisChildCategory())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shopNow.filter.brandId])

    // gọi lại khi thay đổi parent category
    useEffect(() => {
        if (shopNow.filter.brandId !== undefined && shopNow.filter.parentCategoryId !== undefined) {
            getChildCategoryByParentCategory(shopNow.filter.parentCategoryId)
        } else {
            dispatch(resetLisChildCategory())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shopNow.filter.parentCategoryId])

    return <Spin tip="Loading" size="large" spinning={shopNow.isLoading || shopNow.loadListProducts}>
        <div className="pt-6 pb-10 px-9 min-h-screen">
            <FilterSection
                showNavbar={showNavbar}
                setShowNavbar={setShowNavbar}
            />
            <div className="flex justify-between">
                <Navbar
                    showNavbar={showNavbar}
                />
                <Container
                    showNavbar={showNavbar}
                    paging={paging}
                    onChangePage={onChangePage}
                />
            </div>
        </div>
    </Spin>
}

export default ShopNow