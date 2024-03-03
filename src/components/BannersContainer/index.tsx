import { useBanners } from 'store/useBanners';
import LogoutBanner from './LogoutBanner';

export default function BannersContainer() {
    const banners = useBanners();

    const onCloseLogout = () => {
        banners?.callback && banners?.callback();
        banners.toggleBanner({ current: null });
    };

    return (
        <>
            {banners.current === 'logout' && (
                <LogoutBanner open={true} onClose={onCloseLogout} />
            )}
        </>
    );
}
