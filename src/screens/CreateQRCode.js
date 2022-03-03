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

const CreateQRCode = (props) => {
    const { classes } = props;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

const currencies = [
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
 const [currency, setCurrency] = useState('1');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  
function createData( name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData( 'Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData( 'Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData( 'Cupcake', 305, 3.7, 67, 4.3),
    createData( 'Cupcake', 305, 3.7, 67, 4.3),
    createData( 'Cupcake', 305, 3.7, 67, 4.3),
    createData( 'Cupcake', 305, 3.7, 67, 4.3),
    createData( 'Cupcake', 305, 3.7, 67, 4.3),
    createData( 'Cupcake', 305, 3.7, 67, 4.3),
    createData( 'Gingerbread', 356, 16.0, 49, 3.9),
  ];
  
    return (
        loading ? <LoadingComponent /> :
            <div className={classes.Container} > 
                <div className={classes.paperContainer}>
                    <TextField size="small"
                            variant="outlined"
                            fullWidth
                            id="outlined-basic"
                            label="Nhập số bàn"
                            type='text'
                            sx={{ marginRight: 2 }}
                    />
                    <Button style={style.createQRButton} type='submit'>
                        Tạo mã
                    </Button>
                </div>
                <div  className={classes.paperContainer2}>
                    <div>Tất cả mã</div>
                    <div className={classes.searchContainer}>
                        <TextField
                            sx={{ marginRight: 2 }}
                            id="outlined-select-currency"
                            select size="small"
                            label="Lọc mã"
                            value={currency}
                            onChange={handleChange}
                        >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                        </TextField> 
                        <TextField size="small"
                            variant="outlined"
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
                            {rows.map((row, index) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="left">
                                    <Checkbox color="primary" className={classes.checkb} />{index+1}         
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="center"> 
                                    <Button className={classes.iconCLolor}>
                                        <FileDownloadOutlinedIcon />
                                    </Button> 
                                </TableCell>
                                <TableCell align="center">
                                    <Button className={classes.iconCLolor}>
                                        <DeleteOutlinedIcon />
                                    </Button>   
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
        // backgroundColor: '#F0CC62',
        height:'calc(100vh - 48px)',
    },
    scroll: {
        width: "100%",
        height:'calc(100vh - 288px)',
        marginTop: theme.spacing.unit * 3,
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
        padding: '20px',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        marginBottom:'16px',
    },
    paperContainer2: {
        padding: '20px',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
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