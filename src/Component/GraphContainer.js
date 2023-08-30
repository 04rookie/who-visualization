"use client";

import Loading from "@/app/loading";
import dynamic from "next/dynamic";

//We have to use dynamic import as the library uses window instance from browerser. 
//As it is not available at server side, we explicitly mention that this import should be done client side
//And all its use should as well. (This is a temporary solution, Vercel is probably working smoother solution for this)
const LineChartComponent = dynamic(() => import("./LineChartComponent"), {
  loading: () => <Loading />,
  ssr: false,
});

export default function GraphContainer({
  measure,
  countryMapState,
  graphIndex,
}) {
  //This component basically transforms the data from API
  // to appropriate data structure so it can be passed to graph library

  // For easier reference
  const dimension = measure?.dimensions;
  const attributes = measure?.attributes?.[0]?.values;

  //CountryMap stores the template that is pushed into our graph.
  //It should have all the countries and country groups.
  //This template will be used to insert in each data point of our graph dataset
  let countryMap = {};

  //Mapping through API array and storing all the distinct countries in the template
  //Setting the inital value as -1, it acts as a flag for deletion of properties that dont hold any value
  //To reduce the size of our data set. Helps in removing all un-neccessary data properties
  dimension?.[0]?.values.forEach((dim, index) => {
    if (countryMapState?.[dim?.who_code]) {
      countryMap[dim?.who_code] = -1;
    }
  });
  //Mapping through API array and storing all the distinct country groups in the template
  //Setting the inital value as -1, it acts as a flag for deletion of properties that dont hold any value
  //To reduce the size of our data set. Helps in removing all un-neccessary data properties
  dimension?.[1]?.values.forEach((dim, index) => {
    if (countryMapState?.[dim?.code]) {
      countryMap[dim?.code] = -1;
    }
  });

  //Based on number of attributes, push empty arrays. (Number of attributes = number of graph types)
  let graphs = attributes?.map((element) => []);

  //Calculating year range from meta data provided by API. Year is the X axis of all graphs.
  const YEARRANGE =
    measure?.dimensions?.[3]?.upper_bound -
    measure?.dimensions?.[3]?.lower_bound +
    1;

  //In our graph inserting objects for each year. Each data point has year (X AXIS) +
  // all the countries and their numeric value (Y AXIS)
  graphs.forEach((graph, index) => {
    for (let count = 0; count < YEARRANGE; count++) {
      graph.push({
        //inserting year, lowest year plus count till we reach max year.
        year: measure?.dimensions?.[3]?.lower_bound + count,
        yData: {
          //using template built earlier for initialisation
          ...countryMap,
        },
      });
    }
  });

  //Finally, our data structure is ready. Now inserting values received from API.
  graphs.forEach((graph, graphIndex) => {
    measure?.data?.forEach((datum) => {
      //First if statement is responsible for inserting all country data
      //Before inserting, checking 4 constraints to avoid any runtime error from data inconsistencies
      //1- If country length = 0 that means it is a country group data, relegate it to else if
      //2- Check if country undefined, if yes skip.
      //3- Check if the country from API exists in our data structure.
      //If API is giving any country that does not exist in our structure, skip!
      //4- Check if Measure Type in datum (loop data set instance) and current interation for graph are same.

      if (
        datum?.dimensions?.COUNTRY?.length !== 0 &&
        datum?.dimensions?.COUNTRY !== undefined &&
        countryMap?.[datum?.dimensions?.COUNTRY] !== undefined &&
        datum?.attributes?.MEASURE_TYPE === attributes?.[graphIndex]?.code
      ) {
        // Calcualting index value at which to insert the data (Year on X axis)
        const diff =
          datum?.dimensions?.YEAR - measure?.dimensions?.[3]?.lower_bound;

        // Assigning Numeric value from iteration instance (Y value)
        graph[diff].yData[datum?.dimensions?.COUNTRY] = datum?.value?.numeric;
      }
      //Block for countries that belong to groups
      //Performing same checks as earlier but for country groups.
      //Check if measure type in datum (loop data set instance) and current interation for graph are same.
      else if (
        datum?.dimensions?.COUNTRY_GRP?.length !== 0 &&
        datum?.dimensions?.COUNTRY_GRP !== undefined &&
        countryMap?.[datum?.dimensions?.COUNTRY_GRP] !== undefined &&
        datum?.attributes?.MEASURE_TYPE === attributes?.[graphIndex]?.code
      ) {
        // Calcualting index value at which to insert the data (Year on X axis)
        const diff =
          datum?.dimensions?.YEAR - measure?.dimensions?.[3]?.lower_bound;
        // Assigning Numeric value from iteration instance (Y value)
        graph[diff].yData[datum?.dimensions?.COUNTRY_GRP] =
          datum?.value?.numeric;
      }
    });
  });


  //Function that generates random RGBA string for colors used in graph.
  function random_rgba() {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return (
      "rgba(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + "," + 1 + ")"
    );
  }

  //Deleting all the properties that still have initial -1 values
  //This numeric values are not important, so we can delete them
  graphs.forEach((graph) => {
    graph.forEach((element) => {
      const keys = Object.keys(element.yData);
      keys.forEach((key) => {
        if (element.yData[key] === -1) {
          delete element.yData[key];
        }
      });
    });
  });

  //Generating labels for X axis (all the years in YYYY format. We can change it to anything in future)
  let tempLabel = [];
  for (let count = 0; count < YEARRANGE; count++) {
    tempLabel.push(measure?.dimensions?.[3]?.lower_bound + count);
  }
  return (
    <div className="h-full w-5/6 flex">
      <div className="h-full w-full m-auto">
        <LineChartComponent
          graphIndex={graphIndex}
          tempLabel={tempLabel}
          dimension={dimension?.[graphIndex]?.values}
          random_rgba={random_rgba}
          graphs={graphs}
        />
      </div>
    </div>
  );
}
