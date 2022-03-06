import * as React from 'react';
import  { useState } from "react";
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


function createData(name, categories, price,  image) {
  return {
    name,
    categories,
    price,
    image
  };
}

const rows = [
  createData('Cupcake', 305, 40.3000, 'https://sunhouse.com.vn/pic/news/1140_1.jpg'),
  createData('Donut', 452, 400.90000, 'https://sunhouse.com.vn/pic/news/1140_1.jpg'),
  createData('Eclair', 262, 600.5600000, 'https://sunhouse.com.vn/pic/news/1140_1.jpg'),
  createData('Frozen yoghurt', 159, 454.066600, 'https://thucphamsi.vn/wp-content/uploads/2020/12/Luon-ngong-ap-chao-an-voi-xoi-chien-1.jpg'),
  createData('Gingerbread', 356, 300.9, 'https://thucphamsi.vn/wp-content/uploads/2020/12/Luon-ngong-ap-chao-an-voi-xoi-chien-1.jpg'),
  createData('Honeycomb', 408, 6.5, 'https://dulichvietnam.com.vn/vnt_upload/news/10_2019/mon-an-ngon-1.jpg'),
  createData('Ice cream sandwich', 237,  400.000, 'https://dulichvietnam.com.vn/vnt_upload/news/10_2019/mon-an-ngon-1.jpg'),
  createData('Jelly Bean', 375, 500.000, 'https://kinhtehaiphong.com/wp-content/uploads/2021/04/1617566133_maxresdefault.jpg'),
  createData('KitKat', 518, 70.000, 'https://kinhtehaiphong.com/wp-content/uploads/2021/04/1617566133_maxresdefault.jpg'),
  createData('Lollipop', 392, 0.0, 'https://kinhtehaiphong.com/wp-content/uploads/2021/04/1617566133_maxresdefault.jpg'),
  createData('Marshmallow', 318, 20.000, 'https://cdn.huongnghiepaau.com/wp-content/uploads/2017/08/07a60d255a852413ae4590c15b587eaa.jpg'),
  createData('Nougat', 360,  37.000, 'https://cdn.huongnghiepaau.com/wp-content/uploads/2017/08/07a60d255a852413ae4590c15b587eaa.jpg'),
  createData('Oreo', 437,  400.000, 'https://cdn.huongnghiepaau.com/wp-content/uploads/2017/08/07a60d255a852413ae4590c15b587eaa.jpg'),
];

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
                <Paper  className={numSelected.searchContainer}  
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

const  ShowMenu = (props) => {
  const { classes } = props;
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('categories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
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
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
  return (
    <Box sx={{ width: '100%' }} className={classes.listProduct} >
      <Paper className={classes.listTable}  >
        <ShowMenuToolbar numSelected={selected.length} />
        <TableContainer  className={classes.scroll}  >
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
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
             
                {rows.map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
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
                      <TableCell component="th"id={labelId} >
                             <img  align="right" src={row.image} alt=""  height='50' width='60' style={{ borderRadius: "3px" }} />
                      </TableCell>
                      <TableCell align="right">{row.categories}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                     
                      <TableCell align="right">
                        <Switch {...label}  />
                      </TableCell>
                      <TableCell align="right" >
                      <ModeEditOutlinedIcon  />
                      </TableCell>
                      <TableCell align="right">
                        <DeleteOutlinedIcon  />                      
                      </TableCell>

                    </TableRow>
                  );
                })}
              
            </TableBody>
          </Table>
        </TableContainer>
    
      </Paper>
      
    </Box>
  );
}
const styles = theme => ({
 
  scroll: {
    width: '100%',
    height:'57vh',
    marginTop: theme.spacing.unit * 3,
    overflowY: 'scroll',
  },
  listProduct: { 
    backgroundColor: '#E5E5E5',
    height: 'calc(100vh - 295px)',
    padding: '15px 15px 15px 15px',
    
  },

 

});
ShowMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ShowMenu);