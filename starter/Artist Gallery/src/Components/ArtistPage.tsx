import React from "react";
import { useParams } from "react-router-dom";
import artists from "../../public/db";
import AlbumsList from "./AlbumsList";
import { Artist } from "../Types";

const ArtistPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const artist = artists.find((artist: Artist) => artist.id === Number(id));

  if (!artist) {
    return <div>Artist not found</div>;
  }

  return (
    <div className="artistPage">
      <div className="artistBox">
        <img
          className="artistImg"
          src={`/images/covers/${artist.cover}.jpg`}
          alt={artist.name}
        />
        <h2>{artist.name}</h2>
      </div>
      <p>{artist.bio}</p>
      <AlbumsList albums={artist.albums} artistId={artist.id} />
    </div>
  );
};

export default ArtistPage;
