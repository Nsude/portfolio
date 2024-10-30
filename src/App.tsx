import { useGlobalContext } from "./components/contexts/globalContext"
import GradientBG from "./components/GradientBG"
import useCustomEffect from "./components/hooks/useCustomEffect"
import LoadingScreen from "./components/LoadingScreen"
import Menu from "./components/Menu"
import { changeBGTheme } from "./components/utils"


function App() {
  const {bgTheme, loaded} = useGlobalContext();

  useCustomEffect(() => {
    if (!loaded) return;
    changeBGTheme(".app-container", bgTheme);
  }, [bgTheme, loaded])

  return (
    <div className="app-container">
      <GradientBG />
      <LoadingScreen />
      <Menu />
    </div>
  )
}

export default App
