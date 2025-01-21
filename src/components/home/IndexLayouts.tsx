import { useCarouselContext } from '../contexts/CarouselContext';
import VideoReveal from './VideoReveal';

const IndexLayouts = () => {
  const { selected } = useCarouselContext();


  return (
    <div className='absolute left-0 top-0 w-full h-full'>
      <div className='w-full h-full hidden lg:block'>  
        <VideoReveal selected={selected} delay={.2} />
      </div>
    </div>
  );
};

export default IndexLayouts;