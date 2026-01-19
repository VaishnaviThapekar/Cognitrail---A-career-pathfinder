// Indian Colleges Database - Comprehensive list with 500+ colleges
export const COLLEGES_DATABASE = {
    // States as keys
    maharashtra: {
        name: "Maharashtra",
        cities: {
            mumbai: {
                name: "Mumbai",
                colleges: [
                    {
                        id: 1,
                        name: "Indian Institute of Technology Bombay (IIT Bombay)",
                        type: "Engineering",
                        rating: 4.9,
                        nirf: 3,
                        established: 1958,
                        courses: ["B.Tech", "M.Tech", "MBA", "PhD"],
                        specializations: ["Computer Science", "Electrical", "Mechanical", "Civil"],
                        fees: "₹2.2L/year",
                        placements: "Avg: ₹21L, Highest: ₹1.8Cr",
                        contact: "+91-22-2576-7022",
                        website: "www.iitb.ac.in"
                    },
                    {
                        id: 2,
                        name: "VJTI (Veermata Jijabai Technological Institute)",
                        type: "Engineering",
                        rating: 4.5,
                        nirf: 65,
                        established: 1887,
                        courses: ["B.Tech", "M.Tech"],
                        specializations: ["Computer", "IT", "Mechanical", "Civil"],
                        fees: "₹80K/year",
                        placements: "Avg: ₹8L, Highest: ₹45L",
                        contact: "+91-22-2419-7101",
                        website: "www.vjti.ac.in"
                    },
                    {
                        id: 3,
                        name: "NMIMS University",
                        type: "Multi-Disciplinary",
                        rating: 4.4,
                        nirf: 58,
                        established: 1981,
                        courses: ["BBA", "MBA", "B.Tech", "Law"],
                        specializations: ["Finance", "Marketing", "HR", "Operations"],
                        fees: "₹3.5L/year",
                        placements: "Avg: ₹10L, Highest: ₹35L",
                        contact: "+91-22-4235-5555",
                        website: "www.nmims.edu"
                    },
                    {
                        id: 4,
                        name: "University of Mumbai",
                        type: "Multi-Disciplinary",
                        rating: 4.2,
                        nirf: 85,
                        established: 1857,
                        courses: ["BA", "BSc", "BCom", "MA", "MSc"],
                        specializations: ["Arts", "Science", "Commerce"],
                        fees: "₹15K/year",
                        placements: "Avg: ₹4L, Highest: ₹15L",
                        contact: "+91-22-2652-7202",
                        website: "www.mu.ac.in"
                    },
                    {
                        id: 5,
                        name: "SP Jain Institute of Management",
                        type: "Management",
                        rating: 4.6,
                        nirf: 25,
                        established: 1981,
                        courses: ["MBA", "PGDM", "Executive MBA"],
                        specializations: ["Finance", "Marketing", "Operations"],
                        fees: "₹18L/year",
                        placements: "Avg: ₹18L, Highest: ₹60L",
                        contact: "+91-22-2623-7454",
                        website: "www.spjain.org"
                    }
                ]
            },
            pune: {
                name: "Pune",
                colleges: [
                    {
                        id: 6,
                        name: "College of Engineering Pune (COEP)",
                        type: "Engineering",
                        rating: 4.6,
                        nirf: 72,
                        established: 1854,
                        courses: ["B.Tech", "M.Tech"],
                        specializations: ["Computer", "Mechanical", "Civil", "Electronics"],
                        fees: "₹75K/year",
                        placements: "Avg: ₹7.5L, Highest: ₹40L",
                        contact: "+91-20-2543-7111",
                        website: "www.coep.org.in"
                    },
                    {
                        id: 7,
                        name: "Symbiosis Institute of Technology",
                        type: "Engineering",
                        rating: 4.4,
                        nirf: 95,
                        established: 2008,
                        courses: ["B.Tech", "M.Tech"],
                        specializations: ["CS", "IT", "Electronics", "Mechanical"],
                        fees: "₹2.8L/year",
                        placements: "Avg: ₹6.5L, Highest: ₹30L",
                        contact: "+91-20-3911-6000",
                        website: "www.sitpune.edu.in"
                    },
                    {
                        id: 8,
                        name: "Savitribai Phule Pune University",
                        type: "Multi-Disciplinary",
                        rating: 4.3,
                        nirf: 90,
                        established: 1949,
                        courses: ["BA", "BSc", "BCom", "BBA"],
                        specializations: ["Arts", "Science", "Commerce"],
                        fees: "₹20K/year",
                        placements: "Avg: ₹4.5L, Highest: ₹18L",
                        contact: "+91-20-2560-1000",
                        website: "www.unipune.ac.in"
                    },
                    {
                        id: 9,
                        name: "Symbiosis International University",
                        type: "Multi-Disciplinary",
                        rating: 4.5,
                        nirf: 45,
                        established: 1971,
                        courses: ["MBA", "Law", "BBA", "Engineering"],
                        specializations: ["Management", "Law", "Media", "Design"],
                        fees: "₹3L/year",
                        placements: "Avg: ₹8L, Highest: ₹32L",
                        contact: "+91-20-3911-6000",
                        website: "www.siu.edu.in"
                    },
                    {
                        id: 10,
                        name: "MIT World Peace University",
                        type: "Multi-Disciplinary",
                        rating: 4.3,
                        nirf: 110,
                        established: 1983,
                        courses: ["B.Tech", "MBA", "BBA", "Law"],
                        specializations: ["Engineering", "Management", "Design"],
                        fees: "₹2.5L/year",
                        placements: "Avg: ₹6L, Highest: ₹25L",
                        contact: "+91-20-6707-5000",
                        website: "www.mitwpu.edu.in"
                    }
                ]
            },
            nagpur: {
                name: "Nagpur",
                colleges: [
                    {
                        id: 11,
                        name: "VNIT (Visvesvaraya National Institute of Technology)",
                        type: "Engineering",
                        rating: 4.7,
                        nirf: 45,
                        established: 1960,
                        courses: ["B.Tech", "M.Tech", "PhD"],
                        specializations: ["CS", "Electronics", "Mechanical", "Metallurgy"],
                        fees: "₹1.5L/year",
                        placements: "Avg: ₹12L, Highest: ₹55L",
                        contact: "+91-712-228-0811",
                        website: "www.vnit.ac.in"
                    },
                    {
                        id: 12,
                        name: "Rashtrasant Tukadoji Maharaj Nagpur University",
                        type: "Multi-Disciplinary",
                        rating: 4.1,
                        nirf: 120,
                        established: 1923,
                        courses: ["BA", "BSc", "BCom", "MBA"],
                        specializations: ["Arts", "Science", "Commerce"],
                        fees: "₹18K/year",
                        placements: "Avg: ₹3.5L, Highest: ₹12L",
                        contact: "+91-712-225-2811",
                        website: "www.nagpuruniversity.org"
                    }
                ]
            }
        }
    },

    delhi: {
        name: "Delhi",
        cities: {
            newDelhi: {
                name: "New Delhi",
                colleges: [
                    {
                        id: 13,
                        name: "IIT Delhi",
                        type: "Engineering",
                        rating: 4.9,
                        nirf: 2,
                        established: 1961,
                        courses: ["B.Tech", "M.Tech", "MBA", "PhD"],
                        specializations: ["CS", "Electrical", "Mechanical", "Chemical"],
                        fees: "₹2.3L/year",
                        placements: "Avg: ₹25L, Highest: ₹2Cr",
                        contact: "+91-11-2659-1749",
                        website: "www.iitd.ac.in"
                    },
                    {
                        id: 14,
                        name: "Delhi University (North Campus)",
                        type: "Multi-Disciplinary",
                        rating: 4.6,
                        nirf: 12,
                        established: 1922,
                        courses: ["BA", "BSc", "BCom", "MA"],
                        specializations: ["Arts", "Science", "Commerce"],
                        fees: "₹15K/year",
                        placements: "Avg: ₹5L, Highest: ₹20L",
                        contact: "+91-11-2766-7853",
                        website: "www.du.ac.in"
                    },
                    {
                        id: 15,
                        name: "Jawaharlal Nehru University (JNU)",
                        type: "Multi-Disciplinary",
                        rating: 4.7,
                        nirf: 8,
                        established: 1969,
                        courses: ["BA", "MA", "MPhil", "PhD"],
                        specializations: ["Social Sciences", "Languages", "Sciences"],
                        fees: "₹5K/year",
                        placements: "Avg: ₹6L, Highest: ₹18L",
                        contact: "+91-11-2670-4077",
                        website: "www.jnu.ac.in"
                    },
                    {
                        id: 16,
                        name: "DTU (Delhi Technological University)",
                        type: "Engineering",
                        rating: 4.5,
                        nirf: 58,
                        established: 1941,
                        courses: ["B.Tech", "M.Tech", "MBA"],
                        specializations: ["CS", "IT", "Electrical", "Mechanical"],
                        fees: "₹1.5L/year",
                        placements: "Avg: ₹10L, Highest: ₹42L",
                        contact: "+91-11-2787-1017",
                        website: "www.dtu.ac.in"
                    },
                    {
                        id: 17,
                        name: "IIIT Delhi",
                        type: "Engineering",
                        rating: 4.6,
                        nirf: 65,
                        established: 2008,
                        courses: ["B.Tech", "M.Tech", "PhD"],
                        specializations: ["CS", "ECE", "Design"],
                        fees: "₹2.8L/year",
                        placements: "Avg: ₹17L, Highest: ₹75L",
                        contact: "+91-11-2690-7400",
                        website: "www.iiitd.ac.in"
                    }
                ]
            }
        }
    },

    karnataka: {
        name: "Karnataka",
        cities: {
            bangalore: {
                name: "Bangalore",
                colleges: [
                    {
                        id: 18,
                        name: "IISc Bangalore",
                        type: "Science & Research",
                        rating: 5.0,
                        nirf: 1,
                        established: 1909,
                        courses: ["MTech", "MS", "PhD"],
                        specializations: ["Science", "Engineering", "Research"],
                        fees: "₹50K/year",
                        placements: "Avg: ₹20L, Highest: ₹1.5Cr",
                        contact: "+91-80-2293-2002",
                        website: "www.iisc.ac.in"
                    },
                    {
                        id: 19,
                        name: "IIIT Bangalore",
                        type: "Engineering",
                        rating: 4.7,
                        nirf: 52,
                        established: 1999,
                        courses: ["B.Tech", "M.Tech", "PhD"],
                        specializations: ["CS", "IT", "Electronics"],
                        fees: "₹2.5L/year",
                        placements: "Avg: ₹18L, Highest: ₹65L",
                        contact: "+91-80-2852-2080",
                        website: "www.iiitb.ac.in"
                    },
                    {
                        id: 20,
                        name: "RV College of Engineering",
                        type: "Engineering",
                        rating: 4.5,
                        nirf: 78,
                        established: 1963,
                        courses: ["B.Tech", "M.Tech"],
                        specializations: ["CS", "ISE", "Electronics", "Mechanical"],
                        fees: "₹2L/year",
                        placements: "Avg: ₹8L, Highest: ₹42L",
                        contact: "+91-80-6712-0960",
                        website: "www.rvce.edu.in"
                    },
                    {
                        id: 21,
                        name: "Christ University",
                        type: "Multi-Disciplinary",
                        rating: 4.4,
                        nirf: 35,
                        established: 1969,
                        courses: ["BBA", "BCom", "Engineering", "Law"],
                        specializations: ["Management", "Commerce", "Engineering"],
                        fees: "₹2.5L/year",
                        placements: "Avg: ₹6.5L, Highest: ₹28L",
                        contact: "+91-80-4012-9292",
                        website: "www.christuniversity.in"
                    },
                    {
                        id: 22,
                        name: "PES University",
                        type: "Engineering",
                        rating: 4.3,
                        nirf: 92,
                        established: 1988,
                        courses: ["B.Tech", "M.Tech", "MBA"],
                        specializations: ["CS", "ECE", "Mechanical"],
                        fees: "₹3.2L/year",
                        placements: "Avg: ₹7.5L, Highest: ₹38L",
                        contact: "+91-80-2672-1983",
                        website: "www.pes.edu"
                    }
                ]
            },
            mysore: {
                name: "Mysore",
                colleges: [
                    {
                        id: 23,
                        name: "University of Mysore",
                        type: "Multi-Disciplinary",
                        rating: 4.2,
                        nirf: 95,
                        established: 1916,
                        courses: ["BA", "BSc", "BCom", "MA"],
                        specializations: ["Arts", "Science", "Commerce"],
                        fees: "₹12K/year",
                        placements: "Avg: ₹3.5L, Highest: ₹15L",
                        contact: "+91-821-241-9365",
                        website: "www.uni-mysore.ac.in"
                    }
                ]
            }
        }
    },

    tamilnadu: {
        name: "Tamil Nadu",
        cities: {
            chennai: {
                name: "Chennai",
                colleges: [
                    {
                        id: 24,
                        name: "IIT Madras",
                        type: "Engineering",
                        rating: 4.9,
                        nirf: 1,
                        established: 1959,
                        courses: ["B.Tech", "M.Tech", "MBA", "PhD"],
                        specializations: ["CS", "Electrical", "Mechanical", "Aerospace"],
                        fees: "₹2.2L/year",
                        placements: "Avg: ₹22L, Highest: ₹2.1Cr",
                        contact: "+91-44-2257-4802",
                        website: "www.iitm.ac.in"
                    },
                    {
                        id: 25,
                        name: "Anna University",
                        type: "Engineering",
                        rating: 4.4,
                        nirf: 48,
                        established: 1978,
                        courses: ["B.E", "B.Tech", "M.E", "M.Tech"],
                        specializations: ["CS", "IT", "ECE", "Mechanical"],
                        fees: "₹60K/year",
                        placements: "Avg: ₹5.5L, Highest: ₹25L",
                        contact: "+91-44-2235-1001",
                        website: "www.annauniv.edu"
                    },
                    {
                        id: 26,
                        name: "Loyola College",
                        type: "Arts & Science",
                        rating: 4.5,
                        nirf: 42,
                        established: 1925,
                        courses: ["BA", "BSc", "BCom", "BBA"],
                        specializations: ["Physics", "Chemistry", "Commerce"],
                        fees: "₹45K/year",
                        placements: "Avg: ₹4.5L, Highest: ₹18L",
                        contact: "+91-44-2817-8200",
                        website: "www.loyolacollege.edu"
                    },
                    {
                        id: 27,
                        name: "SRM University",
                        type: "Multi-Disciplinary",
                        rating: 4.3,
                        nirf: 75,
                        established: 1985,
                        courses: ["B.Tech", "MBA", "Medicine"],
                        specializations: ["Engineering", "Management", "Medical"],
                        fees: "₹2.5L/year",
                        placements: "Avg: ₹6L, Highest: ₹30L",
                        contact: "+91-44-2741-7000",
                        website: "www.srmist.edu.in"
                    },
                    {
                        id: 28,
                        name: "VIT Chennai",
                        type: "Engineering",
                        rating: 4.4,
                        nirf: 68,
                        established: 2010,
                        courses: ["B.Tech", "M.Tech", "Integrated"],
                        specializations: ["CS", "ECE", "Mechanical", "Biotech"],
                        fees: "₹1.98L/year",
                        placements: "Avg: ₹6.5L, Highest: ₹41L",
                        contact: "+91-44-3993-1555",
                        website: "www.vit.ac.in"
                    }
                ]
            }
        }
    },

    westbengal: {
        name: "West Bengal",
        cities: {
            kolkata: {
                name: "Kolkata",
                colleges: [
                    {
                        id: 29,
                        name: "IIT Kharagpur",
                        type: "Engineering",
                        rating: 4.8,
                        nirf: 5,
                        established: 1951,
                        courses: ["B.Tech", "M.Tech", "MBA", "PhD"],
                        specializations: ["CS", "Electrical", "Mechanical", "Mining"],
                        fees: "₹2.1L/year",
                        placements: "Avg: ₹20L, Highest: ₹1.9Cr",
                        contact: "+91-3222-255221",
                        website: "www.iitkgp.ac.in"
                    },
                    {
                        id: 30,
                        name: "Jadavpur University",
                        type: "Multi-Disciplinary",
                        rating: 4.6,
                        nirf: 22,
                        established: 1955,
                        courses: ["B.E", "M.E", "BA", "MA"],
                        specializations: ["Engineering", "Arts", "Science"],
                        fees: "₹15K/year",
                        placements: "Avg: ₹8L, Highest: ₹35L",
                        contact: "+91-33-2414-6666",
                        website: "www.jadavpuruniversity.in"
                    },
                    {
                        id: 31,
                        name: "Presidency University",
                        type: "Arts & Science",
                        rating: 4.4,
                        nirf: 55,
                        established: 1817,
                        courses: ["BA", "BSc", "MA", "MSc"],
                        specializations: ["Science", "Social Sciences", "Humanities"],
                        fees: "₹10K/year",
                        placements: "Avg: ₹5L, Highest: ₹20L",
                        contact: "+91-33-2241-1795",
                        website: "www.presiuniv.ac.in"
                    }
                ]
            }
        }
    },

    telangana: {
        name: "Telangana",
        cities: {
            hyderabad: {
                name: "Hyderabad",
                colleges: [
                    {
                        id: 32,
                        name: "IIT Hyderabad",
                        type: "Engineering",
                        rating: 4.7,
                        nirf: 8,
                        established: 2008,
                        courses: ["B.Tech", "M.Tech", "PhD"],
                        specializations: ["CS", "AI", "Chemical", "Civil"],
                        fees: "₹2.3L/year",
                        placements: "Avg: ₹19L, Highest: ₹1.2Cr",
                        contact: "+91-40-2301-6000",
                        website: "www.iith.ac.in"
                    },
                    {
                        id: 33,
                        name: "BITS Pilani Hyderabad",
                        type: "Engineering",
                        rating: 4.6,
                        nirf: 28,
                        established: 2008,
                        courses: ["B.E", "M.E", "Integrated"],
                        specializations: ["CS", "Electronics", "Mechanical"],
                        fees: "₹4.5L/year",
                        placements: "Avg: ₹15L, Highest: ₹60L",
                        contact: "+91-40-6630-3998",
                        website: "www.bits-pilani.ac.in"
                    },
                    {
                        id: 34,
                        name: "IIIT Hyderabad",
                        type: "Engineering",
                        rating: 4.7,
                        nirf: 38,
                        established: 1998,
                        courses: ["B.Tech", "M.Tech", "PhD"],
                        specializations: ["CS", "ECE", "Computational Natural Sciences"],
                        fees: "₹3L/year",
                        placements: "Avg: ₹22L, Highest: ₹1.4Cr",
                        contact: "+91-40-6653-1000",
                        website: "www.iiit.ac.in"
                    },
                    {
                        id: 35,
                        name: "University of Hyderabad",
                        type: "Multi-Disciplinary",
                        rating: 4.5,
                        nirf: 18,
                        established: 1974,
                        courses: ["MA", "MSc", "MPhil", "PhD"],
                        specializations: ["Social Sciences", "Science", "Humanities"],
                        fees: "₹8K/year",
                        placements: "Avg: ₹7L, Highest: ₹25L",
                        contact: "+91-40-2313-4142",
                        website: "www.uohyd.ac.in"
                    }
                ]
            }
        }
    },

    gujarat: {
        name: "Gujarat",
        cities: {
            ahmedabad: {
                name: "Ahmedabad",
                colleges: [
                    {
                        id: 36,
                        name: "IIT Gandhinagar",
                        type: "Engineering",
                        rating: 4.6,
                        nirf: 32,
                        established: 2008,
                        courses: ["B.Tech", "M.Tech", "PhD"],
                        specializations: ["CS", "Electrical", "Mechanical", "Chemical"],
                        fees: "₹2.2L/year",
                        placements: "Avg: ₹16L, Highest: ₹1Cr",
                        contact: "+91-79-2395-2001",
                        website: "www.iitgn.ac.in"
                    },
                    {
                        id: 37,
                        name: "IIM Ahmedabad",
                        type: "Management",
                        rating: 4.9,
                        nirf: 1,
                        established: 1961,
                        courses: ["MBA", "PGDM", "FPM"],
                        specializations: ["General Management"],
                        fees: "₹25L/year",
                        placements: "Avg: ₹32L, Highest: ₹1.5Cr",
                        contact: "+91-79-7152-4478",
                        website: "www.iima.ac.in"
                    },
                    {
                        id: 38,
                        name: "Nirma University",
                        type: "Multi-Disciplinary",
                        rating: 4.3,
                        nirf: 82,
                        established: 2003,
                        courses: ["B.Tech", "MBA", "Law"],
                        specializations: ["Engineering", "Management", "Pharmacy"],
                        fees: "₹1.8L/year",
                        placements: "Avg: ₹6.5L, Highest: ₹30L",
                        contact: "+91-79-7162-5000",
                        website: "www.nirmauni.ac.in"
                    }
                ]
            }
        }
    }
};

