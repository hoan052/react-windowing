import { useState } from 'react';

import Table from './components/Table/Table';
import { setStyleList } from './utils/styleUtils';
import { generateDataList } from './utils/dataUtils';
import {
  titleList,
  pathList,
  dataMappingList,
  DEFAULT_ROW_HEIGHT,
  MEDIUM_SIZE_COLUMNS,
  DEFAULT_TOTAL_ITEMS,
  DEFAULT_SCROLL_THRESHOLD
} from './utils/constants';

import css from './App.module.css';

// Use customClassName prop we can fully control the style of the custom table
const customClassName = {
  table: css.financeTable,
  tableHeading: css.customTableHeading,
  orderHeading: css.smallWidth,
  orderData: css.smallWidth,
  ...setStyleList(MEDIUM_SIZE_COLUMNS, css.mediumWidth)
};

function App() {
  const [dataList, setDataList] = useState([]);
  const getInitialDataList = (totalItems) => {
    const dataList = generateDataList(dataMappingList, totalItems);
    setDataList(dataList);
  };
  const getMoreDataList = (totalItems) => {
    const newDataList = generateDataList(dataMappingList, totalItems);
    setDataList(dataList.concat(newDataList));
  };
  const dataMappingFunc = (item, index) => ({ ...item, order: index + 1 });

  return (
    <div className={css.app}>
      <Table
        totalItems={DEFAULT_TOTAL_ITEMS}
        rowHeight={DEFAULT_ROW_HEIGHT}
        scrollThreshold={DEFAULT_SCROLL_THRESHOLD}
        dataList={dataList}
        pathList={pathList}
        titleList={titleList}
        dataMappingFunc={dataMappingFunc}
        getInitialDataList={getInitialDataList}
        getMoreDataList={getMoreDataList}
        customClassName={customClassName}
      />
    </div>
  );
}

export default App;
