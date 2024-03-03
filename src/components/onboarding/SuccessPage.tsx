import Button from 'components/base/Button';
import { useAppStore } from 'hooks/useAppStore';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface SuccessProps {
    title?: string;
    content?: string;
    isIcon?: boolean;
    titleClassname?: string;
    contentClassname?: string;
    isOnContinue?: boolean;
}

const SuccessPage: FC<SuccessProps> = ({
    title,
    content,
    isIcon = true,
    titleClassname,
    contentClassname,
    isOnContinue,
}) => {
    const states = useAppStore();
    const router = useRouter();

    const onContinue = () => {
        // states?.toggleCompleted();
        states?.setScreen('');
        router.push('/dashboard');
    };
    return (
        <section className="flex flex-col justify-center items-center h-full">
            <div className="grid gap-4 justify-items-center">
                {isIcon && (
                    <div className="relative w-[25%] aspect-square mx-auto animate__animated animate__heartBeat">
                        <Image src="/success-img.png" alt="success icon" fill />
                    </div>
                )}
                <h1 className={`text-2xl font-semibold ${titleClassname}`}>
                    {title}
                </h1>
                <p className={`text-lg text-center ${contentClassname}`}>
                    {content}
                </p>
                {isOnContinue && <Button onClick={onContinue}>Continue</Button>}
            </div>
        </section>
    );
};

export default SuccessPage;
