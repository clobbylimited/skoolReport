import { client } from "@/db/database";
// import { MongoClient } from 'mongodb';

export async function GET() {
  try {
    await client.connect();
    const db = client.db("myFirstDatabase");
    
    const subjects = await db.collection('subject').find({}).toArray()
    return Response.json(subjects);
  } catch (error) {
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
    const subject = await db.collection('subject').insertOne(data)
    
    return Response.json({message: "success"});
  } catch (error) {
    return Response.json({ error: "Unable to connect to database" });
  } finally {
    await client.close();
  }

  
}
