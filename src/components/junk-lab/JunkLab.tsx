import { useDevice } from "../hooks/useDevice";
import JunklabDesktop from "./JunklabDesktop";
import JunklabMobile from "./JunklabMobile";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

const JunkLab = () => {
  const device = useDevice();

  useEffect(() => {
    ScrollTrigger.killAll();
  })
  
  return (
    <div className="min-h-screen h-full w-full bg-myblack mb-[150px]">
      {
        device.width < 1400 ? <JunklabMobile /> : <JunklabDesktop />
      }
    </div>
  )
}

export default JunkLab;