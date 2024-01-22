import { useState, useEffect } from 'react';
import { useUserContext } from '../context/userPovider';

const EditCardModal = ({ closeModal, userId }) => {
    const { users, onSave } = useUserContext();
    const [editedUser, setEditedUser] = useState({});


    useEffect(() => {
        // Find the user with the specified userId
        const userToEdit = users.find(user => user.id === userId);

        if (userToEdit) {
            // Set the state with the userToEdit data
            setEditedUser(userToEdit);
        }
    }, [userId, users]);


    const handleSave = () => {
        onSave(editedUser);
        closeModal();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    return (
        <div className="edit-user-form">
            <h2 className="form-title">Edit User</h2>

            <label className="form-label">
                First Name:
                <input
                    type="text"
                    name="firstName"
                    value={editedUser.firstName || ''}
                    onChange={handleInputChange}
                    className="form-input"
                />
            </label>

            <label className="form-label">
                Last Name:
                <input
                    type="text"
                    name="lastName"
                    value={editedUser.lastName || ''}
                    onChange={handleInputChange}
                    className="form-input"
                />
            </label>

            <label className="form-label">
                Email:
                <input
                    type="email"
                    name="email"
                    value={editedUser.email || ''}
                    onChange={handleInputChange}
                    className="form-input"
                />
            </label>

            <label className="form-label">
                Phone:
                <input
                    type="tel"
                    name="phone"
                    value={editedUser.phone || ''}
                    onChange={handleInputChange}
                    className="form-input"
                />
            </label>

            <div className="button-container">
                <button onClick={closeModal} className="cancel-button">Cancel</button>
                <button onClick={handleSave} className="save-button">Save Changes</button>
            </div>
        </div>
    );
};

export default EditCardModal;
