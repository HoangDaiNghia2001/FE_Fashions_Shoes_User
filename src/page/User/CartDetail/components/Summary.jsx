import { ORDER_FREESHIP } from "constants/variable"
import { CheckFeeShipping } from "utils/CheckFeeShipping"
import { TotalPrice } from "utils/TotalPrice"

const Summary = (props) => {

    return <div className="w-[32%] sticky top-[100px] h-full">
        <p className="text-eclipse font-semibold text-[32px] tracking-[2px] mb-4">Summary</p>
        <div>
            <div className="flex justify-between items-center text-[18px] text-eclipse tracking-[0.75px] mb-2">
                <p>Subtotal</p>
                <p className="font-semibold">{props.subTotal.toLocaleString()}<sup>đ</sup></p>
            </div>
            <div className="flex justify-between items-center text-[18px] text-eclipse tracking-[0.75px] mb-7">
                <p>Estimated Delivery &amp; Handling</p>
                <p className="font-semibold">{CheckFeeShipping(props.subTotal).toLocaleString()}<sup>{props.subTotal <= ORDER_FREESHIP && 'đ'}</sup></p>
            </div>
        </div>
        <div className="flex justify-between items-center text-[18px] text-eclipse tracking-[0.75px] mb-2 border-t border-b border-light-gray py-3">
            <p>Total</p>
            <p className="font-semibold text-red-custom">{TotalPrice(props.subTotal).toLocaleString()}<sup>đ</sup></p>
        </div>
        <div className="text-center mt-6">
            <button onClick={props.handleCheckout} className="button-custom py-2 px-16">Check out</button>
        </div>
    </div>
}

export default Summary