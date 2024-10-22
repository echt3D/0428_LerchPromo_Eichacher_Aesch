export default function checkBalconyTerrace(
  garden_sitting_place_area,
  terrace_area,
  loggia_area
) {
  let exportName, exportArea;
  if (garden_sitting_place_area && terrace_area) {
    if (garden_sitting_place_area >= terrace_area) {
      exportName = "Sitzplatz";
      exportArea = garden_sitting_place_area;
    } else {
      exportName = "Terrasse";
      exportArea = terrace_area;
    }
  } else if (garden_sitting_place_area) {
    exportName = "Gartensitzplatz";
    exportArea = garden_sitting_place_area;
  } else if (terrace_area) {
    exportName = "Terrasse";
    exportArea = terrace_area;
  } else if (loggia_area) {
    exportName = "Loggia";
    exportArea = loggia_area;
  }
  return { exportName, exportArea };
}
