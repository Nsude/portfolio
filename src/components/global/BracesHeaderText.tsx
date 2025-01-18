import React from 'react'

interface Props {
  text: string
}

const BracesHeaderText:React.FC<Props> = ({text}) => {
  return (
    <div className='group relative opacity-50 hover:opacity-100 transition-all duration-[600ms]'>
      <span className='hidden lg:block text-[40px] opacity-0 absolute left-[-15px] top-[-8px] group-hover:left-0 group-hover:opacity-100 transition-all duration-[200ms]'>{'{'}</span>
      <h2 
        className="text-[40px] leading-[1.1] tracking-tight lg:mx-5">
        {text}
      </h2>
      <span className='hidden lg:block text-[40px] opacity-0 absolute right-[-15px] top-[-8px] group-hover:right-0 group-hover:opacity-100 transition-all duration-[200ms]'>{'}'}</span>
    </div>
  )
}

export default BracesHeaderText