import LoadingComponent from "../components/LoadingComponent";
import {React, useState, useEffect } from "react";
import {Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { collection, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";
const Orders = (props) => {
    const [loading, setLoading] = useState(true);
    const { classes } = props;

    // const idRestaurant = auth.currentUser.uid;
  const [order, setOrrder] = useState([]);
//   const [total]= useState([]);
//   const temp = 0;
//   const total = 0;
  const orderCollectionRef = collection(
      db,
      "restaurant",
      "JfxhZ1Tdn8q0JLZm1JvL",
      "order"
    );
    // {order.map((row ) => (
        // console.log(row.table),
        // console.log(row.status),
        // console.log(row.data[0].price),
        // console.log("độ dài:"+order.length)
        //  {
           
           
        //  }
    // ))
    useEffect(() => {
     
        getOrder();
       
        setLoading(false);

    }, []);

    const getOrder = async () => {
        onSnapshot(orderCollectionRef, (snapshot) => {
            setOrrder(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
              };
            })
          );
        });
      };
      
  
               
            return (
                // const total= 0;
                loading ? <LoadingComponent /> :
                <div style={style.Container} > 
                    <div  style={style.inlines}>
                        <div  className={classes.scroll}>
                        {order.map((row,index ) => (
                            
                            order.status=true?(
                            <div>
                                <div style={style.order}>
                                    <div> 
                                        <div style={style.tableName}>{row.table}</div>
                                        <div style={style.tableContent}>
                                            {row.data.map((item)=> (
                                            <div style={style.inline}>
                                                <div>{item.quantity}<b> X </b>{item.name}</div>
                                                <div>{item.price}</div>
                                                {/* <div>{row.data[0].price}</div> */}
                                             <Button><ClearIcon/></Button>
                                            </div>
                                            // <div></div>
                                            ))}
                                            <div style={style.total}>Tổng cộng:  
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
                                            <div  >18:00, 26 tháng 2</div>
                                            <Button style={style.btnXacnhan} variant="contained">Xác nhận</Button>
                                    </div>
                                </div>
                                <hr height='100%'/>
                            </div>
                            ): ""
                                ))}
                            {/* <div>
                                <div style={style.order}>
                                    <div>
                                        <div style={style.tableName}>Bàn số 2</div>
                                        <div style={style.tableContent}>
                                            <div style={style.inline}>
                                                    <div > 1<b> X </b>Xương ram</div>
                                                    <div>50.000đ</div>
                                                    <Button><ClearIcon/></Button>
                                            </div>
                                            <div style={style.inline}>
                                                    <div > 1<b> X </b>Xương ram</div>
                                                    <div>50.000đ</div>
                                                    <Button><ClearIcon/></Button>
                                            </div>
                                            <div style={style.total}>Tổng cộng: 100.000đ</div>
                                        </div>
                                    </div>
                                    <div>
                                            <div  >18:00, 26 tháng 2</div>
                                            <Button style={style.btnXacnhan} variant="contained">Xác nhận</Button>
                                    </div>
                                </div>
                                <hr height='100%'/>
                            </div>
                            <div>
                                <div style={style.order}>
                                    <div>
                                        <div style={style.tableName}>Bàn số 3</div>
                                        <div style={style.tableContent}>
                                            <div style={style.inline}>
                                                    <div > 1<b> X </b>Xương ram</div>
                                                    <div>50.000đ</div>
                                                    <Button><ClearIcon/></Button>
                                            </div>
                                            <div style={style.inline}>
                                                    <div > 1<b> X </b>Xương ram</div>
                                                    <div>50.000đ</div>
                                                    <Button><ClearIcon/></Button>
                                            </div>
                                            <div style={style.total}>Tổng cộng: 100.000đ</div>
                                        </div>
                                    </div>
                                    <div>
                                            <div  >18:00, 26 tháng 2</div>
                                            <Button style={style.btnXacnhan} variant="contained">Xác nhận</Button>
                                    </div>
                                </div>
                                <hr height='100%'/>
                            </div> */}
                        </div>
                        
                    </div>
                </div>
            )
        }

const style = {
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
    },
    inline: {
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottom:' 1px solid #CFD2D4',
    },
    tableContent: {
        background: '#FFFFFF',
        border: '1px solid #9FA2A5',
        width:'80vh',
        display:'flex',
        flexFlow: 'column wrap',
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)',
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
            marginTop: theme.spacing.unit *2,
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