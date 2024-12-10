import EditProfileForm from "../components/Features/EditProfileForm";

function EditProfile({ currentUser, onUpdate }) {
    return <EditProfileForm currentUser={currentUser} onUpdate={onUpdate} />;
}

export default EditProfile;