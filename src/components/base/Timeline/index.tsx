import { MouseEventHandler } from 'react';
import styles from 'styles/timeline.module.scss';

interface Props {
    stepSize: number;
    currentStep: number;
    titles?: string[];
    goto?: (payload: Partial<string>, count: Partial<number>) => void;
}

function Timeline({ stepSize = 2, currentStep, titles, goto }: Props) {
    const timelinePoints = titles || Array(stepSize).fill(null);

    const handleGoto = (payload: string, count: number) => {
        if (goto) {
            goto(payload, count + 1);
        }
    };
    return (
        <div className={styles.timeline}>
            {timelinePoints.map((title, i) => (
                <div
                    key={i}
                    className={`relative ${styles['timeline-point']}`}
                    data-current={i + 1 === currentStep}
                    data-completed={i + 1 < currentStep}
                    data-uncompleted={i + 1 > currentStep}
                    onClick={() => handleGoto(title, i)}
                >
                    <div className="flex items-center  w-full">
                        <span
                            className={`rounded-full shadow-medium bg-white w-fit cursor-pointer  ${styles.wrapper}`}
                        >
                            <span
                                className={`w-3 h-3 rounded-full bg-primary-600 ${styles['current-state']}`}
                            ></span>
                            <svg
                                className={styles.mark}
                                viewBox="0 0 30 31"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M15 0.5C6.7155 0.5 0 7.216 0 15.5C0 23.784 6.716 30.5 15 30.5C23.284 30.5 30 23.784 30 15.5C30 7.216 23.284 0.5 15 0.5ZM11.5125 24.5L11.5025 24.49L11.494 24.5L4.5 17.3L8.0145 13.718L11.503 17.31L22.003 6.5005L25.5 10.0995L11.5125 24.5Z"
                                    fill="#2F42ED"
                                />
                            </svg>
                        </span>
                        <hr
                            className={`border-4 w-full border-gray-200 ${styles.line}`}
                        />
                    </div>
                    {title && <p className={styles.text}>{title}</p>}
                </div>
            ))}
        </div>
    );
}

export default Timeline;
