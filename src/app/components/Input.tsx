import WarningIcon from "@/assets/WarningIcon.svg";

const Input = ({
  title,
  type = "text",
  value,
  setValue,
  placeholder = "",
  isInvalid = false,
  errorMessage,
}: {
  title: string;
  type?: "text" | "email" | "password";
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  isInvalid?: boolean;
  errorMessage?: string;
}) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <label htmlFor={title} className="b4 text-neutral-09">
        {title}
      </label>
      <input
        id={title}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border border-neutral-04 w-full rounded-sm px-2 py-1.5 bg-white focus:border-green-04"
        placeholder={placeholder}
        required
      />
      {isInvalid && (
        <span className="text-error gap-0.5 flex text-start items-center">
          <WarningIcon className="w-4 h-4" />
          <span className="c2 break-words whitespace-break-spaces">
            {errorMessage || "The format is not valid. Please check."}
          </span>
        </span>
      )}
    </div>
  );
};

export default Input;
