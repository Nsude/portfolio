import Homepage from "./components/home/Homepage"
import CarouselContextProvider from "./components/contexts/CarouselContext";

function App() {
  return (
    <div>
      <CarouselContextProvider>
        <Homepage />
      </CarouselContextProvider>
    </div>
  )
}

export default App
