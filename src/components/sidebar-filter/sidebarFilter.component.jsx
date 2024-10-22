import { React, useContext, useEffect, useState } from "react";
import { Typography, useTheme } from "@mui/material";

import SidebarUnit from "../sidebar-unit/sidebarUnit.component";
import "./sidebarFilter.styles.scss";
import { StateContext } from "../../context/ProjectDataContext";
import { LivestateContext } from "../../context/LivestateContext";
import { Slider, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Box, Button } from "@mui/material";

import * as AppSetup from "../../custom/appSetup";

import { useMediaQuery } from "../../utils/useMediaQuery";

const sliderStyle = {
  "& .MuiSlider-rail": {
    backgroundColor: AppSetup.globalAccentColor,
  },
  "& .MuiSlider-thumb": {
    backgroundColor: AppSetup.globalAccentColor,
  },
  "& .MuiSlider-track": {
    backgroundColor: AppSetup.globalAccentColor,
    color: AppSetup.globalAccentColor,
  },
  "& .MuiSlider-root": {
    color: AppSetup.globalAccentColor,
  },
};

const formatValueLabel = (value) => {
  return value >= 1000000
    ? `${Math.floor((value / 1000000) * 100) / 100}\xa0Mio.`
    : `${value}.-`;
};

function SidebarFilter(props) {
  const [livestate, setLivestate] = useContext(LivestateContext);
  const theme = useTheme();

  const [flaeche, setFlaeche] = useState(livestate.filter.area);
  const [preis, setPreis] = useState(livestate.filter.price);
  const [etage, setEtage] = useState(livestate.filter.floor);
  const [zimmer, setZimmer] = useState(livestate.filter.rooms);
  const [onlyAvailable, setOnlyAvailable] = useState(
    livestate.filter.onlyAvailable
  );
  const [onlyFavorites, setOnlyFavorites] = useState(
    livestate.filter.onlyFavorites
  );

  const isBigScreen = useMediaQuery("(min-width: 640px)");

  const handleResetFilter = () => {
    setFlaeche([AppSetup.flatsMinArea, AppSetup.flatsMaxArea]);
    setPreis([AppSetup.flatsMinPrice, AppSetup.flatsMaxPrice]);
    setEtage([AppSetup.flatsMinFloor, AppSetup.flatsMaxFloor]);
    setZimmer(AppSetup.flatsRooms);
    setOnlyAvailable(false);
    setOnlyFavorites(false);
    setLivestate((prevLivestate) => ({
      ...prevLivestate,
      filter: {
        area: [AppSetup.flatsMinArea, AppSetup.flatsMaxArea],
        price: [AppSetup.flatsMinPrice, AppSetup.flatsMaxPrice],
        floor: [AppSetup.flatsMinFloor, AppSetup.flatsMaxFloor],
        rooms: AppSetup.flatsRooms,
        onlyAvailable: false,
        onlyFavorites: false,
      },
    }));
  };

  const handleFlaecheChange = (event, newValue) => {
    setFlaeche(newValue);
    setLivestate((prevLivestate) => ({
      ...prevLivestate,
      filter: {
        ...prevLivestate.filter,
        area: newValue,
      },
    }));
  };

  const handlePreisChange = (event, newValue) => {
    setPreis(newValue);
    setLivestate((prevLivestate) => ({
      ...prevLivestate,
      filter: {
        ...prevLivestate.filter,
        price: newValue,
      },
    }));
  };

  const handleEtageChange = (event, newValue) => {
    setEtage(newValue);
    setLivestate((prevLivestate) => ({
      ...prevLivestate,
      filter: {
        ...prevLivestate.filter,
        floor: newValue,
      },
    }));
  };

  const handleZimmerChange = (event, newValue) => {
    setZimmer(newValue);
    setLivestate((prevLivestate) => ({
      ...prevLivestate,
      filter: {
        ...prevLivestate.filter,
        rooms: newValue,
      },
    }));
  };

  const handleOnlyAvailableChange = (event) => {
    const checked = event.target.checked;
    setOnlyAvailable(checked);
    setLivestate((prevLivestate) => ({
      ...prevLivestate,
      filter: {
        ...prevLivestate.filter,
        onlyAvailable: checked,
      },
    }));
  };

  const handleOnlyFavoritesChange = (event) => {
    const checked = event.target.checked;
    setOnlyFavorites(checked);
    setLivestate((prevLivestate) => ({
      ...prevLivestate,
      filter: {
        ...prevLivestate.filter,
        onlyFavorites: checked,
      },
    }));
  };

  return (
    <div className="sidebar-filter-container">
      <div className="sidebar-filter-section">
        <Typography
          variant="h3"
          sx={{ margin: "32px 0px 12px", fontWeight: "bold" }}
          color="text.primary"
        >
          Fläche
        </Typography>
        <Slider
          className="sidebar-filter-slider"
          sx={sliderStyle}
          value={flaeche}
          onChange={handleFlaecheChange}
          valueLabelDisplay="auto"
          min={AppSetup.flatsMinArea}
          max={AppSetup.flatsMaxArea}
          marks={[
            {
              value: AppSetup.flatsMinArea,
              label: `${AppSetup.flatsMinArea} m²`,
            },
            {
              value:
                Math.floor(
                  AppSetup.flatsMinArea +
                    AppSetup.flatsMinArea +
                    AppSetup.flatsMaxArea
                ) / 3,
              label: `${Math.floor(
                (AppSetup.flatsMinArea +
                  AppSetup.flatsMinArea +
                  AppSetup.flatsMaxArea) /
                  3
              )} m²`,
            },
            {
              value:
                Math.floor(
                  AppSetup.flatsMinArea +
                    AppSetup.flatsMaxArea +
                    AppSetup.flatsMaxArea
                ) / 3,
              label: `${Math.floor(
                (AppSetup.flatsMinArea +
                  AppSetup.flatsMaxArea +
                  AppSetup.flatsMaxArea) /
                  3
              )} m²`,
            },
            {
              value: AppSetup.flatsMaxArea,
              label: `${AppSetup.flatsMaxArea} m²`,
            },
          ]}
          valueLabelFormat={(value) => `${value} m²`}
        />
      </div>

      <div className="sidebar-filter-section">
        <Typography
          variant="h3"
          sx={{ margin: "32px 0px 12px", fontWeight: "bold" }}
          color="text.primary"
        >
          {" "}
          {AppSetup.projectType === "sell" ? "Kaufpreis" : "Bruttomiete"}
        </Typography>

        <Slider
          className="sidebar-filter-slider"
          sx={sliderStyle}
          value={preis}
          onChange={handlePreisChange}
          valueLabelDisplay="auto"
          min={AppSetup.flatsMinPrice}
          max={AppSetup.flatsMaxPrice}
          marks={[
            {
              value: AppSetup.flatsMinPrice,
              label: formatValueLabel(AppSetup.flatsMinPrice),
            },
            {
              value:
                Math.floor(
                  AppSetup.flatsMinPrice +
                    AppSetup.flatsMinPrice +
                    AppSetup.flatsMaxPrice
                ) / 3,
              label: formatValueLabel(
                Math.floor(
                  (AppSetup.flatsMinPrice +
                    AppSetup.flatsMinPrice +
                    AppSetup.flatsMaxPrice) /
                    3
                )
              ),
            },
            {
              value:
                Math.floor(
                  AppSetup.flatsMinPrice +
                    AppSetup.flatsMaxPrice +
                    AppSetup.flatsMaxPrice
                ) / 3,
              label: formatValueLabel(
                Math.floor(
                  (AppSetup.flatsMinPrice +
                    AppSetup.flatsMaxPrice +
                    AppSetup.flatsMaxPrice) /
                    3
                )
              ),
            },
            {
              value: AppSetup.flatsMaxPrice,
              label: formatValueLabel(AppSetup.flatsMaxPrice),
            },
          ]}
          valueLabelFormat={formatValueLabel}
        />
      </div>

      <div className="sidebar-filter-section">
        <Typography
          variant="h3"
          sx={{ margin: "32px 0px 12px", fontWeight: "bold" }}
          color="text.primary"
        >
          Etage
        </Typography>
        <Slider
          className="sidebar-filter-slider"
          sx={sliderStyle}
          value={etage}
          onChange={handleEtageChange}
          valueLabelDisplay="auto"
          min={AppSetup.flatsMinFloor}
          max={AppSetup.flatsMaxFloor}
          marks={[
            {
              value: AppSetup.flatsMinFloor,
              label: `${AppSetup.flatsMinFloor}`,
            },
            {
              value:
                Math.floor(
                  AppSetup.flatsMinFloor +
                    AppSetup.flatsMinFloor +
                    AppSetup.flatsMaxFloor
                ) / 3,
              label: `${Math.floor(
                (AppSetup.flatsMinFloor +
                  AppSetup.flatsMinFloor +
                  AppSetup.flatsMaxFloor) /
                  3
              )}`,
            },
            {
              value:
                Math.floor(
                  AppSetup.flatsMinFloor +
                    AppSetup.flatsMaxFloor +
                    AppSetup.flatsMaxFloor
                ) / 3,
              label: `${Math.floor(
                (AppSetup.flatsMinFloor +
                  AppSetup.flatsMaxFloor +
                  AppSetup.flatsMaxFloor) /
                  3
              )}`,
            },
            {
              value: AppSetup.flatsMaxFloor,
              label: `${AppSetup.flatsMaxFloor}`,
            },
          ]}
        />
      </div>

      <div className="sidebar-filter-section">
        <Typography
          variant="h3"
          sx={{ margin: "32px 0px 12px", fontWeight: "bold" }}
          color="text.primary"
        >
          Zimmer
        </Typography>
        <Slider
          className="sidebar-filter-slider"
          sx={sliderStyle}
          value={zimmer}
          onChange={handleZimmerChange}
          valueLabelDisplay="auto"
          min={Math.min(...AppSetup.flatsRooms)} // Minimum value in the array
          max={Math.max(...AppSetup.flatsRooms)} // Maximum value in the array
          step={null} // Allow only the values specified in marks
          marks={AppSetup.flatsRooms.map((room) => ({
            value: room,
            label: `${room}`,
          }))}
        />
      </div>

      <div className="sidebar-filter-section" style={{ marginTop: "22px" }}>
        <FormGroup className="sidebar-filter-checkboxes">
          <FormControlLabel
            control={
              <Checkbox
                checked={onlyAvailable}
                onChange={handleOnlyAvailableChange}
              />
            }
            label="Nur Verfügbare"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={onlyFavorites}
                onChange={handleOnlyFavoritesChange}
              />
            }
            label="Nur Favoriten"
          />
        </FormGroup>
      </div>
      <div className="sidebar-filter-section">
        <Typography
          color="text.secondary"
          sx={props.numberOfResults === 0 ? { color: "#b61717" } : {}}
        >
          {props.numberOfResults > 1
            ? `${props.numberOfResults} Ergebnisse`
            : `${props.numberOfResults} Ergebnis`}
        </Typography>
      </div>
      <div className="sidebar-filter-section">
        <Button
          color="button"
          variant="outlined"
          sx={{
            mt: isBigScreen ? 1.25 : 0.75,
            width: "100%",
            backgroundColor: theme.palette.button.main,
            color: theme.palette.button.text,
            "&:hover": {
              backgroundColor: theme.palette.button.mainHover,
              color: theme.palette.button.textHover,
            },
          }}
          onClick={handleResetFilter}
        >
          Filter zurücksetzen
        </Button>
      </div>
    </div>
  );
}
export default SidebarFilter;
