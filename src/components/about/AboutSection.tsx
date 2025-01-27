import { useRef, useState } from "react";
import AboutTitle from "./AboutTitle";
import useCustomEffect from "../hooks/useCustomEffect";
import gsap from "gsap";


const titles = [
  {
    title: 'The human', 
    index: '001',
    story: `But even then, I always had this fire in my gut—a feeling that I was meant for more. That I could be more. So I decided to become more so I can be the example I wish I had growing up.`
  },
  {
    title: 'The engineer', 
    index: '002',
    story: `For me, being exceptional at my skills is a responsibility. Every line of code, every layout, every decision I make reflects my commitment to growth and excellence.`
  },
  {
    title: 'The designer', 
    index: '003',
    story: `I work at it every single day, ensuring that what I deliver isn’t just good—it’s meaningful.`
  },
];

const AboutSection = () => {
  const [story, setStory] = useState('');
  const storyRef = useRef(null);

  // ===== ANIMATE STORY ON CHANGE =====
  useCustomEffect(() => {
    if (!storyRef.current) return null;

    gsap.killTweensOf(storyRef.current);
    
    const tl = gsap.timeline();

    tl.fromTo(storyRef.current, {
      y: 40,
      opacity: 0,
    }, {
      y: 0,
      opacity: .6,
      duration: .6,
      ease: 'power2.out',
      delay: .2
    })
    
    return () => (
      tl.kill()
    )

  }, [story])

  // ===== RESET ST0RY =====
  useCustomEffect(() => {

    const handleReset = () => {
      setStory('');
    }

    window.addEventListener("click", handleReset);

    return () => (
      window.removeEventListener("click", handleReset)
    )

  })

  return (
    <div className="text-base px-5 min-h-[100dvh] w-full lg:h-[100vh]">
      <div>
        <h4 className="uppercase mb-[55px]">About me <span className="opacity-40">(Click Titles)</span></h4>
        <div className="mb-[150px]">
          {
            titles.map((item, i) => (
              <button 
                key={i}
                onClick={(e) => {e.stopPropagation(); setStory(item.story)}} 
                className="mb-[25px] last:mb-0">
                <AboutTitle title={item.title} index={item.index} />
              </button>
            ))
          }
        </div>

        {/* ===== ORIGIN STORY ===== */}
        <div>
          <h4 className="uppercase mb-[25px]">origin story</h4>
          <p ref={storyRef} className="text-[20px] tracking-[0.02ch] leading-[1.2] opacity-60">
            { story || 
             `Hi I'm Meshach and I'm an addict. I'm addicted to becoming the best version of myself. I grew up in a small town in Enugu, Nigeria where we did not have many examples of success to look up to`
            }
            <p>...</p>
          </p>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default AboutSection;