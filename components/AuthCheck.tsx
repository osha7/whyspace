'use client';

import { useSession } from 'next-auth/react';

// this hook allows us to access the current session and the users status (authenticated, loading, or unauthenticated)
export default function AuthCheck({children} : { children: React.ReactNode }) {
    const { data: session, status } = useSession();

    console.log(session, status);

    if (status === 'authenticated') {
        return <>{children}</>;
    } else {
        return <></>;
    }
};
