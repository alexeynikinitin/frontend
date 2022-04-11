import {useEffect, useRef, useState} from "react";
import axios from "axios";

function App() {

  const userNameRef = useRef(null)

  const [users, setUsers] = useState([])
  const getUsers = () => {
    axios.get("http://localhost:7542/users")
      .then((res) => {
        setUsers(res.data)
      })
  }
  useEffect(() => {
    getUsers();
  }, [])

  let onClick = () => {
    axios.post("http://localhost:7542/users", {id: 4, name: userNameRef.current.value})
      .then((res) => {
        getUsers()
      })
  };

  return (
    <div >
      <input ref={userNameRef}/>
      <div>
        <button onClick={onClick}>Create</button>
      </div>
      { users.map((u, i) => <div key={`u.name-${i}`}>{u.name}</div>) }
    </div>
  );
}

export default App;
