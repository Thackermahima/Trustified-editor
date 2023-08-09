import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { iconsData } from "../data";
import SidebarTabs from "./Sidebar";
import TabMtr from "./NewTab";
import Canvas from "../canvas/Canvas";
import EditorFooter from "../canvas/CanvasFooter";
import MenuBar from "./Menu";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  height: "100vh",
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(15)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(15)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));


export default function MiniDrawer() {
  const [currentTab, setCurrentTab] = React.useState(0);
  const [options, setOptions] = React.useState(iconsData);
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const [alignment, setAlignment] = React.useState('left');
  const [formats, setFormats] = React.useState(() => ['italic']);
  const [value, setValue] = React.useState(55);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const selectedOption = options[currentTab];
  const handleCloseSidebar = () => {
    setOpenSidebar(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{ background: "linear-gradient(90deg,#00c4cc,#7d2ae8)" }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Trustified Certificate Editor
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent">
        <SidebarTabs
          options={options}
          setCurrentTab={setCurrentTab}
          selectedOption={selectedOption}
          setOpenSidebar={setOpenSidebar}
        />
      </Drawer>
      <div className="container-fluid" style={{ overflow: 'hidden' }}>
        <div className="row">
          <div className="col mt-4 p-0">
            <div
              className="d-flex justify-content-start"
              style={{
                position: "relative",
                height: "96vh",
                overflow: "hidden",
                flex: 1,
              }}
            >
               
                {openSidebar && (
                  <TabMtr
                    handleCloseSidebar={handleCloseSidebar}
                    selectedOption={selectedOption}
                    setCurrentTab={setCurrentTab}
                  />
                )} 
              <div
                style={{ flex: 1, display: "flex", flexDirection: "column" }}
              >
                <MenuBar />
                <Canvas />
                <div
                  className=""
                  style={{
                    background: "#eee",
                    padding: "20px",
                    width: "100%",
                  }}
                ></div>
                <EditorFooter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}