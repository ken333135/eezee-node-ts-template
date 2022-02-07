/**
 * File : number.ts
 * This file is to validate any number input regex
 */



/* NODE MODULES */

/* CONTEXT */

/* UI COMPONENTS */

/* SERVICES */

/* UTILS & CONFIG */

/* TYPES */

// VALIDATE IF THE VALUE IS A NUMBER
export const validateIsNumber = (thing: string | number): boolean => {
    return /[0-9]/.test(`${thing}`);
};

// VALIDATE IF THE VALUE IS MONEY
export const validateIsMoney = (money: string | number): boolean => {
    return /^\d+\.?\d{0,2}?$/.test(`${money}`);
};