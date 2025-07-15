import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function NavLink({ href }: { href: string }) {
    const router = useRouter();

    useEffect(() => {
        router.push(href);
    }, [href, router]);

    return null;
}
