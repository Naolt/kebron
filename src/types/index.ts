import { Gallery } from "@/models/gallery";
import { Livestream } from "@/models/livestream";
import { Sermon } from "@/models/sermon";

type SermonResponse = {
  items: Sermon[];
  total: number;
  currentPage: number;
  hasMore: boolean;
};

type GalleryResponse = {
  items: Gallery[];
  total: number;
  currentPage: number;
  hasMore: boolean;
};

type LiveStreamResponse = {
  items: Livestream[];
  total: number;
  currentPage: number;
  hasMore: boolean;
};

export type { SermonResponse, GalleryResponse, LiveStreamResponse };
