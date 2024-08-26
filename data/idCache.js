import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseAsync('id_cache');

// Initialize the table
export async function initializeDatabase() {
    (await db).execAsync(
        'CREATE TABLE IF NOT EXISTS id_cache (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, location_id TEXT NOT NULL);',
    );

}

// Call this function when your app starts or when you need to initialize the database
try {
    initializeDatabase();
} catch (error) {
    console.log(`Failed to initialize database: ${error}`)
}

