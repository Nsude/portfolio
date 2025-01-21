import Carousel from "./Carousel";
import IndexLayouts from "./IndexLayouts";

const Homepage = () => {
  return (
    <div className="relative h-[100dvh] lg:h-[100vh] w-full px-5 flex flex-col justify-center">
      <IndexLayouts />
      <div>
        <Carousel />
      </div>
    </div>
  )
}

export default Homepage;