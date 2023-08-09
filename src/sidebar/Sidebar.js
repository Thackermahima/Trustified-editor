import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { iconsData } from "../data";
import { ListItemButton, ListItemText } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function SidebarTabs({
  options,
  setCurrentTab,
  selectedOption,
  setOpenSidebar,
}) {
  const [value, setValue] = React.useState("");

  const handleChange = (event, newValue) => {
   
    setValue(newValue);
    setOpenSidebar(true);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        marginTop: "60px", 
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
      >
        {options.map((data, i) => {
          return (
            <Tab
              sx={{
                display: "block",
                textTransform: "capitalize",
                padding: "10px 35px",
                fontSize: "14px",
              }}
              label={data.name}
              {...a11yProps(i)}
              icon={data.icon}
              onClick={() => {
                setCurrentTab(i);
              }}
            />
          );
        })}
      </Tabs>

      {iconsData.map((data, i) => {
        return (
          <TabPanel value={data.name} index={i}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#293039",
                color: "white",
                flexDirection: "column",
                width: "320px",
                zIndex: -1,
              }}
            >
              <h1 style={{ marginTop: "20px" }}>{data.name}</h1>
            </div>
            <div className="on">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#293039",
                  height: "100px",
                  width: "30px",
                  borderTopRightRadius: "100%",
                  borderBottomRightRadius: "100%",
                  zIndex: 99,
                }}
              >
                <ArrowBackIos />
              </div>
            </div>
          </TabPanel>
        );
      })}
    </Box>
  );
}