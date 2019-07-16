const formatDate = timestamp => {
  const time = new Date(Number(timestamp));
  var year = time.getFullYear();
  var month = new String(time.getMonth() + 1);
  var date = new String(time.getDate());
  month = month.length === 1 ? `0${month}` : month;
  date = date.length === 1 ? `0${date}` : date;
  return `${year}-${month}-${date}`;
};

export { formatDate };
