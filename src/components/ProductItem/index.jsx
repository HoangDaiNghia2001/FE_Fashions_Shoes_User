import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Capitelize } from 'utils/Capitalize';
import './Style.css'
import { APP_URLS } from 'constants/variable';
import ProductModal from './components/ProductModal';
import { useDispatch } from 'react-redux';
import { getDetailProductAsync } from 'page/User/ProductDetail/ProductSlice';

const ProductItem = (props) => {

    const { className, product } = props

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleNavigatePageDetail = async () => {
        await dispatch(getDetailProductAsync(product.id))

        navigate(`${APP_URLS.URL_PRODUCT}/${product.id}`)
    }

    return <div className={`card-product ${className} overflow-hidden p-3 border-[1px] border-solid border-zinc-200 mb-4 rounded-md relative`}>
        <div onClick={handleNavigatePageDetail} to={`${APP_URLS.URL_PRODUCT}/${product.id}`} className='h-full w-full cursor-pointer'>
            {
                product.discountedPercent > 0 &&
                <div className="absolute left-3 top-[14px] bg-red-800 px-1 py-[10px] min-w-[45px]">
                    <p className="text-white text-[14px] font-semibold tracking-[1px] text-center">-{product.discountedPercent}%</p>
                </div>
            }
            <img src={product.mainImageBase64} alt="" className="w-full h-[78%] object-cover object-center" />
            <div className="text-center mt-2">
                <p className="text-zinc-600 font-bold uppercase tracking-[1px] text-[12px]">{product.brandProduct.name}</p>

                <p className="tracking-[1px] font-extrabold text-eclipse mb-[2px] " title={Capitelize(product.name.trim().split(' ')).toString().replaceAll(',', ' ')}>
                    {product.name.trim().split(' ').length > 4 ? Capitelize(product.name.trim().split(' ')).slice(0, 4).toString().replaceAll(',', ' ') + ' ...'
                        :
                        Capitelize(product.name.trim().split(' ')).toString().replaceAll(',', ' ')}
                </p>
                {
                    product.discountedPercent > 0 ?
                        <div className="flex items-center justify-center">
                            <p className="mr-2 text-red-custom font-semibold tracking-wider">{product.discountedPrice.toLocaleString()}<sup>đ</sup></p>
                            <p className="ml-2 text-zinc-500 font-semibold relative tracking-wider">
                                {product.price.toLocaleString()}
                                <sup>đ</sup>
                                <span className="absolute top-[50%] left-[50%] w-[115%] h-[1px] bg-eclipse translate-x-[-50%] translate-y-[-50%]"></span>
                            </p>
                        </div>
                        : <p className="text-red-custom font-semibold tracking-wider">{product.price.toLocaleString()}<sup>đ</sup></p>
                }

            </div>
        </div>

        <div className="absolute right-3 top-[14px] flex flex-col z-10 card-product__actions">
            <button onClick={showModal} className="bg-[#b4b4b4] py-[4px] px-[8px] mb-1 card-product__actions--item hover:bg-red-800">
                <i className="fa-solid fa-eye text-sm"></i>
            </button>
            <button onClick={handleNavigatePageDetail} className="bg-[#b4b4b4] py-[4px] px-[8px] card-product__actions--item hover:bg-red-800">
                <i className="fa-solid fa-cart-shopping text-sm"></i>
            </button>
        </div>

        <ProductModal product={product} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

    </div >
}

export default ProductItem