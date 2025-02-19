import connectDB from "@/lib/mongodb";
import { Contact } from "@/models/contact";
import { Gallery } from "@/models/gallery";
import { Livestream } from "@/models/livestream";
import { Sermon } from "@/models/sermon";
import { SermonResponse, GalleryResponse, LiveStreamResponse } from "@/types";
// Remove direct DB access and use API routes instead
async function getGallery({ page = 1, limit = 12 }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/gallery?page=${page}&limit=${limit}`,
      {
        next: {
          tags: ["gallery"],
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch gallery");
    return response.json();
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return null;
  }
}

async function getContact() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/contact`,
      {
        next: {
          tags: ["contact"],
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch contact");
    return response.json();
  } catch (error) {
    console.error("Error fetching contact:", error);
    return null;
  }
}

async function getSermons({ page = 1, limit = 8 }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/sermons?page=${page}&limit=${limit}`,
      {
        next: {
          tags: ["sermons"],
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch sermons");
    return response.json();
  } catch (error) {
    console.error("Error fetching sermons:", error);
    return null;
  }
}

async function getLiveStream({ page = 1, limit = 6 }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/livestreams?page=${page}&limit=${limit}`,
      {
        next: {
          tags: ["livestreams"],
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch livestream");
    return response.json();
  } catch (error) {
    console.error("Error fetching live stream:", error);
    return null;
  }
}

// Server Actions

async function getGalleryServer({
  page = 1,
  limit = 8,
}: {
  page: number;
  limit: number;
}): Promise<GalleryResponse> {
  await connectDB();
  const skip = (page - 1) * limit;
  const gallery: Gallery[] = await Gallery.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const items: Gallery[] = gallery.map((item) => ({
    _id: item._id,
    title: item.title,
    image: item.image,
    publicId: item.publicId,
    createdAt: item.createdAt,
  }));

  // Remove revalidatePath calls
  return {
    items: items,
    total: await Gallery.countDocuments(),
    currentPage: page,
    hasMore: (await Gallery.countDocuments()) > page * limit,
  };
}

async function getContactServer(): Promise<Contact> {
  await connectDB();
  const contact = await Contact.findOne();

  if (!contact) throw new Error("Contact not found");
  const item: Contact = {
    email: contact.email,
    address: contact.address,
    socialLinks: contact.socialLinks,
    createdAt: contact.createdAt,
    updatedAt: contact.updatedAt,
    contactPersonName: contact.contactPersonName,
    contactPersonImage: contact.contactPersonImage,
    mapEmbedLink: contact.mapEmbedLink,
    phoneNumber: contact.phoneNumber,
  };
  return item;
}

async function getSermonsServer({
  page = 1,
  limit = 8,
}): Promise<SermonResponse> {
  await connectDB();

  const skip = (page - 1) * limit;
  const sermons = await Sermon.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const items: Sermon[] = sermons.map((item) => {
    return {
      _id: item._id,
      title: item.title,
      createdAt: item.createdAt,
      videoUrl: item.videoUrl,
      platform: item.platform,
      videoId: item.videoId,
      embedUrl: item.embedUrl,
    };
  });
  return {
    items: items,
    total: await Sermon.countDocuments(),
    currentPage: page,
    hasMore: (await Sermon.countDocuments()) > page * limit,
  };
}

async function getLiveStreamServer({
  page = 1,
  limit = 8,
}): Promise<LiveStreamResponse> {
  await connectDB();
  const skip = (page - 1) * limit;
  const livestreams = await Livestream.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const items: Livestream[] = livestreams.map((item) => {
    return {
      _id: item._id,
      title: item.title,
      videoUrl: item.videoUrl,
      platform: item.platform,
      videoId: item.videoId,
      embedUrl: item.embedUrl,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  });
  return {
    items: items,
    total: await Livestream.countDocuments(),
    currentPage: page,
    hasMore: (await Livestream.countDocuments()) > page * limit,
  };
}

export {
  getGallery,
  getSermons,
  getLiveStream,
  getContact,
  getGalleryServer,
  getContactServer,
  getSermonsServer,
  getLiveStreamServer,
};
