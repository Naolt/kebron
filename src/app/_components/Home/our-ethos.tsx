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
      title: "ተልዕኳችን",
      description: `ኬብሮን አለም አቀፍ ቤተክርስቲያን ሮሰልሳይም ተልዕኳችን በእግዚአብሔር ቃል አባላትን(
አማኞች) በማስታጠቅ፤ በመንፈስ ቅዱስ ኃይል እንዲሞሉ በመፀለይና በማበረታታት ግብዝነት
በሌለው የወንድማማች ፍቅር ህብረት እያደረጉ ኢየሱስ ክርስቶስን እንዲመስሉ መርዳት ነዉ፡፡
`,
      icon: "FlagIcon",
    },
    {
      title: "ራዕያችን",
      description: `ኬብሮን አለም አቀፍ ቤተክርስቲያን ሮሰልሳይም ራዕያችን የቤተክርስቲያን አበላት(
አማኞች) በመንፈስ የሆነ እዉነተኛና ትርጉም ያለዉ ህብረት በማድረግ በመንፈስ ቅዱስ ኃይልና
በጌታ ቃል ህይወታቸዉ ተለውጦ የምስራቹን ወንጌል በመስበክ በተሰጣቸዉ ፀጋ በትጋት
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
  german: [
    {
      title: "Unsere Mission",
      description:
        `Die Mission der internationalen Kirche Kebron in Rüsselsheim ist es, die Mitglieder
(Gläubigen) durch das Wort Gottes auszurüsten; indem wir beten und ermutigen, damit sie
mit der Kraft des Heiligen Geistes erfüllt werden, und indem sie in aufrichtiger brüderlicher
Liebe Gemeinschaft haben, ihnen zu helfen, Jesus Christus ähnlich zu werden.`,
      icon: "FlagIcon",
    },
    {
      title: "Unsere Vision",
      description:
        `Die Vision der internationalen Kirche Kebron in Rüsselsheim ist es, zu sehen, dass die
Gemeindemitglieder (Gläubigen) durch geistliche, wahre und bedeutungsvolle
Gemeinschaft, indem ihr Leben durch die Kraft des Heiligen Geistes und durch das Wort
des Herrn verändert wird, und indem sie das gute Evangelium predigen, mit der ihnen
gegebenen Gnade fleißig dienen.`,
      icon: "EyeIcon",
    },
    {
      title: "Unsere Werte",
      description:
        `In der Kebron Internationalen Kirche werden wir von drei grundlegenden Hauptwerten
geleitet: das Wort Gottes als unsere Grundlage und unsere Anleitung (Hebräer 4:12), der
Heilige Geist als unser Lehrer und die Quelle unserer Kraft (Johannes 14:26), sowie Einheit
und brüderliche Liebe als unser Ruf, durch den wir die wahre Liebe Christi zeigen (1. Petrus
1:22).`,
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
      className="flex flex-col gap-4 p-6 rounded-lg hover:bg-black/5 transition-colors h-full"
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
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col gap-6"
      >
        {ETHOS.german.map((_, index) => (
          <div key={index} className="grid md:grid-cols-2 gap-12">
            {/* German Card */}
            <EthosCard
              title={ETHOS.german[index].title}
              description={ETHOS.german[index].description}
              icon={ETHOS.german[index].icon as "FlagIcon" | "EyeIcon" | "HeartIcon"}
            />
            {/* English Card */}
            <EthosCard
              title={ETHOS.english[index].title}
              description={ETHOS.english[index].description}
              icon={ETHOS.english[index].icon as "FlagIcon" | "EyeIcon" | "HeartIcon"}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default OurEthos;
