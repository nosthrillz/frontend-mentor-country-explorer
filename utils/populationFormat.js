export const populationFormat = (number) =>
  parseInt(number.toString().split(",").join(""))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
