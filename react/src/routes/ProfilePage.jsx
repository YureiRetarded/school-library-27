import React from 'react';
import Protected from "../components/Protected.jsx";
import Profile from "../components/Profile.jsx";

const ProfilePage = () => {
    return (
        <Protected requirement_access={1}>
            <Profile/>
        </Protected>
    );
};

export default ProfilePage;
