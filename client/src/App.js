import React, { useState } from 'react';
import SearchUsers from './components/user/SearchUser';
import UserTable from './components/user/UserTable';
import { searchUsers, updateUsers } from './util/api/userService';

const App = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // Track the current search query

    // Handle search (unchanged)
    const handleSearch = async (query) => {
        setLoading(true);
        setSearchQuery(query); // Save the current search query
        try {
            const result = await searchUsers(query);
            setUsers(result);
        } catch (error) {
            alert('Error fetching users.');
        } finally {
            setLoading(false);
        }
    };

    // Handle user updates
    const handleUpdate = async (editedUsers) => {
        try {
             await updateUsers(editedUsers);
            
            // After update, we should use the same search query to fetch all relevant users
            handleSearch(searchQuery); // Refetch users based on the original search query
        } catch (error) {
            alert('Error updating users.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>User Management</h1>
            <SearchUsers onSearch={handleSearch} />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <UserTable users={users} onUpdate={handleUpdate} />
            )}
        </div>
    );
};

export default App;
