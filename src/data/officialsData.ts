export interface Official {
    id: number;
    name: string;
    role: "Governor" | "Senator" | "Minister" | "Official" | "Director";
    position?: string; // Specific portfolio for ministers
    state: string; // State or "Federal"
    party: string;
    rating: number;
    promises: { kept: number; broken: number; pending: number };
    image?: string;
    // New Fields
    description?: string;
    residence?: string;
    contact?: {
        email?: string;
        phone?: string;
        twitter?: string;
        facebook?: string;
        instagram?: string;
        officeAddress?: string;
    };
    achievements?: string[];
    manifesto?: {
        title: string;
        summary: string;
        points: string[];
    };
    financials?: {
        estimatedNetWorth?: string;
        allowances?: string;
    };
}

export const officialsData: Official[] = [
    // Existing Mock Data
    {
        id: 1,
        name: "Babajide Sanwo-Olu",
        role: "Governor",
        position: "Governor of Lagos State",
        state: "Lagos",
        party: "APC",
        rating: 4.2,
        promises: { kept: 15, broken: 3, pending: 8 },
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Babajide_Sanwo-Olu.jpg/440px-Babajide_Sanwo-Olu.jpg",
        description: "Babajide Olusola Sanwo-Olu is a Nigerian politician and the current Governor of Lagos State. He was elected governor on the platform of the All Progressives Congress (APC) in 2019 and re-elected in 2023. Before his governorship, he served as the Managing Director/CEO of the Lagos State Property Development Corporation (LSPDC).",
        residence: "State House, Marina, Lagos",
        contact: {
            email: "governor@lagosstate.gov.ng",
            phone: "+234 800 000 0000",
            twitter: "jidesanwoolu",
            facebook: "jidesanwoolu",
            instagram: "jidesanwoolu",
            officeAddress: "Lagos State Secretariat, Alausa, Ikeja, Lagos"
        },
        achievements: [
            "Completion of the Blue Line Rail Mass Transit",
            "Construction of the Lekki Deep Sea Port access roads",
            "Renovation of 150+ public schools across the state",
            "Launch of 'THEMES' agenda for state development"
        ],
        manifesto: {
            title: "The THEMES Plus Agenda",
            summary: "A consolidated framework for social inclusion, gender equality, and youth development, building on the initial THEMES agenda.",
            points: [
                "Traffic Management and Transportation",
                "Health and Environment",
                "Education and Technology",
                "Making Lagos a 21st Century Economy",
                "Entertainment and Tourism",
                "Security and Governance"
            ]
        },
        financials: {
            estimatedNetWorth: "₦500,000,000 (Estimated)",
            allowances: "₦2,500,000 Monthly (Estimated)"
        }
    },
    {
        id: 2,
        name: "Nyesom Wike",
        role: "Minister",
        position: "Minister of Federal Capital Territory",
        state: "FCT",
        party: "PDP",
        rating: 3.8,
        promises: { kept: 10, broken: 5, pending: 12 },
    },
    {
        id: 3,
        name: "Siminalayi Fubara",
        role: "Governor",
        position: "Governor of Rivers State",
        state: "Rivers",
        party: "PDP",
        rating: 4.0,
        promises: { kept: 8, broken: 1, pending: 20 },
    },
    {
        id: 4,
        name: "Abba Kabir Yusuf",
        role: "Governor",
        position: "Governor of Kano State",
        state: "Kano",
        party: "NNPP",
        rating: 4.5,
        promises: { kept: 12, broken: 2, pending: 10 },
    },
    // New Ministers
    { id: 5, name: "Hon. Hannatu Musawa", role: "Minister", position: "Minister of Art, Culture, Tourism and the Creative Economy", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 6, name: "Gen. Christopher Musa", role: "Minister", position: "Minister of Defence", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 7, name: "Hon. Bello Matawalle", role: "Minister", position: "Minister of State, Defence", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 8, name: "Dr. Bernard Mohammed Doro", role: "Minister", position: "Minister of Humanitarian Affairs and Poverty Reduction", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 9, name: "Hon. Yusuf T. Sununu", role: "Minister", position: "Minister of State, Humanitarian Affairs and Poverty Reduction", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 10, name: "Hon. Ahmed M. Dangiwa", role: "Minister", position: "Minister of Housing & Urban Development", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 11, name: "Muhammadu Maigari Dingyadi", role: "Minister", position: "Minister of Labour and Employment", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 12, name: "Hon. Atiku Bagudu", role: "Minister", position: "Minister of Budget & Economic Planning", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 13, name: "Dr. Iziaq Adekunle Salako", role: "Minister", position: "Minister of State, Health", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    // Skip Wike as he is already added manually above (id 2) - checking duplicates? User list has Wike. I will prefer the user list version but keep the mock data one merged. Wike is #10 in user list. I'll just skip adding him again or update him.
    { id: 14, name: "Hon. Mairiga Mahmud", role: "Minister", position: "Minister of State, Federal Capital Territory", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 15, name: "Hon. Joseph Utsev", role: "Minister", position: "Minister of Water Resources & Sanitation", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 16, name: "Barr. Bello M. Goronyo", role: "Minister", position: "Minister of State, Works", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 17, name: "Hon. Abubakar Kyari", role: "Minister", position: "Minister of Agriculture and Food Security", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 18, name: "Hon. Aliyu Sabi Abdullahi", role: "Minister", position: "Minister of State, Agriculture and Food Security", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 19, name: "Hon. Olubunmi Tunji-Ojo", role: "Minister", position: "Minister of Interior", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 20, name: "Hon. Yusuf M. Tuggar", role: "Minister", position: "Minister of Foreign Affairs", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 21, name: "Hon. Ali Pate", role: "Minister", position: "Coordinating Minister of Health and Social Welfare", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 22, name: "Dr. Morufu Olatunji Alausa", role: "Minister", position: "Minister of Education", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 23, name: "Hon. Ibrahim Geidam", role: "Minister", position: "Minister of Police Affairs", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 24, name: "Imaan Sulaiman-Ibrahim", role: "Minister", position: "Minister of Women Affairs", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 25, name: "Hon. Shuaibu A. Audu", role: "Minister", position: "Minister of Steel Development", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 26, name: "Hon. Uba Maigari Ahmadu", role: "Minister", position: "Minister of State, Regional Development", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 27, name: "Hon. Muhammed Idris", role: "Minister", position: "Minister of Information and National Orientation", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 28, name: "Hon. Lateef Fagbemi", role: "Minister", position: "Attorney General of the Federation and Minister of Justice", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 29, name: "Hon. Abubakar Momoh", role: "Minister", position: "Minister of Regional Development", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 30, name: "Hon. Nkiruka Onyejeocha", role: "Minister", position: "Minister of State, Labour and Employment", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 31, name: "Hon. Zephaniah Jisalo", role: "Minister", position: "Minister of Special Duties and Inter-Governmental Affairs", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 32, name: "Hon. Bosun Tijani", role: "Minister", position: "Minister of Communications, Innovation and Digital Economy", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 33, name: "Hon. Wale Edun", role: "Minister", position: "Minister of Finance and Coordinating Minister of the Economy", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 34, name: "Hon. Adegboyega Oyetola", role: "Minister", position: "Minister of Marine and Blue Economy", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 35, name: "Hon. Adebayo Adelabu", role: "Minister", position: "Minister of Power", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 36, name: "Hon. Dele Alake", role: "Minister", position: "Minister of Solid Minerals Development", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 37, name: "Bianca Odinaka Odumegu-Ojukwu", role: "Minister", position: "Minister of State, Foreign Affairs", state: "Federal", party: "APGA", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } }, // APGA? Assuming appointment by APC gov
    { id: 38, name: "Hon. Sa'idu Alkali", role: "Minister", position: "Minister of Transportation", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 39, name: "Dr. Doris Uzoka-Anite", role: "Minister", position: "Minister of State, Finance", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 40, name: "Kingsley Tochukwu Udeh, SAN", role: "Minister", position: "Minister of Innovation, Science and Technology", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 41, name: "Hon. David Umahi", role: "Minister", position: "Minister of Works", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 42, name: "Hon. Festus Keyamo", role: "Minister", position: "Minister of Aviation and Aerospace Development", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 43, name: "Dr. Jumoke Oduwole", role: "Minister", position: "Minister of Industry, Trade and Investment", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 44, name: "Hon. Ayodele Olawande", role: "Minister", position: "Minister for Youth Development", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 45, name: "Hon. Ekperipe Ekpo", role: "Minister", position: "Minister of State (Gas) Petroleum Resources", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 46, name: "Hon. Heineken LokpobIRI", role: "Minister", position: "Minister of State (Oil) Petroleum Resources", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 47, name: "Sen. John Owan Enoh", role: "Minister", position: "Minister of State, Trade and Investment", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 48, name: "Hon. Balarabe Abbas Lawal", role: "Minister", position: "Minister of Environment", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 49, name: "Idi Mukhtar Maiha", role: "Minister", position: "Minister of Livestock Development", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 50, name: "Rt. Hon Yusuf Abdullahi", role: "Minister", position: "Minister of State, Housing and Urban Development", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 51, name: "Suwaiba Said Ahmad", role: "Minister", position: "Minister of State, Education", state: "Federal", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    // Heads of Departments
    { id: 52, name: "Dr. Chijioke Obalum", role: "Director", position: "CMAC, State House Medical Centre", state: "Federal", party: "Non-Partisan", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 53, name: "Isa Francis Wasa", role: "Director", position: "Director, Information and Communications Technology", state: "Federal", party: "Non-Partisan", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 54, name: "Yusuf T. Sule", role: "Director", position: "Director, Finance and Account", state: "Federal", party: "Non-Partisan", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 55, name: "Oladunjoye Abiodun Ayodeji", role: "Director", position: "Director, Information and Strategy", state: "Federal", party: "Non-Partisan", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 56, name: "Ali A. Sufiyanu", role: "Director", position: "Director, Planning, Research and Statistics", state: "Federal", party: "Non-Partisan", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 57, name: "Akintola Adenike A.", role: "Director", position: "Director, Internal Audit", state: "Federal", party: "Non-Partisan", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 58, name: "Arogundade Olayinka Oladapo", role: "Director", position: "Director, Office of the Vice President", state: "Federal", party: "Non-Partisan", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 59, name: "Agunrege Akeem", role: "Director", position: "Director, Maintenance", state: "Federal", party: "Non-Partisan", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 60, name: "Abdulkadir Idris", role: "Director", position: "Director, Administration", state: "Federal", party: "Non-Partisan", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 61, name: "Geraldine B. Longsten", role: "Director", position: "Director, State House Counsel", state: "Federal", party: "Non-Partisan", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 62, name: "Abimbola Olusola", role: "Director", position: "Deputy Director, Procurement", state: "Federal", party: "Non-Partisan", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 63, name: "Adegoke Emmanuel Elefiku", role: "Director", position: "Assistant Director, Office of the Chief of Staff", state: "Federal", party: "Non-Partisan", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    // Senators
    { id: 64, name: "Sen. Abba Patrick Moro", role: "Senator", position: "Senator for Benue South", state: "Benue", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 65, name: "Sen. Abdul Ningi", role: "Senator", position: "Senator for Bauchi Central", state: "Bauchi", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 66, name: "Sen. Abdulaziz Abubakar Yari", role: "Senator", position: "Senator for Zamfara West", state: "Zamfara", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 67, name: "Sen. Adeniyi Ayodele Adegbonmire", role: "Senator", position: "Senator for Ondo Central", state: "Ondo", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 68, name: "Sen. Adeola Solomon Olamilekan", role: "Senator", position: "Senator for Ogun West", state: "Ogun", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 69, name: "Sen. Adetokunbo Abiru Mukhail", role: "Senator", position: "Senator for Lagos-East", state: "Lagos", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 70, name: "Sen. Afolabi Salisu", role: "Senator", position: "Senator for Ogun Central", state: "Ogun", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 71, name: "Sen. Ahmad Ibrahim Lawan", role: "Senator", position: "Senator for Yobe North", state: "Yobe", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 72, name: "Sen. Ahmed wadada Aliyu", role: "Senator", position: "Senator for Nasarawa West", state: "Nasarawa", party: "SDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 73, name: "Sen. Akpoti-uduaghan Natasha", role: "Senator", position: "Senator for Kogi Central", state: "Kogi", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 74, name: "Sen. Aliyu Magatakarda Wamakko", role: "Senator", position: "Senator for Sokoto North", state: "Sokoto", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 75, name: "Sen. Allwell Heacho Onyesoh", role: "Senator", position: "Senator for Rivers East", state: "Rivers", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 76, name: "Sen. Aminu Abbas", role: "Senator", position: "Senator for Adamawa Central", state: "Adamawa", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 77, name: "Sen. Anthony Siyako Yaro", role: "Senator", position: "Senator for Gombe South", state: "Gombe", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 78, name: "Sen. Ashiru Oyelola Yisa", role: "Senator", position: "Senator for Kwara South", state: "Kwara", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 79, name: "Sen. Augustine Okwudiri Akobundu", role: "Senator", position: "Senator for Abia-Central", state: "Abia", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 80, name: "Sen. Babangida Hussaini", role: "Senator", position: "Senator for North West", state: "Jigawa", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 81, name: "Sen. Barinada Barry Mpigi", role: "Senator", position: "Senator for Rivers South East", state: "Rivers", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 82, name: "Sen. Bassey Aniekan Etim", role: "Senator", position: "Senator for Akwa Ibom North-East", state: "Akwa Ibom", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 83, name: "Sen. Benson Agadaga", role: "Senator", position: "Senator for Bayelsa East", state: "Bayelsa", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 84, name: "Sen. Binos Dauda Yaroe", role: "Senator", position: "Senator for Adamawa South", state: "Adamawa", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 85, name: "Sen. Buhari Abdulfatai Omotayo", role: "Senator", position: "Senator for Oyo North", state: "Oyo", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 86, name: "Sen. Danjuma Goje Mohammed", role: "Senator", position: "Senator for Gombe Central", state: "Gombe", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 87, name: "Sen. David Jimkuta", role: "Senator", position: "Senator for Taraba South", state: "Taraba", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 88, name: "Sen. Enyinnaya Harcourt Abaribe", role: "Senator", position: "Senator for Abia-South", state: "Abia", party: "APGA", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 89, name: "Sen. Ezenwa Francis Onyewuchi", role: "Senator", position: "Senator for Imo East", state: "Imo", party: "LP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 90, name: "Sen. Francis Adenigba Fadahunsi", role: "Senator", position: "Senator for Osun East", state: "Osun", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 91, name: "Sen. Godiya Akwashiki", role: "Senator", position: "Senator for Nasarawa North", state: "Nasarawa", party: "SDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 92, name: "Sen. Godswill Obot Akpabio", role: "Senator", position: "Senator for Akwa Ibom North-West", state: "Akwa Ibom", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 93, name: "Sen. Ibrahim Dankwambo", role: "Senator", position: "Senator for Gombe North", state: "Gombe", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 94, name: "Sen. Ibrahim Jimoh", role: "Senator", position: "Senator for Ondo South", state: "Ondo", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 95, name: "Sen. Ibrahim Barau Jibrin", role: "Senator", position: "Senator for Kano-North", state: "Kano", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 96, name: "Sen. Ibrahim Mohammed Bomai", role: "Senator", position: "Senator for Yobe South", state: "Yobe", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 97, name: "Sen. Ifeanyi Patrick Ubah", role: "Senator", position: "Senator for Anambra South", state: "Anambra", party: "YPP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 98, name: "Sen. Ikra Aliyu Bilbis", role: "Senator", position: "Senator for Zamfara Central", state: "Zamfara", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 99, name: "Sen. Ipinsagba Emmanuel Olajide", role: "Senator", position: "Senator for Ondo North", state: "Ondo", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 100, name: "Sen. Ireti Heebah Kingibe", role: "Senator", position: "Senator for FCT", state: "FCT", party: "LP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 101, name: "Sen. Ishaku Elisha cliff Abbo", role: "Senator", position: "Senator for Adamawa North", state: "Adamawa", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 102, name: "Sen. Jarigbe Agom Jarigbe", role: "Senator", position: "Senator for Cross River North", state: "Cross River", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 103, name: "Sen. Jibrin Isah", role: "Senator", position: "Senator for Kogi East", state: "Kogi", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 104, name: "Sen. Justus Olugbenga Daniel", role: "Senator", position: "Senator for Ogun East", state: "Ogun", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 105, name: "Sen. Kaka Shehu Lawan", role: "Senator", position: "Senator for Borno Central", state: "Borno", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 106, name: "Sen. Kelvin Chukwu", role: "Senator", position: "Senator for Enugu East", state: "Enugu", party: "LP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 107, name: "Sen. Lawal Usman", role: "Senator", position: "Senator for Kaduna Central", state: "Kaduna", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 108, name: "Sen. Mallam-madori Ahmed Abdulhamid", role: "Senator", position: "Senator for North East", state: "Jigawa", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 109, name: "Sen. Manu Haruna", role: "Senator", position: "Senator for Taraba Central", state: "Taraba", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 110, name: "Sen. Michael Opeyemi Bamidele", role: "Senator", position: "Senator for Ekiti Central", state: "Ekiti", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 111, name: "Sen. Mohammad Adamu Mainasara aliero", role: "Senator", position: "Senator for Kebbi Central", state: "Kebbi", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 112, name: "Sen. Mohammed Ali Ndume", role: "Senator", position: "Senator for Borno South", state: "Borno", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 113, name: "Sen. Mohammed Sani Musa", role: "Senator", position: "Senator for Niger East", state: "Niger", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 114, name: "Sen. Mohammed Tahir Monguno", role: "Senator", position: "Senator for Borno North", state: "Borno", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 115, name: "Sen. Mustapha Musa", role: "Senator", position: "Senator for Yobe East", state: "Yobe", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 116, name: "Sen. Nasiru Sani zangon daura", role: "Senator", position: "Senator for Katsina North", state: "Katsina", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 117, name: "Sen. Ned Munir Nwoko", role: "Senator", position: "Senator for Delta North", state: "Delta", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 118, name: "Sen. Okechukwu Ezea", role: "Senator", position: "Senator for Enugu North", state: "Enugu", party: "LP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 119, name: "Sen. Olalere Oyewumi", role: "Senator", position: "Senator for Osun West", state: "Osun", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 120, name: "Sen. Oluwole Fadeyi Olubiyi", role: "Senator", position: "Senator for Osun Central", state: "Osun", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 121, name: "Sen. Onawo Mohammed Ogoshi", role: "Senator", position: "Senator for Nasarawa South", state: "Nasarawa", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 122, name: "Sen. Orji Uzor Kalu", role: "Senator", position: "Senator for Abia-North", state: "Abia", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 123, name: "Sen. Pam Mwadkon Dachungyang", role: "Senator", position: "Senator for Plateau North", state: "Plateau", party: "ADP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 124, name: "Sen. Peter Ndalikali Jiya", role: "Senator", position: "Senator for Niger South", state: "Niger", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 125, name: "Sen. Sadiq Suleiman Umar", role: "Senator", position: "Senator for Kwara North", state: "Kwara", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 126, name: "Sen. Samaila Dahuwa Kaila", role: "Senator", position: "Senator for Bauchi North", state: "Bauchi", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 127, name: "Sen. Sani Abubakar Bello", role: "Senator", position: "Senator for Niger North", state: "Niger", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 128, name: "Sen. Seriake Henry Dickson", role: "Senator", position: "Senator for Bayelsa West", state: "Bayelsa", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 129, name: "Sen. Shuaibu Isa Lau", role: "Senator", position: "Senator for Taraba North", state: "Taraba", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 130, name: "Sen. Sunday Katung", role: "Senator", position: "Senator for Kaduna South", state: "Kaduna", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 131, name: "Sen. Sunday Steve Karimi", role: "Senator", position: "Senator for Kogi West", state: "Kogi", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 132, name: "Sen. Umar Shehu Buba", role: "Senator", position: "Senator for Bauchi South", state: "Bauchi", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 133, name: "Sen. Victor Umeh", role: "Senator", position: "Senator for Anambra Central", state: "Anambra", party: "LP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 134, name: "Sen. Wasiu Sanni Eshilokun", role: "Senator", position: "Senator for Lagos-Central", state: "Lagos", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 135, name: "Sen. Williams Eteng Jonah", role: "Senator", position: "Senator for Cross River Central", state: "Cross River", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 136, name: "Sen. Yahaya Abubakar Abdullahi", role: "Senator", position: "Senator for Kebbi North", state: "Kebbi", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 137, name: "Sen. Yau Sahabi Alhaji", role: "Senator", position: "Senator for Zamfara North", state: "Zamfara", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    // Governors (Additional)
    { id: 138, name: "Alex Otti", role: "Governor", position: "Governor of Abia State", state: "Abia", party: "LP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 139, name: "Ahmadu Umaru Fintiri", role: "Governor", position: "Governor of Adamawa State", state: "Adamawa", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 140, name: "Umo Eno", role: "Governor", position: "Governor of Akwa Ibom State", state: "Akwa Ibom", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 141, name: "Charles Soludo", role: "Governor", position: "Governor of Anambra State", state: "Anambra", party: "APGA", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 142, name: "Bala Muhammed", role: "Governor", position: "Governor of Bauchi State", state: "Bauchi", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 143, name: "Douye Diri", role: "Governor", position: "Governor of Bayelsa State", state: "Bayelsa", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 144, name: "Hyacinth Alia", role: "Governor", position: "Governor of Benue State", state: "Benue", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 145, name: "Babagana Zulum", role: "Governor", position: "Governor of Borno State", state: "Borno", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 146, name: "Bassey Otu", role: "Governor", position: "Governor of Cross River State", state: "Cross River", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 147, name: "Sheriff Oborevwori", role: "Governor", position: "Governor of Delta State", state: "Delta", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 148, name: "Francis Nwifuru", role: "Governor", position: "Governor of Ebonyi State", state: "Ebonyi", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 149, name: "Monday Okpebholo", role: "Governor", position: "Governor of Edo State", state: "Edo", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 150, name: "Biodun Oyebanji", role: "Governor", position: "Governor of Ekiti State", state: "Ekiti", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 151, name: "Peter Mbah", role: "Governor", position: "Governor of Enugu State", state: "Enugu", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 152, name: "Muhammad Inuwa Yahaya", role: "Governor", position: "Governor of Gombe State", state: "Gombe", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 153, name: "Hope Uzodinma", role: "Governor", position: "Governor of Imo State", state: "Imo", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 154, name: "Umar Namadi", role: "Governor", position: "Governor of Jigawa State", state: "Jigawa", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 155, name: "Uba Sani", role: "Governor", position: "Governor of Kaduna State", state: "Kaduna", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 156, name: "Dikko Umaru Radda", role: "Governor", position: "Governor of Katsina State", state: "Katsina", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 157, name: "Nasir Idris", role: "Governor", position: "Governor of Kebbi State", state: "Kebbi", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 158, name: "Ahmed Usman Ododo", role: "Governor", position: "Governor of Kogi State", state: "Kogi", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 159, name: "AbdulRahman AbdulRazaq", role: "Governor", position: "Governor of Kwara State", state: "Kwara", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 160, name: "Abdullahi Sule", role: "Governor", position: "Governor of Nasarawa State", state: "Nasarawa", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 161, name: "Mohammed Umar Bago", role: "Governor", position: "Governor of Niger State", state: "Niger", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 162, name: "Dapo Abiodun", role: "Governor", position: "Governor of Ogun State", state: "Ogun", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 163, name: "Lucky Aiyedatiwa", role: "Governor", position: "Governor of Ondo State", state: "Ondo", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 164, name: "Ademola Adeleke", role: "Governor", position: "Governor of Osun State", state: "Osun", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 165, name: "Seyi Makinde", role: "Governor", position: "Governor of Oyo State", state: "Oyo", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 166, name: "Caleb Mutfwang", role: "Governor", position: "Governor of Plateau State", state: "Plateau", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 167, name: "Ahmad Aliyu", role: "Governor", position: "Governor of Sokoto State", state: "Sokoto", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 168, name: "Agbu Kefas", role: "Governor", position: "Governor of Taraba State", state: "Taraba", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 169, name: "Mai Mala Buni", role: "Governor", position: "Governor of Yobe State", state: "Yobe", party: "APC", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
    { id: 170, name: "Dauda Lawal", role: "Governor", position: "Governor of Zamfara State", state: "Zamfara", party: "PDP", rating: 0, promises: { kept: 0, broken: 0, pending: 0 } },
];
