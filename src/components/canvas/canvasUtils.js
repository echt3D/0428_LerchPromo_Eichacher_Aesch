// import { React, useRef } from "react";
import * as AppSetup from "../../custom/appSetup";
// let canvas, canvasContainer;

export const defaultHoveredUnit = {
  building: {
    adress: "",
    publicated_adress: null,
    house_number_supplement: null,
    house_number: "",
    year_of_construction: null,
    plz: "",
    city: "",
    state: "active",
    lift: false,
    title: "",
    mark: null,
    mark_property: null,
    colony: null,
    metropolitan: null,
    district: null,
  },
  images: [],
  state_simplyfied_en: "rented",
  property_type: "Wohnung",
  rentalgross: 0,
  title: "",
  rooms: 0,
  area: 0,
  object: "apartment",
  garden_sitting_place_area: 0,
  terrace_area: 0,
};

// export const preloadImages = (BackgroundImages, setPreloadedImages) => {
//   const loadedImages = BackgroundImages.map((imageName) => {
//     const img = new Image();
//     img.src = `/data/${imageName.replace("f", "")}.jpg`;
//     return img;
//   });
//   setPreloadedImages(loadedImages);
// };

export const getColor = (statusColor, ctx, colorStyle) => {
  switch (statusColor) {
    case "g":
      ctx.fillStyle = AppSetup[`green${colorStyle}`];
      ctx.strokeStyle = AppSetup[`green${colorStyle}`];
      break;
    case "y":
      ctx.fillStyle = AppSetup[`yellow${colorStyle}`];
      ctx.strokeStyle = AppSetup[`yellow${colorStyle}`];
      break;
    case "r":
      ctx.fillStyle = AppSetup[`red${colorStyle}`];
      ctx.strokeStyle = AppSetup[`red${colorStyle}`];
      break;

    default:
      ctx.fillStyle = AppSetup[`gray${colorStyle}`];
      ctx.strokeStyle = AppSetup[`gray${colorStyle}`];
      break;
  }
  return ctx;
};

export const getColorHEX = (statusColor) => {
  let colorCodes = {
    statusFillColor: AppSetup[`redMarkColor`],
    statusFillColorHovered: AppSetup[`redMarkColorHover`],
    statusStrokeColor: AppSetup[`redLineColor`],
    statusStrokeColorHover: AppSetup[`redLineColorHover`],
  };
  switch (statusColor) {
    case `g`:
      colorCodes = {
        statusFillColor: AppSetup[`greenMarkColor`],
        statusFillColorHovered: AppSetup[`greenMarkColorHover`],
        statusStrokeColor: AppSetup[`greenLineColor`],
        statusStrokeColorHover: AppSetup[`greenLineColorHover`],
      };
      break;
    case `y`:
      colorCodes = {
        statusFillColor: AppSetup[`yellowMarkColor`],
        statusFillColorHovered: AppSetup[`yellowMarkColorHover`],
        statusStrokeColor: AppSetup[`yellowLineColor`],
        statusStrokeColorHover: AppSetup[`yellowLineColorHover`],
      };
      break;
    case `r`:
      colorCodes = {
        statusFillColor: AppSetup[`redMarkColor`],
        statusFillColorHovered: AppSetup[`redMarkColorHover`],
        statusStrokeColor: AppSetup[`redLineColor`],
        statusStrokeColorHover: AppSetup[`redLineColorHover`],
      };
      break;
    default:
      colorCodes = {
        statusFillColor: AppSetup[`grayMarkColor`],
        statusFillColorHovered: AppSetup[`grayMarkColorHover`],
        statusStrokeColor: AppSetup[`grayLineColor`],
        statusStrokeColorHover: AppSetup[`grayLineColorHover`],
      };
      break;
  }
  return colorCodes;
};

// export const initializeOrUpdateCanvas = (
//   canvasRef,
//   canvasContainerRef,
//   actualView,
//   drawCanvasSVGCombined
// ) => {
//   canvas = canvasRef.current;
//   const flatSidebar = document.querySelector("#e3d-ui-sidebar-tab_panel-0");
//   canvas.width = canvasContainerRef.current.offsetWidth;
//   canvas.height = canvasContainerRef.current.offsetHeight;
//   canvas.style.width = `${canvasContainerRef.current.offsetWidth}px`;
//   canvas.style.height = `${canvasContainerRef.current.offsetHeight}px`;

