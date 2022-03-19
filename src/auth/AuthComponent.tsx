import Register from './Register';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import React, { useEffect, useState } from 'react';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid} from '@mui/material';
import Login from "./Login";
import {useSelector} from 'react-redux';
import {selectAuth} from './AuthSlice';
import LoadingComponent from '../components/LoadingComponent';
export default function Auth() {
  const {loading, failed,token} = useSelector(selectAuth)
  useEffect(() => {
    console.log(failed,token)
  },[failed,token])
  // useState to control the tab
    const [value, setValue] = useState("1");
    const handleChange = (event:React.SyntheticEvent<Element, Event>, newValue:string) => {
        setValue(newValue)
    }
    
  return (
    loading ?   <LoadingComponent />  :  
      <TabContext value={value}>
        <Box sx={{display:"flex", flexDirection:"column", minHeight:"100vh", alignItems:"center",  border:'2px solid black'}}>
          <Box sx={{width:"100%", display:"flex", justifyContent:"center", border:'2px solid black', borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Login" value="1" />
              <Tab label="Register" value="2" />
            </TabList>
          </Box>
          <Grid sx={{m:10,  border:'2px solid black'}} item xs={7} >
              <TabPanel value="1"><Login/></TabPanel>
              <TabPanel value="2"><Register /></TabPanel>
          </Grid>
        </Box>
      </TabContext>
  )
}
const style = {

}