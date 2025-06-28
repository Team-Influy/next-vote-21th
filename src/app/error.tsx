"use client";

import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const GlobalError = ({
  error,
  reset,
}: {
  error: AxiosError;
  reset: () => void;
}) => {
  const router = useRouter();

  const errorStatus = error.response?.status;

  const handleOnClick = () => {
    if (errorStatus === 403 || errorStatus === 404) {
      router.push("/");
    } else {
      reset();
    }
  };

  const getButtonText = () => {
    if (errorStatus === 403 || errorStatus === 404) {
      return "홈으로 이동하기";
    } else {
      return "다시 시도하기";
    }
  };

  const getErrorMessage = () => {
    if (!errorStatus) {
      return "서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.";
    }

    switch (errorStatus) {
      case 400:
        return "잘못된 요청입니다. 요청 내용을 확인해주세요.";
      case 403:
        return "접근 권한이 없습니다. 권한을 확인해주세요.";
      case 404:
        return "요청한 데이터를 찾을 수 없습니다. 삭제되었거나 접근 권한이 없을 수 있습니다.";
      default:
        return "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
    }
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-2">
      <h1 className="h2">문제가 발생했어요.</h1>
      <p className="b4 text-neutral-10">{getErrorMessage()}</p>
      <button
        type="button"
        className="b4 cursor-pointer rounded-sm bg-black px-3 py-2 text-white"
        onClick={() => handleOnClick()}
      >
        {getButtonText()}
      </button>
    </main>
  );
};

export default GlobalError;
