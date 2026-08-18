
export const Routes = {

    BASE_URL: 'https://fakestoreapi.com',

    // =========================
    // Product Routes
    // =========================

    GET_ALL_PRODUCTS: '/products',
    GET_PRODUCT_BY_ID: '/products/{id}',
    GET_PRODUCTS_WITH_LIMIT: '/products?limit={limit}',
    GET_PRODUCTS_SORTED: '/products?sort={order}',
    GET_ALL_CATEGORIES: '/products/categories',
    GET_PRODUCTS_BY_CATEGORY: '/products/category/{category}',
    CREATE_PRODUCT: '/products',
    UPDATE_PRODUCT: '/products/{id}',
    DELETE_PRODUCT: '/products/{id}',

    // =========================
    // User Routes
    // =========================

    GET_ALL_USERS: '/users',
    GET_USER_BY_ID: '/users/{id}',
    GET_USERS_WITH_LIMIT: '/users?limit={limit}',
    GET_USERS_SORTED: '/users?sort={order}',
    CREATE_USER: '/users',
    UPDATE_USER: '/users/{id}',
    DELETE_USER: '/users/{id}',

    // =========================
    // Cart Routes
    // =========================

    GET_ALL_CARTS: '/carts',
    GET_CART_BY_ID: '/carts/{id}',
    GET_CARTS_BY_DATE_RANGE: '/carts?startdate={startdate}&enddate={enddate}',
    GET_USER_CART: '/carts/user/{userId}',
    GET_CARTS_WITH_LIMIT: '/carts?limit={limit}',
    GET_CARTS_SORTED: '/carts?sort={order}',
    CREATE_CART: '/carts',
    UPDATE_CART: '/carts/{id}',
    DELETE_CART: '/carts/{id}',

    // =========================
    // Authentication Routes
    // =========================

    AUTH_LOGIN: '/auth/login'
}

