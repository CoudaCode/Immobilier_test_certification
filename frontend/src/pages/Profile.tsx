import React, { useEffect } from "react";
import { BsBack } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../context/useAuthStore";

const Profile: React.FC = () => {
  const router = useNavigate();

  const { user, isAuthenticated, isLoading, logout } = useAuthStore(
    (state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading,
      logout: state.logout,
    })
  );

  const handleLogout = () => {
    logout();
    router("/login");
  };
  // Redirigez vers la page de connexion si l'utilisateur n'est pas authentifié
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login"; // Redirection simple, vous pouvez utiliser un router ici
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <span
        onClick={() => router("/product")}
        className="text-gray-100 cursor-pointer ml-10 mt-10 text-center"
      >
        Retour à la listes de Propriétés <BsBack className="inline-block" />
      </span>
      <div className="max-w-lg mx-auto mt-10 bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">Profil</h1>
        {user ? (
          <div className="mt-4">
            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-gray-600">Nom d'utilisateur:</span>
              <span className="font-semibold text-gray-800">
                {user.username}
              </span>
            </div>
            <div className="flex items-center justify-between border-b py-4">
              <span className="text-gray-600">Email:</span>
              <span className="font-semibold text-gray-800">{user.email}</span>
            </div>
            <div className="flex items-center justify-between border-b py-4">
              <span className="text-gray-600">Role:</span>
              <span className="font-semibold text-gray-800">
                {user.role === "admin" ? "Admin" : "Utilisateur"}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Aucun utilisateur trouvé.</p>
        )}
        <button
          onClick={handleLogout}
          className="mt-6 w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          Déconnexion
        </button>
      </div>
    </>
  );
};

export default Profile;
