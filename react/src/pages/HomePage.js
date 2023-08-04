import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function HomePage() {
  let { user, logoutUser, acceptRequest, declineRequest } =
    useContext(AuthContext);
  let [data, setData] = useState([]);
  let [username, setUsername] = useState([]);
  let [searchInput, setSearchInput] = useState("");
  let [filteredResults, setFilteredResults] = useState([]);
  let [friendRequest, setFriendRequest] = useState([]);
  let [friends, setFriends] = useState([]);
  let [converted, setConvert] = useState([]);
  let update;

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/friendrequest/${user.user_id}/`)
      .then((response) => response.json())
      .then((friendRequest) => setFriendRequest(friendRequest))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/friends/${user.user_id}/`)
      .then((response) => response.json())
      .then((friends) => setFriends(friends))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/chatroomform/")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/user/")
      .then((response) => response.json())
      .then((username) => setUsername(username))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/user/")
      .then((response) => response.json())
      .then((testing) => setConvert(testing[testing.filter]));
  });

  // console.log(username)
  let SearchItems = (searchValue, friends) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      let filteredData = username.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      console.log('aojdhaw')
    }
  };

  let HandleRequest = async (receiver) => {
    let response = await fetch("http://127.0.0.1:8000/postingRequests/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "pending",
        sender: user.user_id,
        receiver: receiver,
      }),
    });
  };

  return (
    <div className="">
      <Link to="/">Home</Link>
      <span> | </span>

      {user ? (
        <div>
          <div>
            <Link onClick={logoutUser}>Logout</Link>
            <span> | </span>
            <Link to="/chatroomcreator">Create new room</Link>
          </div>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
      {user && <p>Hello {user.username}</p>}

      {data.map((item, index) => (
        <ul key={index}>
          <p>Title: </p>
          <li>
            <Link to={`chatroom/${item.title}`}>{item.title}</Link>
          </li>
          <p>Description: </p>
          <li>{item.description}</li>

          <br></br>
        </ul>
      ))}

      <h3>Search users: </h3>
      <form>
        <input
          type="text"
          name="usersearch"
          placeholder="Type searching query"
          onChange={(e) => SearchItems(e.target.value, friends)}
        />
      </form>

      {searchInput.length > 1
        ? filteredResults.map((item, index) => {
            {
              item.id !== user.user_id && !(friends.map((item) => {return item.friends[0]})).includes(item.id) ? (
                <p key={index}>
                  {item.username}{" "}
                  <span>
                    <button onClick={() => HandleRequest(item.id)}>
                      ADD FRIEND
                    </button>
                  </span>
                </p>
              ) : (
                <p></p>
              );
            }
          })
          : username.map((item, index) => {
            //(friends.length - 1 < index ? null : friends[index].friends[0]) || console.log(friends.length - 1 < index ? null : friends[index].friends[0]), item.id !== friends[index > friends.length ? test=0 : index].friends[0]
            if (
              item.id !== user.user_id  && !(friends.map((item) => {return item.friends[0]})).includes(item.id)
            ) {
              return (
                <p key={index}>
                  {item.username}{" "}
                  <span>
                    <button onClick={() => HandleRequest(item.id)}>
                      ADD FRIEND
                    </button>
                  </span>
                </p>
              );
            }
            else{
              <p></p>
            }
          })}
      {friendRequest.map((item, index) => {
        return (
          <p key={index}>
            Friend Request from
            {item.sender}
            <button onClick={() => acceptRequest(item.sender, item.id)}>
              ACCEPT
            </button>
            <span> | </span>{" "}
            <button onClick={() => declineRequest(item.id)}>DECLINE</button>
          </p>
        );
      })}

      {friends.map((item, index) => {
        return <p key={index}>{item.friends}</p>;
      })}
    </div>
  );
}

export default HomePage;
