import { gql, GraphQLClient } from "graphql-request";
import { useState } from "react";
import NavBar from "../../components/NavBar";
import Link from "next/Link";

export const getServerSideProps = async (pageContext) => {
  const url = process.env.ENDPOINT;
  const graphQLclient = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.TOKEN_GRAPH,
    },
  });
  const pageSlug = pageContext.query.slug;
  const query = gql`
    query ($pageSlug: String!) {
      video(where: { slug: $pageSlug }) {
        createdAt
        id
        title
        description
        seen
        slug
        tags
        detail {
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
  const variables = {
    pageSlug,
  };

  const data = await graphQLclient.request(query, variables);
  const video = data.video;
  const accountData = await graphQLclient.request(acccountQuery);
  const account = accountData.account;

  return {
    props: {
      video,
      account,
    },
  };
};

const changeToSeen = async (slug) => {
  await fetch("/api/changeToSeen", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug }),
  });
};

const Video = ({ video, account }) => {
  const [watching, setWatching] = useState(false);
  return (
    <>
      {!watching && (
        <div className="detail-cont">
          <div className="video-image">
            <img
              className="image-detail"
              src={video.detail.url}
              alt={video.title}
            />
          </div>

          <div className="info">
            <p>{video.tags.join(", ")}</p>
            <p>{video.description}</p>
            <Link href="/">
              <p>go back</p>
            </Link>
            <button
              onClick={() => {
                watching ? setWatching(false) : setWatching(true);
              }}
              className="video-overlay"
            >
              PLAY
            </button>
          </div>
        </div>
      )}

      {watching && (
        <video width="100%" controls>
          <source src={video.mp4.url} type="video/mp4" />
        </video>
      )}
      <div
        className="info-footer"
        onClick={() => (watching ? setWatching(false) : null)}
      ></div>
    </>
  );
};

export default Video;
