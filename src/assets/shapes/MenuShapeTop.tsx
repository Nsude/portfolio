import React, { useRef } from 'react'
import { useGlobalContext } from '../../components/contexts/globalContext'
import useCustomEffect from '../../components/hooks/useCustomEffect'
import { scaleMenuSvg } from '../../components/utils'

export interface ShapeProps {
  fill?: string
}

const MenuShapeTop:React.FC<ShapeProps> = ({fill}) => {
  const {loaded} = useGlobalContext();
  const svgRef = useRef<SVGSVGElement | null>(null);

  useCustomEffect(() => {
    if (!loaded) {
      scaleMenuSvg(svgRef.current);
    } else {
      scaleMenuSvg(svgRef.current, true);
    }
  }, [loaded])

  return (
    <svg ref={svgRef} width="352" height="14" fill={fill} viewBox="0 0 352 14" xmlns="http://www.w3.org/2000/svg">
     <path d="M0.0740967 13.6932H351.186V0.0950317H129.458L120.258 5.94636L59.0484 5.94637L49.8486 0.0950317H0.0740967V13.6932Z" />
    </svg>

  )
}

export default MenuShapeTop;