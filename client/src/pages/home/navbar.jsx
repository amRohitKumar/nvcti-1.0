import * as React from "react";
import { MenuIcon, IconButton } from "../../icons/icons";
import nvcti3 from "../../assets/nvcti3.png";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Button,
  Link,
} from "@mui/material";

const drawerWidth = 240;
const navItems = [
  { link: "/", text: "Home" },
  { link: "/#about", text: "About us" },
  { link: "/#mission", text: "Our missions" },
  { link: "/#events", text: "events" },
  { link: "/facilities", text: "facilities" },
  { link: "/#projects", text: "projects" },
  { link: "/contact", text: "contact us" },
];

const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const CustomNavLink = forwardRef((props, ref) => (
  //   <NavLink
  //     ref={ref}
  //     {...props}
  //     className={({ isActive }) => (isActive ? "" : "")}
  //     style={{ textDecoration: "none" }}
  //     end
  //   />
  // ));

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", marginTop: "1em" }}
    >
      <img src={nvcti3} width="56" height="56" />
      <Divider />
      <List>
        {navItems.map(({ link, text }) => (
          <ListItem key={link} disablePadding component={Link} href={link}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText
                sx={{
                  textTransform: "uppercase",
                  color: "#000",
                }}
              >
                {text}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          size="small"
          href="/login"
        >
          LOGIN
        </Button>
        <Button variant="contained" color="error" size="small" href="/register">
          REGISTER
        </Button>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", marginBottom:"2.5em" }}>
      <AppBar component="nav" sx={{ backgroundColor: "#F2f2f2" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon sx={{ color: "black" }} />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}>
            <img src={nvcti3} width="56" height="56" />
          </Box>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {navItems.map(({ link, text }) => (
              <Link key={link} href={link} sx={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    color: "#000",
                    textTransform: "uppercase",
                    listDecoration: "none",
                    marginRight: {xs:"0px", lg:"2em"},
                    ":hover": {
                      backgroundColor: "#000",
                      color: "#fff",
                    },
                  }}
                >
                  {text}
                </Button>
              </Link>
            ))}
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: "10px",
            }}
          >
            <Button
              size="small"
              variant="contained"
              color="secondary"
              href="/login"
            >
              LOGIN
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              href="/register"
            >
              REGISTER
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
