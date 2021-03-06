import { useState, useEffect } from "react";
import LoadingComponent from "../components/LoadingComponent";
import {
    MenuItem,
    Paper,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Stack,
    TextField,
  } from "@mui/material";
    import { db, auth } from "../firebase";
    import {collection, onSnapshot, query, where  } from "firebase/firestore";
    import SearchIcon from "@mui/icons-material/Search";
    
    const Statistical = () => {
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [currency, setCurrency] = useState("all");
    // const [status, setStatus] = useState("all");
      
    const idRestaurant = auth.currentUser.uid;
    const nameUser =  auth.currentUser.displayName;
    const orderCollectionRef = collection(
    db, 
    "restaurant",
    idRestaurant,
    "order"
    );
    // var currentday =new Date();
    // var first = currentday.getDate() - currentday.getDay();  
    // var last = first + 6;  
    // var startOfToday = new Date(); 
    //     startOfToday.setHours(0,0,0,0);
    // var endOfToday = new Date(); 
    //     endOfToday.setHours(23,59,59,999);
    // var startOfWeek = new Date(currentday.setDate(first));
    //     startOfWeek.setHours(0,0,0,0);
    // var endOfWeek = new Date(currentday.setDate(last));
    //     endOfWeek.setHours(23,59,59,999);
    // var startOfMonth = new Date(currentday.getFullYear(), currentday.getMonth(), 1);
    // var endOfMonth = new Date(currentday.getFullYear(), currentday.getMonth() + 1, 0);
 
    useEffect(() => {
        setLoading(false);
        getOrder();
    }, []);
    // const day =  query(orderCollectionRef,where("createAt",">=",startOfToday, "and","createAt", "<=", endOfToday ));
    // const week =  query(orderCollectionRef,where("createAt",">=",startOfWeek, "and","createAt", "<=", endOfWeek ));
    // const month =  query(orderCollectionRef,where("createAt",">=",startOfMonth, "and","createAt", "<=", endOfMonth ));
    // var dt = [];
    // if(status === "day") {
    //     dt=day;
    // }else if (status === "week") {
    //     dt=week;
    // }else if (status === "month") {
    //     dt=month;
    // }else {
    //     dt=orderCollectionRef;
    // }
    const getOrder = async () => {
        // onSnapshot(dt, (snapshot) => {
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
      const handleChangeMa = (event) => {
        setCurrency(event.target.value);
        // if(event.target.value === "day") {
        //     setStatus("day");
        // }else if (event.target.value === "week") {
        //     setStatus("week");
        // }else if (event.target.value === "month") {
        //     setStatus("month");
        // }else {
        //     setStatus("all");
        // }
      };
      const currencies = [
        {
          value: "all",
          label: "T???t c???",
        },
        {
          value: "day",
          label: "Ng??y",
        },
        {
          value: "week",
          label: "Tu???n",
        },
        {
          value: "month",
          label: "Th??ng",
        },
      ];
      var orders = 0;
      var priceTotal = 0;
     
    return (
        loading ? <LoadingComponent /> :
            <div style={style.Container} >
                <div style={style.paperTitle} >
                            <div style={style.Title}>Th???ng k??</div>
                            <Stack direction="row" spacing={2} alignItems="center">
                            <div>{nameUser}</div>                      
                            <Avatar alt="avatar restaurant" src="./images/account-icon.png" />
                        </Stack>
                </div>
                <div style={style.paperContainer2}>
                    {order.map((row ) => {
                        var total = 0;
                        orders+=1;
                            {row.data.map((item) => {
                            total += item.quantity*item.price;
                            })}
                            priceTotal += total; 
                        })}  
                    <div style={style.inline}>
                    <TextField
                        sx={{ marginRight: 1, width: "30%" }}
                        id="outlined-select-currency"
                        select
                        size="small"
                        label="L???c"
                        value={currency}
                        onChange={handleChangeMa}
                    >
                        {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                        ))}
                    </TextField>
                    <IconButton
                        style={style.searhButton}
                        type="submit"
                        aria-label="search"
                    >
                        <SearchIcon />
                    </IconButton>
                    <div  style={style.Total}><b>T???ng ????n h??ng: </b> {orders}</div>
                    <div  style={style.Total}><b>T???ng s??? ti???n : </b> {priceTotal} (VN??) </div>
                    </div>
                    <TableContainer component={Paper} style={style.scroll}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead style={style.TableHead}>
                            <TableRow>
                                <TableCell>
                                STT
                                </TableCell>
                                <TableCell align="left">T??n m??n</TableCell>
                                <TableCell align="center">S??? l?????ng m??n</TableCell>
                                <TableCell align="center">T???ng s??? ti???n(VN??)</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody style={style.TableBody}>
                            {order.map((row, index ) => {
                                var total = 0;
                                var slMon = 0;
                                 orders+=1;
                                return (
                                <TableRow  key={index}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell align="left">
                                        {index+1}
                                    </TableCell>
                                    <TableCell align="left">
                                    {row.data.map((item, index)=> {
                                            total += item.quantity*item.price; 
                                            slMon+=1;
                                            return (
                                                <div key={index}>
                                                    {item.name}({item.quantity})
                                                </div>
                                        )})}
                                    </TableCell>
                                    <TableCell align="center">
                                        {slMon} 
                                    </TableCell>
                                    <TableCell align="center">
                                        {total}
                                    </TableCell>
                                </TableRow>
                                ) })}
                            </TableBody>
                        </Table>
                    </TableContainer> 
                </div>
            </div>
                    )}
 const style = { 
    Total: {
        marginLeft:'15px',
    },
    inline: {
        display: 'flex',
        alignItems:'center',
    },
    searhButton: {
        borderRadius: "4px",
        border: "1px solid #CACFD2",
        height: "40px",
      },
    TableHead: {
        zIndex: 1,
        position: "sticky",
        top: 0,
        backgroundColor: "#eee",
    },
    TableBody: {
        zIndex: 0,
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
    paperContainer2: {
        backgroundColor: "#FFFFFF",
        margin: "16px 15px",
        padding: "15px",
      },
    scroll: {
        width: "100%",
        height: "calc(100vh - 179px)",
        overflowY: "auto",
        marginTop: "15px ",
        backgroundColor:'#FFFFFF',
      },
      tableHead: {
        position: "sticky",
        top: 0,
        backgroundColor: "#eee",
        zIndex: 1,
      },
    paperTitle: {
        height:'64px',
        display: 'flex',
        padding: '0 15px',
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        justifyContent:'space-between',
    },
};

export default Statistical;
