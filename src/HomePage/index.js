import { Grid, Typography, TextField, Button } from '@mui/material';
import Axios from 'axios';
import { useState } from 'react';
import { Dialog, AppBar, List, ListItem, ListItemText } from '@mui/material';


const HomePage = () => {
    const [lastName, setLastName] = useState("");
    const [gotEmpData, setgotEmpData] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [ssn, setssn] = useState("");
    const [sex, setsex] = useState("");
    const [address, setaddress] = useState("");
    const [salary, setsalary] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        if (lastName === "") {
            alert("Kindly enter employee last name");
        }
        else {
            Axios.get('http://localhost:3001/api/selectedemployee').then((response) => {
                setFirstName(response.data.recordset[0].FNAME);
                setMiddleName(response.data.recordset[0].MINIT);
                setssn(response.data.recordset[0].SSN);
                setsex(response.data.recordset[0].SEX);
                setaddress(response.data.recordset[0].ADDRESS);
                setsalary(response.data.recordset[0].SALARY);
                setgotEmpData(true);
            })
        }
    }

    const middleNames = () => {
        if (middleName === " ") {
            setMiddleName("No middle name provided");
        }
        return middleName;
    }

    return (
        <>
            <Grid container alignItems="center" item>
                <Grid item xs={12} md={12} lg={12} style={{ backgroundColor: "#808080" }}>
                    <Typography style={{ fontSize: 25, fontWeight: "600" }}>Company GurVen</Typography>
                </Grid>
            </Grid>
            <h3>Search for an Employee from our company</h3>
            <div style={{ marginBottom: 15 }}>
                <TextField
                    required
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value) }}
                    label="Employee LastName"
                />
            </div>
            <div>
                <Button variant="contained" color="success" onClick={onSubmit}>Search</Button>
            </div>
            {gotEmpData ? <Dialog open fullWidth maxWidth="sm">
                <AppBar title="Confirm User Data" />
                <List>
                    <ListItem>
                        <ListItemText primary="First Name" secondary={firstName} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="M INIT" secondary={middleNames} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Last Name" secondary={lastName} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="SSN" secondary={ssn} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="SEX" secondary={sex} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Address" secondary={address} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Salary" secondary={salary} />
                    </ListItem>
                </List>
            </Dialog> : null}
        </>
    )
}

export default HomePage;