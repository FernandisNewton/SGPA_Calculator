import React, { useEffect, useState } from "react";
import { getMarks } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
function MarksPage() {
  const [user, loading, error] = useAuthState(auth);
  const [updatedMakrs, setUpdatedMarks] = useState([]);
  let marks = [];
  useEffect(() => {
    getMarks(user).then((querySnapshot) => {
      //setUpdatedMarks(querySnapshot);

      querySnapshot.forEach((doc) => {
        marks.push(doc.data());
        console.log(marks);
      });

      setUpdatedMarks(marks);
    });
  }, []);

  return (
    <div className="container">
      {updatedMakrs ? (
        updatedMakrs.map(function (item, i) {
          //   console.log(item.data().uid);
          return (
            <Card variant="outlined">
              <React.Fragment>
                <CardContent>
                  <Typography
                    color="text.secondary"
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    Semester:-{item.sem}
                  </Typography>
                  <Typography variant="h5" component="div">
                    Marks
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="right">Subject</TableCell>
                          <TableCell align="right">Marks</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row"></TableCell>
                          <TableCell>Subject 1</TableCell>
                          <TableCell>{item.marks.su1}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row"></TableCell>
                          <TableCell>Subject 2</TableCell>
                          <TableCell>{item.marks.sub2}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row"></TableCell>
                          <TableCell>Subject 3</TableCell>
                          <TableCell>{item.marks.sub3}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row"></TableCell>
                          <TableCell>Subject 4</TableCell>
                          <TableCell>{item.marks.sub4}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row"></TableCell>
                          <TableCell>Subject 5</TableCell>
                          <TableCell>{item.marks.sub5}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row"></TableCell>
                          <TableCell>Subject 6</TableCell>
                          <TableCell>{item.marks.sub6}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row"></TableCell>
                          <TableCell>Subject 7</TableCell>
                          <TableCell>{item.marks.sub7}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row"></TableCell>
                          <TableCell>Subject 8</TableCell>
                          <TableCell>{item.marks.sub8}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row"></TableCell>
                          <TableCell>Subject 9</TableCell>
                          <TableCell>{item.marks.sub9}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Typography variant="h5" component="div">
                    SGPA: {item.sgpa}
                  </Typography>
                </CardContent>
              </React.Fragment>
            </Card>
          );
        })
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}

export default MarksPage;
