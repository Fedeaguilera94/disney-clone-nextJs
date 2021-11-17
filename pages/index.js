import { gql, GraphQLClient } from "graphql-request";
import Section from "../components/Section";
import NavBar from "../components/NavBar";
import Link from "next/link";
import Image from "next/image";
import disneyLogo from "../public/disney-scale.png";
import marvelLogo from "../public/marve-scale.png";
import pixarLogo from "../public/pixar-scale.png";
import starWarsLogo from "../public/star-wars-scale.png";
import natGeoLogo from "../public/natgeo-scale.png";

import Slider from "../components/Slider";

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;
  const token = process.env.TOKEN_GRAPH;
  const graphQLclient = new GraphQLClient(url, {
    headers: {
      Authorization: token || "",
    },
  });

  const videosQuery = gql`
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

  const acccountQuery = gql`
    query {
      account(where: { id: "ckvyg4mj4z7ra0b800bq1ohrz" }) {
        username
        avatar {
          url
        }
      }
    }
  `;

  const data = await graphQLclient.request(videosQuery);
  const videos = data.videos;
  const accountData = await graphQLclient.request(acccountQuery);
  const account = accountData.account;
  return {
    props: {
      videos,
      account,
    },
  };
};

const Home = ({ videos, account }) => {
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
      <div className="nav">
        <NavBar account={account} />
      </div>

      <div className="app">
        <div className="main-video">
          <Slider />
        </div>

        <div className="video-feed">
          <Link href="#disney">
            <div className="franchise">
              <Image className="disney" src={disneyLogo} />
            </div>
          </Link>
          <Link href="#pixar">
            <div className="franchise">
              <Image className="pixar" src={pixarLogo} />
            </div>
          </Link>
          <Link href="#star-wars">
            <div className="franchise">
              <Image className="starwars" src={starWarsLogo} />
            </div>
          </Link>

          <Link href="#marvel">
            <div className="franchise" id="marvel">
              <Image className="marvel" src={marvelLogo} />
            </div>
          </Link>
          <Link href="#nat-geo">
            <div className="franchise">
              <Image className="natgeo" src={natGeoLogo} />
            </div>
          </Link>
        </div>
        <Section genre={"Recommended for you"} videos={unSeenVideos(videos)} />
        <Section genre={"Action"} videos={filterVideos(videos, "action")} />
        <Section
          id="marvel"
          genre={"Marvel"}
          videos={filterVideos(videos, "marvel")}
        />
        <Section
          id="disney"
          genre={"Disney"}
          videos={filterVideos(videos, "disney")}
        />
        <Section
          id="pixar"
          genre={"Pixar"}
          videos={filterVideos(videos, "pixar")}
        />
        <Section
          id="star-wars"
          genre={"Star Wars"}
          videos={filterVideos(videos, "star-wars")}
        />
        <Section genre={"Family"} videos={filterVideos(videos, "family")} />
      </div>
    </>
  );
};

export default Home;
