// import {React, useState, useEffect } from "react";
// import { TextField, Button, Checkbox } from "@mui/material";
// import LoadingComponent from "../components/LoadingComponent";
// import MenuItem from '@mui/material/MenuItem';
// import Paper from '@mui/material/Paper';
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import { withStyles } from "@material-ui/core/styles";
// import PropTypes from 'prop-types';
// import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const CreateQRCode = (props) => {
//     const { classes } = props;
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         setLoading(false);
//     }, []);

//     const formik = useFormik({
//         initialValues: {
//             numberTable: '',
//         },
//         validationSchema: Yup.object({
//             numberTable: Yup.string()
//                 // .numberTable(" ")
//                 .required("Nhập vào số bàn"),
//         }),
//         onSubmit: values => {
//             setLoading(true);
//             console.log(values);
             
//         }
//     });
//     const currencies = [
//         {
//             value: 'all',
//             label: 'Tất cả mã',
//         },
//         {
//             value: '1',
//             label: 'Mã 1',
//         },
//         {
//             value: '2',
//             label: 'Mã 2',
//         },
//         {
//             value: '3',
//             label: 'Mã 3',
//         },
//         ];
//     const [currency, setCurrency] = useState('all');

//   const handleChange = (event) => {
//     setCurrency(event.target.value);
//   };
  
//     function createData( name, calories, fat, carbs, protein) {
//         return { name, calories, fat, carbs, protein };
//     }
  
//   const rows = [
//     createData( 'Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData( 'Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData( 'Cupcake', 305, 3.7, 67, 4.3),
//     createData( 'Cupcake', 305, 3.7, 67, 4.3),
//     createData( 'Cupcake', 305, 3.7, 67, 4.3),
//     createData( 'Cupcake', 305, 3.7, 67, 4.3),
//     createData( 'Cupcake', 305, 3.7, 67, 4.3),
//     createData( 'Cupcake', 305, 3.7, 67, 4.3),
//     createData( 'Gingerbread', 356, 16.0, 49, 3.9),
//   ];
  
//     return (
//         loading ? <LoadingComponent /> :
//             <div className={classes.Container} > 
//                 <div className={classes.paperTitle} >
//                      <div className={classes.Title}  >Tạo mã QR</div>
//                      <Stack direction="row" spacing={2} alignItems="center">
//                         <div>John</div>                      
//                         <Avatar alt="avatar restaurant" src="https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-dai-dien-avt-anime-1.jpg" />
//                     </Stack>
//                 </div>
//                 <form className={classes.paperContainer} onSubmit={formik.handleSubmit}>
//                     <TextField size="small"
//                             variant="outlined"
//                             fullWidth
//                             id="numberTable"
//                             name="numberTable"
//                             label="Nhập số bàn" onChange={formik.handleChange}
//                             value={formik.values.numberTable}
//                             error={formik.errors.numberTable && formik.touched.numberTable}
//                             helperText={ formik.touched.numberTable && formik.errors.numberTable}
//                             type="text"
//                             sx={{ marginRight: 2}}
//                     />
//                     <Button style={style.createQRButton} type='submit'>
//                         Tạo mã
//                     </Button>
//                 </form>
//                 <div  className={classes.paperContainer2}>
//                     <div className={classes.searchContainer}>
//                         <TextField
//                             sx={{ marginRight: 4 , width:'20%'}}
//                             id="outlined-select-currency"
//                             select size="small"
//                             label="Lọc mã"
//                             value={currency}
//                             onChange={handleChange}
//                         >
//                         {currencies.map((option) => (
//                             <MenuItem key={option.value} value={option.value}>
//                             {option.label}
//                             </MenuItem>
//                         ))}
//                         </TextField> 
//                         <TextField size="small"
//                             variant="outlined"
//                             sx={{  width:'40%'}}
//                             id="outlined-basic"
//                             label="Nhập từ khóa tìm kiếm"
//                             type='text' inputProps={{ 'aria-label': 'Tìm kiếm' }}
//                         >
//                         </TextField>
//                         <IconButton className={classes.searhButton} type="submit"  aria-label="search">
//                             <SearchIcon />
//                         </IconButton>
//                     </div>
//                     <TableContainer component={Paper} className={classes.scroll}>
//                         <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//                             <TableHead className={classes.tableHead}>
//                             <TableRow>
//                                 <TableCell>
//                                     <Checkbox color="primary"  />STT
//                                 </TableCell>
//                                 <TableCell align="left">Số bàn</TableCell>
//                                 <TableCell align="center">Tải xuống</TableCell>
//                                 <TableCell align="center">Xóa</TableCell>
//                             </TableRow>
//                             </TableHead>
//                             <TableBody   >
//                             {rows.map((row, index) => (
//                                 <TableRow
//                                 key={row.name}
//                                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                                 >
//                                 <TableCell align="left">
//                                     <Checkbox color="primary" className={classes.checkb} />{index+1}         
//                                 </TableCell>
//                                 <TableCell align="left">{row.name}</TableCell>
//                                 <TableCell align="center"> 
//                                     <Button className={classes.iconCLolor}>
//                                         <FileDownloadOutlinedIcon />
//                                     </Button> 
//                                 </TableCell>
//                                 <TableCell align="center">
//                                     <Button className={classes.iconCLolor}>
//                                         <DeleteOutlinedIcon />
//                                     </Button>   
//                                 </TableCell>
//                                 </TableRow>
//                             ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </div>
//             </div>
//     )
// }

