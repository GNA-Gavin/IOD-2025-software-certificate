function SingleCat(props) {
  return (
    <div className="cat-card">
      <h2>{props.name}</h2>
      <p>
        <em>{props.latinName}</em>
      </p>
      <img src={props.image} alt={props.name} />
    </div>
  );
}

export default SingleCat;
