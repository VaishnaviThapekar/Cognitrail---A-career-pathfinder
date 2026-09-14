export const CAREER_DATABASE = {
    science: {
        name: "Science & Research",
        icon: "🔬",
        color: "#00BCD4",
        subFields: [
            {
                id: "medicine",
                name: "Medicine & Healthcare",
                description: "Save lives and improve health outcomes",
                careers: [
                    {
                        name: "MBBS Doctor",
                        description: "Medical practitioner diagnosing and treating patients",
                        education: "MBBS (5.5 years) + MD/MS (3 years)",
                        entranceExams: ["NEET-UG", "AIIMS", "JIPMER"],
                        topColleges: [
                            { name: "AIIMS Delhi", website: "https://www.aiims.edu", rating: 4.9 },
                            { name: "CMC Vellore", website: "https://www.cmch-vellore.edu", rating: 4.8 },
                            { name: "AFMC Pune", website: "https://www.afmc.nic.in", rating: 4.7 },
                            { name: "JIPMER Puducherry", website: "https://www.jipmer.edu.in", rating: 4.7 },
                            { name: "KGMC Lucknow", website: "https://kgmu.org", rating: 4.3 }
                        ],
                        salaryRange: "₹6-25 LPA (Junior) | ₹25-80 LPA (Senior) | ₹1-5 Cr+ (Specialist)",
                        ageToStart: "17-18 years (after 12th)",
                        skills: ["Clinical diagnosis", "Patient care", "Medical knowledge", "Communication", "Empathy"],
                        jobOutlook: "Excellent - Always in demand",
                        workEnvironment: "Hospitals, Clinics, Private Practice",
                        careerPath: "Junior Doctor → Senior Resident → Specialist/Consultant → HOD",
                        alternativePaths: ["Research Scientist", "Medical Writer", "Healthcare Administrator"]
                    },
                    {
                        name: "Dentist (BDS/MDS)",
                        description: "Specialist in oral health and dental care",
                        education: "BDS (5 years) + MDS (3 years optional)",
                        entranceExams: ["NEET-MDS", "State Dental Exams"],
                        topColleges: [
                            { name: "Maulana Azad Institute Delhi", website: "https://www.maids.edu.in", rating: 4.4 },
                            { name: "Manipal College", website: "https://manipal.edu", rating: 4.2 },
                            { name: "Government Dental College Mumbai", website: "https://www.muhs.ac.in", rating: 4.0 }
                        ],
                        salaryRange: "₹4-15 LPA (BDS) | ₹12-50 LPA (MDS) | ₹50L-2Cr+ (Own Practice)",
                        ageToStart: "17-18 years",
                        skills: ["Manual dexterity", "Attention to detail", "Patient communication", "Technical knowledge"],
                        jobOutlook: "Very Good - Growing demand",
                        workEnvironment: "Dental clinics, Hospitals, Private practice",
                        careerPath: "Dental Intern → General Dentist → Specialist → Practice Owner",
                        alternativePaths: ["Orthodontist", "Oral Surgeon", "Dental Researcher"]
                    },
                    {
                        name: "Pharmacist",
                        description: "Medication expert and healthcare professional",
                        education: "D.Pharm (2 years) or B.Pharm (4 years)",
                        entranceExams: ["GPAT", "State Pharmacy Exams"],
                        topColleges: [
                            { name: "ICT Mumbai", website: "https://www.ictmumbai.edu.in", rating: 4.3 },
                            { name: "Jamia Hamdard", website: "https://www.jamiahamdard.edu", rating: 4.1 },
                            { name: "JSS College Mysore", website: "https://www.jssuni.edu.in", rating: 4.0 }
                        ],
                        salaryRange: "₹2.5-8 LPA (D.Pharm) | ₹3-12 LPA (B.Pharm) | ₹15-40 LPA (M.Pharm/Industry)",
                        ageToStart: "17-18 years",
                        skills: ["Pharmaceutical knowledge", "Attention to detail", "Customer service", "Regulatory compliance"],
                        jobOutlook: "Good - Stable demand",
                        workEnvironment: "Pharmacies, Hospitals, Pharmaceutical companies",
                        careerPath: "Junior Pharmacist → Senior Pharmacist → Pharmacy Manager → Healthcare Consultant",
                        alternativePaths: ["Drug Inspector", "Medical Representative", "Clinical Research"]
                    },
                    {
                        name: "Nursing",
                        description: "Patient care and healthcare support professional",
                        education: "GNM (3.5 years) or B.Sc Nursing (4 years)",
                        entranceExams: ["NEET for some states", "Institute-specific exams"],
                        topColleges: [
                            { name: "AIIMS Nursing College", website: "https://www.aiims.edu", rating: 4.8 },
                            { name: "CMC Vellore", website: "https://www.cmch-vellore.edu", rating: 4.8 },
                            { name: "PGIMER Chandigarh", website: "https://www.pgimer.edu.in", rating: 4.6 }
                        ],
                        salaryRange: "₹2-6 LPA (India) | ₹15-35 LPA (Abroad)",
                        ageToStart: "17-18 years",
                        skills: ["Patient care", "Medical procedures", "Communication", "Empathy", "Quick thinking"],
                        jobOutlook: "Excellent - High demand globally",
                        workEnvironment: "Hospitals, Nursing homes, Home healthcare",
                        careerPath: "Staff Nurse → Senior Nurse → Nursing Superintendent → Matron",
                        alternativePaths: ["Nurse Practitioner", "Healthcare Administrator", "Nursing Educator"]
                    },
                    {
                        name: "Veterinarian",
                        description: "Animal health and care specialist",
                        education: "B.V.Sc & AH (5 years) + M.V.Sc (2 years optional)",
                        entranceExams: ["NEET", "State Veterinary Exams"],
                        topColleges: [
                            { name: "ICAR-IVRI Bareilly", website: "https://www.ivri.nic.in", rating: 4.2 },
                            { name: "Madras Veterinary College", website: "https://www.tanuvas.ac.in", rating: 4.0 },
                            { name: "College of Veterinary Science Hyderabad", website: "https://www.pvnrtvu.ac.in", rating: 3.9 }
                        ],
                        salaryRange: "₹3-10 LPA (Government) | ₹15-40 LPA (Private/Own Clinic)",
                        ageToStart: "17-18 years",
                        skills: ["Animal handling", "Medical diagnosis", "Surgery", "Compassion", "Business management"],
                        jobOutlook: "Growing - Increasing pet ownership",
                        workEnvironment: "Veterinary clinics, Zoos, Research facilities, Farms",
                        careerPath: "Veterinary Officer → Senior Vet → Clinic Owner → Veterinary Consultant",
                        alternativePaths: ["Wildlife Veterinarian", "Livestock Consultant", "Veterinary Researcher"]
                    }
                ]
            },
            {
                id: "engineering_research",
                name: "Engineering & Research",
                description: "Innovation through science and technology",
                careers: [
                    {
                        name: "Scientist (ISRO/DRDO/BARC)",
                        description: "Research and development in critical sectors",
                        education: "B.Tech/B.Sc (4 years) + M.Tech/M.Sc (2 years) + Ph.D. (optional)",
                        entranceExams: ["GATE", "JEST", "NET", "Organization-specific exams"],
                        topColleges: [
                            { name: "IIT Bombay", website: "https://www.iitb.ac.in", rating: 4.9 },
                            { name: "IISc Bangalore", website: "https://www.iisc.ac.in", rating: 4.9 },
                            { name: "IIT Delhi", website: "https://www.iitd.ac.in", rating: 4.9 },
                            { name: "NIT Trichy", website: "https://www.nitt.edu", rating: 4.6 },
                            { name: "IISER Pune", website: "https://www.iiserpune.ac.in", rating: 4.6 }
                        ],
                        salaryRange: "₹8-18 LPA (Entry) | ₹25-50 LPA (Senior) | ₹60L-1.5Cr (Chief Scientist)",
                        ageToStart: "17-18 years",
                        skills: ["Research methodology", "Analytical thinking", "Problem-solving", "Technical expertise"],
                        jobOutlook: "Good - Government focus on R&D",
                        workEnvironment: "Research labs, Government facilities",
                        careerPath: "Scientist B → Scientist C → Senior Scientist → Outstanding Scientist",
                        alternativePaths: ["Academic Professor", "Private R&D", "Consultant"]
                    },
                    {
                        name: "Biotechnologist",
                        description: "Apply biological processes to develop products",
                        education: "B.Tech/B.Sc Biotech (4 years) + M.Tech/M.Sc (2 years)",
                        entranceExams: ["JEE Main", "BITSAT", "IISER Aptitude Test"],
                        topColleges: [
                            { name: "IIT Delhi", website: "https://www.iitd.ac.in", rating: 4.9 },
                            { name: "Anna University", website: "https://www.annauniv.edu", rating: 4.1 },
                            { name: "VIT Vellore", website: "https://www.vit.ac.in", rating: 4.3 },
                            { name: "Manipal Institute", website: "https://manipal.edu", rating: 4.2 }
                        ],
                        salaryRange: "₹3-8 LPA (Entry) | ₹12-30 LPA (Experienced) | ₹40-80 LPA (Senior/Abroad)",
                        ageToStart: "17-18 years",
                        skills: ["Laboratory techniques", "Data analysis", "Research design", "Molecular biology"],
                        jobOutlook: "Excellent - Emerging field",
                        workEnvironment: "Biotech companies, Research institutes, Pharma labs",
                        careerPath: "Research Associate → Scientist → Senior Scientist → Project Lead",
                        alternativePaths: ["Genetic Counselor", "Quality Control Analyst", "Bioinformatics Specialist"]
                    }
                ]
            },
            {
                id: "pure_sciences",
                name: "Pure Sciences",
                description: "Fundamental research and teaching",
                careers: [
                    {
                        name: "Physicist/Chemist/Biologist (Academia)",
                        description: "Research and teaching in pure sciences",
                        education: "B.Sc (3 years) + M.Sc (2 years) + Ph.D. (4-5 years)",
                        entranceExams: ["IIT-JAM", "CUCET", "University entrance exams", "CSIR-NET"],
                        topColleges: [
                            { name: "IISc Bangalore", website: "https://www.iisc.ac.in", rating: 4.9 },
                            { name: "IIT Bombay", website: "https://www.iitb.ac.in", rating: 4.9 },
                            { name: "Delhi University", website: "https://www.du.ac.in", rating: 4.4 },
                            { name: "JNU Delhi", website: "https://www.jnu.ac.in", rating: 3.8 },
                            { name: "IISER Pune", website: "https://www.iiserpune.ac.in", rating: 4.6 }
                        ],
                        salaryRange: "₹6-15 LPA (Assistant Professor) | ₹20-40 LPA (Professor) | ₹50L-1Cr+ (Renowned)",
                        ageToStart: "17-18 years",
                        skills: ["Research", "Teaching", "Critical thinking", "Lab work", "Publication writing"],
                        jobOutlook: "Moderate - Academia focused",
                        workEnvironment: "Universities, Research institutes",
                        careerPath: "Ph.D. Scholar → Post-Doc → Assistant Professor → Associate Professor → Professor",
                        alternativePaths: ["Science Writer", "Industry Researcher", "Science Communicator"]
                    }
                ]
            }
        ]
    },
    engineering: {
        name: "Engineering & Technology",
        icon: "⚙️",
        color: "#FF6B6B",
        subFields: [
            {
                id: "computer_science",
                name: "Computer Science & IT",
                description: "Build the digital future",
                careers: [
                    {
                        name: "Software Engineer",
                        description: "Design and develop software applications",
                        education: "B.Tech/B.E. CSE (4 years) or BCA (3 years) + MCA (2 years)",
                        entranceExams: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE", "State CETs"],
                        topColleges: [
                            { name: "IIT Bombay", website: "https://www.iitb.ac.in", rating: 4.9 },
                            { name: "IIT Delhi", website: "https://www.iitd.ac.in", rating: 4.9 },
                            { name: "BITS Pilani", website: "https://www.bits-pilani.ac.in", rating: 4.6 },
                            { name: "NIT Trichy", website: "https://www.nitt.edu", rating: 4.6 },
                            { name: "IIIT Hyderabad", website: "https://www.iiit.ac.in", rating: 4.7 }
                        ],
                        salaryRange: "₹4-12 LPA (Fresher) | ₹15-50 LPA (3-5 yrs) | ₹60L-3Cr+ (Senior/FAANG)",
                        ageToStart: "17-18 years",
                        skills: ["Programming (Java, Python, C++)", "Problem-solving", "Data structures", "Algorithms", "System design"],
                        jobOutlook: "Excellent - Highest demand",
                        workEnvironment: "IT companies, Product startups, Remote work",
                        careerPath: "Junior Developer → Senior Developer → Tech Lead → Engineering Manager/Architect",
                        alternativePaths: ["Data Scientist", "DevOps Engineer", "Full-Stack Developer", "ML Engineer"]
                    },
                    {
                        name: "Data Scientist",
                        description: "Extract insights from data using AI/ML",
                        education: "B.Tech CSE/Stats (4 years) + Specialization/M.Tech",
                        entranceExams: ["JEE", "GATE (for M.Tech)"],
                        topColleges: [
                            { name: "IITs", website: "https://www.iitb.ac.in", rating: 4.8 },
                            { name: "ISI Kolkata", website: "https://www.isical.ac.in", rating: 3.8 },
                            { name: "IIITs", website: "https://www.iiit.ac.in", rating: 4.6 },
                            { name: "Top NITs", website: "https://www.nitt.edu", rating: 4.5 }
                        ],
                        salaryRange: "₹6-15 LPA (Entry) | ₹20-60 LPA (Experienced) | ₹80L-2Cr+ (Senior)",
                        ageToStart: "17-18 years (21+ with specialization)",
                        skills: ["Python/R", "Machine Learning", "Statistics", "Data visualization", "SQL"],
                        jobOutlook: "Excellent - Rapidly growing",
                        workEnvironment: "Tech companies, Consulting firms, Research labs",
                        careerPath: "Data Analyst → Data Scientist → Senior DS → Lead DS → Chief Data Officer",
                        alternativePaths: ["ML Engineer", "Business Intelligence Analyst", "AI Researcher"]
                    },
                    {
                        name: "Cybersecurity Expert",
                        description: "Protect systems and data from cyber threats",
                        education: "B.Tech CSE (4 years) + Certifications (CEH, CISSP)",
                        entranceExams: ["JEE Main", "State CETs"],
                        topColleges: [
                            { name: "IIT Bombay", website: "https://www.iitb.ac.in", rating: 4.9 },
                            { name: "NIT Trichy", website: "https://www.nitt.edu", rating: 4.6 },
                            { name: "IIIT Delhi", website: "https://www.iiitd.ac.in", rating: 4.5 },
                            { name: "Amrita University", website: "https://www.amrita.edu", rating: 4.2 }
                        ],
                        salaryRange: "₹5-12 LPA (Entry) | ₹18-45 LPA (Experienced) | ₹60L-1.5Cr (Expert)",
                        ageToStart: "17-18 years",
                        skills: ["Network security", "Ethical hacking", "Cryptography", "Risk assessment", "Security tools"],
                        jobOutlook: "Excellent - Critical demand",
                        workEnvironment: "Cybersecurity firms, Banks, Government agencies",
                        careerPath: "Security Analyst → Security Engineer → Security Architect → CISO",
                        alternativePaths: ["Penetration Tester", "Security Consultant", "Forensic Analyst"]
                    },
                    {
                        name: "AI/ML Engineer",
                        description: "Build intelligent systems and automation",
                        education: "B.Tech CSE/AI (4 years) + M.Tech/Online courses",
                        entranceExams: ["JEE Main", "JEE Advanced", "GATE"],
                        topColleges: [
                            { name: "IIT Bombay", website: "https://www.iitb.ac.in", rating: 4.9 },
                            { name: "IIT Delhi", website: "https://www.iitd.ac.in", rating: 4.9 },
                            { name: "IIIT Hyderabad", website: "https://www.iiit.ac.in", rating: 4.7 },
                            { name: "ISI Kolkata", website: "https://www.isical.ac.in", rating: 3.8 }
                        ],
                        salaryRange: "₹8-18 LPA (Entry) | ₹25-70 LPA (Mid) | ₹1-4Cr+ (Senior/US)",
                        ageToStart: "17-18 years",
                        skills: ["Deep Learning", "Neural Networks", "Python", "TensorFlow", "PyTorch"],
                        jobOutlook: "Exceptional - Future of tech",
                        workEnvironment: "Tech giants, AI startups, Research institutes",
                        careerPath: "ML Engineer → Senior ML Engineer → ML Architect → AI Research Lead",
                        alternativePaths: ["Computer Vision Engineer", "NLP Specialist", "Robotics Engineer"]
                    },
                    {
                        name: "Cloud Architect",
                        description: "Design and manage cloud infrastructure",
                        education: "B.Tech CSE (4 years) + Cloud Certifications (AWS, Azure, GCP)",
                        entranceExams: ["JEE Main", "State entrance exams"],
                        topColleges: [
                            { name: "IIT Bombay", website: "https://www.iitb.ac.in", rating: 4.9 },
                            { name: "NIT Trichy", website: "https://www.nitt.edu", rating: 4.6 },
                            { name: "VIT Vellore", website: "https://www.vit.ac.in", rating: 4.3 },
                            { name: "Manipal Institute", website: "https://manipal.edu", rating: 4.2 }
                        ],
                        salaryRange: "₹6-15 LPA (Entry) | ₹20-50 LPA (Architect) | ₹70L-2Cr (Principal)",
                        ageToStart: "17-18 years (22+ after certifications)",
                        skills: ["AWS/Azure/GCP", "DevOps", "System architecture", "Automation", "Networking"],
                        jobOutlook: "Excellent - Cloud-first world",
                        workEnvironment: "IT companies, Cloud service providers, Enterprises",
                        careerPath: "Cloud Engineer → Cloud Architect → Principal Architect → Cloud Strategist",
                        alternativePaths: ["DevOps Engineer", "Site Reliability Engineer", "Infrastructure Engineer"]
                    }
                ]
            },
            {
                id: "core_engineering",
                name: "Core Engineering",
                description: "Build infrastructure and machines",
                careers: [
                    {
                        name: "Mechanical Engineer",
                        description: "Design machines, engines, and mechanical systems",
                        education: "B.Tech/B.E. Mechanical (4 years)",
                        entranceExams: ["JEE Main", "JEE Advanced", "State CETs"],
                        topColleges: [
                            { name: "IIT Madras", website: "https://www.iitm.ac.in", rating: 4.8 },
                            { name: "IIT Bombay", website: "https://www.iitb.ac.in", rating: 4.9 },
                            { name: "NIT Trichy", website: "https://www.nitt.edu", rating: 4.6 },
                            { name: "BITS Pilani", website: "https://www.bits-pilani.ac.in", rating: 4.6 }
                        ],
                        salaryRange: "₹3-7 LPA (Fresher) | ₹8-20 LPA (5 yrs) | ₹25-60 LPA (Manager/Abroad)",
                        ageToStart: "17-18 years",
                        skills: ["CAD (AutoCAD, SolidWorks)", "Thermodynamics", "Manufacturing", "Problem-solving"],
                        jobOutlook: "Good - Core industry demand",
                        workEnvironment: "Manufacturing plants, Automobile companies, PSUs",
                        careerPath: "Junior Engineer → Design Engineer → Senior Engineer → Engineering Manager",
                        alternativePaths: ["CAD Designer", "Production Manager", "Quality Engineer", "R&D Engineer"]
                    },
                    {
                        name: "Civil Engineer",
                        description: "Design and oversee construction projects",
                        education: "B.Tech/B.E. Civil (4 years)",
                        entranceExams: ["JEE Main", "State CETs"],
                        topColleges: [
                            { name: "IIT Roorkee", website: "https://www.iitr.ac.in", rating: 4.7 },
                            { name: "NIT Trichy", website: "https://www.nitt.edu", rating: 4.6 },
                            { name: "BITS Pilani", website: "https://www.bits-pilani.ac.in", rating: 4.6 },
                            { name: "Anna University", website: "https://www.annauniv.edu", rating: 4.1 }
                        ],
                        salaryRange: "₹3-6 LPA (Entry) | ₹8-18 LPA (Experienced) | ₹25-50 LPA (Senior/Abroad)",
                        ageToStart: "17-18 years",
                        skills: ["AutoCAD", "Structural analysis", "Project management", "Site supervision"],
                        jobOutlook: "Good - Infrastructure development",
                        workEnvironment: "Construction sites, Consulting firms, Government PWD",
                        careerPath: "Site Engineer → Project Engineer → Project Manager → Chief Engineer",
                        alternativePaths: ["Structural Engineer", "Urban Planner", "Construction Manager"]
                    },
                    {
                        name: "Electrical Engineer",
                        description: "Work with electrical systems and power",
                        education: "B.Tech/B.E. Electrical (4 years)",
                        entranceExams: ["JEE Main", "JEE Advanced", "GATE"],
                        topColleges: [
                            { name: "IIT Bombay", website: "https://www.iitb.ac.in", rating: 4.9 },
                            { name: "IIT Delhi", website: "https://www.iitd.ac.in", rating: 4.9 },
                            { name: "NIT Trichy", website: "https://www.nitt.edu", rating: 4.6 },
                            { name: "VJTI Mumbai", website: "https://www.vjti.ac.in", rating: 4.3 }
                        ],
                        salaryRange: "₹3.5-8 LPA (Entry) | ₹10-25 LPA (Mid) | ₹30-70 LPA (Senior)",
                        ageToStart: "17-18 years",
                        skills: ["Circuit design", "Power systems", "Control systems", "MATLAB"],
                        jobOutlook: "Good - Energy sector growth",
                        workEnvironment: "Power plants, Manufacturing, Automation companies",
                        careerPath: "Junior Engineer → Senior Engineer → Lead Engineer → Engineering Head",
                        alternativePaths: ["Power Systems Engineer", "Automation Engineer", "Renewable Energy Specialist"]
                    },
                    {
                        name: "Aerospace Engineer",
                        description: "Design aircraft, spacecraft, and defense systems",
                        education: "B.Tech Aerospace (4 years) + M.Tech (optional)",
                        entranceExams: ["JEE Main", "JEE Advanced"],
                        topColleges: [
                            { name: "IIT Bombay", website: "https://www.iitb.ac.in", rating: 4.9 },
                            { name: "IIT Madras", website: "https://www.iitm.ac.in", rating: 4.8 },
                            { name: "IIT Kanpur", website: "https://www.iitk.ac.in", rating: 4.8 },
                            { name: "MIT Manipal", website: "https://manipal.edu", rating: 4.3 }
                        ],
                        salaryRange: "₹4-10 LPA (Entry) | ₹12-30 LPA (Experienced) | ₹40-80 LPA (Senior/ISRO)",
                        ageToStart: "17-18 years",
                        skills: ["Aerodynamics", "CAD", "Flight mechanics", "Material science"],
                        jobOutlook: "Growing - Space & defense focus",
                        workEnvironment: "ISRO, DRDO, HAL, Private aerospace companies",
                        careerPath: "Junior Engineer → Senior Engineer → Principal Engineer → Chief Engineer",
                        alternativePaths: ["Aircraft Design Engineer", "UAV Specialist", "Space Systems Engineer"]
                    }
                ]
            },
            {
                id: "electronics",
                name: "Electronics & Communication",
                description: "Innovation in electronics and communication",
                careers: [
                    {
                        name: "Electronics Engineer",
                        description: "Design electronic circuits and devices",
                        education: "B.Tech/B.E. ECE (4 years)",
                        entranceExams: ["JEE Main", "JEE Advanced", "BITSAT"],
                        topColleges: [
                            { name: "IIT Bombay", website: "https://www.iitb.ac.in", rating: 4.9 },
                            { name: "IIIT Hyderabad", website: "https://www.iiit.ac.in", rating: 4.7 },
                            { name: "NIT Trichy", website: "https://www.nitt.edu", rating: 4.6 },
                            { name: "BITS Pilani", website: "https://www.bits-pilani.ac.in", rating: 4.6 }
                        ],
                        salaryRange: "₹3.5-8 LPA (Entry) | ₹10-25 LPA (Mid) | ₹30-60 LPA (Senior)",
                        ageToStart: "17-18 years",
                        skills: ["Circuit design", "Embedded systems", "VLSI", "Signal processing"],
                        jobOutlook: "Good - Tech industry demand",
                        workEnvironment: "Electronics companies, R&D labs, Semiconductor firms",
                        careerPath: "Design Engineer → Senior Engineer → Lead Engineer → Engineering Manager",
                        alternativePaths: ["VLSI Designer", "Embedded Systems Engineer", "IoT Developer"]
                    }
                ]
            }
        ]
    },
    commerce: {
        name: "Commerce & Business",
        icon: "💼",
        color: "#4CAF50",
        subFields: [
            {
                id: "finance_accounting",
                name: "Finance & Accounting",
                description: "Manage money and financial systems",
                careers: [
                    {
                        name: "Chartered Accountant (CA)",
                        description: "Expert in accounting, taxation, and auditing",
                        education: "CA Foundation → Intermediate → Articleship → Final (4-5 years total)",
                        entranceExams: ["CA Foundation", "CA Intermediate", "CA Final"],
                        topColleges: [
                            { name: "ICAI (Institute of Chartered Accountants of India)", website: "https://www.icai.org", rating: 3.8 }
                        ],
                        salaryRange: "₹6-12 LPA (Entry) | ₹15-40 LPA (5 yrs) | ₹50L-2Cr+ (Practice/Senior)",
                        ageToStart: "16-17 years (after 10th or 12th)",
                        skills: ["Accounting", "Taxation", "Auditing", "Financial analysis", "GST knowledge"],
                        jobOutlook: "Excellent - Always in demand",
                        workEnvironment: "CA firms, Corporate finance, Own practice",
                        careerPath: "Articleship → CA → Senior CA → Partner → Own Practice",
                        alternativePaths: ["CFO", "Financial Analyst", "Tax Consultant", "Investment Banker"]
                    },
                    {
                        name: "Company Secretary (CS)",
                        description: "Corporate governance and legal compliance expert",
                        education: "CS Foundation → Executive → Professional (3-4 years)",
                        entranceExams: ["CS Foundation", "CS Executive", "CS Professional"],
                        topColleges: [
                            { name: "ICSI (Institute of Company Secretaries of India)", website: "https://www.icsi.edu", rating: 4.5 }
                        ],
                        salaryRange: "₹4-10 LPA (Entry) | ₹12-30 LPA (Experienced) | ₹40-80 LPA (Senior)",
                        ageToStart: "16-17 years",
                        skills: ["Corporate law", "Compliance", "Secretarial practice", "Legal drafting"],
                        jobOutlook: "Very Good - Corporate sector growth",
                        workEnvironment: "Corporate offices, Law firms, Consulting",
                        careerPath: "Assistant CS → Company Secretary → General Manager → Director",
                        alternativePaths: ["Corporate Lawyer", "Compliance Officer", "Legal Advisor"]
                    },
                    {
                        name: "Investment Banker",
                        description: "Facilitate financial transactions and mergers",
                        education: "B.Com/BBA (3 years) + MBA Finance (2 years) or CA/CFA",
                        entranceExams: ["CAT", "XAT", "GMAT", "CFA"],
                        topColleges: [
                            { name: "IIMs", website: "https://www.iima.ac.in", rating: 4.7 },
                            { name: "ISB", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "FMS Delhi", website: "https://www.fms.edu", rating: 4.6 },
                            { name: "XLRI", website: "https://www.ugc.ac.in", rating: 3.8 }
                        ],
                        salaryRange: "₹8-18 LPA (Analyst) | ₹25-60 LPA (Associate) | ₹1-5Cr+ (VP/MD)",
                        ageToStart: "17-18 years (23+ after MBA)",
                        skills: ["Financial modeling", "Valuation", "Market analysis", "Negotiation", "Excel/PPT"],
                        jobOutlook: "Excellent - High rewards",
                        workEnvironment: "Investment banks, PE firms, Financial institutions",
                        careerPath: "Analyst → Associate → VP → Director → Managing Director",
                        alternativePaths: ["Private Equity Analyst", "M&A Advisor", "Financial Consultant"]
                    },
                    {
                        name: "Financial Analyst/Advisor",
                        description: "Provide investment advice and financial planning",
                        education: "B.Com/BBA Finance (3 years) + CFP/CFA",
                        entranceExams: ["University entrance exams", "CFA Level 1-3"],
                        topColleges: [
                            { name: "SRCC Delhi", website: "https://www.ugc.ac.in", rating: 4.5 },
                            { name: "Christ University", website: "https://www.ugc.ac.in", rating: 4.1 },
                            { name: "Loyola Chennai", website: "https://www.ugc.ac.in", rating: 4.0 }
                        ],
                        salaryRange: "₹3-8 LPA (Entry) | ₹10-25 LPA (Mid) | ₹30-70 LPA (Senior/Own firm)",
                        ageToStart: "17-18 years",
                        skills: ["Financial planning", "Investment analysis", "Risk management", "Client relations"],
                        jobOutlook: "Very Good - Growing wealth management",
                        workEnvironment: "Banks, Wealth management firms, Independent practice",
                        careerPath: "Junior Analyst → Financial Analyst → Senior Advisor → Wealth Manager",
                        alternativePaths: ["Portfolio Manager", "Equity Research Analyst", "Financial Planner"]
                    },
                    {
                        name: "Actuary",
                        description: "Assess financial risks using mathematics",
                        education: "B.Sc/B.Com (3 years) + Actuarial certification (IAI)",
                        entranceExams: ["IAI exams (15 papers)"],
                        topColleges: [
                            { name: "ISI Kolkata", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "St. Xavier's Mumbai", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "Fergusson College Pune", website: "https://www.ugc.ac.in", rating: 3.8 }
                        ],
                        salaryRange: "₹6-12 LPA (Entry) | ₹18-40 LPA (Fellow) | ₹60L-1.5Cr (Chief Actuary)",
                        ageToStart: "17-18 years",
                        skills: ["Statistics", "Probability", "Financial mathematics", "Risk modeling"],
                        jobOutlook: "Excellent - Niche high-demand field",
                        workEnvironment: "Insurance companies, Consulting firms, Pension funds",
                        careerPath: "Actuarial Analyst → Associate Actuary → Fellow → Chief Actuary",
                        alternativePaths: ["Risk Analyst", "Data Scientist", "Quantitative Analyst"]
                    }
                ]
            },
            {
                id: "management",
                name: "Management & Business",
                description: "Lead organizations and drive business growth",
                careers: [
                    {
                        name: "MBA Graduate (General Management)",
                        description: "Strategic leadership across business functions",
                        education: "Any Bachelor's (3-4 years) + MBA (2 years)",
                        entranceExams: ["CAT", "XAT", "GMAT", "SNAP", "NMAT"],
                        topColleges: [
                            { name: "IIM A/B/C", website: "https://www.iima.ac.in", rating: 3.8 },
                            { name: "ISB Hyderabad", website: "https://www.isb.edu", rating: 4.8 },
                            { name: "FMS Delhi", website: "https://www.fms.edu", rating: 4.6 },
                            { name: "XLRI Jamshedpur", website: "https://www.xlri.ac.in", rating: 4.7 },
                            { name: "MDI Gurgaon", website: "https://www.mdi.ac.in", rating: 3.8 }
                        ],
                        salaryRange: "₹10-25 LPA (Entry - Tier 1) | ₹30-80 LPA (Mid) | ₹1-5Cr+ (CXO)",
                        ageToStart: "20-22 years (after graduation)",
                        skills: ["Strategic thinking", "Leadership", "Communication", "Problem-solving", "Team management"],
                        jobOutlook: "Excellent - Versatile career",
                        workEnvironment: "Corporates, Consulting firms, Startups",
                        careerPath: "Management Trainee → Manager → Senior Manager → Director → CXO",
                        alternativePaths: ["Product Manager", "Strategy Consultant", "Business Development Head"]
                    },
                    {
                        name: "Marketing Manager",
                        description: "Drive brand growth and customer acquisition",
                        education: "BBA/B.Com (3 years) + MBA Marketing (2 years)",
                        entranceExams: ["CAT", "XAT", "MAT"],
                        topColleges: [
                            { name: "IIM A/C", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "MICA Ahmedabad", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "XLRI", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "NMIMS Mumbai", website: "https://www.ugc.ac.in", rating: 3.8 }
                        ],
                        salaryRange: "₹4-10 LPA (Entry) | ₹12-35 LPA (Manager) | ₹50L-2Cr (CMO)",
                        ageToStart: "17-18 years (23+ after MBA)",
                        skills: ["Digital marketing", "Brand management", "Consumer insights", "Communication", "Analytics"],
                        jobOutlook: "Excellent - Digital transformation",
                        workEnvironment: "FMCG, E-commerce, Advertising agencies",
                        careerPath: "Marketing Executive → Manager → Senior Manager → VP Marketing → CMO",
                        alternativePaths: ["Brand Manager", "Digital Marketing Head", "Growth Hacker"]
                    },
                    {
                        name: "Human Resources Manager",
                        description: "Manage talent and organizational development",
                        education: "BBA/B.Com (3 years) + MBA HR (2 years)",
                        entranceExams: ["CAT", "XAT", "CMAT"],
                        topColleges: [
                            { name: "XLRI Jamshedpur", website: "https://www.xlri.ac.in", rating: 4.7 },
                            { name: "TISS Mumbai", website: "https://www.ugc.ac.in", rating: 4.6 },
                            { name: "MDI Gurgaon", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "IIMs", website: "https://www.iima.ac.in", rating: 4.7 }
                        ],
                        salaryRange: "₹4-9 LPA (Entry) | ₹12-30 LPA (Manager) | ₹40-80 LPA (CHRO)",
                        ageToStart: "17-18 years (23+ after MBA)",
                        skills: ["Recruitment", "Employee relations", "Performance management", "Training", "Labor laws"],
                        jobOutlook: "Good - Essential function",
                        workEnvironment: "All industries, Consulting firms",
                        careerPath: "HR Executive → HR Manager → Senior Manager → VP HR → CHRO",
                        alternativePaths: ["Talent Acquisition Head", "Learning & Development Manager", "Compensation Analyst"]
                    },
                    {
                        name: "Entrepreneur / Startup Founder",
                        description: "Build and scale your own business",
                        education: "Any degree (B.Tech/BBA/B.Com) + Business knowledge",
                        entranceExams: ["Not applicable - Self-driven path"],
                        topColleges: [
                            { name: "IITs", website: "https://www.iitb.ac.in", rating: 4.8 },
                            { name: "IIMs", website: "https://www.iima.ac.in", rating: 4.7 },
                            { name: "BITS Pilani", website: "https://www.bits-pilani.ac.in", rating: 4.6 },
                            { name: "Any good college + experience", website: "https://www.ugc.ac.in", rating: 3.8 }
                        ],
                        salaryRange: "Variable - ₹0 to ₹100Cr+ (depends on success)",
                        ageToStart: "Any age (18+ legally, but can start preparing early)",
                        skills: ["Vision", "Risk-taking", "Leadership", "Sales", "Financial management", "Problem-solving"],
                        jobOutlook: "High risk, high reward - Growing ecosystem",
                        workEnvironment: "Own startup, Co-working spaces, Virtual",
                        careerPath: "Founder → Scale-up → Series funding → Exit/IPO or Long-term growth",
                        alternativePaths: ["Angel Investor", "Venture Capitalist", "Business Consultant"]
                    }
                ]
            },
            {
                id: "ecommerce_retail",
                name: "E-commerce & Retail",
                description: "Shape the future of commerce",
                careers: [
                    {
                        name: "E-commerce Manager",
                        description: "Manage online sales platforms and digital commerce",
                        education: "BBA/B.Com (3 years) + MBA/Certifications",
                        entranceExams: ["CAT (for MBA)", "Digital Marketing certifications"],
                        topColleges: [
                            { name: "IIMs", website: "https://www.iima.ac.in", rating: 4.7 },
                            { name: "NMIMS", website: "https://www.nmims.edu", rating: 4.3 },
                            { name: "Symbiosis", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "Any good B-school", website: "https://www.ugc.ac.in", rating: 3.8 }
                        ],
                        salaryRange: "₹3-8 LPA (Entry) | ₹10-25 LPA (Manager) | ₹35-70 LPA (Head)",
                        ageToStart: "17-18 years",
                        skills: ["Digital marketing", "Analytics", "Supply chain", "Customer experience", "Platform management"],
                        jobOutlook: "Excellent - Booming sector",
                        workEnvironment: "E-commerce companies, Retail brands, Marketplaces",
                        careerPath: "E-commerce Executive → Manager → Head of E-commerce → VP Digital",
                        alternativePaths: ["Marketplace Manager", "Digital Business Head", "Omnichannel Manager"]
                    }
                ]
            }
        ]
    },
    arts: {
        name: "Arts & Humanities",
        icon: "🎨",
        color: "#F97316",
        subFields: [
            {
                id: "creative_arts",
                name: "Creative Arts & Design",
                description: "Express creativity and shape culture",
                careers: [
                    {
                        name: "Graphic Designer",
                        description: "Create visual content for brands and media",
                        education: "B.Des/BFA (4 years) or Diploma (1-2 years)",
                        entranceExams: ["NID DAT", "UCEED", "NIFT", "Portfolio-based"],
                        topColleges: [
                            { name: "NID Ahmedabad", website: "https://www.nid.edu", rating: 4.7 },
                            { name: "NIFT Delhi", website: "https://www.nift.ac.in", rating: 4.5 },
                            { name: "Srishti Bengaluru", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "Pearl Academy", website: "https://www.pearlacademy.com", rating: 4.2 }
                        ],
                        salaryRange: "₹2-5 LPA (Fresher) | ₹6-15 LPA (Mid) | ₹20-50 LPA (Senior/Freelance)",
                        ageToStart: "17-18 years",
                        skills: ["Adobe Creative Suite", "Typography", "Color theory", "Creativity", "Communication"],
                        jobOutlook: "Good - Digital marketing growth",
                        workEnvironment: "Agencies, In-house teams, Freelance",
                        careerPath: "Junior Designer → Designer → Senior Designer → Art Director → Creative Director",
                        alternativePaths: ["UI/UX Designer", "Brand Designer", "Motion Graphics Designer"]
                    },
                    {
                        name: "Fashion Designer",
                        description: "Create clothing, accessories, and fashion trends",
                        education: "B.Des Fashion (4 years) or Diploma",
                        entranceExams: ["NIFT", "AIEED", "SOFT", "UID"],
                        topColleges: [
                            { name: "NIFT Delhi", website: "https://www.nift.ac.in", rating: 4.5 },
                            { name: "Pearl Academy", website: "https://www.pearlacademy.com", rating: 4.2 },
                            { name: "JD Institute", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "Raffles Mumbai", website: "https://www.ugc.ac.in", rating: 3.8 }
                        ],
                        salaryRange: "₹2-5 LPA (Entry) | ₹8-20 LPA (Designer) | ₹30L-1Cr+ (Celebrity/Own brand)",
                        ageToStart: "17-18 years",
                        skills: ["Design", "Sewing", "Pattern making", "Trend forecasting", "Business sense"],
                        jobOutlook: "Good - Growing Indian fashion industry",
                        workEnvironment: "Fashion houses, Export companies, Own label",
                        careerPath: "Assistant Designer → Designer → Senior Designer → Design Head → Own Brand",
                        alternativePaths: ["Stylist", "Costume Designer", "Fashion Blogger", "Boutique Owner"]
                    },
                    {
                        name: "Interior Designer",
                        description: "Design functional and aesthetic interior spaces",
                        education: "B.Des Interior (4 years) or Diploma (1-2 years)",
                        entranceExams: ["NID DAT", "UCEED", "CEED", "Institute-specific"],
                        topColleges: [
                            { name: "NID Ahmedabad", website: "https://www.nid.edu", rating: 4.7 },
                            { name: "Rachana Sansad Mumbai", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "CEPT Ahmedabad", website: "https://www.ugc.ac.in", rating: 3.8 }
                        ],
                        salaryRange: "₹2-5 LPA (Entry) | ₹6-18 LPA (Designer) | ₹25-80 LPA (Principal/Own firm)",
                        ageToStart: "17-18 years",
                        skills: ["Space planning", "3D visualization", "AutoCAD", "Client management", "Material knowledge"],
                        jobOutlook: "Very Good - Real estate boom",
                        workEnvironment: "Design firms, Architecture studios, Freelance",
                        careerPath: "Junior Designer → Interior Designer → Senior Designer → Principal Designer",
                        alternativePaths: ["Furniture Designer", "Exhibition Designer", "Set Designer"]
                    },
                    {
                        name: "Animator/VFX Artist",
                        description: "Create animated content and visual effects",
                        education: "B.Sc Animation (3 years) or Specialized diploma (1-2 years)",
                        entranceExams: ["Portfolio-based admissions", "Institute entrance tests"],
                        topColleges: [
                            { name: "NID Ahmedabad", website: "https://www.nid.edu", rating: 4.7 },
                            { name: "Arena Animation", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "MAAC", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "Frameboxx", website: "https://www.ugc.ac.in", rating: 3.8 }
                        ],
                        salaryRange: "₹2-5 LPA (Entry) | ₹6-15 LPA (Mid) | ₹20-60 LPA (Senior/Hollywood)",
                        ageToStart: "17-18 years",
                        skills: ["Maya", "3ds Max", "After Effects", "Creativity", "Attention to detail"],
                        jobOutlook: "Excellent - OTT and gaming boom",
                        workEnvironment: "Animation studios, Film industry, Gaming companies",
                        careerPath: "Junior Animator → Animator → Senior Animator → Animation Director",
                        alternativePaths: ["Game Designer", "Motion Graphics Artist", "Character Designer"]
                    },
                    {
                        name: "Photographer/Videographer",
                        description: "Capture moments and create visual stories",
                        education: "Self-taught or Diploma/Degree in Photography (1-3 years)",
                        entranceExams: ["Portfolio-based", "JMI Mass Comm entrance"],
                        topColleges: [
                            { name: "JJ School of Art", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "NID", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "FTII Pune", website: "https://www.ugc.ac.in", rating: 4.5 },
                            { name: "Srishti Bengaluru", website: "https://www.ugc.ac.in", rating: 3.8 }
                        ],
                        salaryRange: "₹1.5-4 LPA (Assistant) | ₹5-15 LPA (Professional) | ₹20L-1Cr+ (Celebrity/Commercial)",
                        ageToStart: "Any age (16+ to start professionally)",
                        skills: ["Camera operation", "Lighting", "Editing", "Creativity", "Business development"],
                        jobOutlook: "Good - Content creation boom",
                        workEnvironment: "Freelance, Studios, Media houses, Events",
                        careerPath: "Assistant → Photographer → Senior Photographer → Own Studio/Agency",
                        alternativePaths: ["Wedding Photographer", "Wildlife Photographer", "Cinematographer", "Photo Journalist"]
                    }
                ]
            },
            {
                id: "media_communication",
                name: "Media & Communication",
                description: "Shape narratives and inform society",
                careers: [
                    {
                        name: "Journalist/Reporter",
                        description: "Investigate and report news and stories",
                        education: "BA Journalism (3 years) or any degree + PG Diploma",
                        entranceExams: ["JMI entrance", "IIMC entrance", "ACJ entrance"],
                        topColleges: [
                            { name: "IIMC Delhi", website: "https://www.iimc.gov.in", rating: 4.5 },
                            { name: "ACJ Chennai", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "Xavier's Mumbai", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "JMI Delhi", website: "https://www.ugc.ac.in", rating: 3.8 }
                        ],
                        salaryRange: "₹2-5 LPA (Entry) | ₹6-15 LPA (Mid) | ₹20-50 LPA (Senior/Anchor)",
                        ageToStart: "17-18 years",
                        skills: ["Writing", "Research", "Communication", "Ethical judgment", "Digital tools"],
                        jobOutlook: "Moderate - Digital transformation",
                        workEnvironment: "News channels, Newspapers, Digital media, Freelance",
                        careerPath: "Reporter → Senior Reporter → Editor → Executive Editor",
                        alternativePaths: ["News Anchor", "Investigative Journalist", "Foreign Correspondent"]
                    },
                    {
                        name: "Content Writer/Copywriter",
                        description: "Create engaging written content for various media",
                        education: "BA English/Mass Comm (3 years) or any degree + portfolio",
                        entranceExams: ["Not mandatory - Portfolio matters"],
                        topColleges: [
                            { name: "Any good college for language/communication", website: "https://www.ugc.ac.in", rating: 3.8 }
                        ],
                        salaryRange: "₹2-4 LPA (Entry) | ₹5-12 LPA (Mid) | ₹15-40 LPA (Senior/Freelance)",
                        ageToStart: "17-18 years",
                        skills: ["Writing", "SEO", "Research", "Creativity", "Adaptability"],
                        jobOutlook: "Excellent - Digital content explosion",
                        workEnvironment: "Agencies, Companies, Freelance, Remote",
                        careerPath: "Junior Writer → Content Writer → Senior Writer → Content Head",
                        alternativePaths: ["Technical Writer", "UX Writer", "Social Media Manager", "Blogger"]
                    },
                    {
                        name: "Public Relations (PR) Manager",
                        description: "Manage public image and media relations",
                        education: "BA/BBA (3 years) + MBA/PG Diploma PR",
                        entranceExams: ["CAT (for MBA)", "MICA entrance"],
                        topColleges: [
                            { name: "MICA Ahmedabad", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "IIMC Delhi", website: "https://www.iimc.gov.in", rating: 4.5 },
                            { name: "Mudra Institute", website: "https://www.ugc.ac.in", rating: 3.8 }
                        ],
                        salaryRange: "₹3-7 LPA (Entry) | ₹10-25 LPA (Manager) | ₹35-80 LPA (Director)",
                        ageToStart: "17-18 years (23+ after PG)",
                        skills: ["Communication", "Networking", "Crisis management", "Media relations", "Writing"],
                        jobOutlook: "Good - Brand reputation focus",
                        workEnvironment: "PR agencies, Corporate communications, Freelance",
                        careerPath: "PR Executive → PR Manager → Senior Manager → VP Communications",
                        alternativePaths: ["Corporate Communications Head", "Media Consultant", "Crisis Manager"]
                    },
                    {
                        name: "Film Director/Producer",
                        description: "Create and manage film/video productions",
                        education: "Film school degree (3-4 years) or self-taught",
                        entranceExams: ["FTII entrance", "SRFTI entrance", "Whistling Woods entrance"],
                        topColleges: [
                            { name: "FTII Pune", website: "https://www.ugc.ac.in", rating: 4.5 },
                            { name: "SRFTI Kolkata", website: "https://www.ugc.ac.in", rating: 4.3 },
                            { name: "Satyajit Ray Film Institute", website: "https://www.ugc.ac.in", rating: 4.3 },
                            { name: "Whistling Woods", website: "https://www.ugc.ac.in", rating: 4.0 }
                        ],
                        salaryRange: "Variable - ₹3-10 LPA (Assistant) | ₹15-50 LPA (Indie) | ₹1-20Cr+ (Commercial success)",
                        ageToStart: "17-18 years (but can start later too)",
                        skills: ["Storytelling", "Technical knowledge", "Leadership", "Creativity", "Networking"],
                        jobOutlook: "Moderate - Highly competitive",
                        workEnvironment: "Film industry, OTT platforms, Ad films, Independent",
                        careerPath: "Assistant Director → Director → Established Director → Producer/Studio Head",
                        alternativePaths: ["Cinematographer", "Editor", "Screenwriter", "Production Designer"]
                    }
                ]
            },
            {
                id: "language_literature",
                name: "Language & Literature",
                description: "Explore languages, literature, and cultures",
                careers: [
                    {
                        name: "Translator/Interpreter",
                        description: "Bridge language barriers in global communication",
                        education: "BA in Languages (3 years) + Specialization/Certification",
                        entranceExams: ["University entrance exams", "Professional certification exams"],
                        topColleges: [
                            { name: "JNU Delhi", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "EFL University Hyderabad", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "Banaras Hindu University", website: "https://www.ugc.ac.in", rating: 3.8 }
                        ],
                        salaryRange: "₹2-5 LPA (Entry) | ₹6-15 LPA (Experienced) | ₹20-50 LPA (UN/International/Freelance)",
                        ageToStart: "17-18 years",
                        skills: ["Fluency in multiple languages", "Cultural knowledge", "Accuracy", "Listening"],
                        jobOutlook: "Good - Globalization demand",
                        workEnvironment: "Government, International organizations, Freelance",
                        careerPath: "Junior Translator → Translator → Senior Translator → Language Specialist",
                        alternativePaths: ["Court Interpreter", "Conference Interpreter", "Localization Specialist"]
                    },
                    {
                        name: "Professor/Lecturer (Literature/Languages)",
                        description: "Teach and research in academic institutions",
                        education: "BA (3 years) + MA (2 years) + Ph.D. (3-5 years) + NET/SET",
                        entranceExams: ["UGC NET", "State SET", "Ph.D. entrance"],
                        topColleges: [
                            { name: "DU", website: "https://www.du.ac.in", rating: 4.4 },
                            { name: "JNU", website: "https://www.jnu.ac.in", rating: 4.6 },
                            { name: "Hyderabad University", website: "https://www.ugc.ac.in", rating: 4.2 },
                            { name: "Jadavpur University", website: "https://www.ugc.ac.in", rating: 4.1 }
                        ],
                        salaryRange: "₹6-12 LPA (Assistant Professor) | ₹15-30 LPA (Professor) | ₹40L-1Cr (Renowned)",
                        ageToStart: "17-18 years (27-28+ to become professor)",
                        skills: ["Subject expertise", "Research", "Teaching", "Writing", "Critical thinking"],
                        jobOutlook: "Moderate - Academic positions competitive",
                        workEnvironment: "Universities, Colleges, Research institutions",
                        careerPath: "Ph.D. Scholar → Assistant Professor → Associate Professor → Professor",
                        alternativePaths: ["Author", "Literary Critic", "Editor", "Cultural Researcher"]
                    }
                ]
            },
            {
                id: "social_sciences",
                name: "Social Sciences",
                description: "Understand society, behavior, and human systems",
                careers: [
                    {
                        name: "Psychologist/Counselor",
                        description: "Help individuals with mental health and wellbeing",
                        education: "BA Psychology (3 years) + MA (2 years) + M.Phil/Clinical training",
                        entranceExams: ["University entrance exams", "RCI license exam"],
                        topColleges: [
                            { name: "TISS Mumbai", website: "https://www.ugc.ac.in", rating: 4.6 },
                            { name: "DU", website: "https://www.du.ac.in", rating: 4.4 },
                            { name: "Christ University", website: "https://www.ugc.ac.in", rating: 4.1 },
                            { name: "Ambedkar University", website: "https://www.ugc.ac.in", rating: 4.0 }
                        ],
                        salaryRange: "₹3-6 LPA (Entry) | ₹8-20 LPA (Experienced) | ₹25-70 LPA (Own practice/Corporate)",
                        ageToStart: "17-18 years",
                        skills: ["Empathy", "Active listening", "Counseling techniques", "Ethical judgment", "Research"],
                        jobOutlook: "Excellent - Growing mental health awareness",
                        workEnvironment: "Hospitals, Schools, Corporate, Own practice",
                        careerPath: "Counselor → Clinical Psychologist → Senior Psychologist → Practice Owner",
                        alternativePaths: ["Organizational Psychologist", "School Counselor", "Research Psychologist"]
                    },
                    {
                        name: "Social Worker",
                        description: "Work for social welfare and community development",
                        education: "BSW (3 years) + MSW (2 years)",
                        entranceExams: ["University entrance exams", "TISS entrance"],
                        topColleges: [
                            { name: "TISS Mumbai", website: "https://www.ugc.ac.in", rating: 4.6 },
                            { name: "Jamia Millia", website: "https://www.jmi.ac.in", rating: 4.1 },
                            { name: "DU", website: "https://www.du.ac.in", rating: 4.4 },
                            { name: "Christ University", website: "https://www.ugc.ac.in", rating: 4.1 }
                        ],
                        salaryRange: "₹2-5 LPA (Entry) | ₹5-12 LPA (Mid) | ₹15-30 LPA (NGO Head/International)",
                        ageToStart: "17-18 years",
                        skills: ["Empathy", "Community engagement", "Project management", "Communication", "Research"],
                        jobOutlook: "Good - CSR and development focus",
                        workEnvironment: "NGOs, Government departments, International organizations",
                        careerPath: "Field Worker → Project Coordinator → Program Manager → Director",
                        alternativePaths: ["Community Development Officer", "CSR Manager", "Development Consultant"]
                    }
                ]
            }
        ]
    },
    law: {
        name: "Law & Legal Services",
        icon: "⚖️",
        color: "#795548",
        subFields: [
            {
                id: "legal_practice",
                name: "Legal Practice & Judiciary",
                description: "Uphold justice and provide legal expertise",
                careers: [
                    {
                        name: "Lawyer/Advocate",
                        description: "Represent clients in legal matters",
                        education: "BA LLB (5 years integrated) or LLB (3 years after graduation)",
                        entranceExams: ["CLAT", "AILET", "LSAT India", "State law entrance exams"],
                        topColleges: [
                            { name: "NLU Delhi", website: "https://www.nludelhi.ac.in", rating: 4.7 },
                            { name: "NALSAR Hyderabad", website: "https://www.nalsar.ac.in", rating: 4.7 },
                            { name: "NLSIU Bangalore", website: "https://www.nls.ac.in", rating: 4.8 },
                            { name: "NLU Jodhpur", website: "https://www.nlujodhpur.ac.in", rating: 4.4 },
                            { name: "ILS Pune", website: "https://www.ilslaw.edu", rating: 4.1 }
                        ],
                        salaryRange: "₹3-8 LPA (Junior) | ₹10-30 LPA (5 yrs) | ₹50L-5Cr+ (Senior/Top firms)",
                        ageToStart: "17-18 years (or 20+ for 3-year LLB)",
                        skills: ["Legal research", "Argumentation", "Writing", "Client management", "Analytical thinking"],
                        jobOutlook: "Very Good - Diverse opportunities",
                        workEnvironment: "Law firms, Courts, Corporate legal, Own practice",
                        careerPath: "Junior Advocate → Senior Advocate → Partner → Own Practice/Senior Counsel",
                        alternativePaths: ["Corporate Lawyer", "Tax Lawyer", "IP Lawyer", "Criminal Lawyer"]
                    },
                    {
                        name: "Judge (Civil Services - Judiciary)",
                        description: "Preside over court proceedings and deliver justice",
                        education: "LLB (3 or 5 years) + Practice experience + Judicial exam",
                        entranceExams: ["State Judicial Services Exam", "Higher Judicial Service Exam"],
                        topColleges: [
                            { name: "Any recognized law college + exam preparation", website: "https://www.ugc.ac.in", rating: 3.8 }
                        ],
                        salaryRange: "₹50,000-1.5 LPA (Civil Judge) | ₹2.5-4 LPA (District Judge) | ₹4-5.5 LPA (High Court/Supreme Court)",
                        ageToStart: "21+ (minimum age for judicial exams)",
                        skills: ["Legal knowledge", "Impartiality", "Decision-making", "Ethical judgment", "Case analysis"],
                        jobOutlook: "Good - Prestigious career path",
                        workEnvironment: "Courts (District, High Court, Supreme Court)",
                        careerPath: "Civil Judge → District Judge → High Court Judge → Supreme Court Judge",
                        alternativePaths: ["Legal Academic", "Arbitrator", "Legal Consultant"]
                    },
                    {
                        name: "Corporate Lawyer",
                        description: "Handle legal matters for businesses and corporations",
                        education: "BA LLB (5 years) or LLB (3 years) + LLM (optional)",
                        entranceExams: ["CLAT", "AILET", "LSAT"],
                        topColleges: [
                            { name: "NLUs", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "Symbiosis Law School", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "Government Law College Mumbai", website: "https://www.glc.edu", rating: 4.0 }
                        ],
                        salaryRange: "₹5-12 LPA (Entry) | ₹15-50 LPA (Mid) | ₹70L-3Cr+ (Partner/Top tier)",
                        ageToStart: "17-18 years",
                        skills: ["Contract law", "M&A", "Corporate governance", "Negotiation", "Business understanding"],
                        jobOutlook: "Excellent - Corporate sector growth",
                        workEnvironment: "Law firms, In-house legal teams, MNCs",
                        careerPath: "Associate → Senior Associate → Counsel → Partner/General Counsel",
                        alternativePaths: ["Legal Compliance Officer", "Company Secretary", "Legal Advisor"]
                    },
                    {
                        name: "Intellectual Property (IP) Lawyer",
                        description: "Protect innovations, patents, and creative works",
                        education: "LLB (3/5 years) + Specialization in IP law",
                        entranceExams: ["CLAT", "Patent Agent Exam (for patent work)"],
                        topColleges: [
                            { name: "NLU Delhi", website: "https://www.nludelhi.ac.in", rating: 4.7 },
                            { name: "NALSAR Hyderabad", website: "https://www.nalsar.ac.in", rating: 4.7 },
                            { name: "WBNUJS Kolkata", website: "https://www.ugc.ac.in", rating: 3.8 }
                        ],
                        salaryRange: "₹4-10 LPA (Entry) | ₹12-35 LPA (Mid) | ₹50L-2Cr+ (Senior)",
                        ageToStart: "17-18 years",
                        skills: ["IP law", "Patent filing", "Trademark law", "Technical understanding", "Research"],
                        jobOutlook: "Excellent - Growing importance of IP",
                        workEnvironment: "Law firms, IP firms, Corporate in-house, Patent offices",
                        careerPath: "Junior IP Associate → IP Lawyer → Senior IP Counsel → Partner",
                        alternativePaths: ["Patent Agent", "Trademark Attorney", "IP Consultant"]
                    }
                ]
            }
        ]
    },
    government: {
        name: "Government & Civil Services",
        icon: "🏛️",
        color: "#FF9800",
        subFields: [
            {
                id: "civil_services",
                name: "Civil Services & Administration",
                description: "Serve the nation through administration",
                careers: [
                    {
                        name: "IAS Officer (Indian Administrative Service)",
                        description: "Top administrative position in government",
                        education: "Any Bachelor's degree (3-4 years) + UPSC CSE",
                        entranceExams: ["UPSC Civil Services Examination (Prelims + Mains + Interview)"],
                        topColleges: [
                            { name: "Any recognized university - degree is a prerequisite", website: "https://www.ugc.ac.in", rating: 3.8 }
                        ],
                        salaryRange: "₹56,100/month (Entry) → ₹2.5 LPA (Cabinet Secretary - highest)",
                        ageToStart: "21-32 years (age limits for exam)",
                        skills: ["Leadership", "Administration", "Policy-making", "Communication", "General knowledge"],
                        jobOutlook: "Excellent - Most prestigious",
                        workEnvironment: "District, State, Central government offices",
                        careerPath: "SDM → DM → Commissioner → Secretary → Cabinet Secretary",
                        alternativePaths: ["State Civil Services", "Public Policy Expert", "Political Career"]
                    },
                    {
                        name: "IPS Officer (Indian Police Service)",
                        description: "Maintain law and order, lead police forces",
                        education: "Any Bachelor's degree + UPSC CSE",
                        entranceExams: ["UPSC Civil Services Examination"],
                        topColleges: [
                            { name: "Any recognized university", website: "https://www.ugc.ac.in", rating: 3.5 }
                        ],
                        salaryRange: "₹56,100/month (Entry) → ₹2.25 LPA (DGP)",
                        ageToStart: "21-32 years",
                        skills: ["Leadership", "Law enforcement", "Crisis management", "Physical fitness", "Decision-making"],
                        jobOutlook: "Excellent - High respect",
                        workEnvironment: "Police stations, Districts, State headquarters",
                        careerPath: "ASP → SP → DIG → IG → DGP",
                        alternativePaths: ["Intelligence Services", "Security Consultant", "Law Enforcement Training"]
                    },
                    {
                        name: "IFS Officer (Indian Foreign Service)",
                        description: "Represent India in international diplomacy",
                        education: "Any Bachelor's degree + UPSC CSE",
                        entranceExams: ["UPSC Civil Services Examination"],
                        topColleges: [
                            { name: "Any recognized university", website: "https://www.ugc.ac.in", rating: 3.5 }
                        ],
                        salaryRange: "₹56,100/month (Entry) → ₹2.25 LPA (Foreign Secretary)",
                        ageToStart: "21-32 years",
                        skills: ["Diplomacy", "Communication", "Language skills", "Cultural awareness", "Negotiation"],
                        jobOutlook: "Excellent - Global exposure",
                        workEnvironment: "Embassies abroad, Ministry of External Affairs",
                        careerPath: "Third Secretary → Second Secretary → First Secretary → Counsellor → Minister → Ambassador → Foreign Secretary",
                        alternativePaths: ["International Relations Expert", "Foreign Policy Analyst", "Global Consultant"]
                    },
                    {
                        name: "Indian Revenue Service (IRS)",
                        description: "Tax administration and revenue collection",
                        education: "Any Bachelor's degree + UPSC CSE",
                        entranceExams: ["UPSC Civil Services Examination"],
                        topColleges: [
                            { name: "Any recognized university", website: "https://www.ugc.ac.in", rating: 3.5 }
                        ],
                        salaryRange: "₹56,100/month (Entry) → ₹2.25 LPA (Chief Commissioner)",
                        ageToStart: "21-32 years",
                        skills: ["Taxation knowledge", "Investigation", "Financial analysis", "Law enforcement", "Administration"],
                        jobOutlook: "Very Good - Critical function",
                        workEnvironment: "Income Tax/Customs offices across India",
                        careerPath: "Assistant Commissioner → Deputy Commissioner → Joint Commissioner → Chief Commissioner",
                        alternativePaths: ["Tax Consultant", "Financial Investigator", "CA with government experience"]
                    },
                    {
                        name: "State Civil Services (PCS/PSC)",
                        description: "Administrative roles at state level",
                        education: "Any Bachelor's degree + State PSC exam",
                        entranceExams: ["State Public Service Commission exams (varies by state)"],
                        topColleges: [
                            { name: "Any recognized university", website: "https://www.ugc.ac.in", rating: 3.5 }
                        ],
                        salaryRange: "₹35,000-50,000/month (Entry) → ₹1.5-2 LPA (Senior)",
                        ageToStart: "21-40 years (varies by state)",
                        skills: ["Administration", "Public welfare", "Communication", "Local governance", "Leadership"],
                        jobOutlook: "Good - State development focus",
                        workEnvironment: "State government offices, Districts",
                        careerPath: "Tehsildar/BDO → SDM → District-level Officer → State Secretary",
                        alternativePaths: ["Municipal Commissioner", "Development Officer", "Government Consultant"]
                    }
                ]
            },
            {
                id: "defense",
                name: "Defense Services",
                description: "Protect the nation with honor",
                careers: [
                    {
                        name: "Indian Army Officer",
                        description: "Lead troops and defend national borders",
                        education: "Any Bachelor's degree (Science/Engineering preferred for technical roles)",
                        entranceExams: ["NDA (after 12th)", "CDS (after graduation)", "TES/TGC/SSC"],
                        topColleges: [
                            { name: "National Defence Academy Pune", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "Indian Military Academy Dehradun", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "OTA Chennai", website: "https://www.ugc.ac.in", rating: 3.8 }
                        ],
                        salaryRange: "₹56,100/month (Lieutenant) → ₹2.5 LPA (Field Marshal - honorary)",
                        ageToStart: "16.5-19 years (NDA) | 19-24 years (CDS)",
                        skills: ["Leadership", "Physical fitness", "Strategy", "Teamwork", "Discipline"],
                        jobOutlook: "Good - Honorable service",
                        workEnvironment: "Border areas, Cantonments, Peace missions",
                        careerPath: "Lieutenant → Captain → Major → Lt. Colonel → Colonel → Brigadier → General",
                        alternativePaths: ["Defense Consultant", "Security Expert", "Corporate Security Head"]
                    },
                    {
                        name: "Indian Navy Officer",
                        description: "Naval operations and maritime security",
                        education: "B.Tech/B.E. (for technical) or Any degree (for general)",
                        entranceExams: ["NDA", "CDS", "Direct Entry (10+2 Technical Entry Scheme)"],
                        topColleges: [
                            { name: "Indian Naval Academy Ezhimala", website: "https://www.ugc.ac.in", rating: 3.8 }
                        ],
                        salaryRange: "₹56,100/month (Sub Lieutenant) → ₹2.5 LPA (Admiral)",
                        ageToStart: "16.5-19 years (NDA) | 19-24 years (CDS)",
                        skills: ["Navigation", "Technical knowledge", "Leadership", "Physical fitness", "Maritime operations"],
                        jobOutlook: "Good - Maritime security importance",
                        workEnvironment: "Naval ships, Coastal bases, Submarines",
                        careerPath: "Sub Lieutenant → Lieutenant → Lt. Commander → Commander → Captain → Commodore → Admiral",
                        alternativePaths: ["Merchant Navy", "Maritime Security Consultant", "Port Operations"]
                    },
                    {
                        name: "Indian Air Force Officer",
                        description: "Aerial defense and air operations",
                        education: "B.Tech/B.E. (for technical) or Any degree with Physics & Maths",
                        entranceExams: ["NDA", "CDS", "AFCAT"],
                        topColleges: [
                            { name: "Air Force Academy Hyderabad", website: "https://www.ugc.ac.in", rating: 3.8 },
                            { name: "National Defence Academy", website: "https://www.ugc.ac.in", rating: 3.8 }
                        ],
                        salaryRange: "₹56,100/month (Flying Officer) → ₹2.5 LPA (Marshal of IAF)",
                        ageToStart: "16.5-19 years (NDA) | 20-24 years (AFCAT)",
                        skills: ["Flying/Technical skills", "Quick decision-making", "Physical fitness", "Spatial awareness", "Leadership"],
                        jobOutlook: "Good - Modernization focus",
                        workEnvironment: "Air Force stations, Fighter squadrons, Technical units",
                        careerPath: "Flying Officer → Flight Lieutenant → Squadron Leader → Wing Commander → Group Captain → Air Marshal",
                        alternativePaths: ["Commercial Pilot", "Aviation Consultant", "Aerospace Industry"]
                    }
                ]
            },
            {
                id: "public_services",
                name: "Public Services & Banking",
                description: "Serve through financial and administrative roles",
                careers: [
                    {
                        name: "Bank PO/Manager (Public Sector)",
                        description: "Banking operations and customer service",
                        education: "Any Bachelor's degree (3-4 years)",
                        entranceExams: ["IBPS PO", "SBI PO", "RBI Grade B"],
                        topColleges: [
                            { name: "Any recognized university", website: "https://www.ugc.ac.in", rating: 3.5 }
                        ],
                        salaryRange: "₹4-8 LPA (PO) | ₹10-18 LPA (Manager) | ₹25-50 LPA (General Manager)",
                        ageToStart: "20-30 years (exam age limit)",
                        skills: ["Banking knowledge", "Customer service", "Financial analysis", "Computer skills", "Communication"],
                        jobOutlook: "Good - Stable career",
                        workEnvironment: "Bank branches, Head offices, Regional offices",
                        careerPath: "PO → Manager → Senior Manager → Chief Manager → General Manager",
                        alternativePaths: ["Private Banking", "Financial Advisor", "Investment Banking"]
                    },
                    {
                        name: "SSC (Staff Selection Commission) Jobs",
                        description: "Various central government positions",
                        education: "12th pass to Graduate (depends on exam)",
                        entranceExams: ["SSC CGL", "SSC CHSL", "SSC MTS", "SSC JE"],
                        topColleges: [
                            { name: "Any recognized board/university", website: "https://www.ugc.ac.in", rating: 3.5 }
                        ],
                        salaryRange: "₹2-5 LPA (Entry) | ₹6-12 LPA (Group B) | ₹15-25 LPA (Senior)",
                        ageToStart: "18-32 years (varies by post)",
                        skills: ["General knowledge", "Quantitative aptitude", "Reasoning", "English", "Computer knowledge"],
                        jobOutlook: "Good - Job security",
                        workEnvironment: "Central government ministries and departments",
                        careerPath: "Clerk/Assistant → Inspector → Superintendent → Deputy Director",
                        alternativePaths: ["State government jobs", "Public sector undertakings", "Railway services"]
                    }
                ]
            }
        ]
    },
    education: {
        name: "Education & Teaching",
        icon: "📚",
        color: "#2196F3",
        subFields: [
            {
                id: "teaching",
                name: "Teaching & Academia",
                description: "Shape future generations through education",
                careers: [
                    {
                        name: "School Teacher (Primary/Secondary)",
                        description: "Teach students in schools",
                        education: "B.A/B.Sc/B.Com (3 years) + B.Ed (2 years)",
                        entranceExams: ["TET", "CTET", "State TET exams"],
                        topColleges: [
                            { name: "Any recognized university + B.Ed college", website: "https://www.ugc.ac.in", rating: 3.5 }
                        ],
                        salaryRange: "₹2-5 LPA (Private) | ₹4-10 LPA (Government/KV/NV)",
                        ageToStart: "21+ (after B.Ed)",
                        skills: ["Subject knowledge", "Teaching", "Patience", "Communication", "Classroom management"],
                        jobOutlook: "Good - Always needed",
                        workEnvironment: "Schools (Government, Private, International)",
                        careerPath: "TGT → PGT → Vice Principal → Principal",
                        alternativePaths: ["Online Tutor", "Content Creator", "Education Consultant"]
                    },
                    {
                        name: "College/University Professor",
                        description: "Teach and conduct research in higher education",
                        education: "Subject Bachelor's (3-4 years) + Master's (2 years) + Ph.D. (3-5 years) + NET/SET",
                        entranceExams: ["UGC NET", "State SET", "Ph.D. entrance exams"],
                        topColleges: [
                            { name: "IITs", website: "https://www.iitb.ac.in", rating: 4.8 },
                            { name: "DU", website: "https://www.du.ac.in", rating: 4.4 },
                            { name: "JNU", website: "https://www.jnu.ac.in", rating: 4.6 },
                            { name: "Central/State Universities", website: "https://www.ugc.ac.in", rating: 3.8 }
                        ],
                        salaryRange: "₹6-12 LPA (Assistant Professor) | ₹15-30 LPA (Professor) | ₹40L-1Cr (Renowned)",
                        ageToStart: "27-30+ (after Ph.D. and NET)",
                        skills: ["Subject mastery", "Research", "Teaching", "Publication", "Mentoring"],
                        jobOutlook: "Moderate - Competitive for good positions",
                        workEnvironment: "Universities, Colleges, Research institutions",
                        careerPath: "Assistant Professor → Associate Professor → Professor → Dean → Vice Chancellor",
                        alternativePaths: ["Researcher", "Subject Matter Expert", "Academic Consultant"]
                    }
                ]
            }
        ]
    },
    sports: {
        name: "Sports & Fitness",
        icon: "⚽",
        color: "#FFC107",
        subFields: [
            {
                id: "sports_careers",
                name: "Sports & Athletics",
                description: "Excel through physical excellence",
                careers: [
                    {
                        name: "Professional Athlete",
                        description: "Compete at national/international level",
                        education: "No formal degree required - Training from early age",
                        entranceExams: ["Trials, Selection camps, Competitions"],
                        topColleges: [
                            { name: "SAI Centers", website: "https://www.sportsauthorityofindia.nic.in", rating: 4.3 },
                            { name: "Sports Authority of India", website: "https://www.sportsauthorityofindia.nic.in", rating: 4.3 },
                            { name: "State Academies", website: "https://www.sportsauthorityofindia.nic.in", rating: 4.0 }
                        ],
                        salaryRange: "Variable - ₹2-10 LPA (National) | ₹20L-10Cr+ (International/IPL)",
                        ageToStart: "6-12 years (start training)",
                        skills: ["Sport-specific skills", "Physical fitness", "Mental toughness", "Discipline", "Teamwork"],
                        jobOutlook: "Competitive - Very few make it to top",
                        workEnvironment: "Training centers, Stadiums, International tours",
                        careerPath: "Junior player → State player → National player → International player",
                        alternativePaths: ["Coach", "Sports Commentator", "Sports Management", "Fitness Trainer"]
                    },
                    {
                        name: "Sports Coach/Trainer",
                        description: "Train athletes and teams",
                        education: "B.P.Ed (3 years) + M.P.Ed (2 years) + Coaching certifications",
                        entranceExams: ["University entrance for B.P.Ed"],
                        topColleges: [
                            { name: "LNIPE Gwalior", website: "https://www.lnipe.edu.in", rating: 4.2 },
                            { name: "Punjabi University Patiala", website: "https://www.pbi.ac.in", rating: 3.9 }
                        ],
                        salaryRange: "₹2-5 LPA (School) | ₹6-15 LPA (Professional teams) | ₹20-60 LPA (National teams)",
                        ageToStart: "17-18 years",
                        skills: ["Sport knowledge", "Training methods", "Motivation", "Strategy", "Sports science"],
                        jobOutlook: "Good - Growing sports culture",
                        workEnvironment: "Schools, Academies, Professional teams, Private coaching",
                        careerPath: "Assistant Coach → Coach → Head Coach → National Coach",
                        alternativePaths: ["Sports Scientist", "Fitness Consultant", "Sports Administrator"]
                    },
                    {
                        name: "Fitness Trainer/Gym Instructor",
                        description: "Help people achieve fitness goals",
                        education: "Certification courses (3-12 months) or B.P.Ed",
                        entranceExams: ["Certification exams (ACE, NASM, ACSM)"],
                        topColleges: [
                            { name: "K11 Academy", website: "https://www.k11academy.com", rating: 3.8 },
                            { name: "Gold's Gym Training", website: "https://www.goldsgym.com", rating: 3.7 },
                            { name: "INFS", website: "https://www.infs.co.in", rating: 3.8 }
                        ],
                        salaryRange: "₹1.5-4 LPA (Gym) | ₹5-15 LPA (Personal Trainer) | ₹20-80 LPA (Celebrity trainer/Own studio)",
                        ageToStart: "18+ years",
                        skills: ["Fitness knowledge", "Anatomy", "Nutrition", "Motivation", "Communication"],
                        jobOutlook: "Excellent - Health awareness boom",
                        workEnvironment: "Gyms, Fitness studios, Online, Home training",
                        careerPath: "Gym Trainer → Senior Trainer → Personal Trainer → Fitness Studio Owner",
                        alternativePaths: ["Nutritionist (with additional degree)", "Yoga Instructor", "Sports Therapist"]
                    },
                    {
                        name: "Yoga Instructor",
                        description: "Teach yoga for wellness and fitness",
                        education: "Yoga certification (200-500 hours) or Degree in Yoga",
                        entranceExams: ["Not mandatory - Certification exams"],
                        topColleges: [
                            { name: "The Yoga Institute Mumbai", website: "https://www.theyogainstitute.org", rating: 4.4 },
                            { name: "Kaivalyadhama", website: "https://www.kdham.com", rating: 4.3 },
                            { name: "Rishikesh Yogpeeth", website: "https://www.rishikeshyogpeeth.com", rating: 4.1 }
                        ],
                        salaryRange: "₹1.5-4 LPA (Studio) | ₹5-15 LPA (Freelance) | ₹20-60 LPA (International/Celebrity)",
                        ageToStart: "18+ years",
                        skills: ["Yoga asanas", "Meditation", "Teaching", "Anatomy", "Spiritual knowledge"],
                        jobOutlook: "Very Good - Global popularity",
                        workEnvironment: "Yoga studios, Wellness centers, Freelance, International retreats",
                        careerPath: "Yoga Trainee → Instructor → Senior Teacher → Studio Owner/Guru",
                        alternativePaths: ["Wellness Coach", "Meditation Teacher", "Ayurvedic Consultant"]
                    }
                ]
            }
        ]
    }
};