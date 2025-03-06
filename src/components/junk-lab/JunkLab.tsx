import { useDevice } from "../hooks/useDevice";
import JunklabDesktop from "./JunklabDesktop";
import JunklabMobile from "./JunklabMobile";
import useCustomEffect from "../hooks/useCustomEffect";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const JunkLab = () => {
  const device = useDevice();

  useCustomEffect(() => {
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