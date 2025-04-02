import { checkSubscription } from 'services/newServices/user';

export const getSubscriptionStatus = async (email: string): Promise<string | null> => {
    try {
        const response = await checkSubscription(email);
        return response?.subscriptionStatus || null;
    } catch (error) {
        console.error('Error checking subscription status:', error);
        return null;
    }
};