import React from "react";
import { Button, Slider, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import LayersIcon from "@mui/icons-material/Layers";
import CropFreeIcon from "@mui/icons-material/CropFree";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import RestoreIcon from "@mui/icons-material/Restore";
import ReplayIcon from "@mui/icons-material/Replay";
import { sidebarContext } from "../context/SidebarContext";

const Container = styled("div")(({ theme }) => ({
  height: "56px",
  background: theme.palette.background.paper,
  display: "grid",
  gridTemplateColumns: "auto auto auto",
  borderTop: `1px solid ${theme.palette.grey[400]}`,
  alignItems: "center",
  padding: "0 0.5rem",
  position: "absolute",
  width: "100%",
  bottom: 0,
}));

const ButtonGroup = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& > button": {
    margin: theme.spacing(0, 0.5),
  },
}));

const SliderContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "240px",
}));

export default function EditorFooter() {
 
  const SidebarContext = React.useContext(sidebarContext);
  const { sliderValue, handleSliderChange, decreaseValue, increaseValue } =
    SidebarContext;

  return (
    <Container>
      <div>
        <LayersIcon size={20} />
      </div>
      <ButtonGroup>
        <CropFreeIcon
          size={16}
          style={{ margin: "0 10px", cursor: "pointer" }}
        />
        <ZoomOutMapIcon
          size={16}
          style={{ margin: "0 10px", cursor: "pointer" }}
        />
        <RemoveCircleOutlineRoundedIcon
          size={24}
          style={{ margin: "0 10px", cursor: "pointer" }}
          onClick={() => decreaseValue()}
        />
        <SliderContainer>
          <Slider
            value={sliderValue}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            style={{ width: "200px" }}
            min={10}
            max={100}
          />
        </SliderContainer>

        <AddCircleOutlineIcon
          size={24}
          style={{ margin: "0 10px", cursor: "pointer" }}
          onClick={() => increaseValue()}
        />

        <p style={{ marginLeft: "10px", marginTop: "10px" }}>{sliderValue}%</p>
      </ButtonGroup>
      {/* <ButtonGroup>
        <ReplayIcon size={16} style={{ margin: "0 10px", cursor: "pointer" }} />
        <UndoIcon size={22} style={{ margin: "0 10px", cursor: "pointer" }} />
        <RedoIcon size={22} style={{ margin: "0 10px", cursor: "pointer" }} />
        <RestoreIcon
          size={16}
          style={{ margin: "0 10px", cursor: "pointer" }}
        />
      </ButtonGroup> */}
    </Container>
  );
}
