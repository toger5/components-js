import { LiveKitRoom, useToken } from '@livekit/components-react';

import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/OldIndex.module.css';

const Home: NextPage = () => {
  const params = typeof window !== 'undefined' ? new URLSearchParams(location.search) : null;

  const roomName = params?.get('room') ?? 'test-room';
  const userIdentity = params?.get('user') ?? 'test-user';

  const token = useToken(process.env.NEXT_PUBLIC_LK_TOKEN_ENDPOINT, roomName, {
    identity: userIdentity,
    name: 'myname',
  });
  return (
    <div className={styles.container}>
      <Head>
        <title>LiveKit Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <LiveKitRoom token={token} serverUrl={process.env.NEXT_PUBLIC_LK_SERVER_URL} />
      </main>
    </div>
  );
};

export default Home;