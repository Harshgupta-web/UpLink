import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import UserLayout from "@/layout/UserLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  return (
    <UserLayout>
      <Head>
        <title>Your Platform | Connect for real</title>
        <meta
          name="description"
          content="A genuine social platform where people connect, share stories, and build real relationships."
        />
      </Head>

      <div className={`${styles.page} ${inter.className}`}>
        <section className={styles.hero}>
          <div className={styles.gridOverlay}></div>
          <div className={styles.glowTop}></div>
          <div className={styles.glowLeft}></div>
          <div className={styles.glowBottom}></div>

          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>Real people. Real stories. Real connection.</span>

            <h1 className={styles.heroTitle}>
              The social platform
              <span> people actually enjoy using.</span>
            </h1>

            <p className={styles.heroText}>
              Build genuine connections, share meaningful stories, and discover people
              without fake hype, empty flexing, or noisy feeds.
            </p>

            <div className={styles.heroActions}>
              <div
                onClick={() => {
                  router.push("/login");
                }}
                className={styles.primaryBtn}
              >
                <p>Join Now</p>
              </div>

              <div className={styles.secondaryBtn}>
                <p>Made for authentic networking</p>
              </div>
            </div>

            <div className={styles.heroVisualWrap}>

              <div className={styles.heroVisual}>
                <img
                  src="/images/homemain_connections.png"
                  alt="People connecting on the platform"
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.introSection}>
          <div className={styles.introGrid}>
            <div>
              <p className={styles.sectionLabel}>Why this feels different</p>
              <h2>No noise. No fake image. Just real connection.</h2>
            </div>

            <div>
              <p>
                Most social platforms push performance. Yours should feel human.
                This experience is designed for meaningful profiles, better conversations,
                and a cleaner way to connect with people who actually matter.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.featuresSection}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>Everything you need</p>
            <h2>Built for modern social connection.</h2>
            <p className={styles.sectionSubtext}>
              A clean product experience that feels premium, focused, and alive.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCardLarge}>
              <div className={styles.featureVisualGlow}></div>
              <h3>Authentic profiles</h3>
              <p>Create a space where people show who they are, not who they pretend to be.</p>
            </div>

            <div className={styles.featureCard}>
              <h3>Meaningful stories</h3>
              <p>Stories that feel social and fresh, without clutter or distraction.</p>
            </div>

            <div className={styles.featureCard}>
              <h3>Better discovery</h3>
              <p>Find people, communities, and conversations that are actually relevant.</p>
            </div>

            <div className={styles.featureCard}>
              <h3>Focused experience</h3>
              <p>Cleaner layouts and stronger UX that help users stay, explore, and connect.</p>
            </div>

            <div className={styles.featureCardWide}>
              <h3>A social network that feels premium from the first second</h3>
              <p>
                The goal is not just functionality. The goal is a product people trust,
                enjoy, and want to return to every day.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.statementSection}>
          <div className={styles.statementGlow}></div>
          <div className={styles.statementContent}>
            <p className={styles.sectionLabel}>Designed to stand out</p>
            <h2>Let people feel the product before they even sign in.</h2>
            <p>
              Great landing pages do not just explain the platform. They create trust,
              curiosity, and momentum in the first few scrolls.
            </p>
          </div>
        </section>

        <section className={styles.finalCtaSection}>
          <div className={styles.finalCtaGlow}></div>
          <div className={styles.finalCtaBox}>
            <p className={styles.sectionLabel}>Start now</p>
            <h2>Join a social space built for real people.</h2>
            <p style={{marginBottom:"2rem"}}>
              Better conversations, cleaner networking, and a platform people won’t want to leave.
            </p>

            <div
              onClick={() => {
                router.push("/login");
              }}
              className={styles.primaryBtn}
            >
              <p>Join Now</p>
            </div>
          </div>
        </section>
      </div>
    </UserLayout>
  );
}