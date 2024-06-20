import HeadingTitle from "./Components/HeadingTitle"
import './Style.css'
import FeaturedProducts from "./Components/FeaturedProducts"
import TrustedPartners from "./Components/TrustedPartners"
import BestSeller from "./Components/BestSeller"
import { useEffect } from "react"
import React from 'react';
import nike from 'assets/Image/brand-nike.jpg'
import adidas from 'assets/Image/brand-adidas.jpg'
import puma from 'assets/Image/brand-puma.jpg'
import converse from 'assets/Image/brand-converse.jpg'
import merrell from 'assets/Image/brand-merrel.jpg'
import { TabTitle } from 'utils/TabTitle'
import Banner from "components/banner"
import { Spin } from "antd"
import { useSelector } from "react-redux"
import { homeSelector } from "./HomeSilce"

const Home = () => {
    const listPartnerts = [
        nike, adidas, puma, converse, merrell
    ]

    useEffect(() => {
        TabTitle('Home')
    }, [])

    const home = useSelector(homeSelector)

    return <Spin tip="Loading" size="large" spinning={home.isLoading}>
        <div className="home pt-0">
            <Banner />
            <HeadingTitle />
            <BestSeller />
            <FeaturedProducts />
            <TrustedPartners listPartnerts={listPartnerts} />
        </div>
    </Spin>
}

export default Home