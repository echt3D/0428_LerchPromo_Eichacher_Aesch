export function getProjectPlans(unit, state) {
  // const config = {
  //   factsheet: {
  //     unit: "factsheet", //property of eMonitor
  //     unitValue: "/static/template-assets/icons/missing_file_icon.png", //value for no file in eMonitor
  //     statePlans: "factsheet", //property of state => state.plans.factsheet
  //   },
  //   situation_plan: {
  //     unit: "situation_plan", //property of eMonitor
  //     unitValue: "/static/template-assets/icons/missing_file_icon.png", //value for no file in eMonitor
  //     statePlans: "situation_plan", //property of state => state.plans.factsheet
  //   },
  // };

  let factsheet,
    situation_plan,
    environment_plan,
    basement1_plan,
    basement2_plan,
    basement3_plan = null;
  // Object.entries(config).forEach((val) => {
  //   if (unit && state) {
  //     console.warn("val[1]", val[1]);
  //     console.log('unit[val[1]["unit"]]', unit[val[1]["unit"]]);
  //     console.log('val[1]["unitValue"]', val[1]["unitValue"]);
  //     // console.log(
  //     //   !unit[val[1]] && unit[val[1]["unit"]] !== val[1]["unitValue"]
  //     // );
  //     if (
  //       (!unit[val[1]] && unit[val[1]["unit"]] !== val[1]["unitValue"]) ||
  //       !state.plans[val[1]["statePlans"]]
  //     ) {
  //       [val[1]] = unit.factsheet;
  //     }
  //   }
  // });

  if (unit && state) {
    if (
      !unit.factsheet ||
      unit.factsheet !==
        "/static/template-assets/icons/missing_file_icon.png" ||
      !state.plans.factsheet
    ) {
      factsheet = unit.factsheet;
    } else if (
      !unit.factsheet ||
      unit.factsheet ===
        "/static/template-assets/icons/missing_file_icon.png" ||
      !state.plans.factsheet
    ) {
      factsheet = `${window.location.origin}${process.env.PUBLIC_URL}/${
        state.plans.factsheet[unit?.reference_number]
      }`;
      // console.log(factsheet);
    } else {
      // console.warn("NO Factsheet");
    }
  }

  if (state) {
    if (state.plans.situation_plan) {
      situation_plan = `${window.location.origin}${process.env.PUBLIC_URL}/${state.plans.situation_plan}`;
    }
    if (state.plans.environment_plan) {
      environment_plan = `${window.location.origin}${process.env.PUBLIC_URL}/${state.plans.environment_plan}`;
    }
    if (state.plans.basement1_plan) {
      basement1_plan = `${window.location.origin}${process.env.PUBLIC_URL}/${state.plans.basement1_plan}`;
    }
    if (state.plans.basement2_plan) {
      basement2_plan = `${window.location.origin}${process.env.PUBLIC_URL}/${state.plans.basement2_plan}`;
    }
    if (state.plans.basement3_plan) {
      basement3_plan = `${window.location.origin}${process.env.PUBLIC_URL}/${state.plans.basement3_plan}`;
    }
    // console.warn("NO situation_plan");
  }
  // if (
  //   unit.pdf_file_link === "/static/template-assets/icons/missing_file_icon.png"
  // )
  //   return;
  // if (unit.pdf_file === "#") return;

  // console.log({ factsheet, situation_plan });
  return {
    factsheet,
    situation_plan,
    environment_plan,
    basement1_plan,
    basement2_plan,
  };
}
