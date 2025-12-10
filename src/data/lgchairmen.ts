import { Official } from "@/lib/types";
import { createOfficial } from "@/utils/officialUtils";

// This is a placeholder as there are 774 LGAs in Nigeria.
// Real data would be fetched from a database or a larger dataset.
export const lgChairmen: Official[] = [
    createOfficial({
        id: 2001,
        name: "Hon. Christopher Zakka Maikalangu",
        role: "LG Chairman",
        position: "Chairman, Abuja Municipal Area Council (AMAC)",
        state: "FCT",
        party: "PDP",
        description: "Chairman of the Abuja Municipal Area Council, focusing on urban infrastructure and rural empowerment within the capital territory.",
        image: "https://i0.wp.com/media.premiumtimesng.com/wp-content/files/2022/06/Christopher-Zaka.jpg",
        manifesto: {
            title: "Inclusive Development",
            summary: "Ensuring every ward in AMAC feels the impact of governance.",
            points: ["Rural Electrification", "Primary Healthcare Revitalization", "Skill Acquisition for Youth"]
        }
    }),
    createOfficial({
        id: 2002,
        name: "Hon. Rasaq Olusola Ajala",
        role: "LG Chairman",
        position: "Chairman, Odi-Olowo/Ojuwoye LCDA",
        state: "Lagos",
        party: "APC",
        description: "Executive Chairman of Odi-Olowo/Ojuwoye LCDA, known for educational initiatives and infrastructure upgrades.",
        image: "https://pbs.twimg.com/profile_images/1418536130453348354/9X9X9X9X_400x400.jpg",
        manifesto: {
            title: "Service to Humanity",
            summary: " delivering dividends of democracy to the grassroots.",
            points: ["Road Construction", "Educational Support", "Health Insurance for the Elderly"]
        }
    }),
    createOfficial({
        id: 2003,
        name: "Hon. Aminu Maifata",
        role: "LG Chairman",
        position: "Chairman, Lafia LGA & ALGON National President",
        state: "Nasarawa",
        party: "APC",
        description: "Chairman of Lafia Local Government and National President of the Association of Local Governments of Nigeria (ALGON).",
        manifesto: {
            title: "Unified Local Governance",
            summary: "Strengthening local government autonomy and service delivery.",
            points: ["LG Autonomy", "Agriculture Support", "Security Enhancement"]
        }
    }),
    createOfficial({
        id: 2004,
        name: "Hon. Franklin D. U. Nwadilora",
        role: "LG Chairman",
        position: "Chairman, Oji River LGA",
        state: "Enugu",
        party: "PDP",
        description: "Chairman of Oji River Local Government Area.",
    })
];