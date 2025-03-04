import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  type?: string;
}

const LazyLoadVideo = ({ src, type }: Props ) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoaded(true); // Load video when in viewport
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Trigger when 50% of the video is in view
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      style={{ width: "100%" }}
      autoPlay
      loop
      muted
      playsInline
      preload="none" // Prevents unnecessary preloading
    >
      {isLoaded && <source src={src} type={type || "video/mp4"} />}
    </video>
  );
};

export default LazyLoadVideo;