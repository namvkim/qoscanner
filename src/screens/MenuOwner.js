import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { UserOutline } from '@useblu/ocean-icons-react';
import { ShoppingBagOutline } from '@useblu/ocean-icons-react';
import { ViewListOutline } from '@useblu/ocean-icons-react';
import { TicketOutline } from '@useblu/ocean-icons-react';
import { Printer } from '@useblu/ocean-icons-react';
import { Link, useNavigate } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';

const drawerWidth = 220;
function MenuOwner(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingBagOutline />
              </ListItemIcon>
              <Link to="#donhang" >Đơn hàng</Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Printer />
              </ListItemIcon>
              <Link to="#taoma">Tạo mã QR</Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ViewListOutline />
              </ListItemIcon>
              <Link to="#taomenu">Tạo menu</Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingBagOutline />
              </ListItemIcon>
              <Link to="#thongbao">Thông báo</Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <UserOutline />
              </ListItemIcon>
              <Link to="#khachhang">Khách hàng</Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <TicketOutline />
              </ListItemIcon>
              <Link to="#magiamgia">Mã giảm giá</Link>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
    </div>
  );
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: 'flex' }}>
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
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          color="blue"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#4267B2', color: 'white' },
            '& .MuiListItemIcon-root': { color: 'white' },
            'a': { textDecoration: 'none', color: 'white' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography paragraph>

        </Typography>
        <Typography paragraph>

        </Typography>
      </Box>
    </Box>
  );
}
export default MenuOwner;