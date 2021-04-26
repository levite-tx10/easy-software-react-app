import './App.css';
import React, { useEffect, useState } from 'react'
function App() {
  /*define a state*/
  const [users, setUser] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userId,setUserId]=useState(null);

  /*fetch data*/
  useEffect(()=>{
    getUsers();
  },[])

  /*get users  */
  function getUsers(){
    fetch("https://607e868602a23c0017e8b79e.mockapi.io/api/v1/users").then((result)=>{
      result.json().then((resp)=>{
        //console.warn(resp);
        setUser(resp);
        setName(resp[0].name)
        setEmail(resp[0].email)
        setPhoneNumber(resp[0].phoneNumber)
        setUserId(resp[0].id)
      })
    })
  }

  /*selectUser function*/
  function selectUser(id){
    //console.warn("Function Called",users[id-1]);
    let item = users[id-2];
    setName(item.name)
    setEmail(item.email)
    setPhoneNumber(item.phoneNumber);
    setUserId(item.id)
  }


  /*update user*/
  function updateUser(){
    let item={name,phoneNumber,email}
    console.warn("item",item)
    fetch(`https://607e868602a23c0017e8b79e.mockapi.io/api/v1/users/${userId}`, {
      method: 'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        getUsers()
      })
    })
  }
  /*delete function*/
  function deleteUser(id) {
    fetch(`https://6081256973292b0017cdccb3.mockapi.io/api/v2/usersData/${id}`,{
      method:'DELETE'
    }).then((result)=>{
      result.json().then((resp)=>{
        console.warn(resp)
        getUsers();
      })
    })
  }

  /*return Area*/
  return (
    <div className="App">
      <h1>API Call</h1>
      <table border="1" style={{ float: 'left' }}>
        <tbody>
        <tr>
          <td>ID</td>
          <td>Name</td>
          <td>Email</td>
          <td>Mobile</td>
          <td>Actions</td>
        </tr>
        {
          users.map((item, i) =>
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phoneNumber}</td>
                {/*<td><button onClick={() => selectUser(item.id)}>View</button></td>*/}
                <td><button onClick={() => selectUser(item.id)}>Edit</button></td>
                {/*<td><button onClick={() => deleteUser(item.id)}>Delete</button></td>*/}

              </tr>
          )
        }
        </tbody>
      </table>

      <div>
        <h1>Update Data</h1>
        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} /> <br /><br />
        <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} /> <br /><br />
        <input type="text" value={phoneNumber}  onChange={(e)=>{setPhoneNumber(e.target.value)}} /> <br /><br />
        <button onClick={updateUser} >Update User</button>
      </div>
    </div>
  );
}

export default App;
