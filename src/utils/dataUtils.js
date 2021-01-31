
export const generateDataList = (dataMappingList = [], totalItems = 15) => {
  let dataList = [];
  let dataItem = {};  

  for (let i = 0; i < totalItems; i++) {
    for (let j = 0; j < dataMappingList.length; j++) {
      const key = dataMappingList[j].pathList;
      const generateData = dataMappingList[j].generateData;
      dataItem[key] = generateData();
    }
    dataList[i] = { ...dataItem };
    dataItem = {};
  }

  return dataList;
};