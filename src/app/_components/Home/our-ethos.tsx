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
        "To equip the members (believers) with the Word of God; to pray and encourage them to be filled with the power of the Holy Spirit; and to help them imitate Jesus Christ by forming a fellowship of brotherly love without hypocrisy.",
      icon: "FlagIcon",
    },
    {
      title: "Our Vision",
      description:
        "To see the church members (believers) in a spiritually authentic and meaningful fellowship, transformed by the power of the Holy Spirit and the Word of the Lord, serving diligently with the grace given to them by preaching the good news of the gospel.",
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
      description: `ኬብሮን አለም አቀፍ ቤተክርሰቲያን ሮሳልሰይም ተልዕኮችን በእግዚአብሄር ቃል አባላትን(
አማኞች) በማስታጠቅ፤ በመንፈስ ቅዱስ ኃይል እንዲሞሉ በመፀለይና በማበረታታት ግብዝናት
በሌለዉ የወንድማማች ፍቅር ህብረት እያደረጉ ኢየሱስ ክርስቶስን እንዲመስሉ መርዳት ነዉ፡፡
`,
      icon: "FlagIcon",
    },
    {
      title: "ራእያችን",
      description: `ኬብሮን አለም አቀፍ ቤተክርሰቲያን ሮሳላሰይም ራዕያችን የቤተክርስቲያን አበላት(
አማኞች) በመንፈስ የሆነ እዉነተኛና ትርጉም የላዉ ህብረት በማድረግ በመንፈስ ቅዱስ ኃይልና
በጌታ ቃል ህይወታቸዉ ተለወጦ የምስራቹን ወንጌል በመስበክ በተሰጣቸዉ ፀጋ በትጋት
ስያገለግሉ ማየት ነዉ፡፡`,
      icon: "EyeIcon",
    },
    {
      title: "እሴቶቻችን",
      description:
        "በኬብሮን ኢንተርናሽናል ቤተክርስቲያን በሶስት ዋና ዋና መሰረታዊ እሴቶች እንመራለን፤ የእግዚአብሔር ቃል እንደ መሰረታችንና መመሪያችን (ዕብራውያን 4፡12)፣ መንፈስ ቅዱስ እንደ አስተማሪያችንና የኃይላችን ምንጭ (ዮሐንስ 14፡26)፣ እንዲሁም አንድነትና የወንድማማችነት ፍቅር እንደ እውነተኛ የክርስቶስን ፍቅር የምናሳይበት ጥሪያችን (1ኛ ጴጥሮስ 1፡22)።",
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
        <h3 className="text-2xl font-semibold text-gray-900 font-ethiopian">
          {title}
        </h3>
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
