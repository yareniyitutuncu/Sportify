import React, { useState, useEffect } from 'react';
import { auth, db, setDoc, doc, getDoc } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; // Header importu
import './Profile.css';
import { sendPasswordResetEmail, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth'; // Importları ekledik

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    birthDate: "",
    height: "",
    weight: "",
    waterIntake: "",
    profileImage: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newUser, setNewUser] = useState({ ...user });
  const [image, setImage] = useState(null);  // Fotoğraf yüklemek için state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal kontrolü
  const [errorMessage, setErrorMessage] = useState("");  // Error Message için state
  const [showForgotPassword, setShowForgotPassword] = useState(false);  // Forgot Password kontrolü

  useEffect(() => {
    const fetchUserData = async () => {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setUser(userDoc.data());
      } else {
        console.log("No such document!");
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fotoğraf değişikliği yapıldıysa Base64'e dönüştür ve Firestore'a kaydet
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);  // Fotoğrafı Base64'e dönüştür
      reader.onloadend = async () => {
        const base64Image = reader.result;
        newUser.profileImage = base64Image;  // Base64 verisini kullanıcı verisine ekle
        await saveUserData();  // Veriyi kaydet
      };
    } else {
      await saveUserData();  // Eğer fotoğraf değiştirilmemişse direkt kaydet
    }
  };

  const saveUserData = async () => {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    await setDoc(userDocRef, newUser, { merge: true }); // Firestore'da güncelle
    setUser(newUser); // State'i güncelle
    setIsEditing(false); // Düzenleme modunu kapat
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);  // Yüklemek için fotoğrafı kaydediyoruz
    }
  };

  // Fotoğrafı değiştirme butonunun tıklanması
  const handleImageClick = () => {
    document.getElementById('profileImage').click();  // Input'u tetikliyoruz
  };

  // Şifre değiştirme işlemi için modal açma
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Modalı kapatma
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Şifre değiştirme işlemi
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    const userCredential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    );

    try {
      await reauthenticateWithCredential(auth.currentUser, userCredential);
      await updatePassword(auth.currentUser, newPassword);
      alert("Password updated successfully");
      setIsModalOpen(false);  // Modalı kapat
    } catch (error) {
      setErrorMessage("Incorrect current password. Please try again.");
      setShowForgotPassword(true);  // Forgot Password'ı göster
    }
  };

  // Forgot Password İşlemi
  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, auth.currentUser.email);
      alert("Password reset email sent!");
      setIsModalOpen(false);  // Modalı kapat
    } catch (error) {
      setErrorMessage("Error sending password reset email. Please try again.");
    }
  };

  return (
    <div className="profile-container">
      <Header backButton={true} title="Profile" exitButton={true} /> {/* Sadece Profil sayfasında Exit butonunu göstermek için exitButton=true */}

      <div className="profile-info">
        <div className="profile-header">
          <img
            src={user.profileImage || "/src/assets/default-profile.png"}
            alt="Profile"
            className="profile-image"
          />
          {isEditing && (
            <div className="change-profile-image-btn">
              <button onClick={handleImageClick}>
                Change Profile Picture
              </button>
              <input
                type="file"
                accept="image/*"
                id="profileImage"
                onChange={handleFileChange}
                style={{ display: 'none' }}  // Fotoğraf seçme alanını gizliyoruz
              />
            </div>
          )}

          <h2>{user.name || "No Name"}</h2>
          <p className="profile-email">{auth.currentUser.email}</p>
        </div>

        <div className="profile-details">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="edit-profile-form">
              <div className="edit-profile-field">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                />
              </div>

              <div className="edit-profile-field">
                <label htmlFor="birthDate">Birth Date</label>
                <input
                  type="date"
                  name="birthDate"
                  value={newUser.birthDate}
                  onChange={handleInputChange}
                  placeholder="Birth Date"
                />
              </div>

              <div className="edit-profile-field">
                <label htmlFor="height">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={newUser.height}
                  onChange={handleInputChange}
                  placeholder="Height (cm)"
                />
              </div>

              <div className="edit-profile-field">
                <label htmlFor="weight">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={newUser.weight}
                  onChange={handleInputChange}
                  placeholder="Weight (kg)"
                />
              </div>

              <div className="edit-profile-field">
                <label htmlFor="waterIntake">Daily Water Intake (L)</label>
                <input
                  type="number"
                  name="waterIntake"
                  value={newUser.waterIntake}
                  onChange={handleInputChange}
                  placeholder="Water Intake (L)"
                />
              </div>

              <div className="edit-profile-actions">
                <button type="submit" className="save-changes-btn">Save Changes</button>
                <button type="button" className="cancel-changes-btn" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <div className="profile-detail">
                <span className="detail-title">Height</span>
                <span className="detail-value">{user.height || "Not provided"}</span>
              </div>
              <div className="profile-detail">
                <span className="detail-title">Weight</span>
                <span className="detail-value">{user.weight || "Not provided"}</span>
              </div>
              <div className="profile-detail">
                <span className="detail-title">Age</span>
                <span className="detail-value">{user.birthDate ? (new Date().getFullYear() - new Date(user.birthDate).getFullYear()) + "y/o" : "Not provided"}</span>
              </div>
              <div className="profile-detail">
                <span className="detail-title">Water Intake</span>
                <span className="detail-value">{user.waterIntake || "Not provided"} L</span>
              </div>

              <div className="profile-actions">
                <button onClick={() => setIsEditing(!isEditing)} className="edit-profile-btn">
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>

                <button onClick={openModal} className="change-password-btn">
                  Change Password
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal Penceresi */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Change Password</h3>
            <form onSubmit={handlePasswordChange}>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
                required
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                required
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {showForgotPassword && (
                <button type="button" onClick={handleForgotPassword} className="forgot-password-btn">
                  Forgot Password?
                </button>
              )}
              <div className="modal-actions">
                <button type="submit" className="save-password-btn">Save</button>
                <button type="button" className="cancel-password-btn" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
