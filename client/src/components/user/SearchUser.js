import React, { useState } from 'react';

const SearchUsers = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <input
                type="text"
                placeholder="Search by username or email..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchUsers;
