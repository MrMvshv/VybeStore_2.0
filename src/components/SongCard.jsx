import { Link } from "react-router-dom";
import { useState } from "react";
import { Loader, Error } from "../components";
import axios from "axios";
import { youtubeV3Api } from "../redux/services/youtubeV3";

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  console.log("Song:\n\n");
  console.log(song);

  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(false); // State to track error status
  const [details, setDetails] = useState(null); // State to store playlist details

  const handleLinkClick = async () => {
    try {
      setIsLoading(true); // Set loading status to true
      const response = await axios.get(
        `https://youtube-v31.p.rapidapi.com/playlists?id=${song.id.playlistId}&part=snippet`,
        {
          headers: {
            "X-RapidAPI-Key": "7d336a8b87msh603e2a5ed95cc86p1f2e50jsn98647fd536d8",
            "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
          },
        }
      ); // Fetch playlist details using Axios
      setDetails(response.data); // Update state with playlist details
    } catch (error) {
      setError(true); // Set error status to true
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading status to false
    }
  };

  if (isLoading) return <Loader title="Loading youtube links..." />;
  if (error) return <Error />;

  const linkUrl = details
    ? `https://www.youtube.com/watch?v=${details.items[0].id}&list=${song.id.playlistId}&index=2`
    : "";

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer" onClick={handleLinkClick}>
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center
        items-center bg-black bg-opacity-50 group-hover:flex
        ${
          activeSong?.title === song.snippet.title
            ? "flex bg-black bg-opacity-70"
            : "hidden"
        }`}
        ></div>
        <img alt="song_img" src={song.snippet?.thumbnails.high.url} />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate" onClick={handleLinkClick}>
        {linkUrl ? (
            <a href={linkUrl} target="_blank" rel="noopener noreferrer" >
              {song.snippet.title}
            </a>
          ) : (
            <span>{song.snippet.title}</span>
          )}
        </p>
        <p className="mt-1 text-sm text-gray-300 truncate">
            {song.snippet.channelTitle}
        </p>
      </div>
    </div>
  );
};

export default SongCard;
