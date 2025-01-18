
import React, { PropsWithChildren } from 'react'

const BracesOnHover:React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className="group relative inline-block">
      <div className="relative">
        {children}
        <span className="absolute left-[-10px] top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100">
          {"{"}
        </span>
        <span className="absolute right-[-10px] top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100">
          {"}"}
        </span>
      </div>
    </div>
  )
}

export default BracesOnHover;