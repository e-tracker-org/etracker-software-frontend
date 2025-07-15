import { useMutation } from 'react-query';
import Loader from 'components/base/Loader';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthService } from 'services';

export default function Verification() {
    const router = useRouter();
    const [isError, setIsError] = useState(false);
    const { mutate, isLoading, isSuccess } = useMutation({
        mutationFn: AuthService.verifyAccount,
        onSuccess(_data) {
            setIsError(false);
            router.push('/auth/signin');
        },
        onError(error: any) {
            setIsError(true);
            toast.error(error.message, { id: 'error' });
        },
        retry: 2,
    });

    useEffect(() => {
        if (router?.query?.token) {
            mutate({ token: router.query.token as string });
        }
    }, [router?.query, mutate]);

    return (
        <>
            {isLoading && <Loader loading={isLoading} />}
            {isError && (
                <div className="text-primary-600 p-5 px-10">
                    <div className="flex flex-col gap-4">
                        <p className="text-black">
                            Check your email and click verification link to
                            verify your account
                        </p>

                        <small className="text-yellow-600">
                            If your token expired before you could verify your
                            email, use the button below to request for another
                            token
                        </small>

                        <button className="rounded-lg px-6 py-4 bg-primary-600 text-white font-medium w-fit">
                            Request Email Verification
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
