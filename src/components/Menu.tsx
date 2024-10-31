import { useRef, useState } from 'react'
import MenuShapeTop from '../assets/shapes/MenuShapeTop';
import MenuShapeBottom from '../assets/shapes/MenuShapeBottom';
import useCustomEffect from './hooks/useCustomEffect';
import gsap from "gsap"
import { useGlobalContext } from './contexts/globalContext';

const Menu = () => {
  const detailsRef = useRef<HTMLHeadingElement | null>(null);
  const {loaded, colors, bgTheme} = useGlobalContext();
  const [menuColor, setMenuColor] = useState("");
  
  useCustomEffect(() => {
    if (!loaded) {
      return setMenuColor(colors.grey);
    };
    if (bgTheme === "ivory") {
      setMenuColor(colors.black);
    } else {
      setMenuColor(colors.ivory);
    }
    
  }, [bgTheme, loaded])

  // menu beep animation
  const detailsAnimRef = useRef<GSAPTween>();
  useCustomEffect(() => {
    if (!detailsRef.current) return;
    detailsAnimRef.current = gsap.fromTo(detailsRef.current, {
      opacity: 0,
      ease: "power2.out",
      duration: 2
    }, {
      repeat: -1,
      opacity: .6,
      duration: 2
    })
  })

  // stop menu opacity change animation
  useCustomEffect(() => {
    if (!loaded) return;
    detailsAnimRef.current?.kill();    
  }, [loaded])

  useCustomEffect(() => {
    gsap.set(".menu-container", {
      background: menuColor
    })

  }, [menuColor])

  // set .shape width to svg width
  useCustomEffect(() => {
    if (!loaded) {
      gsap.set(".menu-container .shape", {
        width: 245.4
      })
    } else {
      gsap.to(".menu-container .shape", {
        width: 351,
        duration: .4
      })
    }
  }, [loaded])

  return (
    <div className="menu-container">
      <div className="details">
        <p>Website Info</p>
        <h2 ref={detailsRef}>{ loaded ? "Completed" : "Fetching Data" }</h2>
      </div>
      <div className="shape">
        <div className="top">
          <MenuShapeTop fill={menuColor} />
        </div>
        <div className="bottom">
          <MenuShapeBottom fill={menuColor}/>
        </div>
      </div>
    </div>
  )
}

export default Menu;