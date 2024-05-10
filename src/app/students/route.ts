import { client } from "@/db/database";
// import { MongoClient } from 'mongodb';

export async function GET() {
  try {
    await client.connect();
    const db = client.db("myFirstDatabase");
    
    const students = await db.collection('student').find({}).toArray()
    return Response.json(students);
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
    const student = await db.collection('student').insertOne(data)
    
    return Response.json(student);
  } catch (error) {
    return Response.json({ error: "Unable to connect to database" });
  } finally {
    await client.close();
  }

  
}
