import { client } from "@/db/database";
// import { MongoClient } from 'mongodb';

export async function GET() {
  try {
    await client.connect();
    const db = client.db("myFirstDatabase");
    
    const classes = await db.collection('class').find({}).toArray()
    return Response.json(classes);
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
    const classs = await db.collection('class').insertOne(data)
    
    return Response.json({message: "success"});
  } catch (error) {
    return Response.json({ error: "Unable to connect to database" });
  } finally {
    await client.close();
  }

  
}