// const style = {
//     createQRButton: {
//         backgroundColor: '#F0CC62',
//         color: '#FFFFFF',
//         width: '120px',
//         height: '40px',
//     }
// }
// const styles = theme => ({
//     Container: {
//         backgroundColor: '#E5E5E5',
//         height:'100vh',
//     },
//     scroll: {
//         width: "100%",
//         height:'calc(100vh - 290px)',
//         marginTop: theme.spacing.unit *3,
//         overflowY: "auto",
//     },
//     tableHead: {
//         position: 'sticky',
//         top: 0,
//         backgroundColor:'#eee',
//         zIndex: 1,
//     },
//     checkb: {
//         zIndex: 0,
//     },
//     paperContainer: {
//         display: 'flex',
//         padding: '15px',
//         backgroundColor:'#FFFFFF',
//         margin:'16px 15px',
//     },
//     paperContainer2: {
//         backgroundColor:'#FFFFFF',
//         margin:'16px 15px',
//         padding: '15px',
//     },
//     Title: {
//         fontSize:'22px',
//         fontWeight:'500',
//         color:'#000000',
//     },
//     paperTitle: {
//         height:'64px',
        
//         display: 'flex',
//         padding: '0 15px',
//         backgroundColor:'#FFFFFF',
//         alignItems:'center',
//         justifyContent:'space-between',
//     },
//     searchContainer: {
//         display: 'flex',
//         marginTop:'16px',
//     },
//     searhButton: {
//         borderRadius: '4px',
//         border:'1px solid #CACFD2',
//         height:'40px',
//     },
//     iconCLolor: {
//         color: '#000',
//     }
// })

// CreateQRCode.propTypes = {
//     classes: PropTypes.object.isRequired
//   };
  
//   export default withStyles(styles)(CreateQRCode);
import {React, useState, useEffect } from "react";
import { TextField, Button, Checkbox } from "@mui/material";
import LoadingComponent from "../components/LoadingComponent";
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useFormik } from "formik";
import * as Yup from "yup";
import QRCode from "qrcode.react";


