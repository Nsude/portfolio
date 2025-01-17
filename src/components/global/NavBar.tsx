import { useState } from "react";
import Hamburger from "../../assets/icons/Hamburger";
import useCustomEffect from "../hooks/useCustomEffect";
import NavMenu from "./NavMenu";
import DarkOverlay from "../animation-helpers/DarkOverlay";
import { useNavContext } from "../contexts/NavContext";


const NavBar = () => {
  const [time, setTime] = useState('00:00');
  const { open } = useNavContext();

  useCustomEffect(() => {
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

  return (
    <>
    <NavMenu />
    <DarkOverlay trigger={open} />
    <nav className="text-base fixed z-10 top-0 text-white mix-blend-difference w-full px-[20px] py-[25px] grid grid-cols-8">
      <div className="flex items-center justify-between w-fit col-span-1">
        <span className="leading-[1]">M</span>
        <span className="leading-[0.5]">&mdash;</span>
        <span className="leading-[1]">N</span>
      </div>
      
      <div className="hidden lg:block w-fit col-start-2">
        <p> {time} </p>
      </div>

      <div className="hidden lg:block uppercase w-fit col-start-6"> 
        <p>Scroll</p> 
      </div>

      <div className="w-fit col-start-9">
        <Hamburger />
      </div>
    </nav>
    </>
  )
}

export default NavBar;