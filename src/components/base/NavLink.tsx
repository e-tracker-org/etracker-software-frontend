import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function NavLink({ href }: { href: string }) {
    const [link, setLink] = useState('');

    const router = useRouter();

    if (typeof window !== undefined && link) {
        router.push(href);
    }
    useEffect(() => {
        setLink(href);
    }, [link, href]);

    return null;
}
