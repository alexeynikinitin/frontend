import {useEffect, useRef, useState} from "react";
import axios from "axios";

function App() {

  const userNameRef = useRef(null)

  const [users, setUsers] = useState([])

  const getUsers = () => {
    axios.get(`http://localhost:7542/users` + window.location.search)
      .then((res) => {
        setUsers(res.data)
      })
  }

  const createUser = () => {
    axios.post("http://localhost:7542/users", {id: 4, name: userNameRef.current.value})
      .then((res) => {
        getUsers()
      })
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:7542/users/${id}`)
      .then((res) => {
        getUsers()
      })
  }

  const updateUser = (id, name) => {
    axios.put(`http://localhost:7542/users`, {id, name})
      .then((res) => {
        getUsers()
      })
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div>
      <input ref={userNameRef}/>
      <div>
        <button onClick={createUser}>Create</button>
      </div>
      {users.map((u) =>
        <div
          key={u._id}
        >
          <input defaultValue={u.name} onBlur={(e) => {updateUser(u._id, e.currentTarget.value)}}/>
          <button onClick={() => deleteUser(u._id)}>X</button>
        </div>)}
    </div>
  );
}

export default App;
