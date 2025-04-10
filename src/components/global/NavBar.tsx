import { useEffect, useState } from "react";
import Hamburger from "../../assets/icons/Hamburger";
import NavMenu from "./NavMenu";
import DarkOverlay from "../animation-helpers/DarkOverlay";
import { useNavContext } from "../contexts/NavContext";
import { useNavigate } from "react-router-dom";


const NavBar = () => {
  const [time, setTime] = useState('00:00');
  const { open } = useNavContext();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      
      setTime(time);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = () => {
    navigate("/");
  }

  return (
    <>
    <NavMenu />
    <DarkOverlay trigger={open} />
    <nav className="text-base fixed z-10 top-0 text-white mix-blend-difference w-full px-5 py-[25px] grid grid-cols-8">
      <button onClick={handleNavigation} className="flex items-center justify-between w-fit col-span-1">
        <span className="leading-[1]">M</span>
        <span className="leading-[0.5]">&mdash;</span>
        <span className="leading-[1]">N</span>
      </button>
      
      <div className="hidden lg:block w-fit col-start-2">
        <p> {time} </p>
      </div>

      <div className="hidden lg:block uppercase w-fit col-start-6"> 
        <p className={`transition-opacity duration-[400ms] ${open ? 'opacity-40' : 'duration-[800ms] opacity-100'}`}>Scroll</p> 
      </div>

      <div className="w-fit col-start-9">
        <Hamburger />
      </div>
    </nav>
    </>
  )
}

export default NavBar;