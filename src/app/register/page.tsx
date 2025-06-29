"use client";

import MainButton from "@/app/components/MainButton";
import Input from "@/app/components/Input";
import Dropdown from "@/app/components/Dropdown";
import z from "zod";
import { useState } from "react";
import TEAMS from "@/constants/Teams";
import PARTS from "@/constants/Parts";
import { postRegister } from "@/api/postRegister";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Influy from "@/assets/images/Influy.svg";
import Link from "next/link";

interface CustomErrorResponse {
  isSuccess: boolean;
  code: string;
  message: string;
}

const Register = () => {
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState<boolean>(false);
  const [isPartsDropdownOpen, setIsPartsDropdownOpen] =
    useState<boolean>(false);
  const mutation = useMutation<
    unknown,
    Error,
    {
      name: string;
      email: string;
      password: string;
      team: string;
      part: string;
    }
  >({
    mutationFn: postRegister,
    throwOnError: (error) => {
      const err = error as AxiosError<CustomErrorResponse>;
      const code = err?.response?.data?.code;

      // 특정 에러는 컴포넌트에서 처리하고, 나머지는 Error Boundary로 전파
      if (code === "USER_ALREADY_EXISTS") {
        return false;
      }
      return true;
    },
    onSuccess: () => {
      alert("회원가입 성공");
      router.push("/login");
    },
    onError: (error) => {
      const err = error as AxiosError<CustomErrorResponse>;
      const code = err?.response?.data?.code;
      if (code === "USER ALREADY EXISTS") {
        alert("이미 존재하는 유저입니다.");
        router.push("/login");
      } else {
        alert("회원가입 도중 에러 발생");
      }
    },
  });
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    team: "",
    part: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    team: "",
    part: "",
  });

  const userSchema = z.object({
    name: z.string().max(10, { message: "이름을 입력해주세요." }),
    email: z
      .string()
      .email({ message: "유효한 이메일을 입력해주세요." })
      .max(25, { message: "이메일은 25자 이내로 입력해주세요." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상 입력해주세요." })
      .max(100, { message: "비밀번호는 100자 이내로 입력해주세요." }),
    confirmPassword: z.string().refine((v) => v === formData.password, {
      message: "비밀번호가 일치하지 않습니다.",
    }),
    team: z.enum(TEAMS, {
      errorMap: () => ({ message: "팀을 선택해주세요." }),
    }),
    part: z.enum(PARTS, {
      errorMap: () => ({ message: "파트를 선택해주세요." }),
    }),
  });

  const handleChange = (
    field: keyof typeof userSchema.shape,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    try {
      userSchema.shape[field].parse(value);
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({
          ...prev,
          [field]: error.errors[0]?.message || "",
        }));
      }
    }
  };

  const handleDropdownClick = (
    key: keyof typeof userSchema.shape,
    value: string,
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setIsDropdownOpen(false);
    handleChange(key, value);
  };

  const handleSignUp = async () => {
    try {
      userSchema.parse(formData);

      mutation.mutate({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        team: formData.team,
        part: formData.part,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: {
          name: string;
          email: string;
          password: string;
          confirmPassword: string;
          team: string;
          part: string;
        } = {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          team: "",
          part: "",
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
      <div className="flex flex-col items-center justify-center">
        <Influy className="mb-2 scale-[2]" />
        <span className="text-2xl font-semibold tracking-wider text-gray-700">
          vote
        </span>
      </div>
      <main className="flex w-full max-w-xs flex-col gap-4 sm:max-w-md">
        <Input
          title="이름"
          placeholder="Enter your name"
          value={formData.name}
          setValue={(value) => handleChange("name", value)}
          isInvalid={!!errors.name}
          errorMessage={errors.name}
        />
        <Input
          title="이메일"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          setValue={(value) => handleChange("email", value)}
          isInvalid={!!errors.email}
          errorMessage={errors.email}
        />
        <Input
          title="비밀번호"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          setValue={(value) => handleChange("password", value)}
          isInvalid={!!errors.password}
          errorMessage={errors.password}
        />
        <Input
          title="비밀번호 확인"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          setValue={(value) => handleChange("confirmPassword", value)}
          isInvalid={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
        />
        <Dropdown
          title="팀 선택"
          selectedDropdown={formData.team}
          dropdownOptions={[...TEAMS]}
          isDropdownOpen={isTeamDropdownOpen}
          setIsDropdownOpen={setIsTeamDropdownOpen}
          handleDropdownClick={(value) =>
            handleDropdownClick("team", value, setIsTeamDropdownOpen)
          }
          isInvalid={!!errors.team}
          errorMessage={errors.team}
        />
        <Dropdown
          title="파트"
          selectedDropdown={formData.part}
          dropdownOptions={[...PARTS]}
          isDropdownOpen={isPartsDropdownOpen}
          setIsDropdownOpen={setIsPartsDropdownOpen}
          handleDropdownClick={(value) =>
            handleDropdownClick("part", value, setIsPartsDropdownOpen)
          }
          isInvalid={!!errors.part}
          errorMessage={errors.part}
        />

        {/* 버튼 */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <button
            type="submit"
            onClick={handleSignUp}
            className="h-fit w-full cursor-pointer rounded-xs bg-black px-4 py-[.875rem] text-sm text-white"
          >
            회원가입
          </button>
          <div className="mt-3 flex w-full justify-center">
            <span className="text-sm text-gray-600">
              이미 계정이 있으신가요?
              <Link
                className="text-main ml-3 hover:font-semibold hover:underline hover:underline-offset-4"
                href={"/login"}
              >
                로그인
              </Link>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
