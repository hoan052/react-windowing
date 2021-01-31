import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './TableData.module.css';

const TableData = ({ index, pathName, customClassName, children }) => {
  const tableDataClassName = customClassName.tableData;
  const dataItemClassName = customClassName[`${pathName}Data`];
  return (
    <div
      className={classNames(css.tableData, tableDataClassName, dataItemClassName, {
        [css.evenData]: index % 2 === 0,
        [css.oddData]: index % 2 !== 0
      })}>
      {children}
    </div>
  );
};

TableData.propTypes = {
  pathName: PropTypes.string,
  index: PropTypes.number.isRequired,
  customClassName: PropTypes.object,
  children: PropTypes.node.isRequired
};

TableData.defaultProps = {
  pathName: 'table',
  customClassName: {}
};

export default TableData;