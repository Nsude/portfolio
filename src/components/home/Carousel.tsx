import { useRef } from 'react';
import { useCarouselContext } from '../contexts/CarouselContext';
import useCustomEffect from '../hooks/useCustomEffect';
import slideup from '../utils/slideUp';
import CarouselSelector from './CarouselSelector';
import ImageReveal from './ImageReveal';

const Carousel = () => {
  const { selected } = useCarouselContext();
  const slideUpElems = useRef<(HTMLElement)[]>([]);

  useCustomEffect(() => {
    if (!slideUpElems.current) return;

    slideup(slideUpElems.current, .6, .02);

  }, [selected]);

  const addElem = (el: HTMLElement | null) => {
    if (el && !slideUpElems.current.includes(el)) {
      slideUpElems.current.push(el);
    }
  };  

  return (
    <div
    className='relative w-full h-full'
    >
      {/* ====== OUTER CONTAINER ====== */}
      <div className='w-full h-full text-white leading-[1] '>
        {/* ====== IMAGE CONTAINER ====== */}
        <div className='w-full aspect-square p-1 bg-white border-2'>
          {/* ====== ROUNDED CORNERS ====== */}
          <div className='relative rounded-lg w-full h-full overflow-hidden lg:hidden'>
            <div className='absolute left-5 bottom-5 w-full z-[2]'>
              <p ref={(el) => addElem(el)} className='text-[10px] opacity-50 mb-[4px]'>PAGE</p>
              <h3 ref={(el) => addElem(el)} className='text-[30px] -tracking-[0.03ch]'>{selected?.name || 'Index'}</h3>
              <div className='mt-5 flex gap-x-0.5'>
                {
                  selected?.tags.map((tag, i) => (
                    <div ref={(el) => addElem(el)} key={i} className='px-[25px] py-2.5 bg-opacityBg w-fit rounded-3xl'>
                      <p>{tag}</p>
                    </div>
                  ))
                }
              </div>
            </div>
            {/* ====== BG GRADIENT ====== */}
            <div className='absolute left-0 top-0 w-full h-full z-[1] bg-gradient-to-t from-myblack to-transparent' />
            <div className='w-full h-full'>
              <ImageReveal page={selected} delay={.2} carousel />
            </div>
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