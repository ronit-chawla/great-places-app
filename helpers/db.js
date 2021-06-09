import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

export const init = () => {
	return new Promise((resolve, reject) =>
		db.transaction(tx => {
			tx.executeSql(
				`
				CREATE TABLE IF NOT EXISTS places(
				  id INTEGER PRIMARY KEY NOT NULL,
				  title TEXT NOT NULL,
				  img TEXT NOT NULL,
				  address TEXT NOT NULL
				);
				`,
				[],
				() => resolve(),
				(_, err) => reject(err)
			);
		})
	);
};

export const insertPlace = (
	title,
	img,
	address,
	lat,
	lng
) => {
	return new Promise((resolve, reject) =>
		db.transaction(tx => {
			tx.executeSql(
				`
          INSERT INTO places(
            title,
            img,
            address,
						lat,
						lng
          )
          VALUES (
            ?,
            ?,
            ?,
						?,
						?
          );
        `,
				[
					title,
					img,
					address,
					lat,
					lng
				],
				(_, result) => resolve(result),
				(_, err) => reject(err)
			);
		})
	);
};

export const fetchPlaces = () => {
	return new Promise((resolve, reject) =>
		db.transaction(tx => {
			tx.executeSql(
				`
          SELECT * FROM places
        `,
				[],
				(_, result) => resolve(result),
				(_, err) => reject(err)
			);
		})
	);
};
