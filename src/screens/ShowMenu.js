import * as React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Button from '@mui/material/Button';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const styles = theme => ({
    root: {
    width: "100%",
    height: "100vh",
    marginTop: theme.spacing.unit * 3,
    overflowY: "auto"
  },
  table: {
    minWidth: 700
  },
  tableRow: {
    "&$hover:hover": {
      backgroundColor: "#D5DBDB"
    }
  },
  icon: {
    "$hover:focus &": {
      color: "red"
    }
  },
  hover: {},
  search: {
    margin:'30px',
    border: '1px solid',
    borderRadius:'27px',
    width: '360px',
},
deletes : {
    marginLeft: '30px',
}, 
searchContainer: {
  display:'flex',
  alignItems:'center'
}
});

let id = 0;
function createData(name, category, price,  img) {
    id += 1;
    return { id, name, category, price,  img };  
}

const rows = [
    createData('Eclair', 262, 16.0,   'https://fridaycat.com.vn/wp-content/uploads/2021/04/meo-muop-giong-meo-pho-bien-tren-the-gioi.jpg'),
    createData('Frozen yoghurt', 159, 6.0, 'https://www.petcity.vn/media/news/920_cat5_500x462.jpg'),
    createData('Ice cream sandwich', 237, 9.0,  'https://vnn-imgs-f.vgcloud.vn/2021/09/07/09/chu-meo-noi-tieng-mang-xa-hoi-voi-phong-cach-thoi-trang-sanh-dieu.jpeg'),
    createData('Cupcake', 305, 3.7,  ),
  ];

const ShowMenu =(props)=> {
const [auth, setAuth] = React.useState(false);
const { classes } = props;
const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  return (
    <div>
         <div className={classes.searchContainer} >
            <Paper className={classes.search}  component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center',}} >
        
                <InputBase  sx={{ ml: 1, flex: 1 ,  minWidth: 300 }} placeholder="Tìm theo tên sản phẩm"
                    inputProps={{ 'aria-label': 'Tìm kiếm' }} />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
            {auth  && (
                    <div  className={classes.deletes} > 
                      <Button variant="outlined" startIcon={<DeleteIcon />}>
                      Xóa
                    </Button>  
                  </div>
            )}
         </div>
         
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                <TableCell >      
                        <Checkbox {...label} 
                        checked={auth}  onChange={handleChange} 
                        // onChange={handleOnChange}
                        // checked={isChecked} 
                        />
                    </TableCell>
                    <TableCell align="center"><b>Hình ảnh</b></TableCell>
                    <TableCell align="left"><b>Tên</b></TableCell>
                    <TableCell align="center"><b>Danh mục</b></TableCell>
                    <TableCell align="center"><b>Giá&nbsp;(VĐN)</b></TableCell>
                    <TableCell align="center"><b>Trạng thái</b></TableCell>
                    <TableCell align="center"><b>Chỉnh sửa</b></TableCell>
                    <TableCell align="center"><b>Xóa</b></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                    <TableRow  hover key={row.id} classes={{ hover: classes.hover }}
                     className={classes.tableRow}  >
                        <TableCell  >  
                            <Checkbox {...label} 
                            checked={auth?"checked":""}
                            // checked={row.selected}
                            />
                            
                        </TableCell>
                        <TableCell  className={classes.tableCell} align="center" >
                            <img src={row.img} alt=""  height='50' width='50' />
                        </TableCell>
                        <TableCell  className={classes.tableCell} scope="row" align="left">
                            {row.name}
                        </TableCell>
                        <TableCell className={classes.tableCell} align="center">
                            {row.category}
                        </TableCell>
                        <TableCell className={classes.tableCell} align="center">
                            {row.price}
                        </TableCell>
                        <TableCell className={classes.tableCell} align="center">
                            <Switch edge="end"/>
                        </TableCell>
                        <TableCell className={classes.tableCell} align="center">
                            <ModeEditOutlinedIcon />                        
                        </TableCell>
                        <TableCell className={classes.tableCell} align="center"> 
                            <DeleteIcon /> 
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    </div>
  );
}

ShowMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ShowMenu);
