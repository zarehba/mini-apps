export class Customer {
  constructor(dbName) {
    this.dbName = dbName;
    if (!window.indexedDB) {
      window.alert(
        "Your browser doesn't support a stable version of IndexedDB. \n This page will not correctly."
      );
    }
  }

  /**
   * Remove all rows from the database
   * @memberof Customer
   */
  removeAllRows = (addToLog) => {
    const request = indexedDB.open(this.dbName, 1);

    request.onerror = (event) => {
      addToLog(
        `🗑 removeAllRows - Database error: ${event.target.error.code} - ${event.target.error.message}`
      );
    };

    request.onsuccess = (event) => {
      addToLog(`🗑 Deleting all customers...`);
      const db = event.target.result;
      const txn = db.transaction('customers', 'readwrite');
      txn.onerror = (event) => {
        addToLog(
          `🗑 removeAllRows - Txn error: ${event.target.error.code} - ${event.target.error.message}`
        );
      };
      txn.oncomplete = (event) => {
        addToLog(`🗑 All rows removed!`);
      };
      const objectStore = txn.objectStore('customers');
      const getAllKeysRequest = objectStore.getAllKeys();
      getAllKeysRequest.onsuccess = (event) => {
        getAllKeysRequest.result.forEach((key) => {
          objectStore.delete(key);
        });
      };
    };
  };

  /**
   * Populate the Customer database with an initial set of customer data
   * @param {[object]} customerData Data to add
   * @memberof Customer
   */
  initialLoad = (addToLog, customerData) => {
    const request = indexedDB.open(this.dbName, 1);

    request.onerror = (event) => {
      addToLog(
        `🙋 initialLoad - Database error: ${event.target.error.code}  - ${event.target.error.message}`
      );
    };

    request.onupgradeneeded = (event) => {
      addToLog(`🙋 Creating database...`);
      const db = event.target.result;
      const objectStore = db.createObjectStore('customers', {
        keyPath: 'userid',
      });
      objectStore.onerror = (event) => {
        addToLog(
          `🙋 initialLoad - objectStore error: ${event.target.error.code} - ${event.target.error.message}`
        );
      };

      // Create an index to search customers by name and email
      objectStore.createIndex('name', 'name', { unique: false });
      objectStore.createIndex('email', 'email', { unique: true });
      addToLog(`🙋 Created Customers database`);
    };

    request.onsuccess = (event) => {
      addToLog(`🙋 Populating customers...`);
      const db = event.target.result;
      const tx = db.transaction('customers', 'readwrite');
      const store = tx.objectStore('customers');

      // Populate the database with the initial set of rows
      customerData.forEach(function (customer) {
        store.put(customer);
      });
      addToLog(`🙋 Populated database with ${customerData.length} data rows!`);

      db.close();
    };
  };

  getData = async (addToLog, handleData) => {
    const request = indexedDB.open(this.dbName, 1);

    request.onsuccess = async function () {
      let db = request.result;

      const customers = db
        .transaction('customers', 'readonly')
        .objectStore('customers');
      const dataRequest = customers.getAll();
      addToLog('🖨 Database query has started.');

      dataRequest.onsuccess = function (e) {
        const data = e.target.result;
        if (!data.length) {
          addToLog('🖨 There are no rows in database to display!');
          return;
        }
        addToLog('🖨 Database query has ended.');
        addToLog('🖨 Printing customers data...');
        handleData(data);
      };

      db.close();
    };
  };
}

// Web page event handlers
const DBNAME = 'customer_db';

/**
 * Clear all customer data from the database
 */
export const clearDB = (addToLog) => {
  addToLog(`▶ Delete all rows from the Customers database`);
  const customer = new Customer(DBNAME);
  customer.removeAllRows(addToLog);
};

/**
 * Add customer data to the database
 */
export const loadDB = (addToLog) => {
  addToLog(`▶ Load the Customers database`);

  // Customers to add to initially populate the database with
  const customerData = [
    { userid: '111', name: 'Ann', email: 'ann@company.com' },
    { userid: '222', name: 'Bill', email: 'bill@home.org' },
    { userid: '333', name: 'Christie', email: 'christie@foundation.org' },
    { userid: '444', name: 'Donna', email: 'donna@gov.uk' },
    { userid: '555', name: 'Eliah', email: 'eliah@agency.eu' },
  ];
  const customer = new Customer(DBNAME);
  customer.initialLoad(addToLog, customerData);
};

/**
 * Get all customer data from the database
 */
export const queryDB = (addToLog, handleData) => {
  addToLog(`▶ Print all rows from the Customers database`);

  const customer = new Customer(DBNAME);
  customer.getData(addToLog, handleData);
};
