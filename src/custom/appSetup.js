export const mode = "production"; // test, production

export const apiMode = "emonitor"; // emonitor, flatfox

export const projectType = "sell"; // sell, rent
export const is360degree = true; // or is limitet to right and left?

export const ansprechperson = {
  name: "Ramona Schiesser",
  function: "Leiterin Immobilienverkauf",
  email: "verkauf@lerchpromotionen.ch",
  tel: "+41 55 610 47 46",
};

export const drawMarksAlways = true;

export const dataPathTest = "./dataJSON/test-api.json";
export const dataPathProd =
  "https://ameichacher.api.melon.sale/api/v1/objects/?format=json";
export const dataPath = mode === "production" ? dataPathProd : dataPathTest;

// Global Colors
export const tabHeaderBackgroundColor = "#EFEFEF";
export const globalBackgroundColor = "#EFEFEF";
export const globalCardBackgroundColor = "#FFFFFF";
export const globalButtonBackgroundColor = "#B4B277";
export const globalButtonTextColor = "#545217";
export const globalButtonBackgroundHoverColor = "#848247";
export const globalButtonTextHoverColor = "#000000";
export const globalAccentColor = "#735e47";
export const globalAccentColor2 = "#545217";
export const globalTextColor = "#000000";
export const globalTextSecondaryColor = "#333333";

// FONTS
export const globalTextFontFamily = "'Open Sans', sans-serif";
export const globalTitleFontFamily = "'Open Sans', sans-serif";

// Hover Colors and Alphas
export const strokeWidth = 2;
export const strokeWidthHovered = 5;

export const greenLineColor = "#40BF34";
export const yellowLineColor = "#F2A61E";
export const redLineColor = "#F23827";
export const grayLineColor = "#CCCCCC";

export const greenMarkColor = "#40BF3426";
export const yellowMarkColor = "#F2A61E44";
export const redMarkColor = "#F2382744";
export const grayMarkColor = "#96969626";

export const greenLineColorHover = "#40BF34";
export const yellowLineColorHover = "#F2A61E";
export const redLineColorHover = "#F23827";
export const grayLineColorHover = "#CCCCCC";

export const greenMarkColorHover = "#40BF3473";
export const yellowMarkColorHover = "#F2A61E73";
export const redMarkColorHover = "#F2382773";
export const grayMarkColorHover = "#96969673";

// Chip Colors
export const greenChipColor = "#40BF34";
export const yellowChipColor = "#F2A61E";
export const redChipColor = "#F23827";
export const grayChipColor = "#969696";

export const greenChipTextColor = "white";
export const yellowChipTextColor = "white";
export const redChipTextColor = "white";
export const grayChipTextColor = "white";

export const flatsRooms = [3.5, 5.5];
export const flatsMinArea = 102;
export const flatsMaxArea = 191;
export const flatsMinPrice = 1451000;
export const flatsMaxPrice = 2225000;
export const flatsMinFloor = -1;
export const flatsMaxFloor = 2;

