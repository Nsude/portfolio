import { useDevice } from "../hooks/useDevice";
import JunklabDesktop from "./JunklabDesktop";
import JunklabMobile from "./JunklabMobile";

const JunkLab = () => {
  const device = useDevice();
  
  return (
    <div className="min-h-screen h-full w-full bg-myblack">
      {
        device.width < 1024 ? <JunklabMobile /> : <JunklabDesktop />
      }
    </div>
  )
}

export default JunkLab;