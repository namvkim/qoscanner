import {
    React, 
    useState, 
    useEffect 
} from "react";
import Chat from "../components/Chat";
import Stack from '@mui/material/Stack';
import Order from "../components/Order";
import Avatar from '@mui/material/Avatar';
import LoadingComponent from "../components/LoadingComponent";

const Orders = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);
            return (
                loading ? <LoadingComponent /> :
                <div style={style.Container} > 
                    <div style={style.paperTitle} >
                            <div style={style.Title}  >Orders</div>
                            <Stack direction="row" spacing={2} alignItems="center">
                            <div>John</div>                      
                            <Avatar alt="avatar restaurant" src="https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-dai-dien-avt-anime-1.jpg" />
                        </Stack>
                    </div>
                    <div  style={style.inlines}>
                        <div style={style.order}>
                            <Order />
                        </div>
                        <div style={style.chat}>
                            <Chat />
                        </div>
                    </div>
                </div>
            )
        }

const style = {
    inlines: {
        display:'flex',
        justifyContent:'space-between',
    },
    inline: {
        maxWidth:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottom:' 1px solid #CFD2D4',
    },
    chat: {
        width:'30%',
    },
    order: {
        width:'70%',
    },
    Container: {
        backgroundColor: '#E5E5E5',
        height:'100vh',
    },
    Title: {
        fontSize:'22px',
        fontWeight:'500',
        color:'#000000',
    },
    paperTitle: {
        height:'64px',
        display: 'flex',
        padding: '0 15px',
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        justifyContent:'space-between',
    },
} 
  
  export default Orders;