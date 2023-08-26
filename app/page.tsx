// import Image from 'next/image'
// import styles from './page.module.css'

import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    // return <p>You must be signed in...</p>
    redirect('./api/auth/signin')
  }
  return (
    // <main className={styles.main}>
    //   {/* {children} */}
    // </main>
    <div>
      <h1>Welcome to Whyspace</h1>
    </div>
  )
}
