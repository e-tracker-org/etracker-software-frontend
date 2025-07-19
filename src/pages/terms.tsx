import { ReactElement } from 'react';
import HomeLayout from 'layouts/home';
import Link from 'next/link';

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Terms and Conditions
                </h1>
                <div className="overflow-y-auto max-h-[60vh] text-gray-700 space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold mb-2">
                            1. Acceptance of Terms
                        </h2>
                        <p>
                            By accessing or using E-tracka, you agree to be
                            bound by these Terms and Conditions. If you do not
                            agree, please do not use the platform.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold mb-2">
                            2. User Responsibilities
                        </h2>
                        <p>
                            You are responsible for maintaining the
                            confidentiality of your account and password and for
                            restricting access to your device. You agree to
                            accept responsibility for all activities that occur
                            under your account.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold mb-2">
                            3. Platform Usage
                        </h2>
                        <p>
                            You agree to use E-tracka only for lawful purposes
                            and in accordance with these Terms. You must not use
                            the platform in any way that could damage, disable,
                            overburden, or impair the service.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold mb-2">
                            4. Intellectual Property
                        </h2>
                        <p>
                            All content, features, and functionality on E-tracka
                            are the exclusive property of E-tracka and its
                            licensors. You may not reproduce, distribute, or
                            create derivative works without express permission.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold mb-2">
                            5. Limitation of Liability
                        </h2>
                        <p>
                            E-tracka is provided on an &quot;as is&quot; and
                            &quot;as available&quot; basis. We do not warrant
                            that the platform will be uninterrupted or
                            error-free. In no event shall E-tracka be liable for
                            any damages arising from the use of the platform.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold mb-2">
                            6. Changes to Terms
                        </h2>
                        <p>
                            We reserve the right to update or change these Terms
                            at any time. Continued use of the platform after
                            changes constitutes acceptance of those changes.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold mb-2">
                            7. Contact Us
                        </h2>
                        <p>
                            If you have any questions about these Terms, please
                            contact us at{' '}
                            <a
                                href="mailto:etracka.tech@gmail.com"
                                className="text-blue-600 underline"
                            >
                                etracka.tech@gmail.com
                            </a>
                            .
                        </p>
                    </section>
                </div>
                <div className="mt-8 text-center">
                    <Link
                        href="/"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        &larr; Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

TermsAndConditions.getLayout = function getLayout(page: ReactElement) {
    return <HomeLayout showFooter={true}>{page}</HomeLayout>;
};

export default TermsAndConditions;
