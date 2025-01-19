import gsap from "gsap";
import Homepage from "./components/home/Homepage"
import useCustomEffect from "./components/hooks/useCustomEffect"

function App() {

  useCustomEffect(() => {
    window.addEventListener("resize", () => {
      gsap.globalTimeline.invalidate();
    });
  })

  return (
    <div>
      <Homepage />
    </div>
  )
}

export default App
