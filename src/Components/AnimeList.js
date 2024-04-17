import React from 'react'

export const AnimeList = ({ animelist,setAnimeInfo,animeComponent,handleList}) => {
  const AddToList=animeComponent;
  return (
    <>
      {
        animelist ? (
          animelist?.map((anime, index) => {
            return (
              <section className="w-full cursor-pointer h-[55vw] p-[1vw] md:max-w-[16vw] md:h-[22vw] shadow-md text-center overflow-hidden relative" key={index}>
                <figure onClick={()=>setAnimeInfo(anime)}  className='w-full h-[40vw] md:h-[15vw]'>
                <img className='w-full h-full' src={anime?.images?.jpg?.large_image_url} alt="anime" />
                </figure>
                <div className="anime-info p-[0.7vw]">
                  <h4 className='text-[3vw] md:text-[1vw] pt-[0.5vw]'>{anime?.title}</h4>
                  <div className="overlay" onClick={()=>handleList(anime)}>
                      <h4 className='text-[3vw] md:text-[1vw]'>{anime?.title_japanese}</h4>
                      <h3 className='text-[3vw] md:text-[1vw]'>SYNOPSIS</h3>
                      <div className="synopsis no-scrollbar">
                        <p className='text-[2vw] md:text-[1vw]'>{anime?.synopsis}</p>
                      </div>
                      <AddToList/>
                  </div>

                </div>
              </section>
            )
          })
        ) : "Not Found"
      }

    </>
  )
}
