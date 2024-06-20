import { LIST_SORT_BY } from "constants/variable"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filter } from "../../ShopNowSlice"

const FilterSection = (props) => {
    const dispatch = useDispatch()

    const shopNow = useSelector(state => state.shopNow)

    const { showNavbar, setShowNavbar } = props

    const [dropDown, setDropDown] = useState(false)

    const handleChangeSortBy = (item) => {
        setDropDown(!dropDown)
        dispatch(filter({ sort: item.value }))
    }

    return <div className="filter-section flex justify-between items-center mb-5">
        <p className="text-[22px] text-eclipse font-bold tracking-[1px]">Total products ({shopNow.totalProduct})</p>
        <div className="flex text-eclipse text-[16px] font-normal">
            <div className="cursor-pointer mr-12 font-semibold" onClick={() => setShowNavbar(!showNavbar)}>
                <p>{showNavbar ? 'Hide' : 'Show'} Filters <i className="fa-solid fa-sliders ml-1"></i></p>
            </div>
            <div className="relative">
                <p className="font-semibold cursor-pointer" onClick={() => setDropDown(!dropDown)}>
                    Sort By:
                    <span className="font-normal ml-2">{LIST_SORT_BY?.filter((item) => item.value === shopNow.filter.sort)[0].label}</span>
                    <i className={`fa-solid fa-angle-down font-bold duration-300 ease-linear ml-1 ${dropDown && 'rotate-[-180deg]'} duration-300 ease-linear'}`}></i>
                </p>
                <ul className={`bg-white flex flex-col items-end absolute right-0 z-20 mt-1 pb-3 px-4 w-[150px] rounded-[8px] ${dropDown && 'drop-down'}`}>
                    {
                        LIST_SORT_BY?.map((item, index) => <li
                            key={index}
                            className={`cursor-pointer mt-[6px] duration-150 ease-linear hover:text-red-custom ${shopNow.filter.sort === item.value && 'text-red-custom'}`}
                            onClick={() => handleChangeSortBy(item)}>
                            {item.label}
                        </li>)
                    }
                </ul>
            </div>
        </div>
    </div>
}

export default FilterSection