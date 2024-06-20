import { filter, getHighestPriceOfProductAsync, shopNowSelector } from "page/User/ShopNow/ShopNowSlice";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterTilte from "./FilterTitle"

const FilterPrice = () => {

    const shopNow = useSelector(shopNowSelector)

    const dispatch = useDispatch()

    // list range price
    const LIST_RANGE_PICE = [
        {
            minPrice: 0,
            maxPrice: 1000000,
        }, {
            minPrice: 1000000,
            maxPrice: 2000000,
        }, {
            minPrice: 2000001,
            maxPrice: 4999999,
        }, {
            minPrice: 5000000,
            maxPrice: shopNow.highestPrice
        }
    ]

    const [dropDown, setDropDown] = useState(true);

    const handleChangeRangePrice = async (item) => {
        await dispatch(filter({
            minPrice: item.minPrice,
            maxPrice: item.maxPrice
        }))
    }
    const checkPrice = (item) => {
        if (item.minPrice === null) {
            return <p>
                Under
                <span className="ml-1">{item.maxPrice.toLocaleString()}<sup>đ</sup>
                </span>
            </p>
        } else if (item.maxPrice === null) {
            return <p>
                Over
                <span className="ml-1">{item.minPrice.toLocaleString()}<sup>đ</sup>
                </span>
            </p>
        } else {
            return <p>
                {item.minPrice.toLocaleString()}<sup>đ</sup>
                <span className="mx-1">-</span>
                {item.maxPrice.toLocaleString()}<sup>đ</sup>
            </p>
        }
    }

    const checkChoose = (item) => {
        return item.maxPrice === shopNow.filter.maxPrice && item.minPrice === shopNow.filter.minPrice
    }

    const getHighestPrice = async () => {
        await dispatch(getHighestPriceOfProductAsync())
    }

    useEffect(() => {
        getHighestPrice()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div className="filter-price pb-3 border-b border-light-gray mb-5">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setDropDown(!dropDown)}>
            <FilterTilte title='Shop By Price' />
            <i className={`fa-solid fa-angle-down font-bold ${dropDown && 'rotate-[-180deg]'} duration-300 ease-linear`}></i>
        </div>
        <ul className={`ml-1 duration-150 ease-linear ${dropDown && 'drop-down'}`}>
            {
                LIST_RANGE_PICE?.map((item, index) => <li
                    key={index}
                    className={`tracking-[0.75px] mb-1 duration-200 ease-linear cursor-pointer font-normal flex items-center hover:text-red-custom  ${checkChoose(item) && 'text-red-custom font-semibold'}`}
                    onClick={() => handleChangeRangePrice(item)}>
                    <span className={`check before:text-red-custom duration-200 ease-linear ${checkChoose(item) ? 'opacity-100' : 'opacity-0'}`}></span>
                    {checkPrice(item)}
                </li>)
            }
        </ul>
    </div>
}

export default FilterPrice