import Card from "./Card";
import Link from "next/Link";

const Section = ({ genre, videos }) => {
  return (
    <div className="section">
      <h3>{genre}</h3>
      <div>
        {videos?.map((video) => (
          <Link key={video.id} href={`/video/${video.slug}`}>
            <Card thumbnail={video.thumbnail} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Section;
