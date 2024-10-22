export default function createFlatIcons(unit, state) {
  const iconsToRender = [];
  if (state && state.tours) {
    Object.entries(state.tours).forEach((tour) => {
      if (tour[0] === unit.title) iconsToRender.push("has_tour");
    });
  }
  // if (unit.features_boolean === "has_cellar") {
  //   iconsToRender.push("has_cellar");
  // }
  if (unit.garden_sitting_place_area && unit.terrace_area) {
    if (unit.garden_sitting_place_area >= unit.terrace_area) {
      iconsToRender.push("garden_sitting_place");
    } else {
      iconsToRender.push("terrace");
    }
  } else if (unit.garden_sitting_place_area) {
    iconsToRender.push("garden_sitting_place");
  } else if (unit.terrace_area) {
    iconsToRender.push("terrace");
  }

  if (unit.loggia_area) {
    iconsToRender.push("loggia");
  }
  if (unit.balcony) {
    iconsToRender.push("balcony");
  }
  if (unit.lift === true) {
    iconsToRender.push("lift");
  }

  return iconsToRender;
}
