const DEFAULT_STRIPE_LINK = "";

export const getStripePaymentLink = (envValue?: string) => envValue ?? DEFAULT_STRIPE_LINK;
