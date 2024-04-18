import React, { useEffect, useState } from "react";
import { AnimeList } from "./Components/AnimeList";
import { AnimeInfo } from "./Components/AnimeInfo";
import { AddToList } from "./Components/AddToList";
import { RemoveFromList } from "./Components/RemoveFromList";
import { Icon } from "@iconify/react/dist/iconify.js";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );
  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const [search, setSearch] = useState("Dragon");
  const [animeData, setAnimeData] = useState();
  const [animeInfo, setAnimeInfo] = useState();
  const [myAnimeList, setMyAnimeList] = useState([]);
  console.log("my", animeData);
  let option = [
    { icon: "ri:sun-line", text: "light" },
    { icon: "ri:moon-line", text: "dark" },
    { icon: "ph:desktop-bold", text: "system" },
  ];
  const addTo = (anime) => {
    const index = myAnimeList?.findIndex((myanime) => {
      return myanime?.mal_id === anime?.mal_id;
    });
    if (index < 0) {
      const newArray = [...myAnimeList, anime];
      setMyAnimeList(newArray);
    }
  };
  const removeFrom = (anime) => {
    const newArray = myAnimeList?.filter((myanime) => {
      return myanime.mal_id !== anime.mal_id;
    });
    setMyAnimeList(newArray);
  };
  const getData = async () => {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${search}&limit=20`
    );
    const resData = await res.json();
    setAnimeData(resData?.data);
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    const fetchData = setTimeout(() => {
      getData();
    }, 3000);

    return () => clearTimeout(fetchData);
  }, [search]);
  function onWindowMatch() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }
  onWindowMatch();
  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme]);
  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  });
  return (
    <main className="w-full overflow-hidden bg-white dark:bg-[#0c0b0b]">
      <div className="w-full p-[1.5vw] dark:bg-[#211f1f] bg-red-600 flex justify-between items-center fixed top-0 text-white z-20">
        <h1 className="text-[6vw] md:text-[2vw] font-medium">Jikan Anime</h1>
        <div className="w-full max-w-[60vw] md:max-w-[30vw]">
          <input
            className="p-[2.5vw] md:p-[0.7vw] focus:outline-none rounded-md text-[3vw] md:text-[1vw] border-none w-full text-gray-600"
            type="search"
            placeholder="Search your anime"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-[3vw]">
          {option?.map((opt, ind) => (
            <button
              onClick={() => setTheme(opt?.text)}
              key={ind}
              className={`text-[1.5vw] ${
                opt?.text === theme && "text-sky-600"
              }`}
            >
              <Icon icon={opt?.icon} />
            </button>
          ))}
        </div>
      </div>

      <div className="w-full px-[3vw] md:px-0 flex md:justify-center mt-[15vw] md:mt-[10vw]">
        {animeInfo && (
          <main className="w-full z-40 h-screen fixed bg-gray-700 top-0 flex justify-center items-center opacity-80">
            <section className="bg-[#8f4040] relative flex items-center justify-center p-[3vw] rounded-xl w-[70vw] md:w-[32vw] h-[80vw] md:h-[32vw]">
              <span
                onClick={() => setAnimeInfo(null)}
                className="text-[4.3vw] md:text-[1.3vw] text-gray-700 font-semibold absolute top-[3vw] md:top-[1vw] right-[3vw] md:right-[1vw] p-[0.5vw] cursor-pointer hover:bg-gray-400 rounded-md h-[2vw] w-[2vw] flex items-center justify-center"
              >
                X
              </span>
              <AnimeInfo animeInfo={animeInfo} />
            </section>
          </main>
        )}
        <div className="">
          <h2 className="dark:text-gray-200 text-gray-700 text-[4.5vw] md:text-[1.5vw] font-semibold my-[1vw]">
            Most Trending
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-[2vw]">
            <AnimeList
              animelist={animeData}
              setAnimeInfo={setAnimeInfo}
              animeComponent={AddToList}
              handleList={(anime) => addTo(anime)}
            />
          </div>
          <h2 className="text-gray-700 text-[4.5vw] md:text-[1.5vw] font-semibold my-[1vw]">
            My List
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-[2vw]">
            <AnimeList
              animelist={myAnimeList}
              setAnimeInfo={setAnimeInfo}
              animeComponent={RemoveFromList}
              handleList={(anime) => removeFrom(anime)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
