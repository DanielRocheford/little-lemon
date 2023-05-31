import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('little_lemon');

export async function isTableExists () {
    return new Promise((resolve, reject) => {
      db.transaction((transaction) => {
        transaction.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='menuitems'",
          [],
          (_, resultSet) => {
            
            const tableExists = resultSet.rows.length > 0;
            resolve(tableExists);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };
  export async function isTableEmpty  () {
    return new Promise((resolve, reject) => {
      db.transaction((transaction) => {
        transaction.executeSql(
          "SELECT COUNT(*) FROM menuitems",
          [],
          (_, resultSet) => {
            // Get the count from the query result
            const count = resultSet.rows.item(0)['COUNT(*)'];
           
            const tableHasData = count > 0;
            resolve(tableHasData);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };
export async function createMenuItemTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, category text, name text, price text, description text, image text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        console.log('get menu'+JSON.stringify(rows._array) )
        resolve(rows._array);
      });
    });
  });
}
export async function saveMenuItems(menuItems) {
  console.log('db save' + JSON.stringify(menuItems));
  db.transaction(
    (tx) => {
      menuItems.forEach((item) => {
        tx.executeSql(
          `insert into menuitems (category, name, price, description, image) values ( ?, ?, ?, ?, ?)`,
          [
            item.category,
            item.name,
            item.price,
            item.description,
            item.image,
          ],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              console.log('Insertion successful.');
            } else {
              console.log('Insertion failed.');
            }
          },
          (_, error) => {
            console.log('Transaction error:', error);
          }
        );
      });
    },
    (error) => {
      console.log('Transaction error:', error);
    },
    () => {
      console.log('Transaction successfully completed.');
    }
  );
}




export async function filterByQueryAndCategories(query, activeCategories) {  
  
  return new Promise((resolve) => {
   
    var stringTobeSorted = activeCategories.join("', '");
      
        
        db.transaction(
          (tx) => {
          tx.executeSql( `select * from menuitems where name like '%${query}%' AND   category IN('${stringTobeSorted}') `, [], (_, { rows }) => {
           
              
            resolve(rows._array);  
                   
          }),
          (error) => {
            console.log('Transaction sort error:', error);
          },
          () => {
            console.log('Transaction sort successfully completed.');
          }
        });
      
      
   
     
  });
}
