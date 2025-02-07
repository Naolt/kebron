import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { format } from "date-fns";
import { AddSermonForm } from "./_components/add-sermon-form";
import { SermonCard } from "./_components/sermon-card";
import { SermonsList } from "./_components/sermons-list";

type SermonItemType = {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  videoUrl: string;
  date: string;
};

const sermonItems: SermonItemType[] = [
  {
    id: "1",
    title: "Understanding Faith in Modern Times",
    thumbnail: "https://picsum.photos/1920/1080?random=1",
    duration: "45:30",
    videoUrl: "https://youtube.com/watch?v=123",
    date: "2024-03-20",
  },
  {
    id: "2",
    title: "Understanding Faith in Modern Times",
    thumbnail: "https://picsum.photos/1920/1080?random=1",
    duration: "45:30",
    videoUrl: "https://youtube.com/watch?v=123",
    date: "2024-03-20",
  },
  {
    id: "3",
    title: "Understanding Faith in Modern Times",
    thumbnail: "https://picsum.photos/1920/1080?random=1",
    duration: "45:30",
    videoUrl: "https://youtube.com/watch?v=123",
    date: "2024-03-20",
  },
  {
    id: "4",
    title: "Understanding Faith in Modern Times",
    thumbnail: "https://picsum.photos/1920/1080?random=1",
    duration: "45:30",
    videoUrl: "https://youtube.com/watch?v=123",
    date: "2024-03-20",
  },
];

//function SermonCard({ item }: { item: SermonItemType }) {
//  const formattedDate = format(new Date(item.date), "MMMM d, yyyy");

//  return (
//    <div className="relative rounded-lg overflow-hidden bg-white  transition-all duration-300 ease-in-out">
//      {/* Thumbnail section with actions */}
//      <div className="relative aspect-video group">
//        <Image
//          src={item.thumbnail}
//          alt={item.title}
//          fill
//          className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
//          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//        />

//        {/* Duration badge */}
//        <div className="absolute bottom-2 right-2 bg-black/75 text-white px-2 py-1 rounded-md text-sm">
//          {item.duration}
//        </div>

//        {/* Play button */}
//        <a
//          href={item.videoUrl}
//          target="_blank"
//          rel="noopener noreferrer"
//          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
//        >
//          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transform hover:scale-110 transition-all duration-300">
//            <svg
//              className="w-6 h-6 text-white"
//              fill="currentColor"
//              viewBox="0 0 24 24"
//            >
//              <path d="M8 5v14l11-7z" />
//            </svg>
//          </div>
//        </a>

//        {/* Action buttons */}
//        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out translate-y-[-10px] group-hover:translate-y-0">
//          <Button
//            variant="ghost"
//            size="icon"
//            className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-full transform hover:scale-105 transition-all duration-300"
//          >
//            <Pencil className="w-5 h-5 text-white" />
//          </Button>
//          <Button
//            variant="ghost"
//            size="icon"
//            className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-full transform hover:scale-105 transition-all duration-300"
//          >
//            <Trash2 className="w-5 h-5 text-white" />
//          </Button>
//        </div>
//      </div>

//      {/* Content */}
//      <div className="p-4 transform group-hover:translate-y-[-2px] transition-transform duration-300">
//        <h3 className="font-medium text-lg line-clamp-1">{item.title}</h3>
//        <p className="text-sm text-gray-500 mt-1">{formattedDate}</p>
//      </div>
//    </div>
//  );
//}

export default function SermonsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Sermons Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AddSermonForm />
        <SermonsList />
      </div>
    </div>
  );
}
