// import React, { useEffect, useState } from "react";
// import { useRef } from "react";
// import Nav from "./Nav";
// import { useSelector } from "react-redux";


// function EditProfile() {
//   let firstNameInputRef = useRef();
//   let lastNameInputRef = useRef();
//   let ageInputRef = useRef();
//   let emailInputRef = useRef();
//   let passwordInputRef = useRef();
//   let mobileInputRef = useRef();
//   let profilePicInputRef = useRef();

//   let storeObj = useSelector((store)=>{
//     return store;
//   });

//   useEffect(()=>{

//   firstNameInputRef.current.value = storeObj.userDetails.firstName;
//   lastNameInputRef.current.value = storeObj.userDetails.lastName;
//   ageInputRef.current.value = storeObj.userDetails.age;
//   passwordInputRef.current.value = storeObj.userDetails.password;
//   mobileInputRef.current.value = storeObj.userDetails.mobile;
//   emailInputRef.current.value = storeObj.userDetails.email;
//   setProfilePic(`http://localhost:9441/${storeObj.userDetails.profilePic}`);



//   },[])

//   let [profilePic, setProfilePic] = useState([]);

//   let updateDetails = async () => {
//     let dataToSend = new FormData();
//     dataToSend.append("firstName", firstNameInputRef.current.value);
//     dataToSend.append("lastName", lastNameInputRef.current.value);
//     dataToSend.append("age", ageInputRef.current.value);
//     dataToSend.append("email", emailInputRef.current.value);
//     dataToSend.append("password", passwordInputRef.current.value);
//     dataToSend.append("mobile", mobileInputRef.current.value);

//     for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
//       dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
//     }

//     let reqOptions = {
//       method: "PUT",
//       body: dataToSend,
//     };

//     let JSONData = await fetch("http://localhost:9441/updateDetails", reqOptions);

//     let JSOData = await JSONData.json();
//     // setProfilePic(JSOData);
//     // alert("Successfully Registered");

//     console.log(JSOData);
//   };

//   return (
//     <div className="signup">
//         <Nav></Nav>
        
//       <form className="editing">
//         <div>
//           <label>First Name</label>
//           <input ref={firstNameInputRef}></input>
//         </div>
//         <div>
//           <label>Last Name</label>
//           <input ref={lastNameInputRef}></input>
//         </div>
//         <div>
//           <label>Age</label>
//           <input ref={ageInputRef}></input>
//         </div>
//         <div>
//           <label>Email</label>
//           <input ref={emailInputRef} readOnly></input>
//         </div>
//         <div>
//           <label>Password</label>
//           <input type="password" ref={passwordInputRef}></input>
//         </div>
//         <div>
//           <label>Mobile No</label>
//           <input ref={mobileInputRef}></input>
//         </div>
//         <div>
//           <label>Profile Pic</label>
//           <input
//             ref={profilePicInputRef}
//             type="file"
//             accept="image/*"
//             onChange={(eo) => {
//               let selectedPicPath = URL.createObjectURL(eo.target.files[0]);

//               setProfilePic(selectedPicPath);
//             }}
//           ></input>
//         </div>
//         <div>
//           <button
//             className="group"
//             type="button"
//             onClick={() => {
//               updateDetails();
//             }}
//           >
//             Update Details
//           </button>

//           <img src={profilePic}></img>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default EditProfile;


import React, { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import { useSelector } from "react-redux";

function EditProfile() {
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const ageInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const mobileInputRef = useRef();
  const profilePicInputRef = useRef();

  const storeObj = useSelector((store) => store);

  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    if (storeObj.userDetails) {
      firstNameInputRef.current.value = storeObj.userDetails.firstName;
      lastNameInputRef.current.value = storeObj.userDetails.lastName;
      ageInputRef.current.value = storeObj.userDetails.age;
      emailInputRef.current.value = storeObj.userDetails.email;
      passwordInputRef.current.value = storeObj.userDetails.password;
      mobileInputRef.current.value = storeObj.userDetails.mobile;
      setProfilePic(`http://localhost:9441/${storeObj.userDetails.profilePic}`);
    }
  }, [storeObj.userDetails]);

  const updateDetails = async () => {
    const dataToSend = new FormData();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobile", mobileInputRef.current.value);

    if (profilePicInputRef.current.files.length > 0) {
      dataToSend.append("profilePic", profilePicInputRef.current.files[0]);
    }

    const reqOptions = {
      method: "PUT",
      body: dataToSend,
    };

    try {
      const response = await fetch("http://localhost:9441/updateDetails", reqOptions);
      const result = await response.json();
      console.log(result);
      // handle success, e.g., update the state or show a success message
    } catch (error) {
      console.error("Error updating profile:", error);
      // handle error, e.g., show an error message
    }
  };

  return (
    <div className="signup">
      <Nav />
      <form className="editing">
        <div>
          <label>First Name</label>
          <input ref={firstNameInputRef} />
        </div>
        <div>
          <label>Last Name</label>
          <input ref={lastNameInputRef} />
        </div>
        <div>
          <label>Age</label>
          <input ref={ageInputRef} />
        </div>
        <div>
          <label>Email</label>
          <input ref={emailInputRef} readOnly />
        </div>
        <div>
          <label>Password</label>
          <input type="password" ref={passwordInputRef} />
        </div>
        <div>
          <label>Mobile No</label>
          <input ref={mobileInputRef} />
        </div>
        <div>
          <label>Profile Pic</label>
          <input
            ref={profilePicInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const selectedPicPath = URL.createObjectURL(e.target.files[0]);
              setProfilePic(selectedPicPath);
            }}
          />
        </div>
        <div>
          <button
            className="group"
            type="button"
            onClick={updateDetails}
          >
            Update Details
          </button>
          {profilePic && <img src={profilePic} alt="Profile" />}
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
