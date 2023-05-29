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
        resolve(rows._array);
      });
    });
  });
}

export async function saveMenuItems(menuItems) {

  
    db.transaction((tx) => {
        tx.executeSql(
          `insert into menuitems (uuid, category, name, price, description, image) values ${menuItems.map((item) =>`( '${item.category}', '${item.name}', '${item.price}', '${item.description}','${item.image}')`).join(', ')}`
        );
      }
    );

}


export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
 

    db.transaction((tx) => {
      let whereClause = '';
      let params = [];

      if (Array.isArray(activeCategories) && activeCategories.length > 0) {
        whereClause = ' WHERE category IN (' + activeCategories.map(() => '?').join(',') + ')';
        params = activeCategories;
      }

      if (query) {
        if (whereClause) {
          whereClause += ' AND ';
        } else {
          whereClause = ' WHERE ';
        }

        whereClause += 'title LIKE ?';
        params.push(`%${query}%`);
      }

      tx.executeSql(`SELECT * FROM menuitems${whereClause}`, params, (_, { rows }) => {
        resolve(rows._array);
      });
    });

  });
}
