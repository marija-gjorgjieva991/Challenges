import React from "react";
import ArtistItem from "./ArtistItem";
import artists from "../../public/db";

const ArtistsList: React.FC = () => {
  return (
    <div className="artistsList">
      <h2>Browse the artists</h2>
      <div className="artistItems">
        {artists.map((artist) => (
          <div key={artist.id} className="artistItem">
            <ArtistItem
              artistId={artist.id}
              src={`/images/covers/${artist.cover}.jpg`}
              alt={artist.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistsList;
