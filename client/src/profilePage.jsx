import React from "react";
import { useLocation, Navigate } from "react-router-dom";

function ProfilePage() {
  const location = useLocation();
  const user = location.state;

  if (!user) {
    // Eğer user verisi yoksa login'e geri yönlendir
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Profil Sayfası</h1>
      <p><strong>Ad:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Şifre:</strong> {user.password}</p> {/* Gerçekte gösterme! */}
    </div>
  );
}

export default ProfilePage;
