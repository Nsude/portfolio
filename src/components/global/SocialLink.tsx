import React, { useRef } from 'react'
import LinkIcon from '../../assets/icons/LinkIcon';
import gsap from 'gsap';

interface Props {
  title: string,
  trigger: boolean,
  iconSize: number
}

const SocialLink:React.FC<Props> = ({title, trigger, iconSize}) => {
  const iconRef = useRef(null);

  const animateIcon = (mouseIn?: boolean) => {
    const tl = gsap.timeline();
    const duration = 0.6;

    if (mouseIn) {
      tl.to(iconRef.current, {
        scale: .6,
        duration,
        transformOrigin: "bottom center"
      })
    } else {
      tl.to(iconRef.current, {
        scale: 1,
        duration,
        transformOrigin: "bottom center"
      })
    }
  }
  
  return (
    <div 
      onMouseEnter={() => animateIcon(true)} 
      onMouseLeave={() => animateIcon()} 
      onFocus={() => animateIcon(true)}
      onBlur={() => animateIcon()}
      className='relative after:content[""] after:h-[1.5px] after:absolute after:w-0 transition-opacity duration-[600ms] after:left-0 after:bottom-[0] after:bg-myblack hover:after:w-full after:transition-all after:duration-[600ms] hover:opacity-100 opacity-50 flex gap-[1px] items-center'>
      <p className='uppercase'>{title}</p>
      <div className='overflow-hidden p-[2px]'>
        <div ref={iconRef}>
          <LinkIcon trigger={trigger} size={iconSize} />
        </div>
      </div>
    </div>
  )
}

export default SocialLink;