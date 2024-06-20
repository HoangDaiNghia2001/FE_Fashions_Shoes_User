import { FEE_SHIPPING, ORDER_FREESHIP } from "../constants/variable";
export const CheckFeeShipping = (subTotal) => {
    if (subTotal === 0) {
        return 0;
    } else if (subTotal > 0 && subTotal < ORDER_FREESHIP) {
        return FEE_SHIPPING;
    } else {
        return 'Free';
    }
}