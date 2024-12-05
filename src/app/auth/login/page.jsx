"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center bg-gradient-to-r from-gray-800 to-black">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg border border-gray-300 transform transition-all duration-500 hover:scale-105"
      >
        {error && (
          <p className="bg-red-600 text-lg text-white p-3 rounded mb-4 animate-pulse">
            {error}
          </p>
        )}

        <h1 className="text-center text-2xl font-semibold text-gray-900 mb-6">
          Iniciar sesión
        </h1>

        <label
          htmlFor="email"
          className="block text-sm text-gray-600 mb-2 transition-all duration-300 hover:text-gray-800"
        >
          Correo electrónico:
        </label>
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "El correo electrónico es obligatorio",
            },
          })}
          className="p-3 rounded-md block mb-4 w-full bg-gray-100 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          placeholder="usuario@email.com"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}

        <label
          htmlFor="password"
          className="block text-sm text-gray-600 mb-2 transition-all duration-300 hover:text-gray-800"
        >
          Contraseña:
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "La contraseña es obligatoria",
            },
          })}
          className="p-3 rounded-md block mb-4 w-full bg-gray-100 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          placeholder="******"
        />
        {errors.password && (
          <span className="text-red-500 text-xs">{errors.password.message}</span>
        )}

        <button className="w-full bg-blue-600 text-white p-3 rounded-lg mt-4 transform transition-all duration-300 hover:bg-blue-700 hover:scale-105">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
