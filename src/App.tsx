import gsap from "gsap";
import Homepage from "./components/home/Homepage"
import useCustomEffect from "./components/hooks/useCustomEffect"
import CarouselContextProvider from "./components/contexts/CarouselContext";

function App() {

  useCustomEffect(() => {
    window.addEventListener("resize", () => {
      gsap.globalTimeline.invalidate();
    });
  })

  return (
    <div>
      <CarouselContextProvider>
        <Homepage />
      </CarouselContextProvider>
    </div>
  )
}

export default App
