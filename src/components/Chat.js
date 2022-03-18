
import {  useState, useEffect } from "react";
import { Button, InputBase } from '@mui/material';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DoneIcon from '@mui/icons-material/Done';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ChatDataService from "../services/chat.service";
import { collection, onSnapshot } from "firebase/firestore";
import LoadingComponent from "../components/LoadingComponent";
import { db, auth } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Chat =() =>{
  const [loading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [message, setMessage] = useState([]);

  const idRestaurant = auth.currentUser.uid;
  const messageCollectionRef = collection(
    db,
    "restaurant",
    idRestaurant,
    "message"
  );


  const getMessage = async () => {
    onSnapshot(messageCollectionRef, (snapshot) => {
        setMessage(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  };
  // const updateStatus =(id)=> {
  //     db.collection("restaurant").doc(idRestaurant).collection("message").doc(id)
  //     .set(db.collection("restaurant").doc(idRestaurant).collection("message").doc(id).status="false");
  //   console.log(id);
  //   }

  useEffect(() => {
    getMessage();
    setLoading(false);
  }, []);
  return (
    <div  style={style.container}>
        <div style={style.inline}>
            <Paper   
                sx={{ maxWidth:'60%', display: 'flex', alignItems: 'center', height: '40px',  boxShadow:'none' , border:'0.1px solid #CACFD2' }} >
                <InputBase  sx={{ ml: 1, flex: 1 ,  minWidth: '60%' }} placeholder="Tìm tên bàn" 
                    inputProps={{ 'aria-label': 'Tìm kiếm' }} />
                <IconButton type="submit"  aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
           <img width= "28" height="28" alt='icon image layer'  src='./images/Layer.png'/>
        </div>
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab icon={<img width= "28" height="28" alt='icon image all' src='./images/iconAll.png' />} iconPosition="start" label="Tất cả" {...a11yProps(0)} ></Tab>
            <Tab icon={<img width= "28" height="28" alt='icon image message' src='./images/iconmessag.png' />} iconPosition="start" label="Đã đọc" {...a11yProps(1)} />
            </Tabs>
            
        </Box>
        <TabPanel   value={value} index={0}>
           <div style={style.scroll}>
            {message.map((row) => (
            row.status==true ?(
                <div style={style.chat}>
                    <div style={style.inline}>
                        <div><b>{row.table} </b></div>
                        <div>9:15</div>
                    </div>
                    <div style={style.mesdone}>
                        <div>{row.content}</div>
                        <Button size="small"  
                        // onClick={() => updateStatus(row.id)} 
                         ><DoneIcon /></Button>
                    </div>
                </div> 
                )  :  ""
                ))}
           </div>
        </TabPanel>
      
 
        <TabPanel value={value} index={1}>
            <div style={style.scroll}>
            {message.map((row) => (
                row.status==false ?(
                <div style={style.chat}>
                    <div style={style.inline}>
                        <div><b>{row.table} </b> </div>
                        <div>9:15</div>
                    </div>
                    <div style={style.mesdone}>
                        <div>{row.content}</div>
                        <Button size="small"  
                         ><CheckCircleOutlineIcon /></Button>
                    </div>
                </div> 
                 ):""))}
            </div>
        </TabPanel>
        </Box>
    </div>
  );
}

const style = {
    container: {
        backgroundColor: '#ffff',
        margin:'16px',
        padding:'15px',
    },
    inline: {
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
    },
    chat: {
        padding:'10px',
        marginBottom:'5px',
        backgroundColor: '#E5E5E5',
    },
    scroll: {
        width: "100%",
        height:'calc(100vh - 255px)',
        overflowY: "auto",
        backgroundColor: '#ffff',
    },
    mesdone: {
        display:'flex',
        justifyContent:'space-between',
    },
    iconColor: {
        color:'#ECA64E',
    }
}



export default Chat;