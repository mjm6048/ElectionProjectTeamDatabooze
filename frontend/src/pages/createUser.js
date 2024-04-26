// import React, { useState } from "react";
// import axios from "axios";
// import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import Container from "@material-ui/core/Container";
// import Typography from "@material-ui/core/Typography";
// import Chip from "@material-ui/core/Chip";
// import InputAdornment from "@material-ui/core/InputAdornment";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1)
//     }
//   },
//   chip: {
//     margin: theme.spacing(0.5)
//   }
// }));

// const CreateUser = () => {
//   const classes = useStyles();
//   const [username, setUsername] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [password, setPassword] = useState("");
//   const [societyID, setSocietyID] = useState("");
//   const [roleID, setRoleID] = useState("");
//   const [societies, setSocieties] = useState([]);
//   const [errors, setErrors] = useState({});

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         // Retrieve token from localStorage
//         const token = localStorage.getItem("adtoken");

//         // Make POST request with token included in headers
//         const response = await axios.post(
//           `http://localhost:5001/users`,
//           {username,
//             firstName,
//             lastName,
//             password,
//             societyIDs:
//               roleID === "1" || roleID === "2" ? [societyID] : societies, // Send societyID as an array if roleID is 1 or 2, otherwise send the societies array
//             roleID
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           }
//         );
//         console.log(username);
//         console.log(response.data);
//         // Handle successful response
//       } catch (error) {
//         console.error(error);
//         // Handle error
//       }
//     } else {
//       setErrors(validationErrors);
//     }
//   };
//   const validateForm = () => {
//     const errors = {};

//     if (!username) {
//       errors.username = "Username is required";
//     }
//     if (!firstName) {
//       errors.firstName = "First name is required";
//     }
//     if (!lastName) {
//       errors.lastName = "Last name is required";
//     }
//     if (!password) {
//       errors.password = "Password is required";
//     }
//     if ((roleID === "1" || roleID === "2") && !societyID) {
//       errors.societyID = "Society ID is required";
//     }
//     if (!roleID) {
//       errors.roleID = "Role ID is required";
//     } else if (roleID < 1 || roleID > 4) {
//       errors.roleID = "Role ID must be between 1 and 4";
//     }

//     return errors;
//   };

//   const handleAddSociety = () => {
//     if (roleID === "3" || roleID === "4") {
//       if (societies.includes(societyID)) {
//         setErrors({ ...errors, societyID: "Society already added" });
//       } else {
//         setSocieties([...societies, societyID]);
//         setSocietyID("");
//         setErrors({ ...errors, societyID: null });
//       }
//     } else {
//       setErrors({
//         ...errors,
//         societyID: "Only roles 3 and 4 can add multiple societies"
//       });
//     }
//   };

//   const handleRemoveSociety = (society) => {
//     setSocieties(societies.filter((s) => s !== society));
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" gutterBottom>
//         Create User
//       </Typography>
//       <form className={classes.root} onSubmit={handleSubmit}>
//         <TextField
//           id="username"
//           label="Username"
//           variant="outlined"
//           fullWidth
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           error={!!errors.username}
//           helperText={errors.username}
//         />
//         <TextField
//           id="firstName"
//           label="First Name"
//           variant="outlined"
//           fullWidth
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           error={!!errors.firstName}
//           helperText={errors.firstName}
//         />
//         <TextField
//           id="lastName"
//           label="Last Name"
//           variant="outlined"
//           fullWidth
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//           error={!!errors.lastName}
//           helperText={errors.lastName}
//         />
//         <TextField
//           id="password"
//           label="Password"
//           type="password"
//           variant="outlined"
//           fullWidth
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           error={!!errors.password}
//           helperText={errors.password}
//         />
//         <TextField
//           id="roleID"
//           label="Role ID"
//           variant="outlined"
//           fullWidth
//           value={roleID}
//           onChange={(e) => setRoleID(e.target.value)}
//           error={!!errors.roleID}
//           helperText={errors.roleID}
//         />
//         {(roleID === "1" || roleID === "2") && (
//           <TextField
//             id="societyID"
//             label="Society ID"
//             variant="outlined"
//             fullWidth
//             value={societyID}
//             onChange={(e) => setSocietyID(e.target.value)}
//             error={!!errors.societyID}
//             helperText={errors.societyID}
//           />
//         )}
//         {(roleID === "3" || roleID === "4") && (
//           <TextField
//             id="societyID"
//             label="Society ID"
//             variant="outlined"
//             fullWidth
//             value={societyID}
//             onChange={(e) => setSocietyID(e.target.value)}
//             error={!!errors.societyID}
//             helperText={errors.societyID}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleAddSociety}
//                     disabled={!societyID}
//                   >
//                     Add
//                   </Button>
//                 </InputAdornment>
//               )
//             }}
//           />
//         )}
//         {societies.length > 0 && (
//           <div>
//             <Typography variant="subtitle1">Added Societies:</Typography>
//             {societies.map((society) => (
//               <Chip
//                 key={society}
//                 label={society}
//                 onDelete={() => handleRemoveSociety(society)}
//                 className={classes.chip}
//               />
//             ))}
//           </div>
//         )}
//         <Button type="submit" variant="contained" color="primary">
//           Create User
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default CreateUser;