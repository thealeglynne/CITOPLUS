"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Las contraseñas no coinciden");
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/auth/login");
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center bg-gradient-to-r from-black to-gray-900">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl border border-gray-200 transform transition-all duration-500 hover:scale-105"
      >
        <h1 className="text-center text-4xl font-bold text-indigo-700 mb-6">
          Registrarse
        </h1>

        {/* Username Field */}
        <label htmlFor="username" className="text-gray-700 text-sm mb-2 block">
          Nombre de usuario:
        </label>
        <input
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "El nombre de usuario es obligatorio",
            },
          })}
          className="p-4 rounded-lg bg-slate-100 text-gray-800 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="tuUsuario123"
        />
        {errors.username && (
          <span className="text-red-500 text-xs">{errors.username.message}</span>
        )}

        {/* Email Field */}
        <label htmlFor="email" className="text-gray-700 text-sm mb-2 block">
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
          className="p-4 rounded-lg bg-slate-100 text-gray-800 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="usuario@email.com"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}

        {/* Password Field */}
        <label htmlFor="password" className="text-gray-700 text-sm mb-2 block">
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
          className="p-4 rounded-lg bg-slate-100 text-gray-800 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="********"
        />
        {errors.password && (
          <span className="text-red-500 text-xs">{errors.password.message}</span>
        )}

        {/* Confirm Password Field */}
        <label
          htmlFor="confirmPassword"
          className="text-gray-700 text-sm mb-2 block"
        >
          Confirmar contraseña:
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirmar contraseña es obligatorio",
            },
          })}
          className="p-4 rounded-lg bg-slate-100 text-gray-800 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="********"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-xs">
            {errors.confirmPassword.message}
          </span>
        )}

        {/* Submit Button */}
        <button className="w-full bg-indigo-600 text-white p-3 rounded-lg mt-4 hover:bg-indigo-700 transition-all duration-300">
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
