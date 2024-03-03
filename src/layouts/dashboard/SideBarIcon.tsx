import React, { FC } from 'react';

interface SideBarIconProps {
    screen: string;
}

const SideBarIcon: FC<SideBarIconProps> = ({ screen }) => {
    const getSideBarIcon = (): JSX.Element | undefined => {
        if (screen) {
            switch (screen.toLowerCase()) {
                case 'dashboard':
                    return (
                        <svg
                            className="w-5 h-5 text-inherit"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.54 2H7.92C9.33 2 10.46 3.15 10.46 4.561V7.97C10.46 9.39 9.33 10.53 7.92 10.53H4.54C3.14 10.53 2 9.39 2 7.97V4.561C2 3.15 3.14 2 4.54 2ZM4.54 13.4697H7.92C9.33 13.4697 10.46 14.6107 10.46 16.0307V19.4397C10.46 20.8497 9.33 21.9997 7.92 21.9997H4.54C3.14 21.9997 2 20.8497 2 19.4397V16.0307C2 14.6107 3.14 13.4697 4.54 13.4697ZM19.4601 2H16.0801C14.6701 2 13.5401 3.15 13.5401 4.561V7.97C13.5401 9.39 14.6701 10.53 16.0801 10.53H19.4601C20.8601 10.53 22.0001 9.39 22.0001 7.97V4.561C22.0001 3.15 20.8601 2 19.4601 2ZM16.0801 13.4697H19.4601C20.8601 13.4697 22.0001 14.6107 22.0001 16.0307V19.4397C22.0001 20.8497 20.8601 21.9997 19.4601 21.9997H16.0801C14.6701 21.9997 13.5401 20.8497 13.5401 19.4397V16.0307C13.5401 14.6107 14.6701 13.4697 16.0801 13.4697Z"
                                fill="currentColor"
                            />
                        </svg>
                    );
                    break;
                case 'properties':
                    return (
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.0926 20.5V14.5H14.0926V20.5H19.0926V12.5H22.0926L12.0926 3.5L2.09256 12.5H5.09256V20.5H10.0926Z"
                                fill="currentcolor"
                            />
                        </svg>
                    );
                    break;

                case 'tenants':
                    return (
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.0926 20.5V14.5H14.0926V20.5H19.0926V12.5H22.0926L12.0926 3.5L2.09256 12.5H5.09256V20.5H10.0926Z"
                                fill="currentcolor"
                            />
                        </svg>
                    );
                    break;

                case 'maintenance':
                    return (
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M22.3211 20.79L20.9011 22.21C20.7137 22.3962 20.4603 22.5008 20.1961 22.5008C19.9319 22.5008 19.6784 22.3962 19.4911 22.21L7.61108 10.35C7.28589 10.4442 6.9496 10.4947 6.61108 10.5C5.97439 10.4995 5.347 10.3471 4.78107 10.0554C4.21515 9.76362 3.72705 9.34099 3.35735 8.82263C2.98764 8.30426 2.74702 7.70513 2.65549 7.07505C2.56396 6.44496 2.62416 5.80213 2.83108 5.2L5.37108 7.74L5.90108 7.21L7.32108 5.79L7.85108 5.26L5.31108 2.72C5.91322 2.51307 6.55605 2.45287 7.18613 2.54441C7.81622 2.63594 8.41535 2.87656 8.93371 3.24626C9.45208 3.61596 9.8747 4.10407 10.1664 4.66999C10.4582 5.23591 10.6106 5.8633 10.6111 6.5C10.6057 6.83852 10.5553 7.17481 10.4611 7.5L22.3211 19.38C22.5073 19.5674 22.6119 19.8208 22.6119 20.085C22.6119 20.3492 22.5073 20.6026 22.3211 20.79ZM2.90108 19.38C2.71483 19.5674 2.61029 19.8208 2.61029 20.085C2.61029 20.3492 2.71483 20.6026 2.90108 20.79L4.32108 22.21C4.50845 22.3962 4.7619 22.5008 5.02608 22.5008C5.29027 22.5008 5.54372 22.3962 5.73108 22.21L11.2011 16.75L8.37108 13.92M20.6111 2.5L16.6111 4.5V6.5L14.4411 8.67L16.4411 10.67L18.6111 8.5H20.6111L22.6111 4.5L20.6111 2.5Z"
                                fill="currentcolor"
                            />
                        </svg>
                    );
                    break;

                case 'inbox':
                    return (
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M17.0926 4H7.09256C4.09256 4 2.09256 5.5 2.09256 9V16C2.09256 19.5 4.09256 21 7.09256 21H17.0926C20.0926 21 22.0926 19.5 22.0926 16V9C22.0926 5.5 20.0926 4 17.0926 4ZM17.5626 10.09L14.4326 12.59C13.7726 13.12 12.9326 13.38 12.0926 13.38C11.2526 13.38 10.4026 13.12 9.75256 12.59L6.62256 10.09C6.30256 9.83 6.25256 9.35 6.50256 9.03C6.76256 8.71 7.23256 8.65 7.55256 8.91L10.6826 11.41C11.4426 12.02 12.7326 12.02 13.4926 11.41L16.6226 8.91C16.9426 8.65 17.4226 8.7 17.6726 9.03C17.9326 9.35 17.8826 9.83 17.5626 10.09Z"
                                fill="currentcolor"
                            />
                        </svg>
                    );
                    break;
                case 'profile':
                    return (
                        <svg
                            width="21"
                            height="15"
                            viewBox="0 0 21 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M3 4.052C3 6.047 4.505 7.552 6.5 7.552C8.495 7.552 10 6.047 10 4.052C10 2.057 8.495 0.552002 6.5 0.552002C4.505 0.552002 3 2.057 3 4.052ZM17.5 3.5H15.5V6.5H12.5V8.5H15.5V11.5H17.5V8.5H20.5V6.5H17.5V3.5ZM2.5 14.5H12.5V13.5C12.5 10.743 10.257 8.5 7.5 8.5H5.5C2.743 8.5 0.5 10.743 0.5 13.5V14.5H2.5Z"
                                fill="#6F6F6F"
                            />
                        </svg>
                    );
                    break;
                case 'settings':
                    return (
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14.2514 24H9.74935C9.46726 24 9.19364 23.9065 8.97386 23.735C8.75407 23.5634 8.60133 23.3241 8.54096 23.0568L8.03757 20.796C7.36605 20.5105 6.72929 20.1535 6.13904 19.7316L3.86698 20.4336C3.59805 20.5168 3.30787 20.5083 3.04463 20.4094C2.7814 20.3105 2.56095 20.1272 2.41989 19.89L0.163906 16.1088C0.024324 15.8714 -0.0280717 15.595 0.0152915 15.3249C0.0586546 15.0548 0.195209 14.807 0.402614 14.622L2.1651 13.062C2.08495 12.3553 2.08495 11.6423 2.1651 10.9356L0.402614 9.3792C0.194915 9.19413 0.0581751 8.94609 0.0148049 8.67574C-0.0285653 8.40539 0.0240074 8.12876 0.163906 7.8912L2.41494 4.1076C2.556 3.87038 2.77645 3.68711 3.03969 3.58823C3.30292 3.48934 3.5931 3.48079 3.86203 3.564L6.13409 4.266C6.43588 4.05 6.75003 3.8484 7.07408 3.666C7.387 3.4956 7.70857 3.3408 8.03757 3.2028L8.5422 0.9444C8.60227 0.677037 8.75473 0.437625 8.97428 0.265859C9.19384 0.0940918 9.46731 0.000287959 9.74935 0H14.2514C14.5335 0.000287959 14.8069 0.0940918 15.0265 0.265859C15.246 0.437625 15.3985 0.677037 15.4586 0.9444L15.9681 3.204C16.6388 3.49112 17.2754 3.84801 17.8667 4.2684L20.14 3.5664C20.4087 3.4835 20.6986 3.4922 20.9616 3.59107C21.2246 3.68994 21.4448 3.87304 21.5858 4.11L23.8369 7.8936C24.1238 8.382 24.0249 9 23.5981 9.3804L21.8357 10.9404C21.9158 11.6471 21.9158 12.3601 21.8357 13.0668L23.5981 14.6268C24.0249 15.0084 24.1238 15.6252 23.8369 16.1136L21.5858 19.8972C21.4448 20.1344 21.2243 20.3177 20.9611 20.4166C20.6978 20.5155 20.4077 20.524 20.1387 20.4408L17.8667 19.7388C17.2769 20.1604 16.6405 20.517 15.9694 20.802L15.4586 23.0568C15.3982 23.3239 15.2457 23.5631 15.0261 23.7346C14.8066 23.9061 14.5333 23.9998 14.2514 24ZM11.9954 7.2C10.6833 7.2 9.42495 7.70571 8.49714 8.60589C7.56934 9.50606 7.04811 10.727 7.04811 12C7.04811 13.273 7.56934 14.4939 8.49714 15.3941C9.42495 16.2943 10.6833 16.8 11.9954 16.8C13.3075 16.8 14.5659 16.2943 15.4937 15.3941C16.4215 14.4939 16.9428 13.273 16.9428 12C16.9428 10.727 16.4215 9.50606 15.4937 8.60589C14.5659 7.70571 13.3075 7.2 11.9954 7.2Z"
                                fill="currentcolor"
                            />
                        </svg>
                    );
                    break;

                case 'rent':
                    return (
                        <svg
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.5048 0.0029306C14.3348 0.00205714 16.1098 0.628597 17.5337 1.77806C18.9576 2.92751 19.9444 4.5304 20.3295 6.3194C20.7146 8.10839 20.4747 9.97534 19.6499 11.6089C18.8251 13.2424 17.4651 14.5438 15.7968 15.2959C15.2636 16.4748 14.4524 17.5068 13.4327 18.3034C12.4131 19.0999 11.2154 19.6372 9.94248 19.8693C8.66956 20.1013 7.35934 20.0211 6.12421 19.6356C4.88908 19.2501 3.76588 18.5707 2.85096 17.6558C1.93603 16.7409 1.25668 15.6177 0.871162 14.3826C0.485644 13.1474 0.405467 11.8372 0.637506 10.5643C0.869546 9.29137 1.40688 8.09373 2.20342 7.07407C2.99996 6.05441 4.03194 5.24317 5.21085 4.70993C5.84499 3.30682 6.87043 2.11643 8.16419 1.28154C9.45795 0.446644 10.9651 0.00269262 12.5048 0.0029306ZM9.50485 7.00293H7.50485V8.00293C6.85496 8.00135 6.23 8.2529 5.76243 8.70427C5.29486 9.15564 5.02144 9.77135 5.00011 10.4209C4.97879 11.0704 5.21123 11.7027 5.64819 12.1838C6.08514 12.6649 6.69226 12.9569 7.34085 12.9979L7.50485 13.0029H9.50485L9.59485 13.0109C9.71013 13.0318 9.81442 13.0925 9.88952 13.1824C9.96462 13.2723 10.0058 13.3858 10.0058 13.5029C10.0058 13.6201 9.96462 13.7335 9.88952 13.8234C9.81442 13.9134 9.71013 13.9741 9.59485 13.9949L9.50485 14.0029H5.50485V16.0029H7.50485V17.0029H9.50485V16.0029C10.1547 16.0045 10.7797 15.753 11.2473 15.3016C11.7148 14.8502 11.9883 14.2345 12.0096 13.585C12.0309 12.9354 11.7985 12.3031 11.3615 11.8221C10.9246 11.341 10.3174 11.049 9.66885 11.0079L9.50485 11.0029H7.50485L7.41485 10.9949C7.29956 10.9741 7.19527 10.9134 7.12017 10.8234C7.04507 10.7335 7.00393 10.6201 7.00393 10.5029C7.00393 10.3858 7.04507 10.2723 7.12017 10.1824C7.19527 10.0925 7.29956 10.0318 7.41485 10.0109L7.50485 10.0029H11.5048V8.00293H9.50485V7.00293ZM12.5048 2.00293C11.6574 2.0018 10.8193 2.18066 10.0461 2.52769C9.27295 2.87471 8.58229 3.38198 8.01985 4.01593C9.15011 3.94732 10.2821 4.11943 11.3409 4.52088C12.3996 4.92233 13.3612 5.54397 14.1618 6.34471C14.9624 7.14544 15.584 8.10702 15.9853 9.16586C16.3866 10.2247 16.5586 11.3567 16.4898 12.4869C17.3991 11.6786 18.041 10.6129 18.3307 9.43124C18.6203 8.24961 18.5438 7.00784 18.1115 5.87065C17.6791 4.73346 16.9113 3.75457 15.9098 3.06381C14.9083 2.37306 13.7205 2.00307 12.5038 2.00293H12.5048Z"
                                fill="#6F6F6F"
                            />
                        </svg>
                    );
                    break;

                case 'apartment':
                    return (
                        <svg
                            width="21"
                            height="17"
                            viewBox="0 0 21 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8.5 17V11H12.5V17H17.5V9H20.5L10.5 0L0.5 9H3.5V17H8.5Z"
                                fill="#6F6F6F"
                            />
                        </svg>
                    );
                    break;

                default:
                    null;
            }
        }
    };

    return <>{getSideBarIcon()}</>;
};

export default SideBarIcon;
