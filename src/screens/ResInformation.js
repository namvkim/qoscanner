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
import DialogComponent from "../components/DialogComponent";
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
      name: Yup.string().required("Nh???p t??n c???a h??ng"),
      phone: Yup.number().required("Nh???p s??? ??i???n tho???i"),
      country: Yup.string().required("Nh???p t???nh/th??nh ph???"),
      district: Yup.string().required("Nh???p qu???n/huy???n"),
      village: Yup.string().required("Nh???p ph?????ng/x?? c???a h??ng"),
      street: Yup.string().required("Nh???p s??? ???????ng/th??n c???a h??ng"),
    }),

    onSubmit: (values) => {
      setLoading(true);
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
                    message: "C???p nh???t th??ng tin th??nh c??ng!",
                  });
                  setDialog(true);
                  setLoading(false);
                } else {
                  InfoDataService.addInfo(newInfo);
                  setMessage({
                    type: "success",
                    message: "Th??m th??ng tin th??nh c??ng!",
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
            setLoading(false);
          } else {
            InfoDataService.addInfo(newInfo);
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
      }
    },
  });

  return loading ? (
    <LoadingComponent />
  ) : (
    <div className={classes.Container}>
      <div className={classes.paperTitle}>
        <div className={classes.Title}>Ch???nh s???a th??ng tin c???a h??ng</div>
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
                  {image?.name ? image.name : "T???i ???nh"}
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <form onSubmit={formik.handleSubmit}>
              <Card>
                <CardHeader title="Th??ng tin c???a h??ng" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Nh???p t??n c???a h??ng"
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
                        label="Nh???p s??? ??i???n tho???i"
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
                        label="Nh???p t???nh/th??nh ph???"
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
                        label="Nh???p qu???n/huy???n"
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
                        label="Nh???p ph?????ng/x??"
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
                        label="Nh???p s??? ???????ng/th??n "
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
                    L??u
                  </Button>
                </Box>
              </Card>
            </form>
          </Grid>
        </Grid>
      </Box>
      <DialogComponent
        isOpen={dialog}
        setDialog={setDialog}
        authData={message}
      />
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
