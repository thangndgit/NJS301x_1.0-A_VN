// Create API constant
const API = {};

// API hostname
const HOSTNAME = "http://localhost:5000";

// Set value for sub-constant
API.POST_REGISTER = HOSTNAME + "/api/auth/register";
API.GET_LOGIN = HOSTNAME + "/api/auth/login";
API.POST_LOGIN = HOSTNAME + "/api/auth/login";

API.GET_HOTEL_BY_ID = HOSTNAME + "/api/hotel/get-by-id";
API.GET_HOTEL_COUNT = HOSTNAME + "/api/hotel/count";
API.GET_HOTEL_TOP_RATE = HOSTNAME + "/api/hotel/top-rate";
API.POST_HOTEL_SEARCH = HOSTNAME + "/api/hotel/search";
API.POST_FREE_ROOMS_SEARCH = HOSTNAME + "/api/hotel/search-free-rooms";

API.POST_CREATE_TRANSACTION = HOSTNAME + "/api/transaction/create-transaction";
API.GET_TRANSACTION_BY_HOTEL_ID = HOSTNAME + "/api/transaction/get-by-user-id";

export default API;
