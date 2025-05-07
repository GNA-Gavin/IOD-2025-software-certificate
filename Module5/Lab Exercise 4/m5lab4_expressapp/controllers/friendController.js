const friends = require("../models/friends");

const filterFriends = (req, res) => {
  console.log(req.query);
  let filterGender = req.query.gender;
  let filterLetter = req.query.letter;
  let matchingFriends = [...friends];

  if (filterGender) {
    matchingFriends = matchingFriends.filter(
      (friend) => friend.gender == filterGender
    );
  }

  if (filterLetter) {
    matchingFriends = matchingFriends.filter((friend) =>
      friend.name.toLowerCase().startsWith(filterLetter.toLowerCase())
    );
  }

  if (matchingFriends.length > 0) {
    // return valid data when the gender matches
    res.status(200).json(matchingFriends);
  } else {
    // and an error response when there are no matches
    res
      .status(404)
      .json({ error: "No friends matching gender " + filterGender });
  }
};

const getInfo = (req, res) => {
  console.log(req.headers);

  // Modify this response to just return info on the user-agent, content-type and accept headers
  // res.json(req.headers)
  const filteredHeaders = {
    "user-agent": req.headers["user-agent"],
    "content-type": req.headers["content-type"], // this does not seem to exist?
    accept: req.headers["accept"],
  };

  // Return only the specified headers
  res.json(filteredHeaders);
};

const getFriendById = (req, res) => {
  console.log(req.params);
  let friendId = req.params.id; // 'id' here will be a value matching anything after the / in the request path

  // Modify this function to find and return the friend matching the given ID, or a 404 if not found
  let friend = friends.find((friend) => friend.id == friendId);

  // Modify this response with the matched friend, or a 404 if not found
  // res.json({result: 'Finding friend with ID ' + friendId})
  friend
    ? res.status(200).json({ result: friend })
    : res.status(404).json({ result: `User ${friendId} not found` });
};

const postFriend = (req, res) => {
  let newFriend = req.body; // FIRST add this line to index.js: app.use(express.json());
  console.log(newFriend); // 'body' will now be an object containing data sent via the request body

  // we can add some validation here to make sure the new friend object matches the right pattern
  if (!newFriend.name || !newFriend.gender) {
    res
      .status(500)
      .json({ error: "Friend object must contain a name and gender" });
    return;
  } else if (!newFriend.id) {
    newFriend.id = friends.length + 1; // generate an ID if one is not present
  }

  // if the new friend is valid, add them to the list and return the successfully added object
  friends.push(newFriend);
  res.status(200).json(newFriend);
};

const putFriend = (req, res) => {
  let friendId = req.params.id;
  let updatedFriend = req.body;

  // Replace the old friend data for friendId with the new data from updatedFriend
  const friendIndex = friends.findIndex((friend) => friend.id == friendId);

  // Check if friend exists
  if (friendIndex === -1) {
    // Friend not found - return 404
    return res
      .status(404)
      .json({ error: `Friend with ID ${friendId} not found` });
  }

  updatedFriend.id = friends[friendIndex].id;

  // friends[friendIndex] = updatedFriend; // this created a whole new object and could result in data loss

  friends[friendIndex] = {
    ...friends[friendIndex], // Keep existing properties
    ...updatedFriend, // Override with updated properties
  };

  // Modify this response with the updated friend, or a 404 if not found
  res.status(200).json({
    result: "Updated friend with ID " + friendId,
    // data: updatedFriend,
    data: friends[friendIndex],
  });
};

const deleteFriend = (req,res) => {
    let friendId = req.params.id;

    // Find the index of the friend with the given ID
    const friendIndex = friends.findIndex((friend) => friend.id == friendId);
  
    // Check if friend exists
    if (friendIndex === -1) {
      // Friend not found - return 404
      return res.status(404).json({
        error: `Friend with ID ${friendId} not found`,
      });
    }
  
    // Store the friend to be deleted for the response
    const deletedFriend = friends[friendIndex];
  
    // Remove the friend from the array
    friends.splice(friendIndex, 1);
  
    // Return success response with the deleted friend
    res.status(200).json({
      result: `Successfully deleted friend with ID ${friendId}`,
      data: deletedFriend,
    });
}

module.exports = {
  filterFriends,
  getInfo,
  getFriendById,
  postFriend,
  putFriend,
  deleteFriend
};
