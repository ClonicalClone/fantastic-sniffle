import React from 'react'
import Image from 'next/image';

interface ProjectcardProps {
  srcimg: string;
  title: string;
  desc: string;
}

const Projectcard = (params: ProjectcardProps) => {
  return (
   
      <div className="card  flex gap-12 flex-col md:flex-row width-screen  justify-center items-center text-center md:text-left md:justify-start overflow-hidden">
           <Image src={`${params.srcimg}`} width={500} height={500} alt="Project Thumbnail" className="w-100 h-60 object-contain border-white border-l-2 border-r-2 rounded-2xl hover:w-106 hover:h-62 transition-all duration-700 ease-in-out hover:shadow-[200px_0px_200px_-100px_white]" />
          <div className="card-body gap-5 flex flex-col ">
        <h2 className="card-title text-2xl ">{params.title}</h2>
        <p className="card-text leading-9 tracking-wide text-zinc-300 hover:text-white duration-400 transition-all">{params.desc}</p>
            </div>
        </div>

  )
}

export default Projectcard
