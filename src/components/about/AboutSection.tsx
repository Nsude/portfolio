import { useEffect, useRef, useState } from "react";
import AboutTitle from "./AboutTitle";
import gsap from "gsap";
import { useDevice } from "../hooks/useDevice";
import AboutImageReveal from "./AboutImageReveal";

interface Title {
  value: string;
  index: string;
  story: string;
  image: string;
  textOvelay: string;
}

const titles:Title[] = [
  {
    value: 'The human', 
    index: '001',
    story: `But even then, I always had this fire in my gut—a feeling that I was meant for more. That I could be more. So I decided to become more so I can be the example I wish I had growing up.`,
    image: 'assets/images/the human.jpg',
    textOvelay: 'I think'
  },
  {
    value: 'The engineer', 
    index: '002',
    story: `For me, being exceptional at my skills is a responsibility. Every line of code, every layout, every decision I make reflects my commitment to growth and excellence.`,
    image: 'assets/images/the engineer.jpg',
    textOvelay: 'therefore'
  },
  {
    value: 'The designer', 
    index: '003',
    story: `And, I work at it every single day, ensuring that what I deliver isn’t just good—it’s meaningful.`,
    image: 'assets/images/the designer.jpg',
    textOvelay: 'i am.'
  },
];

const AboutSection = () => {
  const [story, setStory] = useState('');
  const [displayImage, setDisplayImage] = useState('');
  const [overlayText, setOverlayText] = useState('');
  const storyRef = useRef(null);
  const device = useDevice();

  // ===== ANIMATE STORY ON CHANGE =====
  useEffect(() => {
    if (!storyRef.current) return;

    gsap.killTweensOf(storyRef.current);
    
    const tl = gsap.timeline();

    tl.to(storyRef.current, {opacity: 0, duration: .2});

    tl.fromTo(storyRef.current, {
      y: 40,
      opacity: 0,
    }, {
      y: 0,
      opacity: .8,
      duration: .6,
      ease: 'power2.out',
      delay: .2
    })
    
    return () => {
      tl.kill();
    }

  }, [story])

  // ===== RESET ST0RY =====
  useEffect(() => {

    const handleReset = () => {
      setStory('');
    }

    window.addEventListener("click", handleReset);

    return () => (
      window.removeEventListener("click", handleReset)
    )

  }, [])

  const handleMouseEnter = (e:React.MouseEvent | React.TouchEvent, title: Title) => {
    e.stopPropagation();
    setStory(title.story);
    setDisplayImage(title.image);
    setOverlayText(title.textOvelay);
  }

  const handleMouseLeave = () => {
    setStory('');
    setDisplayImage('assets/images/default.png');
    setOverlayText('');
  }

  return (
    <div className="text-base px-5 min-h-[100dvh] w-full sm:h-full lg:min-h-[100vh] max-h-[100vh] lg:py-[100px] md:mt-[120px] lg:mt-[200px] lg:flex lg:justify-between lg:gap-x-5">
      <div className="lg:w-[50%]">
        <div className={`w-full flex gap-2`}>
          <h4 className="uppercase mb-[55px]">About me</h4>
          <span className="opacity-40 uppercase text-[14px]">({device.width < 1024 ? 'Click' : 'Hover'} Titles)</span>
        </div>
        <div 
          onMouseLeave={() => handleMouseLeave()}
          className="mb-[80px] md:mb-[150px]">
          {
            titles.map((item, i) => (
              <div 
                key={i}
                onClick={(e) => handleMouseEnter(e, item)} 
                onMouseEnter={(e) => handleMouseEnter(e, item)}
                className="mb-[25px] last:mb-0 w-fit">
                <AboutTitle title={item.value} index={item.index} />
              </div>
            ))
          }
        </div>

        {/* ===== ORIGIN STORY ===== */}
        <div>
          <h4 className="uppercase mb-[25px]">origin story</h4>
          <p ref={storyRef} className="leading-[1.2] opacity-80 sm:w-[70%] md:w-[45%] lg:text-[25px] lg:w-[85%] 2xl:w-[65%]">
            { story || 
             `Hi I'm Meshach and I'm an addict. I'm addicted to becoming the best version of myself. I grew up in a small town in Enugu, Nigeria where we did not have many examples of success to look up to`
            }
            <br />
            <span>...</span>
          </p>
        </div>
      </div>
      <div className="relative hidden w-[40%] min-h-full lg:block">
        <div className=" bg-myblack h-full w-full overflow-hidden">
          <AboutImageReveal image={displayImage} />
        </div>
        <p className="absolute lowercase left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] text-white text-[60px] tracking-tight z-[5] font-serif">{overlayText}</p>
      </div>
    </div>
  )
}

export default AboutSection;