import { React, useState, useEffect } from "react";
import {
  TextField,
  Button,
  Checkbox,
  alpha,
  InputBase,
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
  TableSortLabel,
  Box,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { db, auth } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import LoadingComponent from "../components/LoadingComponent";
import MenuDataService from "../services/menu.service";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { visuallyHidden } from "@mui/utils";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Tên danh mục",
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

const CreateCategory = (props) => {
  const { classes } = props;
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState("");
  const [message, setMessage] = useState();
  const [dialog, setDialog] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("categories");
  const [selected, setSelected] = useState([]);
  const [dense, setDense] = useState(false);
  const [categories, setCategories] = useState();
  const idRestaurant = auth.currentUser.uid;
  const cateCollectionRef = collection(
    db,
    "restaurant",
    idRestaurant,
    "category"
  );

  const getCategories = () => {
    onSnapshot(cateCollectionRef, (snapshot) => {
      let result = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      result.sort((a, b) => b.createdAt - a.createdAt);
      setCategories(result);
    });
  };

  const deleteHandler = async (id) => {
    await MenuDataService.deleteCategory(id);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategoryHandler = (item) => {
    formik.values.id = item.id;
    formik.values.name = item.name;
    setCategoryId(item.id);
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nhập vào tên danh mục món ăn"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      const timestamp = new Date();
      const newCategory = {
        name: values.name,
        createdAt: timestamp,
      };

      try {
        if (values.id === "") {
          MenuDataService.addCategories(newCategory);
          formik.values.name = "";
          setDialog(true);
          setMessage({
            type: "success",
            message: "Thêm danh mục thành công!",
          });
        } else {
          MenuDataService.updateCategory(values);
          setCategoryId("");
          formik.values.name = "";
          formik.values.id = "";
          setMessage({
            type: "success",
            message: "Cập nhật danh mục thành công thành công!",
          });
          setDialog(true);
        }
      } catch (err) {
        setMessage({
          type: "error",
          message: err.message,
        });
        console.log(err);
        setDialog(true);
      }
      setLoading(false);
    },
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = categories.map((n) => n.name);
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

  return !categories ? (
    <LoadingComponent />
  ) : (
    <div className={classes.Container}>
      <div className={classes.paperTitle}>
        <div className={classes.Title}>Tạo danh mục món ăn</div>
        <Stack direction="row" spacing={2} alignItems="center">
          <div>{auth.currentUser.displayName}</div>
          <Avatar alt="avatar restaurant" src="./images/account-icon.png" />
        </Stack>
      </div>

      <form className={classes.paperContainer} onSubmit={formik.handleSubmit}>
        <TextField
          size="small"
          variant="outlined"
          fullWidth
          id="name"
          name="name"
          label="Nhập tên danh mục món ăn"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name && formik.touched.name}
          helperText={formik.touched.name && formik.errors.name}
          type="text"
          sx={{ marginRight: 2 }}
        />
        <Button style={style.createQRButton} type="submit">
          {formik.values.id === "" ? "Tạo danh mục" : "Cập nhật"}
        </Button>
      </form>
      <div className={classes.paperContainer2}>
        <div style={styles.listProduct}>
          <Paper>
            <ShowMenuToolbar numSelected={selected.length} />
            <TableContainer className={classes.scroll}>
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
                  rowCount={categories.length}
                />
                <TableBody>
                  {categories.map((row, index) => {
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

                        <TableCell align="right">
                          <Button
                            variant="contained"
                            onClick={(e) => getCategoryHandler(row)}
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
      </div>
    </div>
  );
};

const style = {
  createQRButton: {
    backgroundColor: "#F0CC62",
    color: "#FFFFFF",
    width: "180px",
    height: "40px",
  },
  listProduct: {
    padding: "15px",
    backgroundColor: "#FFFFFF",
    margin: "15px 15px",
  },
};

const styles = (theme) => ({
  Container: {
    backgroundColor: "#E5E5E5",
    height: "100vh",
  },
  qrcodeHide: {
    display: "none",
  },
  scroll: {
    width: "100%",
    height: "calc(100vh - 275px)",
    overflowY: "auto",
  },
  tableHead: {
    position: "sticky",
    top: 0,
    backgroundColor: "#eee",
    zIndex: 1,
  },
  checkb: {
    zIndex: 0,
  },
  paperContainer: {
    display: "flex",
    padding: "15px",
    backgroundColor: "#FFFFFF",
    margin: "16px 15px",
  },
  paperContainer2: {
    backgroundColor: "#FFFFFF",
    margin: "16px 15px",
    padding: "15px",
  },
  Title: {
    fontSize: "21px",
    fontWeight: "500",
    color: "#000000",
  },
  paperTitle: {
    height: "64px",
    display: "flex",
    padding: "0 15px",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchContainer: {
    display: "flex",
    marginTop: "16px",
  },
  searhButton: {
    borderRadius: "4px",
    border: "1px solid #CACFD2",
    height: "40px",
  },
  iconCLolor: {
    color: "#000",
  },
});

CreateCategory.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateCategory);
