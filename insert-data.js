const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url =
  "mongodb+srv://MovieCenter:pass123@moviecenter1.nmd47ji.mongodb.net/";
const dbName = "vidly";

async function run() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection "genres"
    const col = db.collection("genres");

    const data = [
      {
        name: "Comedy",
        movies: [
          { title: "Airplane", numberInStock: 5, dailyRentalRate: 2 },
          { title: "The Hangover", numberInStock: 10, dailyRentalRate: 2 },
          { title: "Wedding Crashers", numberInStock: 15, dailyRentalRate: 2 },
        ],
      },
      {
        name: "Action",
        movies: [
          { title: "Die Hard", numberInStock: 5, dailyRentalRate: 2 },
          { title: "Terminator", numberInStock: 10, dailyRentalRate: 2 },
          { title: "The Avengers", numberInStock: 15, dailyRentalRate: 2 },
        ],
      },
      {
        name: "Romance",
        movies: [
          { title: "The Notebook", numberInStock: 5, dailyRentalRate: 2 },
          {
            title: "When Harry Met Sally",
            numberInStock: 10,
            dailyRentalRate: 2,
          },
          { title: "Pretty Woman", numberInStock: 15, dailyRentalRate: 2 },
        ],
      },
      {
        name: "Thriller",
        movies: [
          { title: "The Sixth Sense", numberInStock: 5, dailyRentalRate: 2 },
          { title: "Gone Girl", numberInStock: 10, dailyRentalRate: 2 },
          { title: "The Others", numberInStock: 15, dailyRentalRate: 2 },
        ],
      },
    ];

    // Insert documents one by one from the data array
    for (let genre of data) {
      const result = await col.insertOne(genre);
      console.log("Inserted genre:", result.insertedId);
    }

    // Count the number of documents in the "genres" collection
    const count = await col.countDocuments();
    console.log("Total genres after insertion:", count);

    // Find one document
    const myDoc = await col.findOne();
    // Print to the console
    console.log(myDoc);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
