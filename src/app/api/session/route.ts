import { client } from "@/db/database";
// import { MongoClient } from 'mongodb';

export async function GET() {
  try {
    await client.connect();
    const db = client.db("myFirstDatabase");
    
    const sessions = await db.collection('session').find({}).toArray()
    return Response.json(sessions);
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
    const session = await db.collection('session').insertOne(data)
    
    return Response.json({message: "success"});
  } catch (error) {
    return Response.json({ error: "Unable to connect to database" });
  } finally {
    await client.close();
  }

  
}
