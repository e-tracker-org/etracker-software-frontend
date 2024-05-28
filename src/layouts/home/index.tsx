import Footer from './Footer';
import Header from './Header';

const HomeLayout = ({
    children,
    showFooter = true,
}: {
    children: React.ReactElement;
    showFooter?: boolean;
}) => {
    return (
        <main className="max-w-screen-4xl mx-auto bg-gray-50 overflow-clip">
            <Header />
            <main className="px-[5%] md:px-[8%] lg:px-[6%] 2xl:px-[5%]">
                {children}
            </main>
            {showFooter && <Footer />}
        </main>
    );
};

export default HomeLayout;
