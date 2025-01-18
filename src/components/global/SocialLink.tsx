import React from 'react'
import LinkIcon from '../../assets/icons/LinkIcon';

interface Props {
  title: string,
  trigger: boolean,
  iconSize: number
}

const SocialLink:React.FC<Props> = ({title, trigger, iconSize}) => {
  
  return (
    <button className='opacity-50 flex gap-[3px] items-center'>
      <p className='uppercase'>{title}</p>
      <LinkIcon trigger={trigger} size={iconSize} />
    </button>
  )
}

export default SocialLink;