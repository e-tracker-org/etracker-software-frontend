import { checkSubscription } from 'services/newServices/user';

export const getSubscriptionStatus = async (
    email: string
): Promise<string | null> => {
    try {
        const response = await checkSubscription(email);
        console.log('Full subscription backend response:', response); // Log the entire backend response
        return response?.subscriptionStatus || null;
    } catch (error) {
        console.error('Error checking subscription status:', error);
        return null;
    }
};
