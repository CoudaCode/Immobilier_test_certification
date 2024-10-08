import React from "react";
import Button from "../components/Button";

const Home: React.FC = () => {
  return (
    <section className="relative w-full h-full px-4 overflow-hidden py-28 md:px-8">
      <div className="absolute w-full h-full"></div>
      <div className="relative max-w-xl mx-auto text-center">
        <div className="py-4">
          <h3 className="text-3xl font-semibold text-gray-200 md:text-4xl">
            Explorez Notre Vaste Sélection de Propriétés
          </h3>
          <p className="mt-3 leading-relaxed text-gray-300">
            Plongez dans un univers de possibilités avec notre catalogue étendu
            de biens immobiliers. Que vous recherchiez un appartement moderne,
            une maison familiale ou un terrain à bâtir, nous avons ce qu'il vous
            faut. Trouvez votre futur chez-vous et commencez à réaliser vos
            rêves immobiliers dès aujourd'hui.
          </p>
        </div>
        <div className="items-center justify-center gap-3 mt-5 sm:flex">
          <Button
            text="Explorer Maintenant"
            type="button"
            link="/signup"
            className="block w-full mt-2 py-2.5 px-8 text-gray-700 bg-white rounded-md duration-150 hover:bg-gray-100 sm:w-auto"
          />
          <Button
            text="Se connecter"
            type="button"
            link="/login"
            className="block w-full mt-2 py-2.5 px-8 text-gray-300 bg-gray-700 rounded-md duration-150 hover:bg-gray-800 sm:w-auto"
          />
        </div>
      </div>
    </section>
  );
};
export default Home;
