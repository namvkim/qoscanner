import * as React from 'react';
import  { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { InputBase } from '@mui/material';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { withStyles } from "@material-ui/core/styles";
import MenuDataService from "../services/menu.service";
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from '../firebase';
import Button from '@mui/material/Button';


const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Tên món ăn',
  },
  {
    id: 'image',
    numeric: true,
    disablePadding: false,
    label: 'Hình ảnh',
  },
  {
    id: 'categories',
    numeric: true,
    disablePadding: false,
    label: 'Danh mục',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Giá(VNĐ)',
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Trạng thái',
  },
  {
    id: 'edit',
    numeric: true,
    disablePadding: false,
    label: 'Sửa',
  },
  {
    id: 'delete',
    numeric: true,
    disablePadding: false,
    label: 'Xóa',
  },
 
];

function ShowMenuHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              style={{fontSize: "18px", fontWeight: "500"}}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

ShowMenuHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const ShowMenuToolbar = (props) => {
  const { numSelected } = props;
  

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} đã chọn
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <div  style={{display: 'flex', alignItems: 'center',  }} >
                <Paper  style={numSelected.searchContainer}  
                    sx={{ maxWidth:'60%', display: 'flex', alignItems: 'center', height: '40px',  boxShadow:'none' , border:'0.1px solid #CACFD2' }} >
                    <InputBase  sx={{ ml: 1, flex: 1 ,  minWidth: '60%' }} placeholder="Tìm theo tên sản phẩm" 
                           

                        inputProps={{ 'aria-label': 'Tìm kiếm' }} />
                        
                    <IconButton type="submit"  aria-label="search">
                      <SearchIcon />
                    </IconButton>
                </Paper>
                <Paper sx={{ p: '7px 10px',ml:'20px', display: 'flex', alignItems: 'center' ,boxShadow:'none', border:'0.1px solid #CACFD2', borderRadius:'4px'}}>
                    <ReplayOutlinedIcon />
                </Paper>
          </div>

        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

ShowMenuToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const  ShowMenu = ({ getMenuId}) => {
  
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('categories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);


  const [menus, setMenus] = useState([]);


  const menuCollectionRef = collection(db, "restaurant", "JfxhZ1Tdn8q0JLZm1JvL", "menu");
  const getMenus = async () => {
    onSnapshot(menuCollectionRef, snapshot => {
      setMenus(snapshot.docs.map(doc => {
     
          return {
              id: doc.id,
              ...doc.data()
              
          }
      }))
  })   
  };

  const deleteHandler = async (id) => {
    await MenuDataService.deleteMenu(id);
    getMenus();
  };

  
  useEffect(() => {
    getMenus();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = menus.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };


  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
  return (
    <>
    
    <Box sx={{ width: '100%' }} style={styles.listProduct} >
      <Paper style={styles.listTable}  >
        <ShowMenuToolbar numSelected={selected.length} />
        <TableContainer  style={styles.scroll}  >
          <Table
            sx={{ minWidth: 650 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <ShowMenuHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={menus.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
             
                {menus.map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell padding="checkbox" >
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, row.name)}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        
                      >
                        {row.name}
                      </TableCell>
                      <TableCell component="th" id={labelId} >
                             <img  align="right" src={row.image} alt=""  height='50' width='60' style={{ borderRadius: "3px" }} />
                      </TableCell>
                      <TableCell align="right">{row.category}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                     
                      <TableCell align="right">
                        <Switch {...label}  />
                      </TableCell>
                      <TableCell align="right" >
                          <Button 
                              variant="contained"
                               
                              onClick={(e) => getMenuId(row.id)}
                            
                            >
                              <ModeEditOutlinedIcon/> 
                            </Button>
                      </TableCell>
                      <TableCell align="right">
                          <Button 
                              variant="contained"
                              color="error"
                              onClick={(e) => deleteHandler(row.id)}
                            >
                            <DeleteOutlinedIcon color="red"/> 
                            
                          </Button>
                                            
                      </TableCell>

                    </TableRow>
                  );
                })}
              
            </TableBody>
          </Table>
        </TableContainer>
    
      </Paper>
      
    </Box>
    </>
  );
}
const styles = {
 
  scroll: {
    width: '100%',
    height:'61vh',
    overflowY: 'scroll',
  },
  listProduct: { 
    backgroundColor: '#E5E5E5',
    height: 'calc(100vh - 295px)',
    padding: '0px 15px 15px 15px',
    
  },

 

};

export default ShowMenu;