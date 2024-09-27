import React from 'react';

const FriendList = ({ friends, onSelectFriend }) => {
  return (
    <div className="d-flex flex-column h-100 bg-light">
      <div className="bg-primary text-white top-bar">
        <h5 className="mb-0">Friends</h5>
      </div>
      <div className="friend-list p-3" style={{ overflowY: 'auto', flexGrow: 1 }}>
        {friends.map(friend => (
          <div key={friend.id} className="friend-item p-2 my-1 bg-white rounded shadow-sm" onClick={() => onSelectFriend(friend.id)}>
            {friend.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
