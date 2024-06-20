import { filter } from "page/User/ShopNow/ShopNowSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterTilte from "./FilterTitle"

const FilterSale = (props) => {
    const dispatch = useDispatch()

    const shopNow = useSelector(state => state.shopNow)

    const [dropDown, setDropDown] = useState(true);

    const handleChangeSale = async (e) => {
        await dispatch(filter({ sale: e.target.checked ? true : false }))
    }
    return <div className="filter-sale pb-3 border-b border-light-gray mb-5">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setDropDown(!dropDown)}>
            <FilterTilte title='Sale &amp; Offers' />
            <i className={`fa-solid fa-angle-down font-bold ${dropDown && 'rotate-[-180deg]'} duration-300 ease-linear`}></i>
        </div>
        <label htmlFor='sale' className={`checkbox-custom cursor-pointer ml-3 text-eclipse text-[16px] mt-2 flex items-center ${dropDown && 'drop-down'}`}>
            <input
                className="text-[20px] hidden"
                type='checkbox'
                id='sale'
                name='sale'
                onChange={(e) => handleChangeSale(e)}
                checked={shopNow.filter.sale} />
            <span className="checkmark"></span>
            Sale
        </label>
    </div >
}

export default FilterSale