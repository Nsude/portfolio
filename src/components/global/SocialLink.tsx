import React from 'react'
import SlideUp from '../animation-helpers/SlideUp';
import LinkIcon from '../../assets/icons/LinkIcon';

interface Props {
  title: string,
  trigger: boolean,
  iconSize: number
  delay?: number
}

const SocialLink:React.FC<Props> = ({title, trigger, iconSize, delay}) => {
  
  return (
    <button className='opacity-50'>
      <SlideUp trigger={trigger} delay={delay}>
        <div className='flex gap-[3px] items-center'>
          <p className='uppercase'>{title}</p>
          <LinkIcon trigger={trigger} size={iconSize} />
        </div>
      </SlideUp>
    </button>
  )
}

export default SocialLink;