// Create API constant
const API = {};

// API hostname
const HOSTNAME = "http://localhost:5000";

// Set value for sub-constant
API.POST_REGISTER = HOSTNAME + "/api/auth/register";
API.GET_LOGIN = HOSTNAME + "/api/auth/login";
API.POST_LOGIN = HOSTNAME + "/api/auth/login";

API.GET_ALL_HOTELS = HOSTNAME + "/api/hotel/get-all";
API.GET_HOTEL_BY_ID = HOSTNAME + "/api/hotel/get-by-id";
API.GET_HOTEL_COUNT = HOSTNAME + "/api/hotel/count";
API.GET_HOTEL_TOP_RATE = HOSTNAME + "/api/hotel/top-rate";
API.POST_CREATE_HOTEL = HOSTNAME + "/api/hotel/create";
API.POST_UPDATE_HOTEL_BY_ID = HOSTNAME + "/api/hotel/update-by-id";
API.POST_HOTEL_SEARCH = HOSTNAME + "/api/hotel/search";
API.POST_FREE_ROOMS_SEARCH = HOSTNAME + "/api/hotel/search-free-rooms";
API.POST_DELETE_HOTEL_BY_ID = HOSTNAME + "/api/hotel/delete-by-id";

API.POST_CREATE_TRANSACTION = HOSTNAME + "/api/transaction/create-transaction";
API.GET_TRANSACTION_BY_HOTEL_ID = HOSTNAME + "/api/transaction/get-by-user-id";
API.GET_LATEST_TRANSACTIONS = HOSTNAME + "/api/transaction/get-latest";
API.GET_TRANSACTIONS_COUNT = HOSTNAME + "/api/transaction/count";
API.GET_EARNINGS = HOSTNAME + "/api/transaction/earnings";

API.GET_ALL_USERS = HOSTNAME + "/api/user/get-all";
API.GET_USERS_COUNT = HOSTNAME + "/api/user/count";

API.GET_ALL_ROOMS = HOSTNAME + "/api/room/get-all";
API.GET_ROOM_BY_ID = HOSTNAME + "/api/room/get-by-id";
API.GET_NON_ATTACHED_ROOMS = HOSTNAME + "/api/room/get-non-attached";
API.POST_DELETE_ROOM_BY_ID = HOSTNAME + "/api/room/delete-by-id";
API.POST_CREATE_ROOM = HOSTNAME + "/api/room/create";
API.POST_UPDATE_ROOM_BY_ID = HOSTNAME + "/api/room/update-by-id";

export default API;
