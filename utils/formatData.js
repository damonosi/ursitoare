const ChangeDateOrder = (inputDate) => {
  const dataFormatata = new Date(inputDate);
  const dd = String(dataFormatata.getDate()).padStart(2, "0");
  const mm = String(dataFormatata.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = dataFormatata.getFullYear();
  const dataNoua = dd + "/" + mm + "/" + yyyy;

  return dataNoua;
};

export default ChangeDateOrder;
