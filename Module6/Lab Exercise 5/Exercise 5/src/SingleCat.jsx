function SingleCat(props) {
  const handleDelete = () => {
    props.onDelete(props.id);
  };

  return (
    <div className="cat-card">
      <h2>{props.name}</h2>
      <p>
        <em>{props.latinName}</em>
      </p>
      <img src={props.image} alt={props.name} style={{ 
            maxWidth: '600px', 
            borderRadius: '8px'
          }} />
      <button 
        onClick={handleDelete} 
        style={{
          backgroundColor: 'red',
          color: 'white',
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default SingleCat;
