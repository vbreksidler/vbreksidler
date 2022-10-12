const formatToPrice = (value) => (
  value.toFixed(2).replace('.', ',')
);

export default formatToPrice;
