
interface Block {
  title: string;
  image: string
}

const DetailsBlock = ({ title , image }: Block) => {
  return (
    <>
      <div className="block-details">
        <div className="block-content">
          <span>About</span>
          <h2>{title}</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
            ratione nostrum ea obcaecati suscipit quia magnam!Sed, eveniet vel
            reprehenderit tenetur minima ad aliquid velit quibusdam earum
            aspernatur doloremque ipsum!
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
            ratione nostrum ea obcaecati suscipit quia magnam!
          </p>
        </div>
        <img src={image} alt={title}></img>
      </div>
    </>
  );
};

export default DetailsBlock;
