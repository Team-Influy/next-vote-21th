const MainButton = ({ handleOnClick }: { handleOnClick: () => void }) => {
  return (
    <button
      type="button"
      onClick={handleOnClick}
      className="w-full h-fit px-4 py-2 bg-green-05 text-white rounded-md cursor-pointer hover:bg-green-06"
    >
      Sign Up
    </button>
  );
};

export default MainButton;
