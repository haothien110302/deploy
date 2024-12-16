import axios from 'axios';

const API_BASE_URL = 'http://localhost:8083/api'; // Backend API URL

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-auth-token': 'thien1103',  // Add custom API key header here
    },
});

// Search users by name or email
export const searchUsers = async (query) => {
    try {
        const response = await apiClient.get(`${API_BASE_URL}/users/search`, {
            params: { name: query },
        });
        return response.data;
    } catch (error) {
        console.error('Error searching users:', error);
        throw error;
    }
};

// Update user records
export const updateUsers = async (records) => {
    try {
        const response = await apiClient.post(`${API_BASE_URL}/users/update`, { records });
        return response.data;
    } catch (error) {
        console.error('Error updating users:', error);
        throw error;
    }
};
