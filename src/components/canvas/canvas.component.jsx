import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback,
} from "react";

import { LivestateContext } from "../../context/LivestateContext";
import { StateContext } from "../../context/ProjectDataContext";

import * as AppSetup from "../../custom/appSetup";
import { defaultHoveredUnit, getColorHEX } from "./canvasUtils";

import "./canvas.styles.scss";
// useMediaQuery for checking window size
import { useMediaQuery } from "../../utils/useMediaQuery";

import { Stage, Layer, Group, Path, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import { useFavorites } from "../../context/FavoriteContext";

function Canvas({ setMousePos, clickOnFlatCardOrPath }) {
  const [state] = useContext(StateContext);
  const [livestate, setLivestate] = useContext(LivestateContext);
  const { backgroundImgIndex, drawMarksAlways } = livestate;
  const [preloadedImages, setPreloadedImages] = useState([]);
  const [actualView, setAcualView] = useState(
    state.project.backgroundImages[backgroundImgIndex]
  );

  const hoverLeaveTimeoutId = useRef(null);

  const [hoveredPath, setHoveredPath] = useState(null); // Add this state

  const baseURL =
    "https://wohnungsfinder.echt3d.ch/0428_LePro_Eichacher_Aesch/";

  const currentPreloadedImage = preloadedImages.find(
    (img) => img.view === actualView
  );

  const [image, status] = useImage(
    currentPreloadedImage
      ? null
      : `${baseURL}/data/${actualView.replace("f", "")}.jpg`
  );

  useEffect(() => {
    setAcualView(state.project.backgroundImages[backgroundImgIndex]);
  }, [backgroundImgIndex, state.project.backgroundImages]);

  const stageRef = useRef(null);
  const containerRef = useRef(null);

  const bounds = { width: 3000, height: 2000 };

  const svgPathsArr = Object.entries(state.svg[actualView]);
  const { isFavorite } = useFavorites();

  const preloadImages = useCallback(() => {
    const imageUrls = state.project.backgroundImages.map(
      (view) => `${baseURL}/data/${view.replace("f", "")}.jpg`
    );

    console.log("imageUrls", imageUrls);

    imageUrls.forEach((url, index) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setPreloadedImages((prev) => [
          ...prev,
          { view: state.project.backgroundImages[index], img },
        ]);
      };
    });
  }, [baseURL, state.project.backgroundImages]);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  const filteredPathsArr = svgPathsArr.filter((pathArr) => {
    const unitObj = state.units.find((unit) => unit.title === pathArr[0]);
    const { area, price, floor, rooms, onlyAvailable, onlyFavorites } =
      livestate.filter;

    if (onlyAvailable && unitObj.state_simplyfied_en !== "free") return false;

    if (onlyFavorites && !isFavorite(unitObj.reference_number)) return false;

    // Filter based on area
    const unitArea = parseFloat(unitObj.area);
    if (unitArea < area[0] || unitArea > area[1]) {
      return false;
    }

    // Filter based on price
    const unitPrice =
      AppSetup.projectType === "sell"
        ? parseFloat(unitObj.selling_price)
        : parseFloat(unitObj.rentalgross);
    if (unitPrice < price[0] || unitPrice > price[1]) {
      return false;
    }

    // Filter based on floor
    const unitFloor = parseFloat(unitObj.floor_num);
    if (unitFloor < floor[0] || unitFloor > floor[1]) {
      return false;
    }

    // Filter based on rooms
    const unitRooms = unitObj.rooms;
    if (isNaN(unitRooms)) {
      return true;
    } else if (unitRooms < rooms[0] || unitRooms > rooms[1]) {
      return false;
    }

    return true;
  });

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  useEffect(() => {
    if (status === "loaded") updateSize();
  }, [status]);

  const updateSize = () => {
    if (containerRef.current) {
      setContainerSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  };

  const debouncedUpdateSize = useRef(debounce(updateSize, 100)).current;

  useEffect(() => {
    if (status === "loaded") debouncedUpdateSize();
  }, [status]);

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", debouncedUpdateSize);

    return () => {
      window.removeEventListener("resize", debouncedUpdateSize);
    };
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event) => {
    setMousePos({
      x: event.clientX,
      y: event.clientY,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (hoverLeaveTimeoutId.current) {
        clearTimeout(hoverLeaveTimeoutId.current);
      }
    };
  }, []);

  const isBigScreen = useMediaQuery("(min-width: 640px)");
  const isLandscape = useMediaQuery("(orientation: landscape)");

  const canvasStyle = {
    height: isBigScreen ? "100vh" : "100%",
  };
  const heightScale = containerSize.height / bounds.height;
  const widthScale = containerSize.width / bounds.width;
  const scaleRatio = Math.max(heightScale, widthScale);

  return (
    <div
      className="e3d-canvas-container"
      ref={containerRef}
      width={containerSize.width}
      height={containerSize.height}
    >
      <Stage
        ref={stageRef}
        className="e3d-stage"
        style={canvasStyle}
        width={containerSize.width}
        height={containerSize.height}
      >
        <Layer scale={{ x: scaleRatio, y: scaleRatio }}>
          <Group
          // draggable
          // x={((bounds.width * scaleRatio - containerSize.width) / 2) * -1} // Add this line to set the initial x position
          // dragBoundFunc={(pos) => {
          //   // calculate max and min x, y positions
          //   let maxX = bounds.width * scaleRatio - containerSize.width;
          //   let maxY = bounds.height * scaleRatio - containerSize.height;

          //   // make sure the group is not dragged out of the stage bounds
          //   let newX = Math.min(Math.max(pos.x, -maxX), 0);
          //   let newY = Math.min(Math.max(pos.y, -maxY), 0);

          //   return {
          //     x: newX,
          //     y: newY,
          //   };
          // }}
          >
            <KonvaImage
              image={currentPreloadedImage ? currentPreloadedImage.img : image}
              width={bounds.width}
              height={bounds.height}
            />

            {filteredPathsArr.map((pathArr, index) => {
              const unitObj = state.units.find(
                (unit) => unit.title === pathArr[0]
              );
              const statusColorObj = getColorHEX(
                state.project.settings.statustable[unitObj.state_simplyfied_en]
                  .colorCode
              );

              const pathStrokeColorHovered =
                statusColorObj.statusStrokeColorHover;

              const pathFillColorHovered =
                statusColorObj.statusFillColorHovered;

              let pathStrokeColor, pathFillColor;
              const isPathThatIsAcive =
                pathArr[0] === livestate.hoveredUnit.title ||
                pathArr[0] === livestate.infobar1Obj?.title ||
                pathArr[0] === livestate.infobar2Obj?.title;

              if (livestate.drawMarksAlways === true) {
                pathStrokeColor = statusColorObj.statusStrokeColor;
                if (isPathThatIsAcive) {
                  pathFillColor = statusColorObj.statusFillColorHovered;
                } else {
                  pathFillColor = statusColorObj.statusFillColor;
                }
              } else {
                pathStrokeColor = "transparent";
                pathFillColor = "transparent";
              }

              let pathColor, pathWidth;

              if (index === hoveredPath || isPathThatIsAcive) {
                pathColor = pathStrokeColorHovered;
                pathWidth = AppSetup.strokeWidthHovered;
              } else {
                pathColor = pathStrokeColor;
                pathWidth = AppSetup.strokeWidth;
              }

              return (
                <Path
                  key={index}
                  data={pathArr[1]}
                  title={pathArr[0]}
                  strokeWidth={pathWidth}
                  stroke={pathColor}
                  fill={
                    index === hoveredPath || isPathThatIsAcive
                      ? pathFillColorHovered
                      : pathFillColor
                  }
                  onMouseEnter={(e) => {
                    if (hoverLeaveTimeoutId.current) {
                      clearTimeout(hoverLeaveTimeoutId.current);
                      hoverLeaveTimeoutId.current = null;
                    }
                    setHoveredPath(index);
                    setLivestate((prevState) => ({
                      ...prevState,
                      tooltipVisible: true,
                      hoveredUnit: unitObj,
                    }));
                  }}
                  onMouseMove={(e) => {
                    if (index === hoveredPath) {
                      const stage = e.target.getStage();
                      const mousePos = stage.getPointerPosition();
                      setMousePos({ x: mousePos.x, y: mousePos.y });
                    }
                  }}
                  onMouseLeave={() => {
                    hoverLeaveTimeoutId.current = setTimeout(() => {
                      setHoveredPath(null);
                      setLivestate((prevState) => ({
                        ...prevState,
                        tooltipVisible: false,
                        hoveredUnit: defaultHoveredUnit,
                      }));
                    }, 10);
                  }}
                  onClick={() => {
                    clickOnFlatCardOrPath(unitObj);
                  }}
                  onTap={() => {
                    clickOnFlatCardOrPath(unitObj);
                  }}
                />
              );
            })}
          </Group>
        </Layer>
      </Stage>
    </div>
  );
}

export default Canvas;
