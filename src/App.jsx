import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import UserCard from './components/UserCard';
import { useUserContext } from './context/userPovider';
import EditCardModal from './components/EditCardModal';

const App = () => {
  const { users, setUsers } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userId, setUserId] = useState(null);

  const openEditModal = (userId) => {
    setUserId(userId);
    setShowEditModal(true);
    console.log('userId from EditButton', userId)
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users');
        setUsers(response.data.users);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchUsers();
  }, [setUsers]);

  return (
    <div className="app">
      <h1>Fake User App</h1>
      {loading ? (
        <div className="loading-container">
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
        </div>
      ) : (
        <div className="user-list">
          {users.map((user) => (
            <UserCard key={user.id} user={user} openEditModal={openEditModal} />
          ))}
        </div>
      )}
      {showEditModal && (
        <div className="modal-overlay">
          <div id="editModalContent">
            <EditCardModal closeModal={closeEditModal} userId={userId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
