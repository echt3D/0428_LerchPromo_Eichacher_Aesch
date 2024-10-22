import { useContext, useEffect, useState } from "react";
import { Fab } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import { NorthArrowBG, NorthArrowFG } from "../../custom/icons/CustomIcons";

import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import PanoramaFishEyeRoundedIcon from "@mui/icons-material/PanoramaFishEyeRounded";
import { StateContext } from "../../context/ProjectDataContext";
import { LivestateContext } from "../../context/LivestateContext";

function UiNorthArrow(props) {
  const [state, setState] = useContext(StateContext);
  const [livestate, setLivestate] = useContext(LivestateContext);
  const numSides = state.project.backgroundImages.length;
  const actualSide = livestate.backgroundImgIndex;
  const startAngle = 0;
  const endAngle = 240;
  const isInverted = false;
  const northOffset = -110;
  const calcAngle = (actualSide) => {
    return northOffset + ((endAngle - startAngle) / numSides) * actualSide;
  };

  const [actualAngle, setActualAngle] = useState(
    calcAngle(livestate.backgroundImgIndex)
  );
  useEffect(() => {
    setActualAngle(calcAngle(livestate.backgroundImgIndex));
  }, [livestate.backgroundImgIndex]);

  return (
    <Fab
      aria-label="north-direction"
      sx={{ mx: 0.5 }}
      style={{ pointerEvents: "none" }}
    >
      {/* <NorthArrowFG
        props={{
          position: "absolute",
          transform: "translate(1px, -2.6px)",
        }}
      /> */}
      <NorthArrowBG
        props={{
          // transformOrigin: "16px 16px",
          transform: `rotate(${isInverted ? -actualAngle : actualAngle}deg)`,
          position: "absolute",
          transition: "all 0.2s ease-out",
        }}
      />
    </Fab>
  );
}
export default UiNorthArrow;
