import { 
  React, 
  useState, 
  useEffect 
} from "react";
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
  Alert,
  TextField,
  Button,
  Checkbox
} from "@mui/material";
import * as Yup from "yup";
import QRCode from "qrcode.react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { db, auth } from "../firebase";
import SearchIcon from "@mui/icons-material/Search";
import {withStyles } from "@material-ui/core/styles";
import QrCodeDataService from "../services/qrcode.service";
import {collection, onSnapshot  } from "firebase/firestore";
import LoadingComponent from "../components/LoadingComponent";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

const CreateQRCode = (props) => {
  const { classes } = props;
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [qrs, setQrs] = useState([]);

  const idRestaurant = auth.currentUser.uid;
  const qrCodeCollectionRef = collection(
    db,
    "restaurant",
    idRestaurant,
    "qrCode"
  );
  const getQrs = async () => {
    onSnapshot(qrCodeCollectionRef, (snapshot) => {
      setQrs(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  };

  const deleteHandler = async (id) => {
    await QrCodeDataService.deleteQrCode(id);
    getQrs();
  };

  useEffect(() => {
    getQrs();
    setLoading(false);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nhập vào tên bàn"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      const newQrCode = {
        name: values.name,
      };
      console.log("kt:" + newQrCode);
      try {
          QrCodeDataService.addQrCode(newQrCode);
          setMessage({ error: false, msg: "Thêm mã QrCode thành công!" });
      } catch (err) {
        setMessage({ error: true, msg: err.message });
      }
      setLoading(false);
    },
  });
  const currencies = [
    {
      value: "all",
      label: "Tất cả mã",
    },
    {
      value: "1",
      label: "Mã 1",
    },
    {
      value: "2",
      label: "Mã 2",
    },
    {
      value: "3",
      label: "Mã 3",
    },
  ];
  const [currency, setCurrency] = useState("all");

  const handleChangeMa = (event) => {
    setCurrency(event.target.value);
  };

  const downloadQR = (id, name) => {
    const canvas = document.getElementById(id);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qrcode_"+name+".png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    console.log(name);
  };

  return loading ? (
    <LoadingComponent />
  ) : (
    <div className={classes.Container}>
      <div className={classes.paperTitle}>
        <div className={classes.Title}>Tạo mã QR</div>
        <Stack direction="row" spacing={2} alignItems="center">
          <div>John Smith</div>
          <Avatar alt="avatar restaurant" src="./images/account.jpg" />
        </Stack>
      </div>
      {message?.msg && (
        <Alert
          variant={message?.error ? "danger" : "success"}
          dismissible
          onClose={() => setMessage("")}
        >
          {message?.msg}
        </Alert>
      )}
      <form className={classes.paperContainer} onSubmit={formik.handleSubmit}>
        <TextField
          size="small"
          variant="outlined"
          fullWidth
          id="name"
          name="name"
          label="Nhập tên bàn"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name && formik.touched.name}
          helperText={formik.touched.name && formik.errors.name}
          type="text"
          sx={{ marginRight: 2 }}
        />
        <Button style={style.createQRButton} type="submit">
          Tạo mã
        </Button>
      </form>
      <div className={classes.paperContainer2}>
        <div className={classes.searchContainer}>
          <TextField
            sx={{ marginRight: 4, width: "20%" }}
            id="outlined-select-currency"
            select
            size="small"
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
          <TextField
            size="small"
            variant="outlined"
            sx={{ width: "40%" }}
            id="outlined-basic"
            label="Nhập từ khóa tìm kiếm"
            type="text"
            inputProps={{ "aria-label": "Tìm kiếm" }}
          ></TextField>
          <IconButton
            className={classes.searhButton}
            type="submit"
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </div>
        <TableContainer component={Paper} className={classes.scroll}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell>
                  <Checkbox color="primary" />
                  STT
                </TableCell>
                <TableCell align="left">Tên bàn</TableCell>
                <TableCell align="center">Tải xuống</TableCell>
                <TableCell align="center">Xóa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {qrs.map((row, index) => (
                <TableRow key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <Checkbox color="primary" className={classes.checkb} />
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="center">
                    <Button
                      className={classes.iconCLolor}
                      type="button"
                      onClick={() => downloadQR(row.id, row.name)}
                    >
                      <FileDownloadOutlinedIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      className={classes.iconCLolor}
                      onClick={(e) => deleteHandler(row.id)}
                    >
                      <DeleteOutlinedIcon />
                    </Button>
                    <div className={classes.qrcodeHide}>
                      <QRCode
                        id={row.id}
                        value={idRestaurant + "/" + row.name}
                        size={450}
                        level={"H"} //Mức độ sửa chữa lỗi của QR code
                        includeMargin={true}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

const style = {
  createQRButton: {
    backgroundColor: "#F0CC62",
    color: "#FFFFFF",
    width: "120px",
    height: "40px",
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
    height: "calc(100vh - 290px)",
    marginTop: theme.spacing(3),
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

CreateQRCode.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateQRCode);
