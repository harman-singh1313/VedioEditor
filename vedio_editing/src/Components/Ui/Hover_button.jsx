import { useNavigate } from "react-router-dom";

const Hover_button = ({
  text,
  path,
  gradient = "bg-gradient-to-r from-blue-500 to-purple-600",
  hoverGradient = "hover:from-blue-600 hover:to-purple-700",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <button
      onClick={handleClick}
      className={`${gradient} ${hoverGradient} text-white px-5 py-2 rounded-lg transition duration-300 mono-font`}
    >
      {text}
    </button>
  );
};

export default Hover_button;