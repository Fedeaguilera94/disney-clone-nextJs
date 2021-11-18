import { gql, GraphQLClient } from "graphql-request";
import { useState } from "react";
import NavBar from "../../components/NavBar";
import Link from "next/link";
import Image from "next/image";

export const getServerSideProps = async (pageContext) => {
  const url = process.env.ENDPOINT;
  const token = process.env.TOKEN_GRAPH;
  const graphQLclient = new GraphQLClient(url, {
    headers: {
      Authorization: token || "",
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
        <>
          <div className="header-info">
            <NavBar account={account} />
          </div>
          <div className="detail-cont">
            <div className="video-image">
              <img
                className="image-detail"
                src={video.detail.url}
                alt={video.title}
              />
            </div>
            <article className="article-info">
              <div className="info">
                <p style={{ fontSize: "15px", paddingTop: "12%" }}>
                  {video.tags.join(", ")}
                </p>
                <Link href="/">
                  <p
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    Go back
                  </p>
                </Link>
                <button
                  onClick={() => {
                    changeToSeen(video.slug);
                    watching ? setWatching(false) : setWatching(true);
                  }}
                  className="video-overlay"
                >
                  ► WATCH NOW
                </button>
                <p>{video.description}</p>
              </div>
            </article>
          </div>
        </>
      )}

      {watching && (
        <>
          <div className="trailer">
            <a
              onClick={() => {
                setWatching(!watching);
              }}
            >
              🡠 {video.title} Trailer
            </a>
          </div>
          <div className="trailer-video">
            <video width="100%" controls>
              <source src={video.mp4.url} type="video/mp4" />
            </video>
          </div>
        </>
      )}

      <div
        /*    className={"info-footer"} */
        className={`info-footer ${watching && "info-f"}`}
        onClick={() => (watching ? setWatching(false) : null)}
      >
        <div className="footer-img">
          <Image src="/logo.svg" width={100} height={50} />
          <p>Disney + Clone </p>

          <p>aguilerafederico94@gmail.com</p>
        </div>
      </div>
    </>
  );
};

export default Video;
