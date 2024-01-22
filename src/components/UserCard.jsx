import { useUserContext } from '../context/userPovider';


const UserCard = ({ user, openEditModal }) => {
    const { onDelete, onLike, liked } = useUserContext();

    const onEditClick = () => {
        openEditModal(user.id);
    }

    return (
        <div className="user-card">
            <img src={user.image} alt="Profile" />
            <div className="user-info">
                <p>
                    <strong>{`${user.firstName} ${user.lastName}`}</strong>
                </p>
                <p>
                    <strong>&#9742;:</strong> {user.phone}
                </p>
                <p>
                    <strong>&#128231;:</strong> {user.email}
                </p>
                <div className="card-actions">
                    <button onClick={onLike} className={liked ? 'liked' : ''}>
                        {liked ? '❤️' : '🤍'}
                    </button>
                    <button onClick={() => onEditClick()}>
                        &#9998;
                    </button>
                    <button onClick={() => onDelete(user.id)}>
                        &#128465;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
