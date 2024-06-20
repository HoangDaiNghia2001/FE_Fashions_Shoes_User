import { useDispatch, useSelector } from "react-redux"
import { resetFilter, shopNowSelector } from "../../ShopNowSlice"
import FilterBrand from "./Components/FilterBrand"
import FilterCategory from "./Components/FilterCategories"
import FilterColor from "./Components/FilterColors"
import FilterPrice from "./Components/FilterPrice"
import FilterSale from "./Components/FilterSale"

const Navbar = (props) => {

    const dispatch = useDispatch()

    const { showNavbar } = props

    const shopNow = useSelector(shopNowSelector)

    const reset = async () => {
        await dispatch(resetFilter())
    }

    return <div className={`${showNavbar ? 'w-[18%]' : 'w-0 h-0'} duration-150 overflow-hidden`}>
        <FilterBrand />
        <FilterCategory code='CATEGORY' title='Category' options={shopNow.listParentCategory} />
        <FilterCategory code='ACTIVITY' title='Activity' options={shopNow.listChildCategory} />
        <FilterSale />
        <FilterColor />
        <FilterPrice />
        <div className="text-center mb-2">
            <button type="button" className="button-reset px-7 py-1" onClick={() => reset()}>Reset Filter</button>
        </div>
    </div>
}

export default Navbar