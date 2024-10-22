import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback,
} from "react";

import Hammer from "hammerjs";
import { LivestateContext } from "../../context/LivestateContext";
import { StateContext } from "../../context/ProjectDataContext";

import * as AppSetup from "../../custom/appSetup";

import "./canvas.styles.scss";

import { defaultHoveredUnit } from "./canvasUtils";
import { getColor } from "./canvasUtils";
import { useMediaQuery } from "../../utils/useMediaQuery";

const Canvas = () => {
  const [state] = useContext(StateContext);
  const sidebarWidth = state.config.ui.sidebarWidth;
  const [livestate, setLivestate] = useContext(LivestateContext);
  const { backgroundImgIndex, drawMarksAlways } = livestate;
  const [preloadedImages, setPreloadedImages] = useState([]);
  const [actualView, setAcualView] = useState(
    state.project.backgroundImages[backgroundImgIndex]
  );
  const [panning, setPanning] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  const [backgroundImage, setBackgroundImage] = useState(null);

  const BackgroundImages = state.project.backgroundImages;
  let canvas, canvasContainer;

  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const hammerManagerRef = useRef(null);

  const minZoom = 1;
  const maxZoom = 1.35;

  const zoom = useRef(1);
  const translation = useRef({ x: 0, y: 0 });
  const prevMousePosition = useRef({ x: 0, y: 0 });

  let prevDeltaX = 0;
  let prevDeltaY = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasContainer = canvasContainerRef.current;
    const hammerManager = new Hammer.Manager(canvasContainer);

    const pan = new Hammer.Pan({ threshold: 3 });
    const pinch = new Hammer.Pinch({ enable: true });

    hammerManager.add([pan, pinch]);
    hammerManagerRef.current = hammerManager;

    const handlePan = (event) => {
      const { deltaX, deltaY, type } = event;
      const prevTranslation = translation.current;
      const newTranslation = {
        x: prevTranslation.x + deltaX - prevDeltaX,
        y: prevTranslation.y + deltaY - prevDeltaY,
      };

      translation.current = newTranslation;
      prevDeltaX = deltaX;
      prevDeltaY = deltaY;

      setPanOffset((prevOffset) => ({
        x: prevOffset.x + deltaX - prevDeltaX,
        y: prevOffset.y + deltaY - prevDeltaY,
      }));

      if (type === "panend") {
        prevDeltaX = 0;
        prevDeltaY = 0;
      }

      requestAnimationFrame(() => drawCanvasSVGCombined(actualView));
    };

    const handlePinch = (event) => {
      const newScale = Math.max(
        minZoom,
        Math.min(zoom.current * event.scale, maxZoom)
      );
      zoom.current = newScale;
      drawCanvasSVGCombined(actualView);
    };

    const handleWheel = (event) => {
      event.preventDefault();
      const zoomDelta = event.deltaY > 0 ? -0.05 : 0.05;
      const newZoom = Math.max(
        minZoom,
        Math.min(zoom.current + zoomDelta, maxZoom)
      );
      zoom.current = newZoom;
      drawCanvasSVGCombined(actualView);
    };

    hammerManager.on("pan panend", handlePan);
    hammerManager.on("pinch", handlePinch);
    canvas.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      hammerManagerRef.current.destroy();
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (backgroundImage) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(backgroundImage, 0, 0);
    }
    setPanOffset({ x: 0, y: 0 });
  }, [backgroundImage]);

  useEffect(() => {
    const image = new Image();
    image.src = "0428_LePro_Eichacher_Aesch/data/1001.jpg";
    image.onload = () => {
      setBackgroundImage(image);
    };

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, []);

  function initializeOrUpdateCanvas() {
    canvas = canvasRef.current;
    const flatSidebar = document.querySelector("#e3d-ui-sidebar-tab_panel-0");
    canvas.width = canvasContainerRef.current.offsetWidth;
    canvas.height = canvasContainerRef.current.offsetHeight;
    canvas.style.width = `${canvasContainerRef.current.offsetWidth}px`;
    canvas.style.height = `${canvasContainerRef.current.offsetHeight}px`;

    drawCanvasSVGCombined(actualView);
  }

  // function createPathBoundingBoxes(actualView) {
  //   const svgPathsArr = Object.entries(state.svg[actualView]);

  //   for (const [pathId, pathCoords] of svgPathsArr) {
  //     const path = new Path2D(pathCoords);
  //     const boundingBox = path.getBounds();

  //     pathBoundingBoxes[pathId] = boundingBox;
  //   }
  // }
  // const pathBoundingBoxes = {};
  const pathCache = {};
  let currentStatusColor = "r";
  function drawCanvasSVGCombined(actualView, e, hoveredUnitData) {
    if (!actualView) return;
    let hoveredUnit = defaultHoveredUnit;
    let isHovered = false;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const offscreenCanvas = new OffscreenCanvas(canvas.width, canvas.height);
    const offscreenCtx = offscreenCanvas.getContext("2d");

    const bounds = { width: 2400, height: 1350 };
    const scale = Math.max(
      canvas.width / bounds.width,
      canvas.height / bounds.height
    );
    const scaledWidth = bounds.width * scale;
    const scaledHeight = bounds.height * scale;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const pathX = centerX - scaledWidth / 2;
    const pathY = centerY - scaledHeight / 2;

    offscreenCtx.save();
    offscreenCtx.translate(
      pathX + translation.current.x,
      pathY + translation.current.y
    );
    offscreenCtx.scale(scale * zoom.current, scale * zoom.current);

    if (backgroundImage) offscreenCtx.drawImage(backgroundImage, 0, 0);

    const svgPathsArr = Object.entries(state.svg[actualView]);

    let hoverPath = null;
    let statusColor = "r";

    // Step 2: Perform drawing operations on the offscreen canvas
    for (const [pathId, pathCoords] of svgPathsArr) {
      pathCache[pathId] = new Path2D(pathCoords);
      let p = pathCache[pathId];
      if (!p) {
        p = new Path2D(pathCoords);
        pathCache[pathId] = p;
      }
      const unitObj = state.units.find((unit) => unit.title === pathId);

      if (!unitObj) continue;

      statusColor =
        state.project.settings.statustable[unitObj.state_simplyfied_en]
          .colorCode;

      if (statusColor !== currentStatusColor) {
        offscreenCtx.fillStyle = getColor(
          statusColor,
          offscreenCtx,
          "MarkColor"
        );
        offscreenCtx.strokeStyle = getColor(
          statusColor,
          offscreenCtx,
          "LineColor"
        );

        currentStatusColor = statusColor;
      }

      if (hoveredUnitData) {
        hoveredUnit = hoveredUnitData;
      } else if (e) {
        const canvasCoordinates = pageToCanvasCoordinates(canvas, e);
        if (
          offscreenCtx.isPointInPath(
            p,
            canvasCoordinates.x,
            canvasCoordinates.y
          )
        ) {
          hoverPath = p;
          hoveredUnit = unitObj;
          isHovered = true;
          continue;
        }
      }

      offscreenCtx.globalAlpha = AppSetup.notHoverPathFillAlpha;
      offscreenCtx.fill(p);
      offscreenCtx.globalAlpha = AppSetup.notHoverPathLineAlpha;
      offscreenCtx.stroke(p);
      offscreenCtx.globalAlpha = 1;
    }

    if (hoverPath) {
      const hoveredStatusColor =
        state.project.settings.statustable[hoveredUnit.state_simplyfied_en]
          .colorCode;
      offscreenCtx.fillStyle = getColor(
        hoveredStatusColor,
        offscreenCtx,
        "MarkColor"
      );
      offscreenCtx.strokeStyle = getColor(
        hoveredStatusColor,
        offscreenCtx,
        "LineColor"
      );

      offscreenCtx.lineWidth = 4;
      offscreenCtx.lineCap = "round";
      offscreenCtx.globalAlpha = AppSetup.hoverPathFillAlpha;
      offscreenCtx.fill(hoverPath);
      offscreenCtx.globalAlpha = AppSetup.hoverPathLineAlpha;
      offscreenCtx.stroke(hoverPath);
      offscreenCtx.globalAlpha = 1;
    }

    offscreenCtx.restore();

    if (offscreenCanvas.width > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(offscreenCanvas, 0, 0);
    }

    if (isHovered) {
      canvas.style.cursor = "pointer";
    } else {
      canvas.style.cursor = "auto";
    }

    return { hoveredUnit: hoveredUnit, isHovered };
  }

  function pageToCanvasCoordinates(canvas, e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.pageX - rect.left) * scaleX,
      y: (e.pageY - rect.top) * scaleY,
    };
  }

  const mouseMoveHandlerCanvas = useCallback(
    (e) => {
      e.preventDefault();

      if (livestate.hoveredUnit.title !== "") {
        setLivestate((prevS) => ({
          ...prevS,
          hoveredUnit: defaultHoveredUnit,
        }));
      }

      const isTouchEvent = e.type === "touchmove";
      const eventX = isTouchEvent ? e.touches[0].pageX : e.pageX;
      const eventY = isTouchEvent ? e.touches[0].pageY : e.pageY;

      const canvasBounds = canvasRef.current.getBoundingClientRect();
      const scaleX = canvasRef.current.width / canvasBounds.width;
      const scaleY = canvasRef.current.height / canvasBounds.height;
      const adjustedEventX = (eventX - canvasBounds.left) * scaleX;
      const adjustedEventY = (eventY - canvasBounds.top) * scaleY;

      const ctx = canvasRef.current.getContext("2d");
      const { hoveredUnit, isHovered } = drawCanvasSVGCombined(actualView, {
        pageX: adjustedEventX,
        pageY: adjustedEventY,
      });

      setLivestate((prevState) => ({
        ...prevState,
        hoveredUnit,
        isHovered,
        tooltipVisible: hoveredUnit.title !== defaultHoveredUnit.title,
      }));
    },
    [actualView, livestate.hoveredUnit]
  );

  const mouseMoveHandlerSidebar = (e) => {
    canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawCanvasSVGCombined(actualView);
  };

  const mouseClickHandler = (e) => {
    let clickX, clickY;
    if (e.type === "pan" || e.type === "panend") return;
    if (e.type === "touchend") {
      if (e.originalEvent?.touches[0] || e.originalEvent?.changedTouches[0]) {
        const touch =
          e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        clickX = touch.pageX;
        clickY = touch.pageY;
      } else {
        return;
      }
    } else {
      clickX = e.pageX;
      clickY = e.pageY;
    }

    let { hoveredUnit, isHovered } = drawCanvasSVGCombined(actualView, {
      pageX: clickX,
      pageY: clickY,
    });

    if (e.srcElement.closest(".e3d-ui-sidebar_flat-list-item")) {
      const clickedFlatTitle = e.srcElement.closest(
        ".e3d-ui-sidebar_flat-list-item"
      ).dataset.id;
      hoveredUnit = Object.values(state.units).find(
        (unit) => unit.title === clickedFlatTitle
      );
    }
    const isClickOnFavorite = e.target.closest(".e3d-favorite");

    const isClickInfobarOrSidebar =
      e.srcElement.closest(".e3d-ui-sidebar-container") ||
      e.srcElement.closest(".e3d-ui-infobar-container");
    const isClickOnFlatCard = e.srcElement.closest(
      ".e3d-ui-sidebar_flat-list-item > div"
    );

    if (
      isClickInfobarOrSidebar &&
      !isClickOnFlatCard &&
      (livestate.infobar1Visible || livestate.infobar2Visible)
    ) {
      setLivestate((prevS) => ({
        ...prevS,
        infobar1Visible: false,
        infobar2Visible: false,
      }));
    } else {
      if (!isClickOnFavorite && clickX && clickY) {
        if (
          livestate.infobar1Visible !== true &&
          hoveredUnit.title !== defaultHoveredUnit.title
        ) {
          setLivestate((prevS) => ({
            ...prevS,
            infobar1Visible: true,
            infobar1Obj: hoveredUnit,
            infobar2Visible: false,
          }));
        } else if (
          hoveredUnit !== livestate.infobar1Obj &&
          livestate.infobar2Visible !== true &&
          hoveredUnit.title !== defaultHoveredUnit.title
        ) {
          setLivestate((prevS) => ({
            ...prevS,
            infobar1Visible: false,
            infobar2Visible: true,
            infobar2Obj: hoveredUnit,
          }));
        } else if (hoveredUnit.title === defaultHoveredUnit.title) {
          setLivestate((prevS) => ({
            ...prevS,
            infobar1Visible: false,
            infobar2Visible: false,
          }));
        } else if (
          livestate.infobar1Visible === true &&
          hoveredUnit.title === defaultHoveredUnit.title
        ) {
          setLivestate((prevS) => ({
            ...prevS,
            infobar1Visible: false,
            infobar2Visible: false,
          }));
        } else if (
          livestate.infobar2Visible === true &&
          hoveredUnit.title === defaultHoveredUnit.title
        ) {
          setLivestate((prevS) => ({
            ...prevS,
            infobar1Visible: false,
            infobar2Visible: false,
          }));
        }
      }
    }
  };

  useEffect(() => {
    setAcualView(BackgroundImages[backgroundImgIndex]);
  }, [backgroundImgIndex, state.project.BackgroundImages]);

  const handleResize = useCallback(() => {
    canvas = canvasRef.current;
    canvasContainer = document.querySelector(".e3d-canvas-container");
    canvas.width = canvasContainerRef.current.offsetWidth;
    canvas.height = canvasContainerRef.current.offsetHeight;
    canvas.style.width = `${canvasContainerRef.current.offsetWidth}px`;
    canvas.style.height = `${canvasContainerRef.current.offsetHeight}px`;
    drawCanvasSVGCombined(actualView);
  });

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (canvasContainerRef.current) {
      const observer = new ResizeObserver(() => handleResize());

      observer.observe(canvasContainerRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [canvasContainerRef]);

  useEffect(() => {
    drawCanvasSVGCombined(actualView);
  }, [actualView, livestate.drawMarksAlways]);

  useEffect(() => {
    canvas = canvasRef.current;
    const hammerManager = hammerManagerRef.current;
    const flatSidebar = document.querySelector("#e3d-ui-sidebar-tab_panel-0");
    initializeOrUpdateCanvas();
    canvas.addEventListener("mousemove", mouseMoveHandlerCanvas);
    canvas.addEventListener("touchmove", mouseMoveHandlerCanvas);
    flatSidebar.addEventListener("mousemove", mouseMoveHandlerSidebar);
    flatSidebar.addEventListener("touchmove", mouseMoveHandlerSidebar);

    canvas.addEventListener("touchend", mouseClickHandler);
    flatSidebar.addEventListener("click", mouseClickHandler);
    flatSidebar.addEventListener("touchend", mouseClickHandler);
    canvas.addEventListener("click", mouseClickHandler);
    hammerManager.on("pan panend", mouseClickHandler);
    return () => {
      canvas.removeEventListener("mousemove", mouseMoveHandlerCanvas);
      canvas.removeEventListener("touchmove", mouseMoveHandlerCanvas);
      flatSidebar.removeEventListener("mousemove", mouseMoveHandlerSidebar);
      flatSidebar.removeEventListener("touchmove", mouseMoveHandlerSidebar);
      canvas.removeEventListener("click", mouseClickHandler);
      hammerManager.off("pan panend", mouseClickHandler);
      canvas.removeEventListener("touchend", mouseClickHandler);
      flatSidebar.removeEventListener("click", mouseClickHandler);
      flatSidebar.removeEventListener("touchend", mouseClickHandler);
    };
  }, [actualView, livestate.hoveredUnit, canvasRef]);

  // currentImage = preloadedImages.find((img) => {
  //   return img.src.includes(actualView.replace("f", ""));
  // });

  const isBigScreen = useMediaQuery("(min-width: 640px)");
  const isLandscape = useMediaQuery("(orientation: landscape)");

  const canvasStyle = {
    height: isBigScreen ? "100vh" : "100%",
  };

  return (
    <div className="e3d-canvas-container" ref={canvasContainerRef}>
      <canvas ref={canvasRef} className="e3d-canvas" style={canvasStyle} />
    </div>
  );
};

export default Canvas;
