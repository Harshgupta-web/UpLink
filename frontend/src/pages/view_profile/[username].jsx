
import { BASE_URL, clientServer } from "@/config";
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import UserLayout from "@/layout/UserLayout";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "@/config/redux/action/postAction";
import {
  getAboutUser,
  getConnectionRequest,
  getMyConnectionRequests,
  sendConnectionRequest,
} from "@/config/redux/action/authAction";

export default function viewProfile({ userProfile }) {
  const router = useRouter();
  const postReducer = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const isOwnProfile =
    authState.user?.userId?._id?.toString() ===
    userProfile.userId?._id?.toString();

  const [userPosts, setUserPosts] = useState([]);
  const [isCurrentUserInConnection, setIsCurrentUserInConnection] =
    useState(false);
  const [isConnectionNull, setIsConnectionNull] = useState(true);

  const getUserPost = async () => {
    await dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    await dispatch(getAllPosts());
    await dispatch(
      getConnectionRequest({ token: localStorage.getItem("token") }),
    );
    await dispatch(
      getMyConnectionRequests({ token: localStorage.getItem("token") }),
    );
  };

  useEffect(() => {
    let post = postReducer.posts.filter((post) => {
      return post.userId.username === router.query.username;
    });
    setUserPosts(post);
  }, [postReducer.posts]);

  useEffect(() => {
    console.log(authState.connections, userProfile.userId._id);
    if (
      authState.connections.some(
        (user) => user.connectionId._id === userProfile.userId._id,
      )
    ) {
      setIsCurrentUserInConnection(true);
      if (
        authState.connections.find(
          (user) => user.connectionId._id === userProfile.userId._id,
        ).status_accepted === true
      ) {
        setIsConnectionNull(false);
      }
    }

    if (
      authState.connectionRequest.some(
        (user) => user.userId._id === userProfile.userId._id,
      )
    ) {
      setIsCurrentUserInConnection(true);
      if (
        authState.connectionRequest.find(
          (user) => user.userId._id === userProfile.userId._id,
        ).status_accepted === true
      ) {
        setIsConnectionNull(false);
      }
    }
  }, [authState.connections, authState.connectionRequest]);

  useEffect(() => {
    getUserPost();
  }, []);

  return (
    <UserLayout>
      <DashboardLayout>
        <div className={styles.container}>
          <div className={styles.profileHero}>
            <div className={styles.backDropContainer}>
              <img
                className={styles.backDrop}
                src={`${BASE_URL}/${userProfile.userId.profilePicture}`}
                alt="backDrop"
              />
            </div>

            <div className={styles.profileContainer_details}>
              <div className={styles.profileContainer_flex}>
                <div className={styles.profileMain}>
                  <div className={styles.identityRow}>
                    <div className={styles.identityText}>
                      <h2>{userProfile.userId.name}</h2>
                      <p className={styles.usernameText}>
                        @{userProfile.userId.username}
                      </p>
                    </div>
                  </div>

                  <div className={styles.actionRow}>
                    {isOwnProfile ? (
                      <button className={styles.connectedButton}>You</button>
                    ) : isCurrentUserInConnection ? (
                      <button className={styles.connectedButton}>
                        {isConnectionNull ? "Pending" : "Connected"}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          dispatch(
                            sendConnectionRequest({
                              token: localStorage.getItem("token"),
                              userId: userProfile.userId._id,
                            }),
                          );
                        }}
                        className={styles.connectionBtn}
                      >
                        Connect
                      </button>
                    )}

                    <div
                      onClick={async () => {
                        const response = await clientServer.get(
                          `/user/download_resume?id=${userProfile.userId._id}`,
                        );
                        window.open(
                          `${BASE_URL}/${response.data.message}`,
                          "_blank",
                        );
                      }}
                      className={styles.resumeButton}
                    >
                      <svg
                        className={styles.resumeIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                      <span>Resume</span>
                    </div>
                  </div>

                  <div className={styles.bioBlock}>
                    <p>{userProfile.bio}</p>
                  </div>
                </div>

                <div className={styles.activityPanel}>
                  <h3>Recent Activity</h3>

                  <div className={styles.activityList}>
                    {userPosts.map((post) => {
                      return (
                        <div key={post._id} className={styles.postCard}>
                          <div className={styles.card_profileContainer}>
                            {post.media !== "" ? (
                              <img src={`${BASE_URL}/${post.media}`} alt=""></img>
                            ) : (
                              <div className={styles.emptyPostMedia}></div>
                            )}
                          </div>
                          <p>{post.body}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.workHistory}>
            <div className={styles.sectionHeader}>
              <h4>Work History</h4>
            </div>

            <div className={styles.workHistoryContainer}>
              {userProfile.pastWorks.map((work, index) => {
                return (
                  <div key={index} className={styles.workHistoryCard}>
                    <p className={styles.workTitle}>
                      {work.company} - {work.position}
                    </p>
                    <p className={styles.workYears}>{work.years}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}

export async function getServerSideProps(context) {
  console.log(context.query.username);

  const request = await clientServer.get(
    "/user/get_profile_based_on_username",
    {
      params: {
        username: context.query.username,
      },
    },
  );

  const response = await request.data;
  console.log(response);

  return {
    props: { userProfile: request.data.profile },
  };
}