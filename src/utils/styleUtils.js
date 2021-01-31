
export const setStyleList = (listItems, styleClassName) => {
  let styleList = {};
  for (let item of listItems) {
    styleList[item] = styleClassName;
  };
  return styleList;
};