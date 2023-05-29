import "./Login.css";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SchoolLogin from "../../AuthArea/SchoolLogin/SchoolLogin";
import TeacherLogin from "../../AuthArea/TeacherLogin/TeacherLogin";
import ParentLogin from "../ParentLogin/ParentLogin";
import authService from "../../../Services/AuthService";
import CredentialsModel from "../../../Models/CredentialsModel";
import notificationService from "../../../Services/NotificationService";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`, borderRight: 5,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function Login(): JSX.Element {
    const navigate = useNavigate();

    const [value, setValue] = React.useState(0);

    const { register, handleSubmit } = useForm<CredentialsModel>();
    
    function send(credentials: CredentialsModel) {
        authService.login(credentials).then(() => {
          notificationService.success("Welcome!");
          runLogoutTimer();
          if (credentials.clientType === "ADMIN") {

            navigate("/admin");
          }
          if (credentials.clientType === "SCHOOL_DIRECTOR") {
            navigate("/school-director");
          }
           if (credentials.clientType === "TEACHER") {
            navigate("/teacher");
          }
          if (credentials.clientType === "PARENT") {

            navigate("/parent");
          }
        })
          .catch((err) =>
            notificationService.error(err)
          );
      }
      const runLogoutTimer = () => {

        setTimeout(() => {
          authService.logout();
        //   store.dispatch(logout());
          
          navigate("/login")
    
        }, 1_800_000) //  30:00 minutes - 1800000
    
      }
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <div className="Login">
            {/* <img src={bus}/> */}
            <div className="box">
                <Box sx={{ flexGrow: 1, bgcolor: 'cornsilk', display: 'flex', flexDirection: 'row-reverse' }}    >      <Tabs orientation="vertical"        // variant="scrollable"  
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderLeft: 2, borderColor: 'divider' }} >
                    <Tab label="הנהלה" {...a11yProps(0)} sx={{ fontSize: 20 }} />
                    <Tab label="מורות" {...a11yProps(1)} sx={{ fontSize: 20 }} />
                    <Tab label="הורים" {...a11yProps(2)} sx={{ fontSize: 20 }} />
                </Tabs>
                    <TabPanel value={value} index={0}>
                        <SchoolLogin />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <TeacherLogin /></TabPanel>
                    <TabPanel value={value} index={2}> 
                    <ParentLogin/></TabPanel>
                </Box>
            </div>
        </div>
    );
}


export default Login;
