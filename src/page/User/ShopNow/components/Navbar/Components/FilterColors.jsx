import { LIST_COLORS, MULTIPLE, WHITE } from "constants/variable";
import { filter } from "page/User/ShopNow/ShopNowSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterTilte from "./FilterTitle"

const FilterColor = (props) => {

    const dispatch = useDispatch()

    const shopNow = useSelector(state => state.shopNow)

    const [dropDown, setDropDown] = useState(true);

    const handleChangeColor = async (item) => {
        await dispatch(filter({ color: item.value }))
    }

    return <div className="filter-colors pb-3 border-b border-light-gray  mb-5">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setDropDown(!dropDown)}>
            <FilterTilte title='Colors' />
            <i className={`fa-solid fa-angle-down font-bold ${dropDown && 'rotate-[-180deg]'} duration-300 ease-linear`}></i>
        </div>
        <div className={`color--item flex justify-between flex-wrap mt-2 ${dropDown && 'drop-down'}`}>
            {
                LIST_COLORS?.map((item, index) =>
                    <div
                        key={index}
                        className='w-[20%] mx-2 cursor-pointer flex flex-col items-center text-[11.5px] text-eclipse font-semibold mb-[20px]'
                        onClick={() => handleChangeColor(item)}
                    >
                        <div className={`w-8 h-8 rounded-[50%] relative ${item.value === MULTIPLE ? 'bg-gradient-to-tl from-teal-600 via-pink-500 to-yellow-200' : `bg-${item.value}`} ${item.value === WHITE && 'border border-light-gray'} mb-1`}>
                            <span className={`${shopNow.filter.color === item.value && `choose-color ${item.value === WHITE ? 'before:text-black' : 'text-white'}`}`}></span>
                        </div>
                        <p>{item.label}</p>
                    </div>)
            }
        </div>
    </div>
}

export default FilterColor