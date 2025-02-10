import connectDB from "@/lib/mongodb";
import { Contact } from "@/models/contact";
import { Gallery } from "@/models/gallery";
import { Livestream } from "@/models/livestream";
import { Sermon } from "@/models/sermon";
//import { Livestream } from "@/models/livestream";

async function getContactPerson() {
  try {
    await connectDB();
    const contact = await Contact.findOne();
    return contact;
  } catch (error) {
    console.error("Error fetching contact person:", error);
    return null;
  }
}

async function getGallery() {
  try {
    await connectDB();
    const gallery = await Gallery.find();
    return gallery;
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return null;
  }
}

async function getSermons() {
  try {
    await connectDB();
    const sermons = await Sermon.find();
    return sermons;
  } catch (error) {
    console.error("Error fetching sermons:", error);
    return null;
  }
}

async function getLiveStream() {
  try {
    await connectDB();
    const liveStream = await Livestream.find();
    return liveStream;
  } catch (error) {
    console.error("Error fetching live stream:", error);
    return null;
  }
}

export { getContactPerson, getGallery, getSermons, getLiveStream };
