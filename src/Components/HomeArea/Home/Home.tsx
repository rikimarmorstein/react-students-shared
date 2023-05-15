import { Box, Tab, Tabs, Typography } from "@mui/material";
import bus from "../../../Assets/Images/bus.png";

import "./Home.css";
import React from "react";
import SchoolLogin from "../../AuthArea/SchoolLogin/SchoolLogin";


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
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
function Home(): JSX.Element {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };
    
    return (
        <div className="Home">
                {/* <img src={bus}/> */}

	<div className="box">         
       <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 180  ,flexDirection: 'row-reverse'}}
    >
      <Tabs
        orientation="vertical"
        // variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderLeft: 1, borderColor: 'divider' }}
      >
        <Tab label="הנהלה" {...a11yProps(0)} sx={{ fontSize: 20 }}/>
        <Tab label="מורות" {...a11yProps(1)} sx={{ fontSize: 20 }}/>
        <Tab label="הורים" {...a11yProps(2)} sx={{ fontSize: 20 }}/>
        
      </Tabs>
      <TabPanel value={value} index={0}>
       <SchoolLogin/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        מורות
      </TabPanel>
      <TabPanel value={value} index={2}>
        הורים
      </TabPanel>
      </Box></div>	
        </div>
    );
}

export default Home;
