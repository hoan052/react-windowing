import Table from './components/Table/Table';
import { generateDataList } from './utils/dataUtils';
import { titleList, pathList, dataMappingList } from './utils/constants';

import css from './App.module.css';

const dataList = generateDataList(dataMappingList);
// Use customClassName prop we can fully control the style of the custom table
const customClassName = {
  table: css.financeTable,
  tableHeading: css.customTableHeading,
  amountHeading: css.customAmountHeading,
  amountData: css.customAmountData
};

function App() {
  return (
    <div className={css.app}>
      <div className={css.container}>
        <Table
          dataList={dataList}
          pathList={pathList}
          titleList={titleList}
          customClassName={customClassName}
        />
      </div>
    </div>
  );
}

export default App;
