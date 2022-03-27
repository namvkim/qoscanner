import {React, useState, useEffect} from "react";
import PropTypes from 'prop-types';
import {db, auth} from "../firebase";
import {Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { withStyles } from "@material-ui/core/styles";
import ChatDataService from "../services/chat.service";
import {collection, onSnapshot } from "firebase/firestore";
import LoadingComponent from "../components/LoadingComponent";

const Orders = (props) => {
    const [loading, setLoading] = useState(true);
    const { classes } = props;
    const idRestaurant = auth.currentUser.uid;
    const [order, setOrder] = useState([]);
    const orderCollectionRef = collection(
      db,
      "restaurant",
      idRestaurant,
      "order"
    );
   
    function addZero(i) {
        if (i < 10) {i = "0" + i}
        return i;
      }

    const getOrder = async () => {
        onSnapshot(orderCollectionRef, (snapshot) => {
            let order = snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
              };
            })
            order.sort((a, b)=>a.createAt - b.createAt);
            setOrder( order );
        });
      };

      const orderConfirm = (id) => {
        ChatDataService.updateStatusOrder(id, { status: false })
      };

      useEffect(() => {
        getOrder();
        setLoading(false);
    }, []);

        return (
            loading ? <LoadingComponent /> :
            <div style={style.Container} > 
                <div  style={style.inlines}>
                    <div  className={classes.scroll}>
                    {order.map((row, index ) => {
                        var total = 0;
                        return (
                        row.status === true ? (
                        <div key={index}>
                            <div style={style.order}>
                                <div> 
                                    <div style={style.tableName}>{row.table}</div>
                                    <div style={style.tableContent}>
                                        {row.data.map((item, index)=> {
                                            total += item.quantity*item.price; 
                                            return (
                                        <div key={index} style={style.inline}>
                                            <div  style={style.Tname}>{item.quantity}<b> X </b>{item.name}</div>
                                            <div  style={style.Tprice}>{item.price}</div>
                                            <Button><ClearIcon/></Button>
                                        </div>
                                        
                                        )})}
                                        <div style={style.total}>Tổng cộng: {total}
                                        </div>
                                        {row.note?(
                                        <div >
                                            <div>Ghi chú:</div>
                                            <div  style={style.noteDetail}>{row.note}</div>
                                        </div>
                                        ):""}
                                    </div>
                                </div>
                                <div>
                                        <div  >
                                        {addZero(row.createAt.toDate().getHours())}:
                                        {addZero(row.createAt.toDate().getMinutes())},{" "}
                                        {addZero(row.createAt.toDate().getDate())}{" "}tháng{" "}
                                        {addZero(row.createAt.toDate().getMonth() + 1)}
                                        </div>
                                        <Button style={style.btnXacnhan} variant="contained" onClick={() => orderConfirm(row.id)}>
                                            Xác nhận
                                        </Button>
                                </div>
                            </div>
                            <hr height='100%' color="#CACFD2"/>
                        </div>
                        ): ""
                        )})}
                    </div>
                </div>
            </div>
        )
    }

const style = {
    Tname:{
        width:'70%',
    },
    Tprice: {
        paddingLeft:'10px',
        width:'30%',
    },
    inlines: {
        display:'flex',
    },
    btnXacnhan: {
        backgroundColor: '#ECA64E',
        borderRadius: '4px',
        marginTop:'10px'
    },
    total: {
        display:'flex',
        justifyContent:'flex-end',
        fontWeight: 'bold',
        fontzize: '20px',
        color: '#ECA64E',
        marginTop:'10px',
    },
    inline: {
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottom:' 1px solid #CFD2D4',
    },
    tableContent: {
        background: '#FFFFFF',
        width:'80vh',
        display:'flex',
        flexFlow: 'column wrap',
        border:"1px solid #CACFD2",
        padding:'15px',
    },
    tableName: {
        fontSize:'24px',
        fontWeight: 'bold',
        lineHeight: '28px',
        color: '#ECA64E',
    },
    order:
        {
        display:'flex',
        width:'100%',
        justifyContent:'space-between',
        padding:'15px',
        },
    Container: {
        backgroundColor: '#E5E5E5',
    },
    noteDetail: {
        fontSize:'12px',
        color:'#424949',
    },
    }
    const styles = theme => ({
        scroll: {
            height:'calc(100vh - 95px)',
            marginTop: theme.spacing(2),
            overflowY: "auto",
            backgroundColor: '#ffff',
            marginLeft:'15px',
            width:'100%',
        },
    })
    
Orders.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(Orders);