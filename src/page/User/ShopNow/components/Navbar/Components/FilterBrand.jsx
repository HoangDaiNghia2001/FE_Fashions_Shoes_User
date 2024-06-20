import { filter, shopNowSelector } from "page/User/ShopNow/ShopNowSlice";
import { useDispatch, useSelector } from "react-redux";
import FilterTilte from "./FilterTitle"

const FilterBrand = (props) => {

    const dispatch = useDispatch();

    const shopNow = useSelector(shopNowSelector)

    const handleChangeBrand = async (item) => {
        if (item.value === undefined) {
            await dispatch(filter({ brandId: item.value, parentCategoryId: undefined, childCategoryId: undefined }))
        } else {
            await dispatch(filter({ brandId: item.value }))
        }
    }

    return <div className="filter-brand pb-3 mb-5 border-b border-light-gray">
        <FilterTilte title='Brand' />
        <ul className="flex flex-col items-start text-eclipse text-[16px] ml-1">
            {
                shopNow.listBrands?.map((item, index) => <li
                    className={`tracking-[0.75px] mb-1 duration-200 ease-linear cursor-pointer font-normal flex items-center hover:text-red-custom ${shopNow.filter.brandId === item.value && 'text-red-custom font-semibold'}`}
                    key={index}
                    onClick={() => handleChangeBrand(item)}
                >
                    <span className={`check before:text-red-custom duration-200 ease-linear ${shopNow.filter.brandId === item.value ? 'opacity-100' : 'opacity-0'}`}></span>
                    {item.label}
                </li>)
            }
        </ul>
    </div>
}

export default FilterBrand