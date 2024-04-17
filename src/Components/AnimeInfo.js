import React from 'react'

export const AnimeInfo = (props) => {
    const {title,images:{jpg:{large_image_url}},rank,score,popularity}=props?.animeInfo
  return (
    <>
        <div className="w-full bg-white rounded-[1vw] p-[1vw] flex justify-center items-center flex-col z-50 mt-[2vw]">
            <h3 className='text-center text-[2.5vw] md:text-[1vw] w-full max-w-[50vw] md:max-w-[20vw]'>{title}</h3><br />
            <figure className='w-full max-w-[30vw] md:max-w-[15vw] h-[35vw] md:h-[17vw]'>
            <img className='w-full h-full' src={large_image_url} alt="image" />
            </figure>
            <div className="w-full bg-[#F9F6EE] p-[1vw] flex items-center flex-col">
                <h3 className='text-[2.5vw] md:text-[1vw] font-medium text-gray-700'>Popularity: {popularity}</h3>
                <h3 className='text-[2.5vw] md:text-[1vw] font-medium text-gray-700'>Rank: {rank}</h3>
                <h3 className='text-[2.5vw] md:text-[1vw] font-medium text-gray-700'>Score: {score}</h3>
            </div>
        </div>
    </>
  )
}
