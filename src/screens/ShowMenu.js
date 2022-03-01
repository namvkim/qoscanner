import * as React from 'react';
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
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { withStyles } from "@material-ui/core/styles";
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';

function createData( name, category, price, pic) {
    return {
      name,
      category,
      price,
      pic
    };
  }
  
  const rows = [
      createData('Frozen yoghurt', 'A', 6.0, 'https://www.petcity.vn/media/news/920_cat5_500x462.jpg'),
      createData('Ice ream sandwich', 'A', 9,  'https://vnn-imgs-f.vgcloud.vn/2021/09/07/09/chu-meo-noi-tieng-mang-xa-hoi-voi-phong-cach-thoi-trang-sanh-dieu.jpeg'),
      createData('Eclai', 'M', 6,   'https://fridaycat.com.vn/wp-content/uploads/2021/04/meo-muop-giong-meo-pho-bien-tren-the-gioi.jpg'),
      createData('Gingerbread', 'B', 15, ),
  ];

function stableSort(array) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
    id: 'pic',
    numeric: false,
    label: 'Hình ảnh',
    },
  {
    id: 'name',
    numeric: false,
    label: 'Tên',
  },
  {
    id: 'category',
    numeric: false,
    label: 'Danh mục',
  },
  {
    id: 'price',
    numeric: true,
    label: 'Giá(VNĐ)',
  },
  {
    id: 'status',
    numeric: false,
    label: 'Trạng thái',
  },
  {
    id: 'edit',
    numeric: false,
    label: 'Chỉnh sửa',
  },
  {
    id: 'delete',
    numeric: false,
    label: 'Xóa',
  },
];

function ShowMenuHead(props) {
  const { onSelectAllClick, orderBy, numSelected, rowCount } =
    props;

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
            align= 'left'
          >
            <TableSortLabel
            >
              {headCell.label}
              {orderBy === headCell.id }
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

ShowMenuHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const Menu = (props) => {
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
          Xóa {numSelected} sản phẩm
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableSearch"
          component="div"
        >
          <div  style={{display: 'flex', alignItems: 'center',  }} >
            <Paper  className={numSelected.searchContainer}  
                    sx={{ p: '2px 4px',maxWidth:'40%', display: 'flex', alignItems: 'center', boxShadow:'none' , border:'0.1px solid #CACFD2' }} >
                    <InputBase  sx={{ ml: 1, flex: 1 ,  minWidth: '40%' }} placeholder="Tìm theo tên sản phẩm"
                        inputProps={{ 'aria-label': 'Tìm kiếm' }} />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <Paper sx={{ p: '12px 10px',ml:'20px', display: 'flex', alignItems: 'center' ,boxShadow:'none', border:'0.1px solid #CACFD2', borderRadius:'4px'}}>
                    <ReplayOutlinedIcon />
                </Paper>
          </div>
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <Button variant="outlined" startIcon={<DeleteIcon />}>
              Xóa
            </Button>
        </Tooltip>
      ) : (
        <Tooltip title="Danh sách">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

Menu.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const styles = theme => ({
    root: {
    width: "100%",
    height:"85%",
    marginTop: theme.spacing.unit * 3,
    overflowY: "auto",
},
})
 

const ShowMenu =(props)=> {
const { classes } = props;
  const [selected, setSelected] = React.useState([]);

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
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Box sx={{ width: '100%', height:'100vh' }}>
        <Menu numSelected={selected.length} />
      <Paper sx={{ width: '100%', mb: 2 }} className={classes.root}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableSearch"
            size='medium'
          >
            <ShowMenuHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows
              )
                .map((row, index) => {
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
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                             onClick={(event) => handleClick(event, row.name)}
                            inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell component="th"id={labelId} >
                             <img src={row.pic} alt=""  height='50' width='60' />
                      </TableCell>
                      <TableCell   scope="row"  >  {row.name} </TableCell>
                      <TableCell >{row.category}</TableCell>
                      <TableCell >{row.price}</TableCell>
                      <TableCell><Switch edge="end"  /></TableCell>
                      <TableCell >
                      <ModeEditOutlinedIcon />
                      </TableCell>
                      <TableCell >
                        <DeleteOutlinedIcon />                       
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

ShowMenu.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(ShowMenu);