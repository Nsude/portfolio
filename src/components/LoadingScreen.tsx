import { useRef} from "react";
import Polygon, { polygonAnimDuration } from "../assets/shapes/Polygon";
import useCustomEffect from "./hooks/useCustomEffect";
import { useGlobalContext } from "./contexts/globalContext";
import gsap from "gsap"


const LoadingScreen = () => {
  const {loaded} = useGlobalContext();


  const progressRef = useRef<HTMLParagraphElement | null>(null);
  useCustomEffect(() => {
    if (!loaded) return;
    gsap.to(progressRef.current, {
      opacity: 0,
      delay: polygonAnimDuration
    })

  }, [loaded])

  return (
    <div className="loading-screen-container">
      <div className="polygon">
        <Polygon />
      </div>
    </div>
  )
}

export default LoadingScreen;