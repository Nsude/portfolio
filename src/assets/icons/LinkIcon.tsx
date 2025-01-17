import React from 'react'
import { Icon } from '../../components/models';
import SlideUp from '../../components/animation-helpers/SlideUp';

const LinkIcon:React.FC<Icon> = ({size, trigger}) => {
  return (
    <SlideUp trigger={trigger}>
      <svg width={size || 10} height={size || 10} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.11319 1.12214L9 1.12204M9 1.12204L9 7.9109M9 1.12204L1 9.12204" stroke="#0A0A0A" stroke-linecap="square"/>
      </svg>
    </SlideUp>
  )
}

export default LinkIcon;