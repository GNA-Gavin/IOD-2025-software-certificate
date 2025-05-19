import { useState } from "react";

function AddCatForm({ onAddCat }) {
  // State for form inputs
  const [name, setName] = useState("");
  const [latinName, setLatinName] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !latinName || !image) {
      setError("All fields are required");
      return;
    }

    // Clear any previous errors
    setError("");

    // Create new cat object with a unique ID
    const newCat = {
      id: Date.now(), // Simple way to generate a unique ID
      name,
      latinName,
      image,
    };

    // Pass the new cat to parent component
    onAddCat(newCat);

    // Reset form
    setName("");
    setLatinName("");
    setImage("");
  };

  return (
    <div
      className="add-cat-form"
      style={{ marginTop: "20px", marginBottom: "20px" }}
    >
      <h2>Add New Cat</h2>

      {error ? <p style={{ color: "red" }}>{error}</p> : null}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="latinName">Latin Name: </label>
          <input
            type="text"
            name="latinName"
            value={latinName}
            onChange={(e) => setLatinName(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="image">Image URL: </label>
          <input
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "green",
            color: "white",
            marginTop: "10px",
          }}
        >
          Add Cat
        </button>
      </form>
    </div>
  );
}

export default AddCatForm;
