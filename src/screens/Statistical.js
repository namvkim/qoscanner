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
    import {collection, onSnapshot } from "firebase/firestore";
    import SearchIcon from "@mui/icons-material/Search";
    
    const Statistical = () => {
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const idRestaurant = auth.currentUser.uid;
    const orderCollectionRef = collection(
    db, 
    "restaurant",
    idRestaurant,
    "order"
    );
    useEffect(() => {
        setLoading(false);
        getOrder();
    }, []);
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
      const [currency, setCurrency] = useState("all");

      const handleChangeMa = (event) => {
        setCurrency(event.target.value);
      };
      const currencies = [
        {
          value: "all",
          label: "Tất cả",
        },
        {
          value: "day",
          label: "Ngày",
        },
        {
          value: "week",
          label: "Tuần",
        },
        {
          value: "month",
          label: "Tháng",
        },
      ];
      let orders = 0;
      let priceTotal = 0;
     
    return (
        loading ? <LoadingComponent /> :
            <div style={style.Container} >
                <div style={style.paperTitle} >
                            <div style={style.Title}>Thống kê</div>
                            <Stack direction="row" spacing={2} alignItems="center">
                            <div>John</div>                      
                            <Avatar alt="avatar restaurant" src="https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-dai-dien-avt-anime-1.jpg" />
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
                        label="Lọc"
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
                    <div  style={style.Total}><b>Tổng đơn hàng: </b> {orders}</div>
                    <div  style={style.Total}><b>Tổng số tiền : </b> {priceTotal} (VNĐ) </div>
                    </div>
                    <TableContainer component={Paper} style={style.scroll}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead style={style.TableHead}>
                            <TableRow>
                                <TableCell>
                                STT
                                </TableCell>
                                <TableCell align="left">Tên món</TableCell>
                                <TableCell align="center">Số lượng món</TableCell>
                                <TableCell align="center">Tổng số tiền(VNĐ)</TableCell>
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
