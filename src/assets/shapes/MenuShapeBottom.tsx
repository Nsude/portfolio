import React, { useRef } from 'react'
import { useGlobalContext } from '../../components/contexts/globalContext';
import { ShapeProps } from './MenuShapeTop';
import useCustomEffect from '../../components/hooks/useCustomEffect';
import { scaleMenuSvg } from '../../components/utils';

const MenuShapeBottom:React.FC<ShapeProps> = ({fill}) => {
  const {loaded} = useGlobalContext();
  const svgRef = useRef<SVGSVGElement | null>(null);

  useCustomEffect(() => {
    if (!loaded) {
      scaleMenuSvg(svgRef.current)
    } else {
      scaleMenuSvg(svgRef.current, true)
    }
  }, [loaded])

  return (
    <svg ref={svgRef} width="352" height="53" fill={fill} viewBox="0 0 352 53" xmlns="http://www.w3.org/2000/svg">
      <path d="M277.318 48.6888L271.932 52.1145H12.1919L0.0740967 44.4072V0.404114H351.186V7.10464L343.167 12.205V34.0907L351.186 39.191V52.1145H313.309L307.923 48.6888L277.318 48.6888Z" />
    </svg>

  )
}

export default MenuShapeBottom;