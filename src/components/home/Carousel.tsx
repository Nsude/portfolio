import { useCarouselContext } from '../contexts/CarouselContext';
import useCustomEffect from '../hooks/useCustomEffect';
import CarouselSelector from './CarouselSelector';

const Carousel = () => {
  const { selected } = useCarouselContext();

  return (
    <div
    className='relative w-full h-full'
    >
      {/* ====== OUTER CONTAINER ====== */}
      <div className='w-full h-full text-white leading-[1] '>
        {/* ====== IMAGE CONTAINER ====== */}
        <div className='w-full aspect-square p-1 bg-white'>
          {/* ====== ROUNDED CORNERS ====== */}
          <div className='relative rounded-lg w-full h-full overflow-hidden lg:hidden'>
            <div className='absolute left-5 bottom-5 w-full z-[2]'>
              <p className='text-[10px] opacity-50'>PAGE</p>
              <h3 className='text-[30px] -tracking-[0.03ch]'>{selected?.name || 'Index'}</h3>
              <div className='mt-5 flex gap-x-0.5'>
                {
                  selected?.tags.map((tag, i) => (
                    <div key={i} className='px-[25px] py-2.5 bg-opacityBg w-fit rounded-3xl'>
                      <p>{tag}</p>
                    </div>
                  ))
                }
              </div>
            </div>
            {/* ====== BG GRADIENT ====== */}
            <div className='absolute left-0 top-0 w-full h-full z-1 bg-gradient-to-t from-myblack to-transparent' />
            <img 
              className='h-full object-cover' 
              src={selected?.image} 
              alt="" />
          </div>
        </div>

        <div className='mt-5 text-myblack'>
          <CarouselSelector />
        </div>
        
      </div>
    </div>
  )
}

export default Carousel;