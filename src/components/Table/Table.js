import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TableData from '../TableData/TableData';
import TableHeading from '../TableHeading/TableHeading';
import { DEFAULT_TOTAL_ITEMS, DEFAULT_SCROLL_THRESHOLD } from '../../utils/constants'

import css from './Table.module.css';

const Table = (props) => {
  const {
    pathList,
    dataList,
    rowHeight,
    titleList,
    totalItems,
    dataMappingFunc,
    scrollThreshold,
    customClassName,
    getMoreDataList,
    getInitialDataList
  } = props;
  const tableContainerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [initialTotalItems, setInitialTotalItems] = useState(0);
  const handleScrollEvent = () => {
    if (tableContainerRef && tableContainerRef.current) {
      const scrollTop = tableContainerRef.current.scrollTop;
      const containerHeight = tableContainerRef.current.clientHeight;
      const scrollHeight = tableContainerRef.current.scrollHeight;

      if ((containerHeight + scrollTop) >= (scrollHeight * scrollThreshold) && dataList.length < totalItems) {
        getMoreDataList && getMoreDataList(initialTotalItems);
      }
    }
  };

  useEffect(() => {
    if (tableContainerRef && tableContainerRef.current) {
      const domRect = tableContainerRef.current.getBoundingClientRect();
      const topOffset = domRect.top;
      const windowHeight = window.innerHeight || (document.documentElement || document.body).clientHeight;
      // TODO: Need to calculate correctly container height
      const containerHeight = tableContainerRef.current.clientHeight || windowHeight - topOffset;
      const totalItems = Math.ceil(containerHeight / rowHeight);

      setContainerHeight(containerHeight);
      setInitialTotalItems(totalItems);
      getInitialDataList && getInitialDataList(totalItems);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowHeight]);

  const isDataList = !!(Array.isArray(dataList) && dataList.length);
  return (
    <div
      ref={tableContainerRef}
      onScroll={handleScrollEvent}
      className={css.tableContainer}
      style={{ height: containerHeight }}>
      {isDataList && <div className={classNames(css.table, customClassName.table)}>
        <div className={classNames(css.tableHead, customClassName.tableHead)}>
          <TableHeading
            titleList={titleList}
            customClassName={customClassName}
          />
        </div>
        <div className={classNames(css.tableBody, customClassName.tableBody)}>
          {dataList.map((item, index) => {
            const newItem = dataMappingFunc ? dataMappingFunc(item, index): item;
            return (
              <div key={index} className={classNames(css.tableRow, customClassName.tableRow)}>
                {pathList.map((path, key) => (
                  <TableData
                    key={`${item.id}-${key}`}
                    index={index}
                    pathName={path}
                    customClassName={customClassName}
                  >
                    {newItem[path]}
                  </TableData>
                ))}
              </div>
            );
          })}
        </div>
      </div>}
    </div>
  );
};

Table.propTypes = {
  totalItems: PropTypes.number,
  dataMappingFunc: PropTypes.func,
  scrollThreshold: PropTypes.number,
  getMoreDataList: PropTypes.func.isRequired,
  getInitialDataList: PropTypes.func.isRequired,
  titleList: PropTypes.arrayOf(PropTypes.string),
  dataList: PropTypes.arrayOf(PropTypes.object).isRequired,
  pathList: PropTypes.arrayOf(PropTypes.string).isRequired,
  customClassName: PropTypes.object
};

TableHeading.defaultProps = {
  titleList: [],
  customClassName: {},
  dataMappingFunc: null,
  totalItems: DEFAULT_TOTAL_ITEMS,
  scrollThreshold: DEFAULT_SCROLL_THRESHOLD
};

export default Table;
