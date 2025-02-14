import { useDevice } from "../hooks/useDevice";
import JunklabDesktop from "./JunklabDesktop";
import JunklabMobile from "./JunklabMobile";

const JunkLab = () => {
  const device = useDevice();
  
  return (
    <div className="min-h-screen h-full w-full bg-myblack mb-[150px]">
      {
        device.width < 1400 ? <JunklabMobile /> : <JunklabDesktop />
      }
    </div>
  )
}

export default JunkLab;