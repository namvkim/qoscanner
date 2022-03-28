import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { auth } from "../firebase";

import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Toolbar,
  ListItemButton,
} from "@mui/material";
import {
  UserOutline,
  ShoppingBagOutline,
  ViewListOutline,
  TicketOutline,
  Printer,
} from "@useblu/ocean-icons-react";
import { signOut } from "firebase/auth";
import LoadingComponent from "../components/LoadingComponent";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const drawerWidth = 220;
function Menu(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const LogOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <nav aria-label="main mailbox folders">
        <List>
          <Link to="/">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ShoppingBagOutline />
                </ListItemIcon>
                <div>Đơn hàng</div>
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to="/CreateMenu">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ViewListOutline />
                </ListItemIcon>
                <div>Tạo menu</div>
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/CreateCategory">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CategoryOutlinedIcon />
                </ListItemIcon>
                <div>Thêm danh mục</div>
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/CreateQRCode">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Printer />
                </ListItemIcon>
                <div>Tạo mã QR</div>
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/Statistical">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <EqualizerIcon />
                </ListItemIcon>
                <div>Thống kê</div>
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/Customer">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <UserOutline />
                </ListItemIcon>
                <div>Khách hàng</div>
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/Voucher">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TicketOutline />
                </ListItemIcon>
                <div>Mã giảm giá</div>
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/Setting">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <div>Cài đặt</div>
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </nav>
      <Divider />
      <Link to="/thongtincuahang">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AssignmentIndIcon />
            </ListItemIcon>
            <div>Thông tin cửa hàng</div>
          </ListItemButton>
        </ListItem>
      </Link>
      <ListItem disablePadding onClick={() => LogOut()}>
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <div>Đăng xuất</div>
        </ListItemButton>
      </ListItem>
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return loading ? (
    <LoadingComponent />
  ) : (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          color="blue"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#4267B2",
              color: "white",
            },
            "& .MuiListItemIcon-root": { color: "white" },
            a: { textDecoration: "none", color: "white" },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
export default Menu;
