import { gql, GraphQLClient } from "graphql-request";
import Section from "../components/Section";
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

  return (
    <>
      <div className="app">
        <div className="main-video">
          <img
            src={randomVideos(videos).thumbnail.url}
            alt={randomVideos(videos).title}
          />
        </div>
      </div>
      <div className="video-feed">
        <section genre={"Action"} />
        <section genre={"Action"} />
        <section genre={"Action"} />
        <section genre={"Action"} />
        <section genre={"Action"} />
        <section genre={"Action"} />
      </div>
    </>
  );
};

export default Home;
