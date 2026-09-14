export const getDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getToday = () => {
  return getDateString(new Date());
};

export const getTomorrow = () => {
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  return getDateString(tomorrow);
};