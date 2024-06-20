import { ORDER_FREESHIP, FEE_SHIPPING } from "../constants/variable";
export const TotalPrice = (subTotal) => {
    if (subTotal === 0) {
        return 0;
    } else if (subTotal > 0 && subTotal < ORDER_FREESHIP) {
        return subTotal + FEE_SHIPPING;
    } else {
        return subTotal;
    }
}