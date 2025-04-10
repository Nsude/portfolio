import { useRef } from 'react';
import { useCarouselContext } from '../contexts/CarouselContext';
import useCustomEffect from '../hooks/useCustomEffect';
import slideup from '../utils/slideUp';
import CarouselSelector from './CarouselSelector';
import ImageReveal from './ImageReveal';
import FeaturedCardOne from './FeaturedCardOne';
import { useNavigate } from 'react-router-dom';

const Carousel = () => {
  const { selected } = useCarouselContext();
  const slideUpElems = useRef<(HTMLElement)[]>([]);
  const navigate = useNavigate();

  useCustomEffect(() => {
    if (!slideUpElems.current) return;

    slideup(slideUpElems.current, .6, .02, '', true );

  }, [selected]);

  const addElem = (el: HTMLElement | null) => {
    if (el && !slideUpElems.current.includes(el)) {
      slideUpElems.current.push(el);
    }
  };  

  return (
    <div
      onClick={() => navigate(selected?.link || '/')}
      className='relative w-full h-full min-w[350px] max-w-[350px] sm:min-w-[420px] sm:max-w-[450px]'
    >
      {/* First Featured Card */}
      <div className='hidden absolute z-[4] -right-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] lg:block'>
        <FeaturedCardOne />
      </div>

      {/* ====== OUTER CONTAINER ====== */}
      <div className='w-full h-full text-white leading-[1] '>
        {/* ====== IMAGE CONTAINER ====== */}
        <div className='w-full aspect-square p-1 bg-white'>
          {/* ====== ROUNDED CORNERS ====== */}
          <div className='relative rounded-lg w-full h-full overflow-hidden'>
            <div className='absolute left-5 bottom-5 w-full z-[2]'>
              <p ref={(el) => addElem(el)} className='text-[10px] opacity-50 mb-[4px]'>PAGE</p>
              <h3 ref={(el) => addElem(el)} className='text-[30px] -tracking-[0.03ch]'>{selected?.name || 'Index'}</h3>
              <div className='mt-[15px] flex gap-x-2'>
                {
                  selected?.tags.map((tag, i) => (
                    <div ref={(el) => addElem(el)} key={i} className='text-[14px] px-[20px] py-[5px] bg-white bg-opacity-15 opacity-40 w-fit rounded-3xl'>
                      <p>{tag}</p>
                    </div>
                  ))
                }
              </div>
            </div>
            {/* ====== BG GRADIENT ====== */}
            <div className='absolute left-0 top-0 w-full h-full z-[1] bg-gradient-to-t from-myblack to-transparent' />
            <div className='w-full h-full'>
              <ImageReveal page={selected} delay={.1} fullHeight={true} />
            </div>
          </div>
        </div>

        <div className='mt-2 text-myblack'>
          <CarouselSelector />
        </div>
        
      </div>
    </div>
  )
}

export default Carousel;