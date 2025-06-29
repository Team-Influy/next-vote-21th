"use client";

import Input from "../components/Input";
import { useState } from "react";
import z from "zod";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { postLogin } from "@/api/postLogin";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LoginResponse } from "../types/login.types";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { setAccessToken, setRefreshToken, setUserName, setIsLoggedIn } =
    useAuthStore.getState();
  const router = useRouter();

  const mutation = useMutation<
    LoginResponse,
    Error,
    {
      email: string;
      password: string;
    }
  >({
    mutationFn: postLogin,
    onSuccess: (data) => {
      setAccessToken(data.result.accessToken);
      setRefreshToken(data.result.refreshToken);
      setUserName(data.result.name);
      setIsLoggedIn(true);
      router.push("/");
    },
    onError: () => {
      setErrors({
        email: "",
        password: "로그인 정보를 확인해주세요.",
      });
    },
  });

  const userSchema = z.object({
    email: z.string().min(1, { message: "로그인 정보를 확인해주세요" }),
    password: z.string().min(1, { message: "로그인 정보를 확인해주세요" }),
  });

  const handleChange = (
    field: keyof typeof userSchema.shape,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    //값 바뀌면 기존 에러 제거
    setErrors({
      email: "",
      password: "",
    });
  };

  const handleLoginClick = () => {
    try {
      userSchema.parse(formData);
      mutation.mutate({ email: formData.email, password: formData.password });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {
          email: "",
          password: "",
        };
        error.errors.forEach((err) => {
          const fieldName = err.path[0] as keyof typeof fieldErrors;
          if (fieldName) fieldErrors[fieldName] = err.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center gap-3 px-8 py-14">
      <h1 className="h1 text-black">LOGIN</h1>
      <main className="flex w-full max-w-sm flex-col gap-4">
        <Input
          title="이메일"
          type="email"
          placeholder="이메일을 입력해주세요."
          value={formData.email}
          setValue={(value) => handleChange("email", value)}
          isInvalid={!!errors.email}
          errorMessage={errors.email}
        />
        <Input
          title="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={formData.password}
          setValue={(value) => handleChange("password", value)}
          isInvalid={!!errors.password}
          errorMessage={errors.password}
        />
        <button
          type="button"
          onClick={handleLoginClick}
          className="h-fit w-full cursor-pointer rounded-xs bg-black px-4 py-[.875rem] text-sm text-white"
        >
          로그인하기
        </button>
        <div className="mt-3 flex w-full items-center">
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        <div className="mt-3 flex w-full justify-center">
          <span className="text-sm text-gray-600">
            계정이 없으신가요?
            <Link
              className="text-main ml-3 hover:font-semibold hover:underline hover:underline-offset-4"
              href={"/register"}
            >
              회원가입 하러가기
            </Link>
          </span>
        </div>
      </main>
    </div>
  );
};

export default Login;
