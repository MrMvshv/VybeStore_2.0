import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, isPlaying, activeSong, data ,i }) => {
  const dispatch = useDispatch();
  const handlePauseClick = () => {
    console.log("pause");
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    console.log("play");
    dispatch(setActiveSong({ song, data, i}));
    dispatch(playPause(true));
  };
  console.log("Song:\n\n");
  console.log(song);
  
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center
        items-center bg-black bg-opacity-50 group-hover:flex
        ${activeSong?.title === song.snippet.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`} >
        </div>
        <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
         song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
        />
        <img alt="song_img" src={song.snippet?.thumbnails.medium.url}/>
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.id.playlistId}`}>
          {song.snippet.title}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
          </Link>
        </p>
        <p className="mt-1 text-sm text-gray-300 truncate">
          <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
          {song.snippet.description}
          </Link>
        </p>
      </div>
    </div>
  );
}
export default SongCard;
