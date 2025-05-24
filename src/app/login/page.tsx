"use client";

import Input from "../components/Input";
import { useState } from "react";
import z from "zod";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { isLoggedIn, username, login } = useAuthStore();

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
    setErrors((prev) => ({
      email: "",
      password: "",
    }));
  };

  const handleLoginClick = () => {
    console.log("실행");
    userSchema.parse(formData);
    console.log("✅ 로그인 데이터 유효:", formData);
    try {
      userSchema.parse(formData);
      console.log("✅ 로그인 데이터 유효:", formData);
      // 여기에 로그인 API 요청 추가!
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
      <h1 className="h1 text-green-08">Log In</h1>
      <main className="flex w-full max-w-sm flex-col gap-4">
        <Input
          title="Email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          setValue={(value) => handleChange("email", value)}
          isInvalid={!!errors.email}
          errorMessage={errors.email}
        />
        <Input
          title="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          setValue={(value) => handleChange("password", value)}
          isInvalid={!!errors.password}
          errorMessage={errors.password}
        />
        <button
          type="button"
          onClick={handleLoginClick}
          className="bg-green-05 hover:bg-green-06 h-fit w-full cursor-pointer rounded-md px-4 py-2 text-white"
        >
          Log In
        </button>
        <div className="mt-3 flex w-full items-center">
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        <div className="mt-3 flex w-full justify-center">
          <span className="text-sm text-gray-600">
            계정이 없으신가요?
            <Link
              className="ml-3 text-green-600 hover:underline"
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
