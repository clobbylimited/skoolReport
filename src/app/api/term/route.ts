import { client } from "@/db/database";
// import { MongoClient } from 'mongodb';

export async function GET() {
  try {
    await client.connect();
    const db = client.db("myFirstDatabase");
    
    const terms = await db.collection('term').find({}).toArray()
    return Response.json(terms);
  } catch (error) {
    console.log(error)
    return Response.json({ error: "Unable to connect to database" });
  } finally {
    await client.close();
  }

  
}

export async function POST(req: any) {
  try {
    await client.connect();
    const db = client.db("myFirstDatabase");
    
    const data = await req.json()
    const term = await db.collection('term').insertOne(data)
    
    return Response.json({message: "success"});
  } catch (error) {
    return Response.json({ error: "Unable to connect to database" });
  } finally {
    await client.close();
  }

  
}
