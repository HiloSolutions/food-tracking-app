import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    // Log Out Button shows only when the user is authenticated
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        { JSON.stringify(user, null, 2) }
      </div>
    )
  )
}

export default UserProfile