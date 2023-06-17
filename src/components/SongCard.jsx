import { Link } from "react-router-dom";
import { useState } from "react"; // Import useState hook
import { Loader } from "../components";
import { useGetPlaylistDetailsQuery } from "../redux/services/youtubeV3";

const SongCard = ({ song, isPlaying, activeSong, data ,i }) => {
  console.log("Song:\n\n");
  console.log(song);

  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(false); // State to track error status
  const [details, setDetails] = useState(null); // State to store playlist details

  const handleLinkClick = async () => {
    try {
      setIsLoading(true); // Set loading status to true
      const response = await useGetPlaylistDetailsQuery(song.id.playlistId); // Fetch playlist details
      setDetails(response); // Update state with playlist details
    } catch (error) {
      setError(true); // Set error status to true
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading status to false
    }
  };

  if (isLoading) return <Loader title="Loading links..." />;
  if (error) return <Error />;
  
  const linkUrl = details ? `https://www.youtube.com/watch?v=${details.items[0].id}&list=${song.id.playlistId}&index=1` : '';

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center
        items-center bg-black bg-opacity-50 group-hover:flex
        ${activeSong?.title === song.snippet.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`} >
        </div>
        <img alt="song_img" src={song.snippet?.thumbnails.high.url}/>
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={linkUrl} onClick={handleLinkClick}>
          {song.snippet.title}
          </Link>
        </p>
        <p className="mt-1 text-sm text-gray-300 truncate">
          <Link to={`/artists/${song?.snippet.channelId}`}>
          {song.snippet.channelTitle}
          </Link>
        </p>
      </div>
    </div>
  );
}
export default SongCard;
