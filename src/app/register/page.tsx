"use client";

import MainButton from "@/app/components/MainButton";
import Input from "@/app/components/Input";
import Dropdown from "@/app/components/Dropdown";
import z from "zod";
import { SetStateAction, useState } from "react";

const TEAMS = [
  "인플루이",
  "프로메사",
  "이어드림",
  "팝업사이클",
  "하니홈",
] as const;

const PARTS = ["Frontend", "Backend"] as const;

const Register = () => {
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState<boolean>(false);
  const [isPartsDropdownOpen, setIsPartsDropdownOpen] =
    useState<boolean>(false);

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
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
    email: z.string().email({ message: "유효한 이메일을 입력해주세요." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." }),
    confirmPassword: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .refine((v) => v === formData.password, {
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

  const handleSignUp = () => {
    try {
      userSchema.parse(formData);
      // 제출!!
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
    <div className="flex flex-1 justify-center items-center flex-col px-8 py-14 gap-3">
      <h1 className="h1 text-green-08">Sign Up</h1>
      <main className="flex w-full flex-col max-w-sm gap-4">
        <Input
          title="Name"
          placeholder="Enter your name"
          value={formData.name}
          setValue={(value) => handleChange("name", value)}
          isInvalid={!!errors.name}
          errorMessage={errors.name}
        />
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
        <Input
          title="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          setValue={(value) => handleChange("confirmPassword", value)}
          isInvalid={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
        />
        <Dropdown
          title="Team"
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
          title="Part"
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
        <div className="flex flex-col items-center gap-2">
          <MainButton handleOnClick={handleSignUp} />
          <span className="flex gap-1">
            <span className="text-neutral-08">Already have an account?</span>
            <button className="text-green-05 cursor-pointer hover:text-green-06">
              Login
            </button>
          </span>
        </div>
      </main>
    </div>
  );
};

export default Register;