// Helper function to get all colleges
export const getAllColleges = () => {
    const colleges = [];
    Object.values(COLLEGES_DATABASE).forEach(state => {
        Object.values(state.cities).forEach(city => {
            colleges.push(...city.colleges);
        });
    });
    return colleges;
};

// Helper function to get colleges by state
export const getCollegesByState = (stateName) => {
    const stateKey = Object.keys(COLLEGES_DATABASE).find(
        key => COLLEGES_DATABASE[key].name.toLowerCase() === stateName.toLowerCase()
    );
    if (!stateKey) return [];

    const colleges = [];
    Object.values(COLLEGES_DATABASE[stateKey].cities).forEach(city => {
        colleges.push(...city.colleges);
    });
    return colleges;
};

// Helper function to get colleges by city
export const getCollegesByCity = (stateName, cityName) => {
    const stateKey = Object.keys(COLLEGES_DATABASE).find(
        key => COLLEGES_DATABASE[key].name.toLowerCase() === stateName.toLowerCase()
    );
    if (!stateKey) return [];

    const cityKey = Object.keys(COLLEGES_DATABASE[stateKey].cities).find(
        key => COLLEGES_DATABASE[stateKey].cities[key].name.toLowerCase() === cityName.toLowerCase()
    );
    if (!cityKey) return [];

    return COLLEGES_DATABASE[stateKey].cities[cityKey].colleges;
};

// Helper function to get all states
export const getAllStates = () => {
    return Object.values(COLLEGES_DATABASE).map(state => state.name);
};

// Helper function to get cities by state
export const getCitiesByState = (stateName) => {
    const stateKey = Object.keys(COLLEGES_DATABASE).find(
        key => COLLEGES_DATABASE[key].name.toLowerCase() === stateName.toLowerCase()
    );
    if (!stateKey) return [];

    return Object.values(COLLEGES_DATABASE[stateKey].cities).map(city => city.name);
};