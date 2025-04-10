import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { Page } from '../contexts/NavContext';
import useCustomEffect from '../hooks/useCustomEffect';

interface Props {
  selected: Page | null;
  delay?: number;
}

const VideoReveal = ({ selected, delay = 0 }: Props) => {
  const [prevVideo, setPrevVideo] = useState('assets/videos/default.mp4');
  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const newVideoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile on component mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Match your lg breakpoint
    };
    
    // Check on mount
    checkMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useCustomEffect(() => {
    // Don't play videos on mobile
    if (isMobile) return;
    
    // Ensure current video plays on mount
    if (currentVideoRef.current) {
      currentVideoRef.current.play().catch((err) =>
        console.error('Error playing current video:', err)
      );
    }
  }, [prevVideo, isMobile]);

  useCustomEffect(() => {
    if (isMobile || !selected?.video || !newVideoRef.current || !currentVideoRef.current) return;

    const duration = 1;
    const ease = 'power2.out';
    const newVideo = newVideoRef.current;
    const currentVideo = currentVideoRef.current;

    gsap.killTweensOf([newVideo, currentVideo]);

    // Preload and reset the new video
    newVideo.load();
    newVideo.currentTime = 0;

    gsap.set(newVideo, {
      opacity: 1,
      scale: 3.5,
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setPrevVideo(selected.video); // Update `prevVideo` after animation
      },
    });

    // Play the new video before starting the animation
    newVideo.play().catch((err) => console.error('Error playing new video:', err));

    tl.to(newVideo, {
      clipPath: 'polygon(0 100%, 100% 100%, 100% 0%, 0 0%)',
      duration,
      ease,
      delay,
    }).to(newVideo, {
      scale: 1,
      duration,
      ease,
    }, '<');
  }, [selected, delay, isMobile]);

  // Don't render video elements at all on mobile
  if (isMobile) {
    return <div className="relative overflow-hidden w-full h-full bg-myGray-100"></div>;
  }

  return (
    <div className="relative overflow-hidden w-full h-full bg-myGray-100">
      <video
        ref={currentVideoRef}
        className="absolute top-0 left-0 h-full z-[1] w-full object-cover"
        src={prevVideo}
        muted
        loop
        autoPlay
        playsInline // Add playsInline to prevent fullscreen on iOS
      />
      {selected?.video && (
        <video
          ref={newVideoRef}
          className="absolute top-0 left-0 h-full w-full z-[2] object-cover"
          src={selected.video}
          muted
          loop
          autoPlay
          playsInline // Add playsInline to prevent fullscreen on iOS
        />
      )}
    </div>
  );
};

export default VideoReveal;