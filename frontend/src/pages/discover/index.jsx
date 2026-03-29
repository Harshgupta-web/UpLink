import { BASE_URL } from "@/config";
import { getAllUsers } from "@/config/redux/action/authAction";
import DashboardLayout from "@/layout/DashboardLayout";
import UserLayout from "@/layout/UserLayout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import { useRouter } from "next/router";

export default function Discover() {
  const authState = useSelector((state) => state.auth);
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!authState.all_profiles_fetched) {
      dispatch(getAllUsers());
    }
  }, [authState.all_profiles_fetched]);

  return (
    <UserLayout>
      <DashboardLayout>
        <div className={styles.discoverPage}>
          <div className={styles.discoverHeader}>
            <h1>Discover</h1>
            <p>Find people, explore profiles, and grow your network.</p>
          </div>

          <div className={styles.allUserProfile}>
            {authState.all_profiles_fetched &&
              authState.all_users.map((user) => {
                return (
                  <div
                    onClick={() => {
                      router.push(`/view_profile/${user.userId.username}`);
                    }}
                    key={user._id}
                    className={styles.userCard}
                  >
                    <img
                      className={styles.userCard_image}
                      src={`${BASE_URL}/${user.userId.profilePicture}`}
                      alt="Profile"
                    />

                    <div className={styles.userCard_content}>
                      <h2>{user.userId.name}</h2>
                      <p>@{user.userId.username}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}