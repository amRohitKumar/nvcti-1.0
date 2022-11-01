import { useRef, useState } from "react";

import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  Button,
} from "@mui/material";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import { AccountPopover } from "../account-popover/account-popover.component";
import NVCTILogo from "../logo/logo.component";
import { useNavigate } from "react-router-dom";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const SuperAdminDashboardNavbar = (props) => {
  const navigate = useNavigate();
  const { onSidebarOpen, ...other } = props;
  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          width: {
            lg: "100%",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          {/* NAVBAR LOGO */}
          <NVCTILogo />
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="contained"
            onClick={() => navigate("/superadmin")}
            sx={{ mr: 2 }}
          >
            Dashboard
          </Button>
          <Avatar
            onClick={() => setOpenAccountPopover(true)}
            ref={settingsRef}
            sx={{
              cursor: "pointer",
              height: 40,
              width: 40,
              ml: 3,
              mr: 2,
            }}
            src="/static/images/avatars/avatar_1.png"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
      <AccountPopover
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      />
    </>
  );
};

export default SuperAdminDashboardNavbar;