import WarningIcon from "@/assets/images/WarningIcon.svg";

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
        className="border-neutral-04 focus:border-green-04 placeholder:text-neutral-06 w-full cursor-text rounded-sm border bg-white px-2 py-1.5"
        placeholder={placeholder}
        required
      />
      {isInvalid && (
        <span className="text-error flex items-center gap-0.5 text-start">
          <WarningIcon className="h-4 w-4" />
          <span className="c2 break-words whitespace-break-spaces">
            {errorMessage || "The format is not valid. Please check."}
          </span>
        </span>
      )}
    </div>
  );
};

export default Input;
