import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  alpha,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Toolbar,
  TableSortLabel,
  Paper,
  Checkbox,
  IconButton,
  Switch,
  Tooltip,
  InputBase,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MenuDataService from "../../services/menu.service";
import { collection, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../firebase";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Tên sản phẩm",
  },
  {
    id: "image",
    numeric: true,
    disablePadding: false,
    label: "Hình ảnh",
  },
  {
    id: "categories",
    numeric: true,
    disablePadding: false,
    label: "Danh mục",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Giá(VNĐ)",
  },

  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Trạng thái",
  },
  {
    id: "edit",
    numeric: true,
    disablePadding: false,
    label: "Sửa",
  },
  {
    id: "delete",
    numeric: true,
    disablePadding: false,
    label: "Xóa",
  },
];

function ShowMenuHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
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
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              style={{ fontSize: "18px", fontWeight: "500" }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
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
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const ShowMenuToolbar = (props) => {
  const { numSelected } = props;

  const deleteAll = async () => {
    await MenuDataService.deleteAllCategory();
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} đã chọn
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Paper
              style={numSelected.searchContainer}
              sx={{
                maxWidth: "60%",
                display: "flex",
                alignItems: "center",
                height: "40px",
                boxShadow: "none",
                border: "0.1px solid #CACFD2",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1, minWidth: "60%" }}
                placeholder="Tìm theo tên sản phẩm"
                inputProps={{ "aria-label": "Tìm kiếm" }}
              />

              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <Paper
              sx={{
                p: "7px 10px",
                ml: "20px",
                display: "flex",
                alignItems: "center",
                boxShadow: "none",
                border: "0.1px solid #CACFD2",
                borderRadius: "4px",
              }}
            >
              <ReplayOutlinedIcon />
            </Paper>
          </div>
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={(e) => deleteAll()}>
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

const ShowMenu = ({ getMenuId }) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("categories");
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);
  const [menus, setMenus] = useState([]);
  const menuCollectionRef = collection(db, "restaurant");
  const resCollectionRef = collection(db, "restaurant");

  const getCategories = async () => {
    const idRestaurant = auth.currentUser.uid;
    onSnapshot(
      collection(resCollectionRef, idRestaurant, "category"),
      (snapshot) => {
        const result = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        getMenus(result);
      }
    );
  };

  const getMenus = async (cate2) => {
    const idRestaurant = auth.currentUser.uid;
    onSnapshot(
      collection(menuCollectionRef, idRestaurant, "menu"),
      (snapshot) => {
        let result = snapshot.docs.map((doc) => {
          var { name } = cate2.find((cate) => cate.id === doc.data().category);
          return {
            id: doc.id,
            categoryName: name,
            ...doc.data(),
          };
        });
        result.sort((a, b) => b.createdAt - a.createdAt);
        setMenus(result);
      }
    );
  };

  const deleteHandler = async (id) => {
    await MenuDataService.deleteMenu(id);
  };

  useEffect(async () => {
    await getCategories();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
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
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const updateStatus = async (item) => {
    const { id, status } = item;
    await MenuDataService.updateMenu(id, { status: !status });
  };

  return (
    <>
      <div style={styles.listProduct}>
        <Paper>
          <ShowMenuToolbar numSelected={selected.length} />
          <TableContainer style={styles.scroll}>
            <Table
              sx={{ minWidth: 650 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
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
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, row.name)}
                          inputProps={{
                            "aria-labelledby": labelId,
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
                      <TableCell component="th" id={labelId}>
                        <img
                          align="right"
                          src={row.image}
                          alt=""
                          height="50"
                          width="60"
                          style={{ borderRadius: "3px" }}
                        />
                      </TableCell>
                      <TableCell align="right">{row.categoryName}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>

                      <TableCell align="right">
                        <Switch
                          checked={row.status}
                          onChange={() => updateStatus(row)}
                        ></Switch>
                      </TableCell>

                      <TableCell align="right">
                        <Button
                          variant="contained"
                          onClick={(e) => getMenuId(row.id)}
                        >
                          <ModeEditOutlinedIcon />
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="error"
                          onClick={(e) => deleteHandler(row.id)}
                        >
                          <DeleteOutlinedIcon color="red" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </>
  );
};
const styles = {
  scroll: {
    width: "100%",
    height: "calc(100vh - 435px)",
    overflowY: "scroll",
  },
  listProduct: {
    padding: "15px",
    backgroundColor: "#FFFFFF",
    margin: "15px 15px",
  },
};

export default ShowMenu;
