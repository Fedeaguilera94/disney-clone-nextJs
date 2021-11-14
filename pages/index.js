import { gql, GraphQLClient } from "graphql-request";
import Section from "../components/Section";
import NavBar from "../components/NavBar";
export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;
  const graphQLclient = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.TOKEN_GRAPH,
    },
  });

  const query = gql`
    query {
      videos {
        createdAt
        id
        title
        description
        seen
        slug
        tags
        thumbnail {
          url
        }
        mp4 {
          url
        }
      }
    }
  `;

  const data = await graphQLclient.request(query);
  const videos = data.videos;

  return {
    props: {
      videos,
    },
  };
};

const Home = ({ videos }) => {
  const randomVideos = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)];
  };

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre));
  };

  const unSeenVideos = (videos) => {
    return videos.filter(
      (videos) => videos.seen == false || videos.seen == null
    );
  };

  return (
    <>
      <NavBar />
      <div className="app">
        <div className="main-video">
          <img
            src={randomVideos(videos).thumbnail.url}
            alt={randomVideos(videos).title}
          />
        </div>

        <div className="video-feed">
          <Section
            genre={"Recommended for you"}
            videos={unSeenVideos(videos)}
          />
          <Section genre={"Action"} videos={filterVideos(videos, "Action")} />
          <Section genre={"Marvel"} videos={filterVideos(videos, "Marvel")} />
          <Section genre={"Disney"} videos={filterVideos(videos, "disney")} />
          <Section genre={"Pixar"} videos={filterVideos(videos, "Pixar")} />
          <Section
            genre={"Star Wars"}
            videos={filterVideos(videos, "Star Wars")}
          />
          <Section genre={"Family"} videos={filterVideos(videos, "Family")} />
        </div>
      </div>
    </>
  );
};

export default Home;
