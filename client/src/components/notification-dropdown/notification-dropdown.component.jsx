import { useState, useRef, useEffect } from "react";
import { clearNotificationCount } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  ButtonBase,
  ClickAwayListener,
  Grid,
  Paper,
  Popper,
  Badge,
  useMediaQuery,
} from "@mui/material";

// project imports
import Transitions from "../../ui-component/extended/Transitions";
import NotificationList from "./notification-list.component";

// assets
import { Bell as IconBell } from "../../icons/bell";
import { useSelector } from "react-redux";

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));
  const { isNewNotification } = useSelector((state) => state.user.user);

  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);

  const handleToggle = () => {
    console.log('rrr');
    dispatch(clearNotificationCount());
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Box
        sx={{
          ml: 2,
          mr: 3,
          [theme.breakpoints.down("md")]: {
            mr: 2,
          },
        }}
      >
        <ButtonBase sx={{ borderRadius: "12px", position: "relative" }}>
          {isNewNotification && (
            <Badge
              badgeContent={1}
              color="primary"
              sx={{ position: "absolute", top: "4px", right: "2px" }}
            />
          )}

          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: "all .2s ease-in-out",
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&[aria-controls="menu-list-grow"],&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light,
              },
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            color="inherit"
          >
            <IconBell stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>
      <Popper
        placement={matchesXs ? "bottom" : "bottom-end"}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [matchesXs ? 5 : 0, 20],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions
            position={matchesXs ? "top" : "top-right"}
            in={open}
            {...TransitionProps}
          >
            <Paper elevation={24}>
              <ClickAwayListener onClickAway={handleClose}>
                <Grid container direction="column" spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sx={{ maxHeight: "500px", overflowY: "scroll" }}
                  >
                    <NotificationList />
                  </Grid>
                </Grid>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default NotificationSection;
