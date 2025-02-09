"use client";
import React from "react";
import { motion } from "framer-motion";
import { Flag, Eye, Heart } from "lucide-react";

const ICONS = {
  FlagIcon: Flag,
  EyeIcon: Eye,
  HeartIcon: Heart,
};

const ETHOS = {
  english: [
    {
      title: "Our Mission",
      description:
        "To know Christ and make Him known. We exist to glorify God by sharing His message of love, grace, and hope with everyone. Through worship, discipleship, and service, we aim to inspire and equip people to live out their faith.",
      icon: "FlagIcon",
    },
    {
      title: "Our Vision",
      description:
        "To be a light in the world by building a Christ-centered community where all are welcome, lives are transformed, and hearts are drawn closer to God.",
      icon: "EyeIcon",
    },
    {
      title: "Our Values",
      description:
        "At Kebron International Church, we are guided by three key pillars: the Word of God as our foundation and guide (Hebrews 4:12), the Holy Spirit as our teacher and source of strength (John 14:26), and Unity & Brotherly Love as our calling to embody genuine, Christ-like love (1 Peter 1:22).",
      icon: "HeartIcon",
    },
  ],
  amharic: [
    {
      title: "ተልእኮአችን",
      description:
        "ክርስቶስን ለማወቅና እሱንም ለሌሎች ለማሳወቅ። የእግዚአብሔርን የፍቅር፣ የጸጋና የተስፋ መልዕክት ለሁሉም በማካፈል እግዚአብሔርን ለማክበር እንኖራለን። በአምልኮ፣ በደቀ መዝሙርነትና በአገልግሎት በኩል ሰዎች እምነታቸውን በሕይወታቸው እንዲኖሩ ለማነሳሳትና ለማስታጠቅ እንሻለን።",
      icon: "FlagIcon",
    },
    {
      title: "ራእያችን",
      description:
        "በክርስቶስ ላይ የተመሰረተ ማህበረሰብን በመገንባት በዓለም ውስጥ ብርሃን ለመሆን። ሁሉም እንግዶች የሚቀበሉበት፣ ሕይወቶች የሚለወጡበት እና ልቦች ወደ እግዚአብሔር የሚቀርቡበት ማህበረሰብ።",
      icon: "EyeIcon",
    },
    {
      title: "እሴቶቻችን",
      description:
        "በከብሮን ኢንተርናሽናል ቤተክርስቲያን በሶስት ዋና ዋና መሰረታዊ እሴቶች እንመራለን፤ የእግዚአብሔር ቃል እንደ መሰረታችንና መመሪያችን (ዕብራውያን 4፡12)፣ መንፈስ ቅዱስ እንደ አስተማሪያችንና የኃይላችን ምንጭ (ዮሐንስ 14፡26)፣ እንዲሁም አንድነትና የወንድማማችነት ፍቅር እንደ እውነተኛ የክርስቶስን ፍቅር የምናሳይበት ጥሪያችን (1ኛ ጴጥሮስ 1፡22)።",
      icon: "HeartIcon",
    },
  ],
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function EthosCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: keyof typeof ICONS;
}) {
  const Icon = ICONS[icon];

  return (
    <motion.div
      variants={item}
      className="flex flex-col gap-4 p-6 rounded-lg hover:bg-black/5 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

function OurEthos() {
  return (
    <div className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28 bg-white">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Amharic Section */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {ETHOS.amharic.map((ethos, index) => (
            <EthosCard
              key={index}
              title={ethos.title}
              description={ethos.description}
              icon={ethos.icon as "FlagIcon" | "EyeIcon" | "HeartIcon"}
            />
          ))}
        </motion.div>

        {/* English Section */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {ETHOS.english.map((ethos, index) => (
            <EthosCard
              key={index}
              title={ethos.title}
              description={ethos.description}
              icon={ethos.icon as "FlagIcon" | "EyeIcon" | "HeartIcon"}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default OurEthos;
