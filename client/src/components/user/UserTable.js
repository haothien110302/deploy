import React, { useState } from 'react';
import { updateUsers } from '../../util/api/userService'; // Import the updateUsers function

const UserTable = ({ users, onUpdate }) => {
    const [editedUsers, setEditedUsers] = useState(users);

    // Handle input changes and update local state
    const handleInputChange = (id, field, value) => {
        setEditedUsers((prev) =>
            prev.map((user) =>
                user.id === id ? { ...user, [field]: value } : user
            )
        );
    };

    // Send updated data to the parent or API
    const handleUpdate = async () => {
        try {
            const result = await updateUsers(editedUsers); // Use the API service to update users
            alert('Users updated successfully!');
            onUpdate(result.updatedRecords); // Pass updated records to parent
        } catch (error) {
            alert('Error updating users.');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {/* Table and Button Container */}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '10px' }}>
                <h2>User Management</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row'}} >       
            {/* Table */}
            <table border="1" cellPadding="10" style={{ width: '80%' }}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Birthdate</th>
                    </tr>
                </thead>
                <tbody>
                    {editedUsers.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <input
                                    type="text"
                                    value={user.username}
                                    onChange={(e) =>
                                        handleInputChange(user.id, "username", e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={user.email}
                                    onChange={(e) =>
                                        handleInputChange(user.id, "email", e.target.value)
                                    }
                                />
                            </td>
                            <td>{user.birthdate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
            <button 
                    onClick={handleUpdate} 
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '5px',
                    }}
            >
            Update Users
            </button>
            </div>
            </div> 
        </div>
    );
};

export default UserTable;