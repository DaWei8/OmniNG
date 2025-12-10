import { Official } from "@/lib/types";
import { createOfficial } from "@/utils/officialUtils";

export const presidential: Official[] = [
    createOfficial({
        id: 1001,
        name: "Bola Ahmed Tinubu",
        role: "President",
        position: "President of the Federal Republic of Nigeria",
        state: "Federal",
        party: "APC",
        rating: 10,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Bola_Tinubu_portrait_%28cropped%29.jpg/640px-Bola_Tinubu_portrait_%28cropped%29.jpg",
        description: "Bola Ahmed Tinubu is the 16th and current President of Nigeria. He previously served as the Governor of Lagos State from 1999 to 2007 and Senator for Lagos West in the Third Republic.",
        achievements: ["Removal of fuel subsidy", "Unified exchange rate", ""],
        contact: {
            email: "info@statehouse.gov.ng",
            phone: "",
            officeAddress: "Aso Rock Presidential Villa, Abuja",
            twitter: "officialABAT"
        },
        financials: {
            estimatedNetWorth: "N1.1 trillion",
            allowances: "N1.5 million",
        }
    }),
    createOfficial({
        id: 1002,
        name: "Kashim Shettima",
        role: "Vice President",
        position: "Vice President of the Federal Republic of Nigeria",
        state: "Federal",
        party: "APC",
        rating: 10,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Kashim_Shettima_office_portrait.jpg/640px-Kashim_Shettima_office_portrait.jpg",
        description: "Kashim Shettima Mustapha is the 15th Vice President of Nigeria. He previously served as the Governor of Borno State and Senator for Borno Central.",
        contact: {
            email: "vp@statehouse.gov.ng",
            phone: "",
            officeAddress: "Aso Rock Presidential Villa, Abuja",
            twitter: "KashimSM"
        },
    })
];