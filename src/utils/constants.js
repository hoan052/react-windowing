import faker from 'faker';

export const titleList = [
  'Account',
  'Account Name',
	'Email',
	'Phone Number',
	'Address',
  'Product Name',
  'Product Description',
	'Amount',
	'Currency Code',
	'Currency Name',
	'Credit Card Number',
	'Credit Card CVV',
	'Transaction Type',
	'Transaction Description',
];

export const pathList = [
  'account',
  'accountName',
  'email',
	'phoneNumber',
	'address',
  'productName',
  'productDescription',
	'amount',
	'currencyCode',
	'currencyName',
	'creditCardNumver',
	'creditCardCVV',
	'transactionType',
	'transactionDescription'
];

export const dataMappingList = [
  {
    pathList: 'id',
    generateData: faker.random.uuid
  },
  {
    pathList: 'account',
    generateData: faker.finance.account
  },
  {
    pathList: 'accountName',
    generateData: faker.finance.accountName
  },
  {
    pathList: 'email',
    generateData: faker.internet.email
  },
  {
    pathList: 'phoneNumber',
    generateData: faker.phone.phoneNumber
  },
  {
    pathList: 'address',
    generateData: faker.address.streetAddress
  },
  {
    pathList: 'productName',
    generateData: faker.commerce.productName
  },
  {
    pathList: 'productDescription',
    generateData: faker.commerce.productDescription
  },
  {
    pathList: 'amount',
    generateData: faker.finance.amount
  },
  {
    pathList: 'currencyCode',
    generateData: faker.finance.currencyCode
  },
  {
    pathList: 'currencyName',
    generateData: faker.finance.currencyName
  },
  {
    pathList: 'creditCardNumver',
    generateData: faker.finance.creditCardNumber
  },
  {
    pathList: 'creditCardCVV',
    generateData: faker.finance.creditCardCVV
  },
  {
    pathList: 'transactionType',
    generateData: faker.finance.transactionType
  },
  {
    pathList: 'transactionDescription',
    generateData: faker.finance.transactionDescription
  }
];