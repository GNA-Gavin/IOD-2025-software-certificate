import SingleCat from "./SingleCat";
import { useState } from "react";
import AddCatForm from "./AddCatForm";

function BigCats() {
  const cats = [
    {
      id: 1,
      name: "Cheetah",
      latinName: "Acinonyx jubatus",
      image:
        "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Cougar",
      latinName: "Puma concolor",
      image:
        "https://media.istockphoto.com/id/682954094/photo/mountain-lion.jpg?s=612x612&w=0&k=20&c=oyEDpvRtROuE3UV6SAUy1h_he-SdC-OCdf_FEB8njXU=",
    },
    {
      id: 3,
      name: "Jaguar",
      latinName: "Panthera onca",
      image:
        "https://media.istockphoto.com/id/153730635/photo/photograph-of-a-stunning-jaguar-in-the-wild.jpg?s=612x612&w=0&k=20&c=WncT_vs3B53tkVWcmnrIF31u2BXhi03yVkA4bL2vt3U=",
    },
    {
      id: 4,
      name: "Leopard",
      latinName: "Panthera pardus",
      image:
        "https://media.istockphoto.com/id/621360158/photo/leopard-in-serengeti-national-park-tanzania-africa.jpg?s=612x612&w=0&k=20&c=E2lcN30E8Joa30J9lNIYLEymMx6rQNr_KloZgAAJ9U8=",
    },
    {
      id: 5,
      name: "Lion",
      latinName: "Panthera leo",
      image:
        "https://plus.unsplash.com/premium_photo-1664304310991-b43610000fc2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8TGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 6,
      name: "Snow leopard",
      latinName: "Panthera uncia",
      image:
        "https://images.unsplash.com/photo-1567972974577-90f08101c124?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNub3clMjBsZW9wYXJkfGVufDB8fDB8fHww",
    },
    {
      id: 7,
      name: "Tiger",
      latinName: "Panthera tigris",
      image:
        "https://plus.unsplash.com/premium_photo-1664302954356-a79b02fe66b8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8VGlnZXJ8ZW58MHx8MHx8fDA%3D",
    },
  ];

  const [currentCats, setCurrentCats] = useState(cats);

  const catList = currentCats.map((cat) => (
    <SingleCat
      key={cat.id}
      id={cat.id}
      name={cat.name}
      latinName={cat.latinName}
      image={cat.image}
      onDelete={handleDeleteCat}
    />
  ));

  function handleReveseCats() {
    let newCats = [...currentCats];
    newCats.reverse();
    setCurrentCats(newCats);
  }

  function handleSortCats() {
    let newCats = [...currentCats];
    newCats.sort((a, b) => a.name.localeCompare(b.name));
    setCurrentCats(newCats);
  }

  function handleFilterCats() {
    const filteredCats = currentCats.filter((cat) =>
      cat.latinName.startsWith("Panthera")
    );

    // Update state with filtered array
    setCurrentCats(filteredCats);
  }

  function handleResetCats() {
    setCurrentCats(cats);
  }

  function handleAddCat(newCat) {
    // Add the new cat to the list
    setCurrentCats([...currentCats, newCat]);
  }

  function handleDeleteCat(catId) {
    // Filter out the cat with the matching ID
    const updatedCats = currentCats.filter((cat) => cat.id !== catId);
    setCurrentCats(updatedCats);
  }

  return (
    <div className="big-cats-container">
      <h1>Big Cats Gallery</h1>
      <button
        onClick={handleReveseCats}
        className="reverse-button"
        style={{
          marginTop: "20px",
          backgroundColor: "green",
          color: "white",
        }}
      >
        Reverse Cats
      </button>
      <button
        onClick={handleSortCats}
        className="sort-button"
        style={{
          marginTop: "20px",
          marginLeft: "10px",
          backgroundColor: "green",
          color: "white",
        }}
      >
        Sort Cats
      </button>
      <button
        onClick={handleFilterCats}
        className="filter-button"
        style={{
          marginTop: "20px",
          marginLeft: "10px",
          backgroundColor: "green",
          color: "white",
        }}
      >
        Panthera Cats
      </button>
      <button
        onClick={handleResetCats}
        className="reset-button"
        style={{
          marginTop: "20px",
          marginLeft: "10px",
          backgroundColor: "green",
          color: "white",
        }}
      >
        Reset
      </button>
      
      <div className="cats-list">{catList}</div>
      <AddCatForm onAddCat={handleAddCat} />
    </div>
  );
}

export default BigCats;
