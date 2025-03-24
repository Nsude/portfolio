import { useEffect, useRef, useState } from "react"

interface Props {
  src: string;
}

const LazyLoadImage = ({src}: Props) => {
  const imageRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsLoaded(true);
        observer.disconnect();
      }
    }, 
    {threshold: 0.2})

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
      observer.disconnect();
    }

  }, [])

  return (
    <img ref={imageRef} className="w-full h-full object-cover" src={isLoaded ? src : ''} />
  )
}

export default LazyLoadImage;