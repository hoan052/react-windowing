import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TableData from '../TableData/TableData';
import TableHeading from '../TableHeading/TableHeading';

import css from './Table.module.css';

const Table = ({ titleList, pathList, dataList, customClassName }) => (
  <div className={classNames(css.table, customClassName.table)}>
    {titleList && <div className={classNames(css.tableHead, customClassName.tableHead)}>
        <TableHeading
          titleList={titleList}
          customClassName={customClassName}
        />
      </div>
    }
    <div className={classNames(css.tableBody, customClassName.tableBody)}>
      {dataList && dataList.map((item, index) => (
        <div key={index} className={classNames(css.tableRow, customClassName.tableRow)}>
          {pathList.map((path, key) => (
            <TableData
              key={`${item.id}-${key}`}
              index={index}
              pathName={path}
              customClassName={customClassName}
            >
              {item[path]}
            </TableData>
          ))}
        </div>
      ))}
    </div>
  </div>
);

Table.propTypes = {
  titleList: PropTypes.arrayOf(PropTypes.string),
  dataList: PropTypes.arrayOf(PropTypes.object).isRequired,
  pathList: PropTypes.arrayOf(PropTypes.string).isRequired,
  customClassName: PropTypes.object
};

TableHeading.defaultProps = {
  titleList: [],
  customClassName: {}
};

export default Table;
