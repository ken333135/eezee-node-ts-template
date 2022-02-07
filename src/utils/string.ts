/* NODE MODULES */

/* CONTEXT */

/* SERVICES */

/* UTILS & CONFIG */

/* TYPES */

export const validateIsEmail = (email: string): boolean => {
    return /^[a-z0-9!'#$%&*+/=?^_`{|}~-]+(?:\.[a-z0-9!'#$%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-zA-Z]{2,}$/i.test(email);
};