const CreateQRCode = (props) => {
    const { classes } = props;
    const [loading, setLoading] = useState(true);
    const [output, setOutput] = useState([]);
  const [item, setQrValue] = useState("");
  const fTbName= "Bàn";

    function transform(input) {
      const inputList = input.split("\n");
      let out = [];
      inputList.forEach((item) => {
        out.push(
          `${fTbName+ " "}${encodeURIComponent(encodeURIComponent(item))}`
        );
      });
      setOutput(out);
    }

    useEffect(() => {
        setLoading(false);
    }, []);

    const formik = useFormik({
        initialValues: {
            numberTable: '',
        },
        validationSchema: Yup.object({
            numberTable: Yup.string()
                .required("Nhập vào số bàn"),
        }),
        onSubmit: values => {
            setLoading(true);
            console.log('kt:'+values.numberTable);
            transform(values.numberTable);
            setLoading(false);
        }
    });
    const currencies = [
        {
            value: 'all',
            label: 'Tất cả mã',
        },
        {
            value: '1',
            label: 'Mã 1',
        },
        {
            value: '2',
            label: 'Mã 2',
        },
        {
            value: '3',
            label: 'Mã 3',
        },
        ];
    const [currency, setCurrency] = useState('all');

  const handleChangeMa = (event) => {
    setCurrency(event.target.value);
  };
  
    function createData( name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
  
//   const rows = [
//     createData( 'Bàn 1'),
//     createData( 'Bàn 2'),
//     createData( 'Bàn 3'),
//     createData( 'Bàn 4'),
//   ];

  const downloadQR = () => {
    const canvas = document.getElementById('item');
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    console.log('pngUrl', pngUrl);
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qrcode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
    return (
        loading ? <LoadingComponent /> :
            <div className={classes.Container} > 
                <div className={classes.paperTitle} >
                     <div className={classes.Title}  >Tạo mã QR</div>
                     <Stack direction="row" spacing={2} alignItems="center">
                        <div>John Smith</div>   
                        <Avatar alt="avatar restaurant" src="./images/account.jpg" />
                    </Stack>
                </div>
                <form className={classes.paperContainer} onSubmit={formik.handleSubmit}>
                    <TextField size="small"
                        variant="outlined"
                        fullWidth
                        id="numberTable"
                        name="numberTable"  
                        // onChange={(e) => { setInput(e.target.value); }}
                        label="Nhập số bàn" 
                        onChange={formik.handleChange}
                        value={formik.values.numberTable}
                        error={formik.errors.numberTable && formik.touched.numberTable}
                        helperText={ formik.touched.numberTable && formik.errors.numberTable}
                        type="text"
                        sx={{ marginRight: 2}}
                    />
                    <Button style={style.createQRButton} type='submit'  >
                        Tạo mã
                    </Button>
                </form>
                <div  className={classes.paperContainer2}>
                    <div className={classes.searchContainer}>
                        <TextField
                            sx={{ marginRight: 4 , width:'20%'}}
                            id="outlined-select-currency"
                            select size="small"
                            label="Lọc mã"
                            value={currency}
                            onChange={handleChangeMa}
                        >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                        </TextField> 
                        <TextField size="small"
                            variant="outlined"
                            sx={{  width:'40%'}}
                            id="outlined-basic"
                            label="Nhập từ khóa tìm kiếm"
                            type='text' inputProps={{ 'aria-label': 'Tìm kiếm' }}
                        >
                        </TextField>
                        <IconButton className={classes.searhButton} type="submit"  aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </div>
                    <TableContainer component={Paper} className={classes.scroll}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell>
                                    <Checkbox color="primary"  />STT
                                </TableCell>
                                <TableCell align="left">Số bàn</TableCell>
                                <TableCell align="center">Tải xuống</TableCell>
                                <TableCell align="center">Xóa</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody   >
                                {output.map((item,  index) => (
                                <TableRow
                                // key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="left">
                                    <Checkbox color="primary" className={classes.checkb} />{index+1}         
                                </TableCell>
                                <TableCell align="left">
                                    {/* {row.name} */}
                                    {item}
                                </TableCell>
                                <TableCell align="center"> 
                                    <Button className={classes.iconCLolor} onClick={downloadQR}>
                                        <FileDownloadOutlinedIcon />
                                    </Button> 
                                </TableCell>
                                <TableCell align="center">
                                    {/* <Button className={classes.iconCLolor}>
                                        <DeleteOutlinedIcon />
                                    </Button>    */}
                                    <QRCode id="item" value={item} />                                
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
    )
}

const style = {
    createQRButton: {
        backgroundColor: '#F0CC62',
        color: '#FFFFFF',
        width: '120px',
        height: '40px',
    }
}
const styles = theme => ({
    Container: {
        backgroundColor: '#E5E5E5',
        height:'100vh',
    },
    scroll: {
        width: "100%",
        height:'calc(100vh - 290px)',
        marginTop: theme.spacing.unit *3,
        overflowY: "auto",
    },
    tableHead: {
        position: 'sticky',
        top: 0,
        backgroundColor:'#eee',
        zIndex: 1,
    },
    checkb: {
        zIndex: 0,
    },
    paperContainer: {
        display: 'flex',
        padding: '15px',
        backgroundColor:'#FFFFFF',
        margin:'16px 15px',
    },
    paperContainer2: {
        backgroundColor:'#FFFFFF',
        margin:'16px 15px',
        padding: '15px',
    },
    Title: {
        fontSize:'21px',
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
    searchContainer: {
        display: 'flex',
        marginTop:'16px',
    },
    searhButton: {
        borderRadius: '4px',
        border:'1px solid #CACFD2',
        height:'40px',
    },
    iconCLolor: {
        color: '#000',
    }
})

CreateQRCode.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(CreateQRCode);