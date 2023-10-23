import axios from 'axios';
import CryptoJS from 'crypto-js';

const API_BASE_URL = 'https://techscrape-scrapper-api.onrender.com'; // Your API base URL
const codeKey = import.meta.env.VITE_CODE_KEY;
let token;

async function getNewAccessToken(refreshToken) {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/refresh-token`, {
            refresh_token: refreshToken,
        });

        // Extract the new access token
        const newAccessToken = response.data.access_token;

        // Return or do something with the new access token
        return newAccessToken;
    } catch (error) {
        console.error('An error occurred while refreshing the token:', error);
        // Handle the error as needed
        return null;
    }
}


function isTokenExpired(jwtToken) {
    // Split the token into its parts: header, payload, signature
    const parts = jwtToken.split('.');

    // Take the payload part, and decode it from base64
    const decoded = atob(parts[1]);

    // Parse it as a JSON object
    const payload = JSON.parse(decoded);

    // Get the expiration time from the payload (it's usually named 'exp')
    const expirationTime = payload.exp; // This is in UNIX epoch format (seconds)

    // Get the current time in UNIX epoch format (seconds)
    const currentTime = Math.floor(Date.now() / 1000); // Date.now() returns milliseconds

    // Compare the current time with the expiration time
    if (currentTime >= expirationTime) {
        return true; // The token has expired
    } else {
        return false; // The token is still valid
    }
}


function decrypt(ciphertext, key = codeKey) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}


async function clearAllStorages() {
    return new Promise((resolve, reject) => {
        try {
            localStorage.clear();
            sessionStorage.clear();
            resolve("Success");
        } catch (error) {
            reject("An error occurred while clearing storage: " + error);
        }
    });
}


async function retrieveDataFromSession(key = 'access_token') {
    try {
        // Get the data from local storage
        const encryptedSessionData = localStorage.getItem(key);

        if (!encryptedSessionData) {
            return false;
        }

        // Decrypt once and use throughout
        const sessionData = decrypt(encryptedSessionData, codeKey);

        // Check token expiration
        if (isTokenExpired(sessionData)) {
            const encryptedRefreshToken = localStorage.getItem('refresh_token');

            if (!encryptedRefreshToken) {
                return false;  // No refresh token available
            }

            const refreshToken = decrypt(encryptedRefreshToken, codeKey);

            // Asynchronously get a new access token
            const newAccessToken = await getNewAccessToken(refreshToken);

            if (!newAccessToken) {
                return false;  // Failed to refresh token
            }

            // Encrypt and store the new access token
            const encryptedNewAccessToken = encrypt(newAccessToken, codeKey);
            localStorage.setItem(key, encryptedNewAccessToken);

            return newAccessToken;
        }
        return sessionData;

    } catch (error) {
        console.error('An error occurred:', error);
        return false;
    }
}


async function initializeToken() {
    token = await retrieveDataFromSession("access_token");
    return token
}



function encrypt(message, key = codeKey) {
    const ciphertext = CryptoJS.AES.encrypt(message, key);
    return ciphertext.toString();
}


const storeDataInSession = (key = 'access_token', data) => {
    localStorage.setItem(key, data);
};
const getPostsByCategory = async (category, page = 1, pageSize = 8) => {
    try {
        const url = `${API_BASE_URL}/tech/categories?category=${category}&page=${page}&page_size=${pageSize}`;
        const response = await axios.get(url);
        const apiResponse = response.data;
        return apiResponse
    } catch (error) {
        // Handle any error occurred during the API request
        console.error(error);
        throw error;
    }
};


const getPostBySlug = async (slug) => {
    try {
        const url = `${API_BASE_URL}/tech/content?slug=${slug}`;
        const response = await axios.get(url);
        const apiResponse = response.data;
        return apiResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


const getCommentsByPostId = async (id) => {
    try {
        const url = `${API_BASE_URL}/comment/get_top_level_comments/${id}`;
        const response = await axios.get(url);
        const apiResponse = response.data;
        return apiResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


const getSearchResults = async (query, page = 1) => {
    try {
        const url = `${API_BASE_URL}/search?search=${encodeURIComponent(query)}&page=${page}`;
        const response = await axios.get(url);
        const apiResponse = response.data;
        return apiResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


const getRepliesByCommentId = async (comment_id) => {
    try {
        const url = `${API_BASE_URL}/comment/get_all_replies/${comment_id}`;
        const response = await axios.get(url);
        const apiResponse = response.data;
        return apiResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


const delCommentsById = async (comment_id) => {
    const token = await retrieveDataFromSession("access_token")

    const headers = {
        Authorization: `Bearer ${token}`,
    }

    const url = `${API_BASE_URL}/comment/delete/${comment_id}`;

    return axios.delete(url, { headers })

        .then((response) => {
            if (response.status === 204) {
                // Return the integer status code
                return response.status;
            } else {
                throw new Error(`Unexpected status code: ${response.status}`);
            }
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
};

const MakeComments = async (payload) => {  // Added token as a parameter
    const token = await retrieveDataFromSession("access_token")

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'  // This is often required
    };

    const url = `${API_BASE_URL}/comment/add`;

    return axios.post(url, payload, { headers })  // Moved headers to the third argument
        .then((response) => {
            if (response.status === 201) {
                return response.status;
            } else {
                throw new Error(`Unexpected status code: ${response.status}`);
            }
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
};



const ReplytoComment = async (commentData) => {
    const token = await retrieveDataFromSession("access_token")

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'  // This is often required
    };

    const url = `${API_BASE_URL}/comment/add`;

    return axios.post(url, commentData, { headers })  // Moved headers to the third argument
        .then((response) => {
            if (response.status === 201) {
                return response.status;
            } else {
                throw new Error(`Unexpected status code: ${response.status}`);
            }
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
};


const getUserInfo = async () => {  // Added token as a parameter
    const token = await retrieveDataFromSession("access_token")

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const url = `${API_BASE_URL}/user/info`;

    return axios.get(url, { headers })
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch((error) => {
            console.log(error.response ? error.response.data["detail"] : "An error occurred");
            return error.response ? error.response.data["detail"] : "An error occurred";
        });
}



export default API_BASE_URL
export {
    getUserInfo,
    storeDataInSession,
    getPostBySlug,
    getSearchResults,
    getPostsByCategory,
    getCommentsByPostId,
    API_BASE_URL,
    getRepliesByCommentId,
    delCommentsById,
    ReplytoComment,
    retrieveDataFromSession,
    decrypt,
    initializeToken,
    encrypt,
    MakeComments,
    axios,
};
