export interface OfficialManifesto {
    title: string;
    summary: string;
    points: string[];
}

export interface OfficialContact {
    email: string;
    phone: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    officeAddress: string;
}

export interface OfficialFinancials {
    estimatedNetWorth: string;
    allowances: string;
}

export interface OfficialPromises {
    kept: number;
    broken: number;
    pending: number;
}

export interface Official {
    id: number;
    name: string;
    role: "Governor" | "Minister" | "Senator" | "Director" | "President" | "Vice President" | "LG Chairman";
    position: string;
    state: string;
    party: "APC" | "PDP" | "LP" | "NNPP" | "APGA" | "SDP" | "YPP" | "ADP" | "Non-Partisan";
    rating: number;
    promises: OfficialPromises;
    image: string;
    description: string;
    residence: string;
    contact: OfficialContact;
    achievements: string[];
    manifesto?: OfficialManifesto;
    financials?: OfficialFinancials;
}