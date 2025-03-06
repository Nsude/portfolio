import { useDevice } from "../hooks/useDevice";

const layouts = [
  "/assets/images/UI-layouts/Page-1.png",
  "/assets/images/UI-layouts/Page-2.png",
  "/assets/images/UI-layouts/Page-3.png",
  "/assets/images/UI-layouts/Page-4.png",
  "/assets/images/UI-layouts/Page-5.png",
  "/assets/images/UI-layouts/Page-6.png",
  "/assets/images/UI-layouts/Page-7.png",
  "/assets/images/UI-layouts/Page-8.png",
  "/assets/images/UI-layouts/Page-9.png",
  "/assets/images/UI-layouts/Page-10.png",
  "/assets/images/UI-layouts/Page-11.png",
  "/assets/images/UI-layouts/Page-12.png",
  "/assets/images/UI-layouts/Page-13.png",
  "/assets/images/UI-layouts/Page-14.png",
  "/assets/images/UI-layouts/Page-15.png",
  "/assets/images/UI-layouts/Page-16.png",
  "/assets/images/UI-layouts/Page-17.png",
]

const UILayouts = () => {
  const device = useDevice();

  return (
    <div className="w-full min-h-screen h-full flex flex-wrap" >
      {
        layouts.map((layout, i) => (
          <div key={i} className={`
          ${(i + 1) % 3 === 0 || device.width < 1024 ? "w-full" : "w-[50%]"} 
          h-[50vh] xl:h-screen lg:h-[60vh] bg-myGray-300 border-myGray-100 border-2 flex justify-center items-center
          `}>
            <img src={layout} className={`${(i + 1) % 3 === 0 ? "w-[75%] lg:w-1/2" : "w-[75%] lg:w-[75%]"} md:w-[55%]`}/>
          </div>
        ))
      }
    </div>
  )
}

export default UILayouts;