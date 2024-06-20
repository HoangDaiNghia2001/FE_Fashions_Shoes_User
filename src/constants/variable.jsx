// export const BASE_URL = 'http://localhost:8080'
export const BASE_URL = 'https://backendfashionshoes-production.up.railway.app'

// role
export const ROLE_USER = 'USER';
export const ROLE_ADMIN = 'ADMIN';

// gender
export const MALE = "MALE"
export const FEMALE = "FEMALE"
export const OTHER = "OTHER"

//token cookie
export const TOKEN_COOKIE = "token_cookie"

// price
export const FEE_SHIPPING = 30000;
export const ORDER_FREESHIP = 5000000;

// url
export const APP_URLS = {
    URL_HOME: '/home',
    URL_SHOP_NOW: '/shop-now',
    URL_ABOUT: '/about',
    URL_CONTACT: '/contact',
    URL_SYSTEM_STORE: '/system-store',
    URL_LOGIN: '/login',
    URL_SIGNUP: '/signup',
    URL_FORGOT_PASSWORD: '/forgot-password',
    URL_VALIFATE_OTP: '/validate-otp',
    URL_RESET_PASSWORD: '/reset-password',
    URL_CART: '/cart',
    URL_PRODUCT: '/product',
    URL_CHECKOUT: '/checkout',
    URL_ORDERS: '/orders',
    URL_ACCOUNT: '/account',
    URL_CHANGE_PASSWORD: '/change-password',
    URL_VNPAY_RESPONSE: '/vnpay-response'
}

//navbar
export const NAVBAR_MENU = [
    {
        'name': 'home',
    }, {
        'name': 'shop now',
    }, {
        'name': 'about'
    }, {
        'name': 'contact'
    }, {
        'name': 'system store'
    }
]

// list gender
export const LIST_GENDER = [
    {
        value: 'MALE',
        label: 'Male',
    },
    {
        value: 'FEMALE',
        label: 'Female',
    },
    {
        value: 'ORTHER',
        label: 'Other',
    }
]

export const LIST_CHECKOUT = [
    {
        'name': 'Shipping',
        'subName': 'Where to ship it?'
    }, {
        'name': 'Payment',
        'subName': 'Of your order?'
    }
]

export const PAYMENT_METHOD = {
    COD: 'COD',
    VNPAY: 'VNPAY',
    MOMO: 'MOMO'
}

export const STATUS_ORDER = {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    SHIPPED: 'SHIPPED',
    DELIVERED: 'DELIVERED'
}

export const LIST_ORDER_STATUS = [
    {
        value: 'PENDING',
        label: 'Pending'
    }, {
        value: 'CONFIRMED',
        label: 'Confirmed'
    }, {
        value: 'SHIPPED',
        label: 'Shipped'
    }, {
        value: 'DELIVERED',
        label: 'Delivered'
    },
]

export const LIST_PAYMENT_METHOD = [
    {
        value: 'COD',
        label: 'COD'
    }, {
        value: 'VNPAY',
        label: 'VNPAY'
    }, {
        value: 'MOMO',
        label: 'MOMO'
    }
]

// name color
export const BLACK = 'BLACK'

export const BLUE = 'BLUE'

export const BROWN = 'BROWN'

export const GREEN = 'GREEN'

export const GREY = 'GREY'

export const ORANGE = 'ORANGE'

export const PINK = 'PINK'

export const PURPLE = 'PURPLE'

export const RED = 'RED'

export const WHITE = 'WHITE'

export const YELLOW = 'YELLOW'

export const MULTIPLE = 'MULTI'

// list colors
export const LIST_COLORS = [
    {
        value: BLACK,
        label: 'Black'
    }, {
        value: BLUE,
        label: 'Blue'
    }, {
        value: BROWN,
        label: 'Brown'
    }, {
        value: GREEN,
        label: 'Green'
    }, {
        value: GREY,
        label: 'Grey'
    }, {
        value: ORANGE,
        label: 'Orange'
    }, {
        value: PINK,
        label: 'Pink'
    }, {
        value: PURPLE,
        label: 'Purple'
    }, {
        value: RED,
        label: 'Red'
    }, {
        value: WHITE,
        label: 'White'
    }, {
        value: YELLOW,
        label: 'Yellow'
    }, {
        value: MULTIPLE,
        label: 'Multiple'
    },
]

// list sort by
export const LIST_SORT_BY = [
    {
        value: 'newest',
        label: 'Newest'
    }, {
        value: 'price_low',
        label: 'Price: Low-Hight'
    }, {
        value: 'price_hight',
        label: 'Price: Hight-Low'
    },
]

