import React from "react";
import { useParams } from "react-router-dom";
import artists from "../../public/db";
import { Album } from "../Types";

const AlbumPage: React.FC = () => {
  const { artistId, albumId } = useParams<{
    artistId: string;
    albumId: string;
  }>();

  const artist = artists.find((artist) => artist.id.toString() === artistId);

  if (!artist) {
    return <div>Artist not found</div>;
  }

  const album = artist.albums.find((album: Album) => album.albumId === albumId);

  if (!album) {
    return <div>Album not found</div>;
  }

  return (
    <div className="albumPage">
      <img src={`/images/albums/${album.cover}.jpg`} alt={album.title} />
      <p>
        <span>Title:</span> {album.title}
      </p>
      <p>
        <span>Year:</span> {album.year}
      </p>
      <p>
        <span>Price:</span> {album.price} $
      </p>
    </div>
  );
};

export default AlbumPage;
