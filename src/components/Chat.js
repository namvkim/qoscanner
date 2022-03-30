import { Button, Tabs, Tab, Box } from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
import { db, auth } from "../firebase";
import { useState, useEffect } from "react";
import DoneIcon from "@mui/icons-material/Done";
import ChatDataService from "../services/chat.service";
import LoadingComponent from "../components/LoadingComponent";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { collection, onSnapshot } from "firebase/firestore";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <div key={index}>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Chat = () => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const [messag, setMessag] = useState([]);

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  const idRestaurant = auth.currentUser.uid;
  const messageCollectionRef = collection(
    db,
    "restaurant",
    idRestaurant,
    "message"
  );

  const getMessage = async () => {
    onSnapshot(messageCollectionRef, (snapshot) => {
      let message = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      let messageTrue = message.filter((item) => item.status === true);
      messageTrue.sort((a, b) => a.createAt - b.createAt);
      let messageFalse = message.filter((item) => item.status === false);
      messageFalse.sort((a, b) => b.createAt - a.createAt);
      setMessag({ messageTrue: messageTrue, messageFalse: messageFalse });
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateStatus = (id) => {
    ChatDataService.updateStatusChat(id, { status: false }).catch((e) => {
      console.log(e);
    });
  };

  useEffect(() => {
    getMessage();
    setLoading(false);
  }, []);

  return loading ? (
    <LoadingComponent />
  ) : (
    <div style={style.container}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              icon={
                <img
                  width="28"
                  height="28"
                  alt="icon image all"
                  src="./images/iconAll.png"
                />
              }
              iconPosition="start"
              label="Tất cả"
              {...a11yProps(0)}
            />
            <Tab
              icon={
                <img
                  width="28"
                  height="28"
                  alt="icon image message"
                  src="./images/iconmessag.png"
                />
              }
              iconPosition="start"
              label="Đã đọc"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div style={style.scroll}>
            {messag?.messageTrue?.map((row, index) => (
              <div style={style.chat} key={index}>
                <div style={style.inline}>
                  <div>
                    <b>{row.table} </b>
                  </div>
                  <div>
                    {addZero(row.createAt.toDate().getHours())}:
                    {addZero(row.createAt.toDate().getMinutes())}
                  </div>
                </div>
                <div style={style.mesdone}>
                  <div>{row.content}</div>
                  <Button size="small" onClick={() => updateStatus(row.id)}>
                    <DoneIcon />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div style={style.scroll}>
            {messag?.messageFalse?.map((row, index) => (
              <div key={index} style={style.chat}>
                <div style={style.inline}>
                  <div>
                    <b>{row.table} </b>{" "}
                  </div>
                  <div>
                    {addZero(row.createAt.toDate().getHours())}:
                    {addZero(row.createAt.toDate().getMinutes())}{" "}
                  </div>
                </div>
                <div style={style.mesdone}>
                  <div>{row.content}</div>
                  <CheckCircleOutlineIcon
                    size="small"
                    style={style.mesdoneColor}
                  />
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
      </Box>
    </div>
  );
};

const style = {
  mesdoneColor: {
    color: "#1976d2",
  },
  container: {
    backgroundColor: "#ffff",
    margin: "16px",
    padding: "15px",
  },
  inline: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chat: {
    padding: "10px",
    marginBottom: "5px",
    backgroundColor: "#E5E5E5",
  },
  scroll: {
    width: "100%",
    height: "calc(100vh - 255px)",
    overflowY: "auto",
    backgroundColor: "#ffff",
  },
  mesdone: {
    display: "flex",
    justifyContent: "space-between",
  },
  iconColor: {
    color: "#ECA64E",
  },
};

export default Chat;
