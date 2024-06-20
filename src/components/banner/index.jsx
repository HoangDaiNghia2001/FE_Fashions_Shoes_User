import BannerLeft from "./components/BannerLeft"
import BannerRight from "./components/BannerRight"
import firstSlide from 'assets/Image/slide_1.jpg'
import secondSlide from 'assets/Image/slide_2.jpg'
import thirdSlide from 'assets/Image/slide_3.jpg'
import fourthSlide from 'assets/Image/slide_4.jpg'
import fifthSlide from 'assets/Image/slide_5.jpg'
const Banner = () => {

    const lstBannerLeft = [
        {
            'url': firstSlide,
            'title': 'Ultra Boots Shoes',
            'brand': 'adidas',
            'brandId': 2
        }, {
            'url': secondSlide,
            'title': 'Nike ClassNameic Cortez',
            'brand': 'nike',
            'brandId': 1
        }, {
            'url': thirdSlide,
            'title': 'Puma Basic Sneakers',
            'brand': 'puma',
            'brandId': 3
        }, {
            'url': fourthSlide,
            'title': 'Converse All Star',
            'brand': 'converse',
            'brandId': 8
        }
    ]

    return <div className="flex justify-between h-[calc(100vh-80px)] pb-2 w-full overflow-hidden banner">
        <div className="flex flex-wrap content-between w-[70%]">
            {
                lstBannerLeft.map((item, index) => <BannerLeft brandId={item.brandId} key={index} url={item.url} title={item.title} brand={item.brand} />)
            }
        </div>
        <div className="overflow-hidden h-full w-[30%]">
            <BannerRight url={fifthSlide} title='The Rangged Priest' brand='Orther' brandId={undefined} />
        </div>
    </div>

}

export default Banner