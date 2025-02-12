// import cassandra from 'cassandra-driver';
// import { v4 as uuidv4 } from 'uuid';

// // ScyllaDB Client Configuration
// const client = new cassandra.Client({
//   contactPoints: ['127.0.0.1'], // Replace with Docker container IP if needed
//   localDataCenter: 'datacenter1',
//   keyspace: 'realtime_food_delivery_app', // Set the keyspace you're working with
// });

// // Connect to ScyllaDB
// export async function connectToScylla() {
//   try {
//     await client.connect();
//     console.log('Connected to ScyllaDB!');
//   } catch (err) {
//     console.error('Error connecting to ScyllaDB:', err);
//   }
// }

// // Create Keyspace (if it doesn't already exist)
// export const createKeyspace = async () => {
//   const query = `
//     CREATE KEYSPACE IF NOT EXISTS realtime_food_delivery_app
//     WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}
//   `;
//   await client.execute(query);
//   console.log("Keyspace created or already exists.");
// };


// // Create Table (if it doesn't already exist)
// export async function createTable() {
//   const query = `
//     CREATE TABLE IF NOT EXISTS realtime_food_delivery_app.user(
//       id UUID PRIMARY KEY,
//       name TEXT,
//       email TEXT
//     );
//   `;
//   try {
//     await client.execute(query);
//     console.log('Table created or already exists.');
//   } catch (err) {
//     console.error('Error creating table:', err);
//   }
// }

// // Insert User
// export async function insertUser(name, description) {
//   const query = `INSERT INTO realtime_food_delivery_app.user (id, name, description) VALUES (?, ?, ?)`;
//   const params = [uuidv4(), name, description];
//   try {
//     await client.execute(query, params, { prepare: true });
//     console.log('User inserted successfully!');
//   } catch (err) {
//     console.error('Error inserting user:', err);
//   }
// }

// // Fetch All Users
// export async function getUsers() {
//   const query = `SELECT * FROM realtime_food_delivery_app.user`;
//   try {
//     const result = await client.execute(query);
//     return result.rows;
//   } catch (err) {
//     console.error('Error fetching users:', err);
//     throw err;
//   }
// }

// export { client };
