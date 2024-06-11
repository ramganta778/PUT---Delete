import React from "react";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {

let navigate = useNavigate();

  let storeObj = useSelector((store) => {
    return store;
  });

  let deleteAccount = async ()=>{

    let dataToSend = new FormData();
    dataToSend.append("email",storeObj.userDetails.email);

let reqOptions = {
 
 method:"DELETE",
 body:dataToSend,

};

let JSONData = await fetch("http://localhost:9441/deleteAccount",reqOptions);

let JSOData = await JSONData.json();

alert(JSOData.msg);



if(JSOData.status == "success"){

navigate("/");


}

  };
  
  return (
    <div>
      <Nav></Nav>
      <h1>
        Welcome! {storeObj.userDetails.firstName} {""} {storeObj.userDetails.lastName}
      </h1>
      <img src={`http://localhost:9441/${storeObj.userDetails.profilePic}`}></img>

      <button onClick={()=>{

    deleteAccount();




      }}>Delete Account</button>
    </div>
  );
}

export default Home;

