import React from "react";
import { Link } from "react-router-dom";
import { Album } from "../Types";

interface AlbumsListProps {
  albums: Album[];
  artistId: number;
}

const AlbumsList: React.FC<AlbumsListProps> = ({ albums, artistId }) => {
  return (
    <div className="albumsList">
      {albums.map((album) => (
        <div key={album.albumId}>
          <Link to={`/artist/${artistId}/${album.albumId}`}>
            <img
              src={`/images/albums/${album.cover}.jpg`}
              alt={album.title}
              className="albumImage"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AlbumsList;
