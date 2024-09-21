import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePropertyStore } from "../context/productStore";
import { useAuthStore } from "../context/useAuthStore";

const Products: React.FC = () => {
  const router = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    logout: state.logout,
  }));

  const {
    properties,
    cartItems,
    fetchProperties,
    incrementQuantity,
    decrementQuantity,
    addToCart,
  } = usePropertyStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router("/login");
    } else {
      fetchProperties();
    }
  }, [isAuthenticated, router, fetchProperties]);

  const handleLogout = () => {
    logout();
    router("/login");
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const cartItemCount = getTotalQuantity();

  return (
    <>
      <header className="bg-gray-800">
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Bienvenue {user?.username}
              </h1>
              <p className="mt-1.5 text-sm text-gray-200">
                Explorez Notre Vaste Sélection de Propriétés
              </p>
            </div>
            <div className="flex flex-col gap-4 mt-4 sm:mt-0 sm:flex-row sm:items-center">
              <Link
                className="block px-5 py-3 mr-4 text-sm font-medium text-white transition bg-gray-700 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring"
                to="/profile"
              >
                Profile
              </Link>
              <button
                className="block px-5 py-3 text-sm font-medium text-white transition bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring"
                type="button"
                onClick={handleLogout}
              >
                Déconnexion
              </button>
              <Link
                to="/transaction"
                className="block px-5 py-3 text-sm font-medium text-white transition bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring"
              >
                Panier ({cartItemCount})
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <header className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-300 sm:text-3xl">
              Collection de Propriétés
            </h2>
            <p className="mt-2 text-gray-200">Découvrez nos derniers ajouts.</p>
          </header>

          <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
            {properties.map((property) => (
              <article
                className="overflow-hidden transition rounded-lg shadow-lg hover:shadow-xl"
                key={property._id}
              >
                <img
                  alt={property.title}
                  src={property.image}
                  className="object-cover w-full h-56"
                />

                <div className="p-4 bg-white sm:p-6">
                  <h3 className="mt-0.5 text-lg text-gray-900 font-bold">
                    {property.title}
                  </h3>

                  <p className="mt-2 text-gray-500 text-sm">
                    {property.description}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        {property.price}{" "}
                        <span className="text-sm text-gray-500">FCFA</span>
                      </span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <button
                        className="px-3 py-1 text-gray-700 bg-gray-200 rounded-full"
                        onClick={() => decrementQuantity(property._id)}
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-gray-700 bg-gray-200 rounded-full">
                        {property.quantity}
                      </span>
                      <button
                        className="px-3 py-1 text-gray-700 bg-gray-200 rounded-full"
                        onClick={() => incrementQuantity(property._id)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
                    onClick={() => addToCart(property)}
                  >
                    <span className="text-sm font-medium">Ajouter</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h18M3 6h18m-3 6h-6m-3 0h3m-3 0H6m3 6h6m3 0h-3"
                      />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Products;
