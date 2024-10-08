import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";
import { useAuthStore } from "../context/useAuthStore";
import { SignupFormInputs } from "../types/user";
import { signupSchema } from "./../api/validateSchema";

const Signup: React.FC = () => {
  const styleInpt =
    "w-full rounded-lg border-gray-700 text-gray-100 p-4 pe-12 text-sm shadow-sm bg-gray-500";
  const buttonStyle =
    "inline-block rounded-lg bg-gray-700 hover:bg-gray-600 px-5 py-3 text-sm font-medium text-white";
  const router = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const { signup, isLoading } = useAuthStore((state) => ({
    signup: state.signup,
    isLoading: state.isLoading,
  }));

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      console.log("data", data);
      await signup(data);
      toast.success("Inscription réussie");
      router("/login");
    } catch (e) {
      toast.error("Ce compte existe déjà");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="relative flex flex-wrap lg:h-screen lg:items-center">
          <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
            <div className="max-w-lg mx-auto text-center">
              <h1 className="text-3xl font-bold sm:text-3xl">Inscription</h1>

              <p className="mt-4 text-gray-100">
                Bienvenue sur notre plateforme de gestion immobilière.
                Connectez-vous pour accéder à notre catalogue de propriétés,
                découvrir des offres exclusives et commencer votre recherche de
                votre futur chez-vous ! Que vous soyez à la recherche d'un
                appartement, d'une maison ou d'un terrain, nous avons ce qu'il
                vous faut.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              action="#"
              className="max-w-md mx-auto mt-8 mb-0 space-y-4"
            >
              <Input
                register={register}
                className={styleInpt}
                label="Username"
                type="text"
                name="username"
                id="username"
                placeholder="Enter username"
                error={errors.username?.message}
              />

              <Input
                register={register}
                className={styleInpt}
                label="Email"
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                error={errors.email?.message}
              />

              <Input
                register={register}
                className={styleInpt}
                label="Password"
                type="password"
                name="password"
                id="password"
                placeholder="Enter mot de passe"
                error={errors.password?.message}
              />
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400 hover:text-gray-700">
                  Déjà un compte ?
                  <Link to="/login" className="underline">
                    Se connecter
                  </Link>
                </p>
                <Button
                  type="submit"
                  className={buttonStyle}
                  text="Inscription"
                />
              </div>
            </form>
          </div>

          <div className="relative w-full h-64 sm:h-96 lg:h-full lg:w-1/2">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              className="absolute inset-0 object-cover w-full h-full"
            />
          </div>
        </section>
      )}
    </>
  );
};

export default Signup;
