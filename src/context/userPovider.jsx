import UserContext from "./userContext";
import { useContext, useState } from "react";

const UserProvider = ({ children }) => {

    const [users, setUsers] = useState([]);
    const [liked, setLiked] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    //Like handler
    const onLike = () => {
        setLiked(!liked);
    };


    //Delete the card
    const onDelete = (deletedUserId) => {
        const updatedUsers = users.filter((user) => user.id !== deletedUserId);
        setUsers(updatedUsers);
    };

    // Save the edited value after editing
    const onSave = (updatedUser) => {
        // Implement save functionality
        // Update the user data
        const updatedUsers = users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
        );
        console.log('updatedUsers', updatedUsers)
        setUsers(updatedUsers);
    };


    return (
        <UserContext.Provider
            value={
                {
                    users, setUsers, showEditModal, setShowEditModal,
                    onDelete, onSave, onLike, liked
                }
            }
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};


export default UserProvider

