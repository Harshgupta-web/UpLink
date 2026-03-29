import React from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "@/config/redux/reducer/authReducer";

export default function NavbarComponent() {
  const router = useRouter();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className={styles.container}>
      <nav className={styles.navbar}>
        <div
          className={styles.brand}
          onClick={() => {
            router.push("/");
          }}
        >
          <span className={styles.brandText}>UpLink</span>
        </div>

        <div className={styles.navBarOptionContainer}>
          {authState.profileFetched && (
            <div className={styles.userBlock}>
              <p className={styles.greeting}>Hey, {authState.user.userId.name}</p>

              <button
                type="button"
                className={styles.navLinkGhost}
                onClick={() => {
                  router.push("/profile");
                }}
              >
                Profile
              </button>

              <button
                type="button"
                className={styles.navLinkGhost}
                onClick={() => {
                  localStorage.removeItem("token");
                  router.push("/login");
                  dispatch(reset());
                }}
              >
                Logout
              </button>
            </div>
          )}

          {!authState.profileFetched && (
            <button
              type="button"
              onClick={() => {
                router.push("/login");
              }}
              className={styles.buttonJoin}
            >
              Be a part
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}