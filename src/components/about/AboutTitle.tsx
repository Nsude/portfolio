interface Props {
  title: string;
  index: string
}

const AboutTitle = ({title}: Props) => {
  
  return (
    <button
      className='relative after:content-[""] after:h-[2px] lg:after:h-[3px] after:absolute after:w-0 transition-opacity duration-[600ms] after:left-0 after:-bottom-[2px] after:bg-myblack hover:after:w-full focus:after:w-full after:transition-all after:duration-[600ms] hover:opacity-100 focus:opacity-100 opacity-50 flex gap-[20px] items-end'>
      <p className='uppercase text-[25px] md:text-[40px] lg:text-[65px] 2xl:text-[80px] text-nowrap'>{ title }</p>
      {/* <div className="overflow-hidden w-full h-full pb-[3px]">
        <span className="font-serif text-[20px]">{ index }</span>
      </div> */}
    </button>
  )
}

export default AboutTitle;