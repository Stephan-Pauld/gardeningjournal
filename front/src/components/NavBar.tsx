import { FaSeedling } from "react-icons/fa";
import { useRef, useState } from "react";

interface NavProps {
  handleNavChange: (data: number) => void;
  navStep: number;
}

export const NavBar = ({ handleNavChange, navStep }: NavProps) => {
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const underlineRef = useRef<HTMLDivElement>(null);

  const handleNavItemClick = (index: number) => {
    handleNavChange(index);
    const navItem = document.getElementById(`nav-item-${index}`);
    if (navItem && underlineRef.current) {
      const { offsetLeft, offsetWidth } = navItem;
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
    }
  };

  return (
    <nav className="bg-green-600 p-4 w-[40%] m-auto mt-10 rounded-lg">
      <div className="mx-auto px-4 flex items-center space-x-10">
        <div className="flex items-center text-white ml-2 text-xl font-semibold">
          <FaSeedling />
          <h1 className="ml-1">PlantPal</h1>
        </div>
        <ul className="flex w-full justify-between relative">
          <li
            id="nav-item-0"
            className="text-white font-semibold cursor-pointer"
            onClick={() => handleNavItemClick(0)}
          >
            Plants
          </li>
          <li
            id="nav-item-1"
            className="text-white font-semibold cursor-pointer"
            onClick={() => handleNavItemClick(1)}
          >
            Seedling Tracker
          </li>
          <li
            id="nav-item-2"
            className="text-white font-semibold cursor-pointer"
            onClick={() => handleNavItemClick(2)}
          >
            Journal Entries
          </li>
          <li
            id="nav-item-3"
            className="text-white font-semibold cursor-pointer"
            onClick={() => handleNavItemClick(3)}
          >
            My Seasons
          </li>
          <div
            ref={underlineRef}
            className="absolute bottom-0 bg-white transition-all duration-[700ms]"
            style={{
              left: underlineStyle.left,
              width: underlineStyle.width,
              height: "2px",
            }}
          />
        </ul>
      </div>
    </nav>
  );
};
