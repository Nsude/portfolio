import { SetStateAction, useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  setMenuIndex: React.Dispatch<SetStateAction<string>>
}

const menuItems = ["Grid", "List"];

const PostersMenu = ({setMenuIndex}: Props) => {
  const selectorRef = useRef(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const initialRender = useRef(true);

  const moveSelector = (target: HTMLElement, index: string) => {
    const parentLeft = target.parentElement?.getBoundingClientRect().left || 0;
    const rect = target.getBoundingClientRect();
    const left = rect.left - parentLeft;

    gsap.to(selectorRef.current, {
      width: rect.width,
      height: rect.height,
      left,
      duration: initialRender.current ? 0 : 0.6,
      ease: "expo.inOut",
    });

    // setIndex for parent
    setMenuIndex(index);

    initialRender.current = false;
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, index: string) => {
    moveSelector(e.currentTarget, index);

    // save selected index on local storage
    const selectedIndex = e.currentTarget.getAttribute("data-index");
    if (!selectedIndex) return;
    localStorage.setItem("selectedMenuIndex", selectedIndex);
  };

  // Set initial position on mount
  useEffect(() => {
    const prevSelected = localStorage.getItem("selectedMenuIndex");
    if (prevSelected) {
      const matchedBtn = buttonsRef.current.find((btn) => btn?.getAttribute("data-index") === prevSelected);
      if (!matchedBtn) return;
      moveSelector(matchedBtn, matchedBtn.getAttribute("data-index") || "0");
    } else if (buttonsRef.current[0]) {
      moveSelector(buttonsRef.current[0], "0");
    }

    return () => {initialRender.current = false}
  });

  return (
    <div className="fixed bottom-[20px] right-[20px] p-2.5 cursor-pointer bg-myGray-100 rounded-[50px]">
      <div className="relative flex justify-between items-center">
        {/* Selector */}
        <div
          ref={selectorRef}
          className="absolute z-[0] left-0 top-0 bg-myblack rounded-[30px]"
        />

        {/* Menu Items */}
        {menuItems.map((item, i) => (
          <button
            key={i}
            ref={(el) => (buttonsRef.current[i] = el)}
            onClick={(e) => handleClick(e, `${i}`)}
            data-index={i}
            className="py-[12px] px-[25px] text-[20px] mix-blend-difference"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostersMenu;