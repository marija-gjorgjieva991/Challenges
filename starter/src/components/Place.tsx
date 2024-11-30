export interface PlaceType {
  img: string;
  place: string;
  desc: string;
}
const Place = ({ img, place, desc }: PlaceType) => {
  return (
    <>
      <div className="place-div">
        <img src={img} alt={place} />
        <div className="place-content">
          <h2>{place}</h2>
          <p>{desc}</p>
        </div>
      </div>
    </>
  );
};

export default Place;
