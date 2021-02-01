import { useState } from 'react';
import classNames from 'classnames';

import Table from './components/Table/Table';
import { setStyleList } from './utils/styleUtils';
import { generateDataList } from './utils/dataUtils';
import {
  titleList,
  pathList,
  dataMappingList,
  DEFAULT_ROW_HEIGHT,
  MEDIUM_SIZE_COLUMNS,
  DEFAULT_SCROLL_THRESHOLD,
  MAXIMUM_DEFAULT_TOTAL_ITEMS
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
  const [isVisible, setVisible] = useState(false);
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
      <div class={css.btnGroup}>
        <button
          onClick={() => setVisible(true)}
          className={classNames(css.btn, css.btnSuccess)}
        >
          Show Table
        </button>
        <button
          onClick={() => setVisible(false)}
          className={classNames(css.btn, css.btnLight)}
        >
          Hide Table
        </button>
      </div>
      <div class={css.tableSection}>
        {isVisible && <Table
          dataList={dataList}
          pathList={pathList}
          titleList={titleList}
          rowHeight={DEFAULT_ROW_HEIGHT}
          dataMappingFunc={dataMappingFunc}
          getMoreDataList={getMoreDataList}
          customClassName={customClassName}
          getInitialDataList={getInitialDataList}
          scrollThreshold={DEFAULT_SCROLL_THRESHOLD}
          maxTotalItems={MAXIMUM_DEFAULT_TOTAL_ITEMS}
        />}
      </div>
    </div>
  );
}

export default App;
