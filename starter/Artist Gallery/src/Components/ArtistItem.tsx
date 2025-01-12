import React from "react";
import { Link } from "react-router-dom";

interface ArtistItemProps {
  artistId: number;
  src: string;
  alt: string;
}

const ArtistItem: React.FC<ArtistItemProps> = ({ artistId, src, alt }) => {
  return (
    <Link to={`/artist/${artistId}`}>
      <div className="artistItemContainer">
        <img src={src} alt={alt} className="artistImage" />
        <button className="artistBtn">{alt}</button>
      </div>
    </Link>
  );
};

export default ArtistItem;
