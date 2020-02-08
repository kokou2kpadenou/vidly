import _ from "lodash";

export const dateFormating = date => {
  return date ? new Date(date).toDateString().slice(4) : "";
};

export const feeUpToday = (dateOut, dailyRate) => {
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dateStart = new Date(dateOut);
  const dateEnd = new Date();
  const timeDiff = Math.abs(dateEnd.getTime() - dateStart.getTime());
  const daysDiff = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  return dailyRate * daysDiff;
};

export const getDescendantProp = (obj, path) =>
  path.split(".").reduce((acc, part) => acc && acc[part], obj);

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
