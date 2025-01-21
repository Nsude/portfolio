import { Page } from '../contexts/NavContext';
import ImageReveal from '../home/ImageReveal';

interface Props {
  page: Page | null;
}

const NavMenuImage = ({page}: Props) => {

  return (
    <button className='p-1 h-[70vh] flex flex-col w-full max-w-[550px] bg-white'>
      <ImageReveal page={page} />
      
      <div className='flex gap-x-2.5 uppercase p-5 px-[14px] w-full'>
        <p className='font-serif italic'>{page?.index || "007"}</p>
        <p className='w-[60%] xl:w-[55%] text-wrap text-left'>{page?.cheekyLine || "There is no place like home"}</p>
      </div>
    </button>
  )
}

export default NavMenuImage;