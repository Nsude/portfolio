import React, { useState } from 'react'
import { useGlobalContext } from '../../components/contexts/globalContext'
import useCustomEffect from '../../components/hooks/useCustomEffect';

interface Props {
  size?: number
}

const Logo:React.FC<Props> = () => {
  const {colors, bgTheme} = useGlobalContext();
  const [fill, setFill] = useState(colors.black);

  useCustomEffect(() => {
    const theme = bgTheme.toLowerCase();
    if (theme !== "ivory") {
      setFill(colors.ivory);
    } else {
      setFill(colors.black);
    }

  }, [bgTheme])

  return (
    <svg 
      width="33" 
      height="38" 
      viewBox="0 0 33 38" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M18.6882 2.85692L29.4286 9.0579C30.8209 9.86175 31.6786 11.3473 31.6786 12.955V25.357C31.6786 26.9647 30.8209 28.4502 29.4286 29.2541L18.6882 35.4551C17.2959 36.2589 15.5805 36.2589 14.1882 35.4551L3.44775 29.2541C2.05545 28.4502 1.19775 26.9647 1.19775 25.357V12.955C1.19775 11.3473 2.05545 9.86175 3.44775 9.0579L14.1882 2.85692C15.5805 2.05307 17.2959 2.05307 18.6882 2.85692Z" stroke={fill} strokeOpacity="1"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M16.4383 24.9649C18.7384 24.0393 20.362 21.7873 20.362 19.156C20.362 16.5248 18.7384 14.2727 16.4383 13.3471C17.16 13.0567 17.9482 12.8969 18.7738 12.8969C22.2306 12.8969 25.0329 15.6992 25.0329 19.156C25.0329 22.6128 22.2306 25.4151 18.7738 25.4151C17.9482 25.4151 17.16 25.2553 16.4383 24.9649ZM16.4383 24.9649C15.7167 25.2553 14.9284 25.4151 14.1029 25.4151C10.6461 25.4151 7.84375 22.6128 7.84375 19.156C7.84375 15.6992 10.6461 12.8969 14.1029 12.8969C14.9284 12.8969 15.7167 13.0567 16.4383 13.3471C14.1383 14.2727 12.5146 16.5248 12.5146 19.156C12.5146 21.7873 14.1383 24.0393 16.4383 24.9649Z" fill={fill}/>
      </g>
    </svg>
    

  )
}

export default Logo;