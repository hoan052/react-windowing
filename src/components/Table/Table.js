import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TableData from '../TableData/TableData';
import TableHeading from '../TableHeading/TableHeading';
import { DEFAULT_SCROLL_THRESHOLD, MAXIMUM_DEFAULT_TOTAL_ITEMS } from '../../utils/constants'

import css from './Table.module.css';

const Table = (props) => {
  const {
    pathList,
    dataList,
    rowHeight,
    titleList,
    maxTotalItems,
    dataMappingFunc,
    scrollThreshold,
    customClassName,
    getMoreDataList,
    getInitialDataList
  } = props;
  const tableContainerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [initialTotalItems, setInitialTotalItems] = useState(0);
  const getElementHeight = (ref) => {
    const clientHeight = ref.current.clientHeight;
    const containerStyle = window.getComputedStyle(ref.current);
    const paddingTop = parseInt(containerStyle.paddingTop, 10);
    const paddingBottom = parseInt(containerStyle.paddingBottom, 10);
    return clientHeight - paddingTop - paddingBottom;
  };
  const handleScrollEvent = () => {
    if (tableContainerRef && tableContainerRef.current) {
      const scrollTop = tableContainerRef.current.scrollTop;
      const containerHeight = getElementHeight(tableContainerRef);
      const scrollHeight = tableContainerRef.current.scrollHeight;

      if ((containerHeight + scrollTop) >= (scrollHeight * scrollThreshold) && dataList.length < maxTotalItems) {
        const totalItems = dataList.length + initialTotalItems;
        const numberOfItems = totalItems < maxTotalItems ? totalItems : maxTotalItems - dataList.length;
        getMoreDataList && getMoreDataList(numberOfItems);
      }
    }
  };

  useEffect(() => {
    if (tableContainerRef && tableContainerRef.current) {
      const domRect = tableContainerRef.current.getBoundingClientRect();
      const topOffset = domRect.top;
      const windowHeight = window.innerHeight || (document.documentElement || document.body).clientHeight;
      const containerHeight = getElementHeight(tableContainerRef) || windowHeight - topOffset;
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
      className={classNames(css.tableContainer, customClassName.tableContainer)}
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
  maxTotalItems: PropTypes.number,
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
  totalItems: MAXIMUM_DEFAULT_TOTAL_ITEMS,
  scrollThreshold: DEFAULT_SCROLL_THRESHOLD
};

export default Table;
