import { BASE_URL } from '@/config';
import { AcceptConnection, getMyConnectionRequests } from '@/config/redux/action/authAction';
import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./styles.module.css"
import { useRouter } from 'next/router';

export default function MyConnectionsPage() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMyConnectionRequests({ token: localStorage.getItem("token") }));
  }, [])

  const router = useRouter();

  useEffect(() => {
    if (authState.connectionRequest.length != 0) {
      console.log(authState.connectionRequest)
    }
  }, [authState.connectionRequest])

  return (
    <UserLayout>
      <DashboardLayout>
        <div className={styles.connectionsPage}>
          <div className={styles.pageHeader}>
            <h1>My Connections</h1>
            <p>Manage new requests and browse your existing network.</p>
          </div>

          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <h2>Requests</h2>
            </div>

            {authState.connectionRequest.filter((connection) => connection.status_accepted === null).length === 0 && (
  <p className={styles.emptyState}>You have no connection requests.</p>
)}

            <div className={styles.cardList}>
              {authState.connectionRequest.length != 0 &&
                authState.connectionRequest
                  .filter((connection) => connection.status_accepted === null)
                  .map((user, index) => {
                    return (
                      <div
                        onClick={() => {
                          router.push(`/view_profile/${user.userId.username}`)
                        }}
                        className={styles.userCard}
                        key={index}
                      >
                        <div className={styles.userCardInner}>
                          <div className={styles.profilePicture}>
                            <img src={`${BASE_URL}/${user.userId.profilePicture}`} alt="" />
                          </div>

                          <div className={styles.userInfo}>
                            <h3>{user.userId.name}</h3>
                            <p>@{user.userId.username}</p>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();

                              dispatch(AcceptConnection({
                                connectionId: user._id,
                                token: localStorage.getItem("token"),
                                action: "Accept"
                              }))
                            }}
                            className={styles.connectedButton}
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    )
                  })}
            </div>
          </div>

          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <h2>My Network</h2>
            </div>

            <div className={styles.cardList}>
              {authState.connectionRequest
                .filter((connection) => connection.status_accepted !== null)
                .map((user, index) => {
                  return (
                    <div
                      onClick={() => {
                        router.push(`/view_profile/${user.userId.username}`)
                      }}
                      className={styles.userCard}
                      key={index}
                    >
                      <div className={styles.userCardInner}>
                        <div className={styles.profilePicture}>
                          <img src={`${BASE_URL}/${user.userId.profilePicture}`} alt="" />
                        </div>

                        <div className={styles.userInfo}>
                          <h3>{user.userId.name}</h3>
                          <p>@{user.userId.username}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  )
}