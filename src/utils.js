import axios from 'axios';
import CryptoJS from 'crypto-js';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Your API base URL
const codeKey = import.meta.env.VITE_CODE_KEY;

// Decrypt an encrypted string using AES decryption
function decryptString(encryptedData, key = codeKey) {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8);
    return decrypted;
}

function encryptString(data, key = codeKey) {
    const encrypted = CryptoJS.AES.encrypt(data, key).toString();
    console.log(encrypted)
    return encrypted;
}

const retrieveDataFromSession = (key = 'access_token', defaultValue = false) => {
    // removeDataFromSession(key)
    // Get the data from local storage
    const sessionData = localStorage.getItem(key);
    // Check if session data exists
    if (sessionData) {
        const data = JSON.parse(sessionData);
        if (defaultValue) {
            return data
        }
        return true
    } else {
        return false
    }
};


const storeDataInSession = (key = 'access_token', data) => {
    localStorage.setItem(key, JSON.stringify(data));
    // console.log(data)
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
        console.log(apiResponse)
        return apiResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


const getCommentsByPostId = async (id) => {
    try {
        const url = `${API_BASE_URL}/comment/get/${id}`;
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


const getRepliesByCommentId = async (id, comment_id) => {
    try {
        const url = `${API_BASE_URL}/comment/get/${id}?get_replies=${comment_id}`;
        const response = await axios.get(url);
        const apiResponse = response.data;
        return apiResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


const delCommentsById = (comment_id) => {
    const headersPromise = retrieveToken().then((token) => {
        return {
            Authorization: `Bearer ${token}`,
        };
    });

    const url = `${API_BASE_URL}/comment/delete/${comment_id}`;

    return headersPromise
        .then((headers) => {
            return axios.delete(url, { headers });
        })
        .then((response) => {
            const statusCode = response.status;
            if (statusCode === 204) {
                // Return the integer status code
                return statusCode;
            } else {
                throw new Error(`Unexpected status code: ${statusCode}`);
            }
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
};


const ReplytoComment = async (commentData) => {
    try {
        const headers = await retrieveToken().then((token) => {
            return {
                Authorization: `Bearer ${token}`,
            };
        });

        const url = `${API_BASE_URL}/comment/add`;

        const response = await axios.post(url, commentData.expects, { headers });

        if (response.status === 201) {
            return response.status
        } else {

        }
    } catch (error) {
        // Handle error
        return error
    }
};


const getUserInfo = () => {
    const headersPromise = retrieveToken().then((token) => {
        return {
            Authorization: `Bearer ${token}`,
        };
    });
    const url = `${API_BASE_URL}/user/info`;
    return headersPromise
        .then((headers) => {
            return axios.get(url, { headers });
        })
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch((error) => {
            console.log(error.response.data["detail"])
            return error.response.data["detail"]
        });
}



export {
    getUserInfo,
    getPostBySlug,
    getSearchResults,
    getPostsByCategory,
    getCommentsByPostId,
    API_BASE_URL,
    getRepliesByCommentId,
    delCommentsById,
    ReplytoComment,
    retrieveDataFromSession,
    decryptString,
    encryptString,
    axios,
};