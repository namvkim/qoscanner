import { React, useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  Avatar,
  Stack,
  Box,
  Typography,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";

import { db, auth, storage } from "../firebase";
import { collection, onSnapshot, doc } from "firebase/firestore";
import LoadingComponent from "../components/LoadingComponent";
import InfoDataService from "../services/information.service";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";

const ResInformation = (props) => {
  const { classes } = props;
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [message, setMessage] = useState();
  const [info, setInfo] = useState("");
  const inputFile = useRef(null);
  const resCollectionRef = collection(db, "restaurant");
  const getInfo = () => {
    const idRestaurant = auth.currentUser.uid;
    onSnapshot(doc(resCollectionRef, idRestaurant), (doc) => {
      const document = doc.data();
      if (document) {
        formik.values.name = document.name;
        formik.values.phone = document.phone;
        formik.values.country = document.country;
        formik.values.district = document.district;
        formik.values.village = document.village;
        formik.values.street = document.street;
      }
      setInfo(document);
      setLoading(false);
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      country: "",
      district: "",
      village: "",
      street: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Nhập tên cửa hàng"),
      phone: Yup.number().required("Nhập số điện thoại"),
      country: Yup.string().required("Nhập tỉnh/thành phố"),
      district: Yup.string().required("Nhập quận/huyện"),
      village: Yup.string().required("Nhập phường/xã cửa hàng"),
      street: Yup.string().required("Nhập số đường/thôn cửa hàng"),
    }),

    onSubmit: (values) => {
      // setLoading(true);
      const timestamp = new Date();
      /** @type {any} */
      const metadata = {
        contentType: "image/jpeg",
      };
      console.log(image);
      if ({ image }) {
        const storageRef = ref(storage, "images/" + image.name);
        const uploadTask = uploadBytesResumable(storageRef, image, metadata);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            switch (snapshot.state) {
              case "paused":
                break;
              case "running":
                break;
            }
          },
          (error) => {
            switch (error.code) {
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;
              case "storage/canceled":
                // User canceled the upload
                break;
              case "storage/unknown":
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              const newInfo = {
                ...values,
                createAt: timestamp,
                image: downloadURL,
              };
              try {
                if (info) {
                  InfoDataService.updateInfo(newInfo);
                  setMessage({
                    type: "success",
                    message: "Cập nhật thông tin thành công!",
                  });
                  setDialog(true);
                  setLoading(false);
                } else {
                  InfoDataService.addInfo(newInfo);
                  setMessage({
                    type: "success",
                    message: "Thêm thông tin thành công!",
                  });
                  setDialog(true);
                  setLoading(false);
                }
              } catch (err) {
                setMessage({
                  type: "error",
                  message: err.message,
                });
                console.log(err);
                setDialog(true);
                setLoading(false);
              }
            });
          }
        );
      } else {
        const newInfo = {
          ...values,
          createAt: timestamp,
        };
        try {
          if (info) {
            InfoDataService.updateInfo(newInfo);
            setDialog(true);
            // setLoading(false);
          } else {
            InfoDataService.addInfo(newInfo);
            setDialog(true);
            // setLoading(false);
          }
        } catch (err) {
          setMessage({
            type: "error",
            message: err.message,
          });
          console.log(err);
          setDialog(true);
          // setLoading(false);
        }
      }
    },
  });

  return loading ? (
    <LoadingComponent />
  ) : (
    <div className={classes.Container}>
      <div className={classes.paperTitle}>
        <div className={classes.Title}>Chỉnh sửa thông tin cửa hàng</div>
        <Stack direction="row" spacing={2} alignItems="center">
          <div>{auth.currentUser.displayName}</div>
          <Avatar alt="avatar restaurant" src="./images/account-icon.png" />
        </Stack>
      </div>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
        }}
      >
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Avatar
                    src={info?.image}
                    sx={{
                      height: 64,
                      mb: 2,
                      width: 64,
                    }}
                  />
                  <Typography color="textPrimary" gutterBottom variant="h5">
                    {info?.name}
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    {info?.country}
                  </Typography>
                </Box>
              </CardContent>
              <Divider />
              <CardActions>
                <input
                  ref={inputFile}
                  type="file"
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
                <Button
                  color="primary"
                  fullWidth
                  variant="text"
                  onClick={() => inputFile.current.click()}
                >
                  {image?.name ? image.name : "Tải ảnh"}
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <form onSubmit={formik.handleSubmit}>
              <Card>
                <CardHeader title="Thông tin cửa hàng" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Nhập tên cửa hàng"
                        name="name"
                        id="name"
                        onChange={formik.handleChange}
                        required
                        value={formik.values.name}
                        error={formik.errors.name && formik.touched.name}
                        helperText={formik.touched.name && formik.errors.name}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Nhập số điện thoại"
                        name="phone"
                        id="phone"
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.phone}
                        error={formik.errors.phone && formik.touched.phone}
                        helperText={formik.touched.phone && formik.errors.phone}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Nhập tỉnh/thành phố"
                        name="country"
                        id="country"
                        onChange={formik.handleChange}
                        required
                        value={formik.values.country}
                        error={formik.errors.country && formik.touched.country}
                        helperText={
                          formik.touched.country && formik.errors.country
                        }
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Nhập quận/huyện"
                        name="district"
                        id="district"
                        onChange={formik.handleChange}
                        required
                        value={formik.values.district}
                        error={
                          formik.errors.district && formik.touched.district
                        }
                        helperText={
                          formik.touched.district && formik.errors.district
                        }
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Nhập phường/xã"
                        name="village"
                        id="village"
                        onChange={formik.handleChange}
                        required
                        value={formik.values.village}
                        error={formik.errors.village && formik.touched.village}
                        helperText={
                          formik.touched.village && formik.errors.village
                        }
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Nhập số đường/thôn "
                        name="street"
                        id="street"
                        onChange={formik.handleChange}
                        required
                        value={formik.values.street}
                        error={formik.errors.street && formik.touched.street}
                        helperText={
                          formik.touched.street && formik.errors.street
                        }
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    p: 2,
                  }}
                >
                  <Button style={style.createQRButton} type="submit">
                    Lưu
                  </Button>
                </Box>
              </Card>
            </form>
          </Grid>
        </Grid>
      </Box>
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
  paperTitle: {
    height: "64px",
    display: "flex",
    padding: "0 15px",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "space-between",
  },

  Title: {
    fontSize: "21px",
    fontWeight: "500",
    color: "#000000",
  },
});

ResInformation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResInformation);
