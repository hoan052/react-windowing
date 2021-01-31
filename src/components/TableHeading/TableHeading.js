import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { camelCase } from 'lodash';

import css from './TableHeading.module.css';

const TableHeading = ({ titleList, customClassName }) => (
  titleList.map((item) => {
    const tableHeadingClassName = customClassName.tableHeading;
    const itemHeadingClassName = customClassName[`${camelCase(item)}Heading`];
    return (
      <div
        key={item}
        className={classNames(css.tableHeading, tableHeadingClassName, itemHeadingClassName)}
      >
        {item}
      </div>
    );
  })
);

TableHeading.propTypes = {
  titleList: PropTypes.arrayOf(PropTypes.string),
  customClassName: PropTypes.object
};

TableHeading.defaultProps = {
  titleList: [],
  customClassName: {}
};

export default TableHeading;