function getMinMax(url) {
  fetch(url, {
    headers: {
      Accept: "application/json", // Set the Accept header to indicate JSON response
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Initialize variables to store the minimum and maximum values
      let rooms = [];
      let minArea = Number.POSITIVE_INFINITY;
      let maxArea = Number.NEGATIVE_INFINITY;
      let minPrice = Number.POSITIVE_INFINITY;
      let maxPrice = Number.NEGATIVE_INFINITY;
      let minFloor = Number.POSITIVE_INFINITY;
      let maxFloor = Number.NEGATIVE_INFINITY;

      // Iterate over each object in the JSON array
      for (let i = 0; i < data.length; i++) {
        const object = data[i];

        if (!rooms.includes(object.rooms)) {
          rooms.push(object.rooms);
        }
        // Check for minimum and maximum values for "area"
        if (object.area < minArea) {
          minArea = object.area;
        }
        if (object.area > maxArea) {
          maxArea = object.area;
        }

        // Check for minimum and maximum values for "rentalgross"
        if (object.rentalgross < minPrice) {
          minPrice = object.rentalgross;
        }
        if (object.rentalgross > maxPrice) {
          maxPrice = object.rentalgross;
        }

        // Check for minimum and maximum values for "floor_num"
        if (object.floor_num < minFloor) {
          minPrice = object.floor_num;
        }
        if (object.floor_num > maxFloor) {
          maxPrice = object.floor_num;
        }
      }

      // Output the minimum and maximum values
      console.log("Minimum and maximum values:");
      console.log("Rooms - Min:", rooms);
      console.log("Area - Min:", minArea, "Max:", maxArea);
      console.log("Selling Price - Min:", minPrice, "Max:", maxPrice);
      console.log("Floor - Min:", minFloor, "Max:", maxFloor);
    })
    .catch((error) => {
      console.log("Error fetching data:", error);
    });
}

// getMinMax("https://ameichacher.api.melon.sale/api/v1/objects/?format=json");

// function getMinMaxConvertedData(convertedData) {
//   // Initialize variables to store the minimum and maximum values
//   let rooms = [];
//   let minArea = Number.POSITIVE_INFINITY;
//   let maxArea = Number.NEGATIVE_INFINITY;
//   let minPrice = Number.POSITIVE_INFINITY;
//   let maxPrice = Number.NEGATIVE_INFINITY;
//   let minFloor = Number.POSITIVE_INFINITY;
//   let maxFloor = Number.NEGATIVE_INFINITY;

//   // Iterate over each object in the JSON array
//   for (let i = 0; i < convertedData.length; i++) {
//     const object = convertedData[i];
//     const objRooms = Number(object.rooms);
//     const objArea = Number(object.area);
//     const objPrice = Number(object.rentalgross);
//     const objFloor = Number(object.floor_num);

//     console.log({ objRooms, objArea, objPrice, objFloor });

//     if (!rooms.includes(objRooms)) {
//       rooms.push(objRooms);
//     }
//     // Check for minimum and maximum values for "area"
//     if (objArea < minArea) {
//       minArea = objArea;
//     }
//     if (objArea > maxArea) {
//       maxArea = objArea;
//     }

//     // Check for minimum and maximum values for "rentalgross"
//     if (objPrice < minPrice) {
//       minPrice = objPrice;
//     }
//     if (objPrice > maxPrice) {
//       maxPrice = objPrice;
//     }

//     // Check for minimum and maximum values for "floor_num"
//     if (objFloor < minFloor) {
//       minFloor = objFloor;
//     }
//     if (objFloor > maxFloor) {
//       maxFloor = objFloor;
//     }
//   }

//   // Output the minimum and maximum values
//   console.log("Minimum and maximum values:");
//   console.log("Rooms:", rooms);
//   console.log("Area - Min:", minArea, "Max:", maxArea);
//   console.log("Selling Price - Min:", minPrice, "Max:", maxPrice);
//   console.log("Floor - Min:", minFloor, "Max:", maxFloor);
// }

function flatfoxStateToEMonitor(flatfox) {
  if (flatfox.status === "pre" || flatfox.status === "act") {
    if (flatfox.is_reserved === true || flatfox.reserved === true) {
      return "reserved";
    } else if (!flatfox.is_reserved && !flatfox.reserved) {
      return "free";
    }
  } else {
    return "rented";
  }
}

export function convertFlatfoxAPIToEmonitor(flatfox) {
  const convertedData = {
    building: {
      adress: flatfox.street,
      plz: flatfox.zipcode,
      city: flatfox.city,
      state: "active",
      lift: false,
      title: flatfox.street,
    },
    factsheet: "/static/template-assets/icons/missing_file_icon.png",
    pdf_file_link: "/static/template-assets/icons/missing_file_icon.png",
    pdf_file: "#",
    isometry: "#",
    situation_plan: "#",
    factsheets: "#",
    application_pdf: "#",
    incidental_costs: flatfox.rent_charges,
    incidental_costs_squaremeter: 0,
    rentalprice_squaremeter: 0,
    rentalprice_squaremeter_net: 0,
    state_simplyfied: "frei",
    state_simplyfied_en: flatfoxStateToEMonitor(flatfox),
    state_prettyfied: "Frei",
    url: "https://flatfox.ch" + flatfox.submit_url,
    start_date: "2023-03-31T00:00:00",
    move_in_date: flatfox.moving_date,
    property_type: flatfox.short_title,
    floor: flatfox.floor,
    rentalgross_empty: flatfox.price_display,
    rentalgross_net_empty: flatfox.rent_net,
    incidental_costs_empty: flatfox.rent_charges,
    updated_at: flatfox.created,
    rentalgross: flatfox.price_display,
    rentalgross_net: flatfox.rent_net,
    price_unit: flatfox.price_unit,
    state: "vacant",
    investion_price: null,
    share_certificate: null,
    land_share: null,
    building_lease_interest: null,
    title: flatfox.ref_object,
    rooms: flatfox.number_of_rooms,
    area: flatfox.surface_living,
    area_property: null,
    min_occupancy: 0.0,
    reference_date: null,
    object: flatfox.short_title,
    tender_notice: null,
    tender_teaser: null,
    tender_title: null,
    virtual_tour_link: "",
    website_link: "",
    balcony: 0,
    loggia_area: null,
    garden_sitting_place_area: null,
    terrace_area: null,
    floor_num: flatfox.floor,
    basement_area: null,
    incidentals: flatfox.rent_charges,
    additional_costs_1: null,
    additional_costs_2: null,
    parking_space_cost: null,
    free_from: null,
    capital_share: null,
    deposit: null,
    reduit_area: null,
    household_type: null,
    min_adult: 0,
    max_adult: 0,
    min_child: 0,
    max_child: 0,
    target_group: null,
    features_boolean: null,
    features_numeric: null,
    feature_string: null,
    reference_number: flatfox.ref_object,
    honorary_percent: null,
    official_apartment_number: null,
    federal_building_identification: null,
    federal_apartment_identification: null,
    slug: null,
  };

  return convertedData;
}

// fetch(
//   "https://flatfox.ch/api/v1/public-listing/?project=256&status=pre&status=act&status=dis&status=arc&status=rem",
//   {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   }
// )
//   .then(function (response) {
//     if (response.status !== 200) {
//       throw new Error("External data not found");
//     } else {
//       return response.json();
//     }
//   })
//   .then(function (data) {
//     let apiResults;

//     apiResults = data.results.map((flatfoxData) => {
//       return convertFlatfoxAPIToEmonitor(flatfoxData);
//     });
//     console.log(apiResults);
//     getMinMaxConvertedData(apiResults);
//   });

// V2
// export function convertFlatfoxAPIToEmonitor(flatfox) {
//   const convertedData = {
//     title: flatfox?.short_title,
//     reference_number: flatfox?.reference,
//     object_type: {
//       displayName: flatfox?.object_type,
//       key: flatfox?.object_type.toUpperCase(),
//     },
//     object_category: {
//       displayName: flatfox?.object_category,
//       key: flatfox?.object_category.toUpperCase(),
//     },
//     move_in_date: flatfox?.moving_date,
//     floor: flatfox?.floor,
//     floor_num: flatfox?.floor,
//     rooms: flatfox?.number_of_rooms,
//     area: flatfox?.surface_living,
//     balcony_area: null, // Set appropriate value from flatfox
//     garden_sitting_place_area: null, // Set appropriate value from flatfox
//     loggia_area: null, // Set appropriate value from flatfox
//     basement_area: null, // Set appropriate value from flatfox
//     terrace_area: null, // Set appropriate value from flatfox
//     orientation: null, // Set appropriate value from flatfox
//     reduit_area: null, // Set appropriate value from flatfox
//     comment_field: flatfox?.description,
//     deposit: null, // Set appropriate value from flatfox
//     layout_plan: null, // Set appropriate value from flatfox
//     pdf_file: null, // Set appropriate value from flatfox
//     situation_plan: null, // Set appropriate value from flatfox
//     factsheets: null, // Set appropriate value from flatfox
//     isometry: null, // Set appropriate value from flatfox
//     image: null, // Set appropriate value from flatfox
//     application_pdf: null, // Set appropriate value from flatfox
//     object_features: null, // Set appropriate value from flatfox
//     features_numeric: null, // Set appropriate value from flatfox
//     feature_string: null, // Set appropriate value from flatfox
//     tender_title: null, // Set appropriate value from flatfox
//     tender_notice: null, // Set appropriate value from flatfox
//     virtual_tour_link: null, // Set appropriate value from flatfox
//     website_link: null, // Set appropriate value from flatfox
//     price_unit: "monthly",
//     start_date: null, // Set appropriate value from flatfox
//     end_date: null, // Set appropriate value from flatfox
//     updated_at: flatfox?.created,
//     object_state_text: null, // Set appropriate value from flatfox
//     object_state: null, // Set appropriate value from flatfox
//     contact_person: {
//       first_name: null, // Set appropriate value from flatfox
//       surname: null, // Set appropriate value from flatfox
//       email: null, // Set appropriate value from flatfox
//       phone: null, // Set appropriate value from flatfox
//     },
//     num_applications: null, // Set appropriate value from flatfox
//     building: {
//       building_title: null, // Set appropriate value from flatfox
//       address: flatfox?.street,
//       house_number: flatfox?.ref_house,
//       house_number_supplement: null, // Set appropriate value from flatfox
//       postal_code: flatfox?.zipcode,
//       city: flatfox?.city,
//       colony: null, // Set appropriate value from flatfox
//       land_code: null, // Set appropriate value from flatfox
//       year_of_construction: null, // Set appropriate value from flatfox
//     },
//     images: flatfox?.images,
//     appointments: null, // Set appropriate value from flatfox
//     application_form: null, // Set appropriate value from flatfox
//     rentalgross_net: flatfox?.rent_net + flatfox?.rent_charges,
//     rentalgross: null, // Set appropriate value from flatfox
//     incidentals: null, // Set appropriate value from flatfox
//     rentalprice_squaremeter_net: null, // Set appropriate value from flatfox
//     rentalprice_squaremeter: null, // Set appropriate value from flatfox
//     capital_share: null, // Set appropriate value from flatfox
//     additional_costs_1: null, // Set appropriate value from flatfox
//     additional_costs_2: null, // Set appropriate value from flatfox
//     incidental_costs_squaremeter: null, // Set appropriate value from flatfox
//     parking_space_cost: null, // Set appropriate value from flatfox
//     target_group: null, // Set appropriate value from flatfox
//     min_occupancy: null, // Set appropriate value from flatfox
//     min_adult: null, // Set appropriate value from flatfox
//     max_adult: null, // Set appropriate value from flatfox
//     min_child: null, // Set appropriate value from flatfox
//     max_child: null, // Set appropriate value from flatfox

//     contact_person: {
//       first_name: "Remo",
//       surname: "Zöbeli",
//       email: "wohnen@hbre.ch",
//       phone: "+41445757047",
//     },
//     building: {
//       building_title: "Haus A",
//       address: "Bahnhofstrasse",
//       house_number: "14",
//       house_number_supplement: null,
//       postal_code: "8303",
//       city: "Bassersdorf",
//       colony: null,
//       land_code: "",
//       year_of_construction: null,
//     },
//   };

//   return convertedData;
// }
