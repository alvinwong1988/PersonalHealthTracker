import i18n from "i18n-js";
console.log("i18n imported:", i18n);
import en from "../translations/en.json"; // Adjust path based on where i18n.js is placed
import cn from "../translations/cn.json"; // Adjust path based on where i18n.js is placed

// Configure i18n
i18n.fallbacks = true; // Fallback to default language if a translation is missing
i18n.translations = { en, cn }; // Register translations
i18n.locale = "en"; // Default language

export default i18n;
