import { useRef, useState } from 'react';
import useCustomEffect from '../hooks/useCustomEffect';
import gsap from 'gsap';
import { Page, useNavContext } from '../contexts/NavContext';

interface Props {
  selected: Page | null
  delay?: number;
}

const VideoReveal = ({ selected: page, delay }: Props) => {
  const { open } = useNavContext();
  const [prevVideo, setPrevVideo] = useState('assets/videos/index.mp4');
  const currentVideoRef = useRef(null);
  const newVideoRef = useRef(null);
  const [key, setKey] = useState(0);

  // ===== REVEAL SELECTED VIDEO OVER PREV VIDEO =====
  useCustomEffect(() => {
    const duration = 1;
    const ease = 'power2.out';

    if (!newVideoRef.current || !currentVideoRef.current || !page?.video) return;

    gsap.killTweensOf([newVideoRef.current, currentVideoRef.current]);

    gsap.set(newVideoRef.current, {
      opacity: 1,
      scale: 3.5,
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setPrevVideo(page.video);
        setKey((prev) => prev + 1);
      },
    });

    tl.to(newVideoRef.current, {
      clipPath: 'polygon(0 100%, 100% 100%, 100% 0%, 0 0%)',
      duration,
      ease,
      delay,
    }).to(newVideoRef.current, {
      scale: 1,
      duration,
      ease,
    }, '<');
  }, [page, delay]);

  // ===== ANIMATE VIDEO ON MENU OPEN AND CLOSE =====
  useCustomEffect(() => {
    if (!currentVideoRef.current) return;
    const duration = 1.5;
    const ease = 'power2.out';
    const menuDelay = 0.2;

    const elements = [currentVideoRef.current];
    if (newVideoRef.current) {
      elements.push(newVideoRef.current);
    }

    gsap.killTweensOf(elements);

    if (open) {
      gsap.to(elements, { scale: 1.3, duration, ease, delay: menuDelay });
    } else {
      gsap.to(elements, { scale: 1, duration, ease });
    }
  }, [open]);

  return (
    <div className={`relative overflow-hidden w-full bg-myGray-100 h-full`}>
      <video
        ref={currentVideoRef}
        className="absolute top-0 left-0 h-full w-full object-cover"
        loop
        autoPlay
        muted
      >
        <source src={prevVideo || 'assets/videos/index.mp4'} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {page?.video && (
        <video
          key={key}
          ref={newVideoRef}
          className="absolute top-0 left-0 h-full w-full object-cover opacity-0"
          loop
          autoPlay
          muted
        >
          <source src={page?.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoReveal;
