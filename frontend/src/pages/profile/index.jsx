import UserLayout from '@/layout/UserLayout'
import React, { useEffect, useState } from 'react'
import DashboardLayout from '@/layout/DashboardLayout'
import styles from "./styles.module.css";
import { BASE_URL, clientServer } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { getAboutUser } from '@/config/redux/action/authAction';
import { getAllPosts } from '@/config/redux/action/postAction';

export default function ProfilePage() {
  const authState = useSelector((state) => state.auth);
  const [userProfile, setUserProfile] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const postReducer = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputData, setInputData] = useState({
    company: "",
    position: "",
    years: "",
  })

  const handleWorkInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  }

  useEffect(() => {
    dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    dispatch(getAllPosts());
  }, [])

  useEffect(() => {
    if (authState.user) {
      setUserProfile(authState.user);

      let post = postReducer.posts.filter((post) => {
        return post.userId.username === authState.user.userId.username;
      });
      setUserPosts(post);
    }
  }, [authState.user, postReducer.posts]);

  const uploadProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append("profile_picture", file);
    formData.append("token", localStorage.getItem("token"));

    await clientServer.post("/update_profile_picture", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch(getAboutUser({ token: localStorage.getItem("token") }));
  }

  const updateProfileData = async () => {
    await clientServer.post("/user_update", {
      token: localStorage.getItem("token"),
      name: userProfile.userId.name,
    })

    await clientServer.post("upload_profile_data", {
      token: localStorage.getItem("token"),
      bio: userProfile.bio,
      currentPost: userProfile.currentPost,
      pastWorks: userProfile.pastWorks,
      education: userProfile.education,
    });

    dispatch(getAboutUser({ token: localStorage.getItem("token") }));
  }

  return (
    <UserLayout>
      <DashboardLayout>
        {authState.user && userProfile.userId &&
          <div className={styles.container}>
            <div className={styles.profileHero}>
              <div className={styles.backDropContainer}>
                <label htmlFor="profilePictureUpload" className={styles.backDrop_overlay}>
                  <p>Edit</p>
                </label>

                <input
                  onChange={(e) => {
                    uploadProfilePicture(e.target.files[0])
                  }}
                  hidden
                  type="file"
                  id='profilePictureUpload'
                />

                <img
                  className={styles.backDrop}
                  src={`${BASE_URL}/${userProfile.userId.profilePicture}`}
                  alt=""
                />
              </div>

              <div className={styles.profileContainer_details}>
                <div className={styles.profileTopGrid}>
                  <div className={styles.profileMain}>
                    <div className={styles.nameBlock}>
                      <input
                        className={styles.nameEdit}
                        type="text"
                        value={userProfile.userId.name}
                        onChange={(e) => {
                          setUserProfile({
                            ...userProfile,
                            userId: { ...userProfile.userId, name: e.target.value }
                          })
                        }}
                      />
                      <p className={styles.usernameText}>@{userProfile.userId.username}</p>
                    </div>

                    <div className={styles.bioBlock}>
                      <textarea
                        name="bio"
                        value={userProfile.bio}
                        onChange={(e) => {
                          setUserProfile({ ...userProfile, bio: e.target.value })
                        }}
                        rows={Math.max(3, Math.ceil(userProfile.bio.length / 80))}
                        className={styles.bioInput}
                      ></textarea>
                    </div>
                  </div>

                  <div className={styles.activityPanel}>
                    <h3>Recent Activity</h3>

                    <div className={styles.activityList}>
                      {userPosts.map((post) => {
                        return (
                          <div key={post._id} className={styles.postCard}>
                            <div className={styles.card_profileContainer}>
                              {post.media !== "" ?
                                <img src={`${BASE_URL}/${post.media}`} alt=""></img>
                                :
                                <></>
                              }
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

              <button
                  className={styles.addWorkButton}
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  Add Work
                </button>
            </div>

            {userProfile != authState.user && (
              <div
                onClick={() => {
                  updateProfileData();
                }}
                className={styles.connectionBtn}
              >
                Update Profile
              </div>
            )}
          </div>
        }

        {isModalOpen &&
          <div
            onClick={() => {
              setIsModalOpen(false);
            }}
            className={styles.commentsContainer}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={styles.allCommentsContainer}
            >
              <h3 className={styles.modalTitle}>Add Work Experience</h3>

              <input
                onChange={handleWorkInputChange}
                name='company'
                className={styles.inputField}
                type="text"
                placeholder='Enter Company'
              />

              <input
                onChange={handleWorkInputChange}
                name='position'
                className={styles.inputField}
                type="text"
                placeholder='Enter Position'
              />

              <input
                onChange={handleWorkInputChange}
                name='years'
                className={styles.inputField}
                type="number"
                placeholder='Years'
              />

              <div
                onClick={() => {
                  setUserProfile({ ...userProfile, pastWorks: [...userProfile.pastWorks, inputData] })
                  setIsModalOpen(false)
                }}
                className={styles.connectionBtn}
              >
                Add Work
              </div>
            </div>
          </div>
        }
      </DashboardLayout>
    </UserLayout>
  )
}