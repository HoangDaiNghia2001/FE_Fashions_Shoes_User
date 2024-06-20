import { useState } from "react"

const ImageProduct = (props) => {

    const { lstImageOfProduct, discountedPercent } = props

    const [mainImage, setMainImage] = useState(lstImageOfProduct[0])

    return <div className="w-[49%] flex justify-between sticky top-[110px] h-[610px]">
        <div className="flex flex-col justify-between items-center overflow-hidden w-[15%]">
            {
                lstImageOfProduct.length > 0 && lstImageOfProduct.map((item, index) => <img
                    className="object-center object-cover h-[70px] w-[70px] rounded-[8px]" key={index} src={item} alt=""
                    onMouseOver={() => setMainImage(item)} />)
            }
        </div>
        <div className="overflow-hidden w-[84%] h-full rounded-[8px]">
            <img src={mainImage} alt='' className="object-cover object-center w-full h-full" />
            {
                discountedPercent > 0 && <div className="absolute right-3 top-3 py-3 px-2 rounded-[50%] bg-red-800 text-white font-bold text-[14.5px]">
                    -{discountedPercent}%
                </div>
            }
        </div>
    </div>
}

export default ImageProduct