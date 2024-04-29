// import React, { useState } from "react";
// import axios from "axios";
// import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import Container from "@material-ui/core/Container";
// import Typography from "@material-ui/core/Typography";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1)
//     }
//   }
// }));

// const CreateSociety = () => {
//   const classes = useStyles();
//   const [societyName, setSocietyName] = useState("");
//   const [societyDescription, setSocietyDescription] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Retrieve token from localStorage
//       const token = localStorage.getItem("adtoken");

//       // Make POST request with token included in headers
//       const response = await axios.post(
//         "http://localhost:5001/societies",
//         {
//           societyName,
//           societyDescription
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       console.log(response.data);
//       // Handle successful response
//     } catch (error) {
//       console.error(error);
//       // Handle error
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" gutterBottom>
//         Create Society
//       </Typography>
//       <form className={classes.root} onSubmit={handleSubmit}>
//         <TextField
//           id="societyName"
//           label="Society Name"
//           variant="outlined"
//           fullWidth
//           value={societyName}
//           onChange={(e) => setSocietyName(e.target.value)}
//         />
//         <TextField
//           id="societyDescription"
//           label="Society Description"
//           variant="outlined"
//           fullWidth
//           multiline
//           rows={4}
//           value={societyDescription}
//           onChange={(e) => setSocietyDescription(e.target.value)}
//         />
//         <Button type="submit" variant="contained" color="primary">
//           Create Society
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default CreateSociety;