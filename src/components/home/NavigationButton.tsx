import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  prev?: boolean
  handleClick: () => void;
  disabled?: boolean
}

const NavigationButton = ({prev, handleClick, disabled}: Props) => {
  return (
    <button 
      onClick={handleClick}
      className={`w-[30px] aspect-square bg-white flex items-center justify-center transition-opacity duration-[400ms] rounded-3xl ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      >
      {
        !prev ? (
          <ChevronRight strokeWidth={1.5} />
        ) : (
          <ChevronLeft strokeWidth={1.5} />
        )
      }
    </button>
  )
}

export default NavigationButton;