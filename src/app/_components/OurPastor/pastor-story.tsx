import { FadeInView } from "@/components/animations/motion-wrapper";
import { Contact } from "@/models/contact";
import Image from "next/image";

export default function PastorStory({ contact }: { contact: Contact }) {
  return (
    <FadeInView className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-8">
      {/* Image Section */}
      <div className="relative aspect-square w-[400px] h-[400px] mx-auto mb-12 flex justify-center">
        <Image
          src={contact?.contactPersonImage || ""}
          alt="Pastor Wondwossen Tadesse"
          width={400}
          height={400}
          className="object-cover rounded-lg w-[full] h-[400px]"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto space-y-12">
        <div>
          <h2 className="text-3xl font-bold">
            A Life Devoted to Faith and Ministry
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              Pastor Wondwossen Tadesse&apos;s journey is one of faith,
              perseverance, and unwavering commitment to God&apos;s calling.
              Born and raised in Hawassa, Ethiopia, he grew up in a devout
              Christian family and was nurtured in Kalehiwot Church, one of the
              most conservative evangelical churches in Ethiopia.
            </p>
            <p>
              His spiritual foundation was laid early, but it was at the age of
              17 that he experienced a profound transformation when he was
              filled with the Holy Spirit during an annual conference at Haikdar
              Kalehiwot Church. From that moment on, serving God became his
              life&apos;s mission.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold">Early Ministry and Leadership</h3>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              Even as a young believer, Pastor Wondwossen actively served in the
              church, beginning with Sunday school ministry. However, his
              calling to frontline ministry took shape when he attended Gondar
              University. While pursuing his education at Maraky Campus, he and
              a group of nine other brothers founded the first campus
              fellowship, inspired by their connection with the well-established
              Medical Campus senior Fellowship.
            </p>
            <p>
              During his time at university, he emerged as a leader and served
              different teams as full-time minister, organizing worship teams,
              leading Bible studies, and nurturing the spiritual growth of many
              students. Beyond campus, he also played a significant role in the
              Gondar Kalehiwot Church choir, strengthening his experience in
              worship ministry.
            </p>
            <p>
              Back from the university he served in Tabour Kale hiwot church as
              worship leader, solo singer and youth ministry leader. Therefore
              After graduating from Gondar University, Pastor Wondwossen
              returned to Hawassa, rejoining his home church with a wealth of
              ministry experience. He continued to serve in the choir and youth
              ministry.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold flex items-end gap-2">
            A Journey of Faith in Germany <Image src={'/icons/germany.png'} alt="GN" width={24} height={24} />
          </h3>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              God had bigger plans for him. In 2010, he moved to Germany, a
              transition that tested and ultimately strengthened his faith.
            </p>
            <p>
              For the first two years, he dedicated himself to learning the
              German language, all while remaining actively involved in various
              ministries. In 2015, he completed his Master&apos;s degree in
              International Economics and Public Policy from Mainz University, a
              significant academic achievement that ran parallel with his
              growing involvement in Christian ministry.
            </p>
            <p>
              Despite professional commitments, Pastor Wondwossen never wavered
              in his devotion to God&apos;s work. In 2016, he released his first
              worship album, titled &quot;Yelbe Nafkot&quot;, a reflection of
              his heart for worship and his desire to reach people through
              Gospel songs. That same year, he shared his vision for church
              planting with his spiritual mentors. In response to God&apos;s
              leading, he embarked on a second Master&apos;s degree in
              Pentecostal and Charismatic Theology to further equip himself for
              ministry. Though balancing work, family, and church
              responsibilities delayed its completion, he is set to graduate
              this year in October 2025, completing yet another milestone in his
              spiritual journey.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold">
            Personal Life: A Testament to God&apos;s Faithfulness
          </h3>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              Pastor Wondwossen&apos;s journey has been one of faith in action.
              When he came to Germany, he arrived with only one bag, but today,
              he can count numerous blessings. After enduring a challenging
              five-year wait, God brought his wife from Ethiopia, and together
              they now have three beautiful children who are being raised in the
              love of Christ.
            </p>
            <p>
              Beyond his personal blessings, Pastor Wondwossen considers the
              founding of Kebron International Church in 2019 one of his
              greatest joys. Since its humble beginnings, the church has grown
              into a vibrant, faith-filled community where people from different
              backgrounds come together to worship, study the Word, and serve
              one another.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold">
            The Vision of Kebron International Church
          </h3>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              For Pastor Wondwossen, Kebron is more than just a place of
              worship—it is a spiritual family. The church was founded on the
              principles of faith, community, and discipleship, emphasizing that
              church is not just about attending services but about living life
              together in Christ. From preaching on the streets to supporting
              one another in difficult times, Kebron is a testament to
              God&apos;s power to unite and transform lives.
            </p>
            <p>
              Pastor Wondwossen continues to lead the church with great passion
              and commitment, believing that only God is able to do the
              incredible things they have witnessed. Through outreach, media
              ministry, and raising up the next generation of leaders, he
              remains dedicated to the great mandate given by Christ—to preach
              the Gospel and make disciples.
            </p>
          </div>
        </div>

        {/* Message Section */}
        <blockquote className="border-l-4 border-primary pl-6 italic mt-8">
          &ldquo;Kebron International Church is a place that transformed my life
          and prepared me for a long-term, fruitful ministry. I believe God has
          called us to be a family—one that supports, nurtures, and grows
          together. Whether you are near or far, my heart&apos;s desire is for
          you to experience the fullness of God&apos;s love and purpose in your
          life. I invite you to be part of this journey and discover what God
          has in store for you!&rdquo;
        </blockquote>
      </div>
    </FadeInView>
  );
}
