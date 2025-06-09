"use client";

import { useForm } from "react-hook-form";
import { z } from "zod"; // Biblioteca de validação de dados
import { zodResolver } from "@hookform/resolvers/zod"; // Faz zod funcionar com react-hook-form
import { FaUserPlus } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Definindo as regras de cada campo com mensagens personalizadas.
const signupSchema = z
  .object({
    user: z.string().min(1, "Nome de usuário é obrigatório"),
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(8, "Senha deve ter no mínimo 8 caracteres")
      .regex(/[a-z]/, "Deve conter uma letra minúscula")
      .regex(/[A-Z]/, "Deve conter uma letra maiúscula")
      .regex(/[0-9]/, "Deve conter um número")
      .regex(
        /[!@#$%^&*()_+[\]{};':"\\|,.<>/?`´~]/,
        "Deve conter um caractere especial"
      ),
    confirmPassword: z.string().min(1, "Confirme a senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais",
    path: ["confirmPassword"],
  });

type SignupData = z.infer<typeof signupSchema>; // Gera o tipo automaticamente a partir do schema do Zod

export default function Signup() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    // Conecta o Zod com react-hook-form e usa register para vincular inputs.
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupData) => {
    setServerError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.user,
          email: data.email,
          password: data.password,
          favorite_team: null,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
        return;
      } else {
        const errorData = await response.json();
        setServerError(errorData.detail || "Erro no cadastro");
      }
    } catch (err) {
      setServerError("Erro ao conectar ao servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-[#2c2c2c] p-10 rounded-2xl shadow-lg w-[400px]">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </div>
        <h2 className="text-center text-white text-xl font-bold mb-2">
          CADASTRO
        </h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Crie sua conta para acompanhar jogadores, ligas e times favoritos.
        </p>

        {success ? (
          <div className="text-green-500 text-center font-medium mb-4">
            Cadastro realizado com sucesso! Redirecionando...
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <input
                type="text"
                placeholder="Nome de usuário"
                className="input"
                {...register("user")}
              />
              {errors.user && (
                <p className="text-red-500 text-sm">{errors.user.message}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                className="input"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Senha"
                className="input"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirmar senha"
                className="input"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-md disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <ImSpinner2 className="animate-spin" />
                  Cadastrando...
                </>
              ) : (
                <>
                  <FaUserPlus /> Cadastrar
                </>
              )}
            </button>

            {serverError && (
              <p className="text-red-500 text-sm text-center">{serverError}</p>
            )}
          </form>
        )}

        <p className="text-center text-gray-400 text-sm mt-4">
          Já tem uma conta?{" "}
          <a href="/login" className="text-green-500 hover:underline">
            Faça login
          </a>
        </p>
      </div>
    </div>
  );
}
