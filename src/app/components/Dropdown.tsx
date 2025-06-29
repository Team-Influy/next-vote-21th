import DropdownArrow from "@/assets/images/ChevronDown.svg";
import WarningIcon from "@/assets/images/WarningIcon.svg";
import cn from "@/utils/cn";
import { useEffect, useRef } from "react";

const Dropdown = ({
  title,
  selectedDropdown,
  dropdownOptions,
  isDropdownOpen,
  setIsDropdownOpen,
  handleDropdownClick,
  isInvalid,
  errorMessage,
}: {
  title: string;
  selectedDropdown: string;
  dropdownOptions: string[];
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  handleDropdownClick: (state: string) => void;
  isInvalid?: boolean;
  errorMessage?: string;
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null); // 드롭다운 외부 클릭 시 드롭다운을 닫기 위해

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, setIsDropdownOpen]);

  return (
    <div className="flex w-full flex-col gap-1">
      <h5 className="b4 text-gray-700">{title}</h5>
      <div className="relative inline-block w-full bg-white" ref={dropdownRef}>
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className={cn(
            "inline-flex h-fit w-full cursor-pointer items-center justify-between gap-2 rounded-xs border border-gray-300 px-2 py-2.5 text-center text-sm placeholder:text-gray-400 focus:border-gray-500",
            {
              "text-neutral-06": !selectedDropdown,
            },
          )}
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{selectedDropdown || title}</span>{" "}
          <DropdownArrow
            className={cn("h-5 w-5", {
              "text-neutral-06": !isDropdownOpen,
              "text-neutral-09 -rotate-180": isDropdownOpen,
            })}
          />
        </button>
        {/* 드롭다운 항목들 */}
        <div
          id="dropdown"
          className={cn(
            "absolute top-full z-10 w-full translate-y-2 gap-2 rounded-xs border border-gray-300 bg-white transition-all duration-150 ease-in-out",
            {
              "pointer-events-none invisible opacity-0": !isDropdownOpen,
            },
          )}
        >
          <ul
            aria-labelledby="dropdownDefaultButton"
            className="divide-y divide-gray-300"
          >
            {dropdownOptions.map((state: string) => (
              <li key={state} onClick={() => handleDropdownClick(state)}>
                <button
                  type="button"
                  className="flex w-full cursor-pointer px-2 py-2"
                >
                  {state}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
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

export default Dropdown;