//   drawCanvasSVGCombined(actualView);
// };

// export const drawCanvasSVGCombined = (state, actualView, e) => {
//   if (!actualView) return;
//   let hovered = false;
//   let hoveredUnit = defaultHoveredUnit;
//   let isHovered = false;
//   canvas = canvasRef.current;
//   const ctx = canvas.getContext("2d");
//   const bounds = { width: 2400, height: 1350 };
//   const scale = Math.max(
//     canvas.width / bounds.width,
//     canvas.height / bounds.height
//   );
//   const scaledWidth = bounds.width * scale;
//   const scaledHeight = bounds.height * scale;
//   const centerX = canvas.width / 2;
//   const centerY = canvas.height / 2;
//   const pathX = centerX - scaledWidth / 2;
//   const pathY = centerY - scaledHeight / 2;
//   ctx.save();
//   ctx.translate(pathX, pathY);
//   ctx.scale(scale, scale);

//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   let svgPathsArr = Object.entries(state.svg[actualView]);
//   svgPathsArr.forEach((paths, i) => {
//     ctx.save();
//     const p = new Path2D(paths[1]);
//     let unitStatus = "unknow";
//     if (state.units && state.units[i] !== undefined) {
//       unitStatus = state.units[i].state_simplyfied_en;
//     } else {
//       console.warn(
//         "Keine Wohnungs-ID zu Pfad gefunden. 'State.svg' und 'state.units' im File ProjectDataContext ablgeichen!"
//       );
//     }
//     const unitId = state.units[i].title;
//     const statusColor =
//       state.project.settings.statustable[unitStatus].colorCode;

//     if (e) {
//       const isPointInPath = ctx.isPointInPath(p, e.pageX, e.pageY);
//       if (isPointInPath) {
//         ctx.globalAlpha = AppSetup.hoverPathFillAlpha;
//         getColor(statusColor, ctx, "MarkColor");
//         ctx.fill(p);
//         ctx.lineWidth = 4;
//         ctx.lineCap = "round";
//         ctx.globalAlpha = AppSetup.hoverPathLineAlpha;
//         getColor(statusColor, ctx, "LineColor");
//         ctx.stroke(p);
//         ctx.globalAlpha = 1;

//         const hoveredUnitKey = Object.keys(state.units).find(
//           (unit) => unit === svgPathsArr[i][0]
//         );
//         hoveredUnit = state.units[hoveredUnitKey];

//         isHovered = true;
//         hovered = true;
//       } else if (drawUnitsAlways) {
//         ctx.globalAlpha = AppSetup.notHoverPathFillAlpha;
//         getColor(statusColor, ctx, "MarkColor");
//         ctx.fill(p);
//         ctx.globalAlpha = AppSetup.notHoverPathLineAlpha;
//         getColor(statusColor, ctx, "LineColor");
//         ctx.stroke(p);
//         ctx.globalAlpha = 1;
//       }
//     } else {
//       if (unitId === livestate.hoveredUnit.title) {
//         ctx.lineWidth = 5;
//         ctx.globalAlpha = AppSetup.hoverPathLineAlpha;
//         getColor(statusColor, ctx, "LineColor");
//         ctx.stroke(p);
//         ctx.globalAlpha = AppSetup.hoverPathFillAlpha;
//         getColor(statusColor, ctx, "MarkColor");
//         ctx.fill(p);
//       } else {
//         ctx.globalAlpha = AppSetup.notHoverPathFillAlpha;
//       }
//       getColor(statusColor, ctx, "MarkColor");
//       ctx.fill(p);
//       ctx.globalAlpha = AppSetup.notHoverPathLineAlpha;
//       getColor(statusColor, ctx, "LineColor");
//       ctx.stroke(p);
//       ctx.globalAlpha = 1;
//     }
//     ctx.globalAlpha = 1;
//     ctx.restore();
//     return { hoveredUnit, isHovered };
//   });

//   if (!e || !hovered) {
//     hoveredUnit = defaultHoveredUnit;
//     isHovered = false;
//   }
//   ctx.restore();
//   return { hoveredUnit: hoveredUnit || defaultHoveredUnit, isHovered };
// };
