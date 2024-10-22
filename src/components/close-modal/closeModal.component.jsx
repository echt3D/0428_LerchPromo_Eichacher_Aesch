import { React, useContext } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box } from "@mui/material";
import { LivestateContext } from "../../context/LivestateContext";

const CloseModal = ({ modalToClose }) => {
  const [livestate, setLivestate] = useContext(LivestateContext);
  const modalToCl = modalToClose;

  const clickHandler = (e) => {
    if (livestate[modalToCl] === true) {
      setLivestate((prevS) => ({
        ...prevS,
        [modalToCl]: false,
      }));
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        right: "15px",
        cursor: "pointer",
      }}
      onClick={clickHandler}
    >
      <CloseRoundedIcon />
    </Box>
  );
};
export default CloseModal;
