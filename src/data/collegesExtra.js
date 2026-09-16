// Extra colleges to merge into the main COLLEGES_DATABASE
export const EXTRA_COLLEGES = {
    andhrapradesh: {
        name: "Andhra Pradesh",
        cities: {
            tirupati: {
                name: "Tirupati",
                colleges: [
                    {
                        id: 50,
                        name: "IIT Tirupati",
                        type: "Engineering",
                        nirf: 40,
                        established: 2015,
                        courses: ["B.Tech", "M.Tech", "PhD"],
                        fees: "₹1.8L/year",
                        placements: "Avg: ₹12L",
                        contact: "",
                        website: "www.iittp.ac.in",
                        ownership: "Government"
                    }
                ]
            },
            visakhapatnam: {
                name: "Visakhapatnam",
                colleges: [
                    {
                        id: 51,
                        name: "Andhra University",
                        type: "Multi-Disciplinary",
                        nirf: 120,
                        established: 1926,
                        courses: ["BA", "BSc", "BTech", "MA", "MSc"],
                        fees: "₹15K/year",
                        placements: "Avg: ₹4L",
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    assam: {
        name: "Assam",
        cities: {
            guwahati: {
                name: "Guwahati",
                colleges: [
                    {
                        id: 52,
                        name: "IIT Guwahati",
                        type: "Engineering",
                        nirf: 7,
                        established: 1994,
                        courses: ["B.Tech", "M.Tech", "PhD"],
                        fees: "₹2L/year",
                        placements: "Avg: ₹14L",
                        ownership: "Government"
                    },
                    {
                        id: 53,
                        name: "Gauhati University",
                        type: "Multi-Disciplinary",
                        nirf: 150,
                        established: 1948,
                        courses: ["BA", "BSc", "BCom"],
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    bihar: {
        name: "Bihar",
        cities: {
            patna: {
                name: "Patna",
                colleges: [
                    {
                        id: 54,
                        name: "IIT Patna",
                        type: "Engineering",
                        nirf: 35,
                        established: 2008,
                        courses: ["B.Tech", "M.Tech"],
                        ownership: "Government"
                    },
                    {
                        id: 55,
                        name: "NIT Patna",
                        type: "Engineering",
                        nirf: 120,
                        established: 1886,
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    chhattisgarh: {
        name: "Chhattisgarh",
        cities: {
            raipur: {
                name: "Raipur",
                colleges: [
                    {
                        id: 56,
                        name: "IIT Bhilai",
                        type: "Engineering",
                        nirf: 180,
                        established: 2016,
                        ownership: "Government"
                    },
                    {
                        id: 57,
                        name: "National Institute of Technology Raipur",
                        type: "Engineering",
                        nirf: 90,
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    goa: {
        name: "Goa",
        cities: {
            panaji: {
                name: "Panaji",
                colleges: [
                    {
                        id: 58,
                        name: "Goa University",
                        type: "Multi-Disciplinary",
                        nirf: 0,
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    haryana: {
        name: "Haryana",
        cities: {
            kurukshetra: {
                name: "Kurukshetra",
                colleges: [
                    {
                        id: 59,
                        name: "NIT Kurukshetra",
                        type: "Engineering",
                        nirf: 100,
                        ownership: "Government"
                    }
                ]
            },
            gurgaon: {
                name: "Gurgaon",
                colleges: [
                    {
                        id: 60,
                        name: "IIIT Delhi (campus presence)",
                        type: "Engineering",
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    himachalpradesh: {
        name: "Himachal Pradesh",
        cities: {
            mandi: {
                name: "Mandi",
                colleges: [
                    {
                        id: 61,
                        name: "IIT Mandi",
                        type: "Engineering",
                        nirf: 140,
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    jharkhand: {
        name: "Jharkhand",
        cities: {
            dhanbad: {
                name: "Dhanbad",
                colleges: [
                    {
                        id: 62,
                        name: "IIT (ISM) Dhanbad",
                        type: "Engineering",
                        nirf: 30,
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    jammu_kashmir: {
        name: "Jammu & Kashmir",
        cities: {
            srinagar: {
                name: "Srinagar",
                colleges: [
                    {
                        id: 63,
                        name: "University of Kashmir",
                        type: "Multi-Disciplinary",
                        ownership: "Government"
                    }
                ]
            },
            jammu: {
                name: "Jammu",
                colleges: [
                    {
                        id: 64,
                        name: "University of Jammu",
                        type: "Multi-Disciplinary",
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    kerala: {
        name: "Kerala",
        cities: {
            thiruvananthapuram: {
                name: "Thiruvananthapuram",
                colleges: [
                    {
                        id: 65,
                        name: "IISER Thiruvananthapuram",
                        type: "Science & Research",
                        nirf: 25,
                        ownership: "Government"
                    }
                ]
            },
            kozhikode: {
                name: "Kozhikode",
                colleges: [
                    {
                        id: 66,
                        name: "NIT Calicut",
                        type: "Engineering",
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    madhyapradesh: {
        name: "Madhya Pradesh",
        cities: {
            bhopal: {
                name: "Bhopal",
                colleges: [
                    {
                        id: 67,
                        name: "IIT(ISM) - (note: main NIT/BHU elsewhere)",
                        type: "Engineering",
                        ownership: "Government"
                    },
                    {
                        id: 68,
                        name: "Indian Institute of Information Technology and Management - Gwalior (IIITM Gwalior)",
                        type: "Multi-Disciplinary",
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    manipur: {
        name: "Manipur",
        cities: {
            imphal: {
                name: "Imphal",
                colleges: [
                    {
                        id: 69,
                        name: "Manipur University",
                        type: "Multi-Disciplinary",
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    meghalaya: {
        name: "Meghalaya",
        cities: {
            shillong: {
                name: "Shillong",
                colleges: [
                    {
                        id: 70,
                        name: "NEHU (North-Eastern Hill University)",
                        type: "Multi-Disciplinary",
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    mizoram: {
        name: "Mizoram",
        cities: {
            aizawl: {
                name: "Aizawl",
                colleges: [
                    {
                        id: 71,
                        name: "Mizoram University",
                        type: "Multi-Disciplinary",
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    nagaland: {
        name: "Nagaland",
        cities: {
            kohima: {
                name: "Kohima",
                colleges: [
                    {
                        id: 72,
                        name: "Nagaland University",
                        type: "Multi-Disciplinary",
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    odisha: {
        name: "Odisha",
        cities: {
            bhubaneswar: {
                name: "Bhubaneswar",
                colleges: [
                    {
                        id: 73,
                        name: "IIT Bhubaneswar",
                        type: "Engineering",
                        nirf: 85,
                        ownership: "Government"
                    },
                    {
                        id: 74,
                        name: "KIIT University",
                        type: "Multi-Disciplinary",
                        ownership: "Private"
                    }
                ]
            }
        }
    },
    punjab: {
        name: "Punjab",
        cities: {
            chandigarh: {
                name: "Chandigarh",
                colleges: [
                    {
                        id: 75,
                        name: "Panjab University",
                        type: "Multi-Disciplinary",
                        ownership: "Government"
                    }
                ]
            },
            mohali: {
                name: "Mohali",
                colleges: [
                    {
                        id: 76,
                        name: "IISER Mohali",
                        type: "Science & Research",
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    puducherry: {
        name: "Puducherry",
        cities: {
            puducherry: {
                name: "Puducherry",
                colleges: [
                    {
                        id: 77,
                        name: "Pondicherry University",
                        type: "Multi-Disciplinary",
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    sikkim: {
        name: "Sikkim",
        cities: {
            gangtok: {
                name: "Gangtok",
                colleges: [
                    {
                        id: 78,
                        name: "Sikkim Manipal University",
                        type: "Multi-Disciplinary",
                        ownership: "Private"
                    }
                ]
            }
        }
    },
    tripura: {
        name: "Tripura",
        cities: {
            agartala: {
                name: "Agartala",
                colleges: [
                    {
                        id: 79,
                        name: "Tripura University",
                        type: "Multi-Disciplinary",
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    uttarakhand: {
        name: "Uttarakhand",
        cities: {
            roorkee: {
                name: "Roorkee",
                colleges: [
                    {
                        id: 80,
                        name: "IIT Roorkee",
                        type: "Engineering",
                        nirf: 15,
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    andaman_nicobar: {
        name: "Andaman & Nicobar Islands",
        cities: {
            portblair: {
                name: "Port Blair",
                colleges: [
                    {
                        id: 81,
                        name: "Andaman & Nicobar Islands Teresian College (example)",
                        type: "Multi-Disciplinary",
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    chandigarh: {
        name: "Chandigarh",
        cities: {
            chandigarh: {
                name: "Chandigarh",
                colleges: [
                    {
                        id: 82,
                        name: "Punjab Engineering College (PEC)",
                        type: "Engineering",
                        tier: "Tier 1",
                        nirf: 55,
                        established: 1921,
                        courses: ["B.Tech", "M.Tech", "PhD"],
                        specializations: ["Computer Science", "Aerospace", "Electronics", "Mechanical"],
                        fees: "₹1.5L/year",
                        placements: "Avg: ₹14.5L, Highest: ₹44L",
                        contact: "+91-172-2753051",
                        website: "www.pec.ac.in",
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    delhi_ncr_extra: {
        name: "Delhi & NCR Specialized",
        cities: {
            newdelhi: {
                name: "New Delhi",
                colleges: [
                    {
                        id: 83,
                        name: "All India Institute of Medical Sciences (AIIMS Delhi)",
                        type: "Medical",
                        tier: "Tier 1",
                        rating: 5.0,
                        nirf: 1,
                        established: 1956,
                        courses: ["MBBS", "MD", "MS", "B.Sc Nursing", "M.Sc BioTech"],
                        specializations: ["General Surgery", "Cardiology", "Neurology", "Oncology", "Pediatrics"],
                        fees: "₹1,628/year",
                        placements: "Premier Residency Placement & Global Medical Practice",
                        contact: "+91-11-26588500",
                        website: "www.aiims.edu",
                        ownership: "Government"
                    },
                    {
                        id: 84,
                        name: "National Law University Delhi (NLU Delhi)",
                        type: "Law",
                        tier: "Tier 1",
                        rating: 4.9,
                        nirf: 2,
                        established: 2008,
                        courses: ["BA LLB (Hons)", "LLM", "PhD"],
                        specializations: ["Corporate Law", "Cyber Law", "Constitutional Law", "IPR"],
                        fees: "₹1.9L/year",
                        placements: "Avg: ₹18L (Top Corporate Law Firms)",
                        contact: "+91-11-28034257",
                        website: "nludelhi.ac.in",
                        ownership: "Government"
                    },
                    {
                        id: 85,
                        name: "National Institute of Fashion Technology (NIFT Delhi)",
                        type: "Arts & Science",
                        tier: "Tier 1",
                        rating: 4.8,
                        nirf: 1,
                        established: 1986,
                        courses: ["B.Des", "B.FTech", "M.Des", "MFM"],
                        specializations: ["Fashion Design", "Textile Design", "Fashion Communication", "Apparel Tech"],
                        fees: "₹3.2L/year",
                        placements: "Avg: ₹8.5L (Top Fashion Houses & Global Brands)",
                        contact: "+91-11-26542000",
                        website: "www.nift.ac.in",
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    karnataka_extra: {
        name: "Karnataka Research & Management",
        cities: {
            bangalore: {
                name: "Bangalore",
                colleges: [
                    {
                        id: 86,
                        name: "Indian Institute of Science (IISc Bangalore)",
                        type: "Multi-Disciplinary",
                        tier: "Tier 1",
                        rating: 5.0,
                        nirf: 1,
                        established: 1909,
                        courses: ["BS Research", "M.Tech", "M.Des", "PhD"],
                        specializations: ["Quantum Computing", "AI & Robotics", "Aerospace", "Biochemistry", "Materials Science"],
                        fees: "₹35,000/year",
                        placements: "Avg: ₹28L (Top Global Research Labs & Tech R&D)",
                        contact: "+91-80-22932004",
                        website: "iisc.ac.in",
                        ownership: "Government"
                    },
                    {
                        id: 87,
                        name: "Indian Institute of Management Bangalore (IIM Bangalore)",
                        type: "Management",
                        tier: "Tier 1",
                        rating: 4.9,
                        nirf: 2,
                        established: 1973,
                        courses: ["MBA (PGP)", "Executive MBA", "PhD"],
                        specializations: ["Finance", "Marketing", "Business Analytics", "Strategy", "Operations"],
                        fees: "₹24.5L (Total)",
                        placements: "Avg: ₹35.3L, Highest: ₹1.1Cr",
                        contact: "+91-80-26993000",
                        website: "www.iimb.ac.in",
                        ownership: "Government"
                    },
                    {
                        id: 88,
                        name: "National Law School of India University (NLSIU Bangalore)",
                        type: "Law",
                        tier: "Tier 1",
                        rating: 5.0,
                        nirf: 1,
                        established: 1987,
                        courses: ["BA LLB (Hons)", "LLM", "MPP", "PhD"],
                        specializations: ["Litigation", "Corporate Law", "Human Rights", "International Law"],
                        fees: "₹2.8L/year",
                        placements: "Avg: ₹20L (Magic Circle Law Firms & Top Indian Chambers)",
                        contact: "+91-80-23213160",
                        website: "www.nls.ac.in",
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    gujarat_extra: {
        name: "Gujarat Design & Management",
        cities: {
            ahmedabad: {
                name: "Ahmedabad",
                colleges: [
                    {
                        id: 89,
                        name: "Indian Institute of Management Ahmedabad (IIM Ahmedabad)",
                        type: "Management",
                        tier: "Tier 1",
                        rating: 5.0,
                        nirf: 1,
                        established: 1961,
                        courses: ["MBA (PGP)", "PGPX", "ePGP"],
                        specializations: ["Agri-Business", "Finance", "Consulting", "Leadership"],
                        fees: "₹25L (Total)",
                        placements: "Avg: ₹34.3L, Highest: ₹1.15Cr",
                        contact: "+91-79-71524000",
                        website: "www.iima.ac.in",
                        ownership: "Government"
                    },
                    {
                        id: 90,
                        name: "National Institute of Design (NID Ahmedabad)",
                        type: "Design & Architecture",
                        tier: "Tier 1",
                        rating: 4.9,
                        nirf: 1,
                        established: 1961,
                        courses: ["B.Des", "M.Des", "PhD"],
                        specializations: ["Industrial Design", "Communication Design", "Textile & Apparel", "IT Integrated Design"],
                        fees: "₹3.5L/year",
                        placements: "Avg: ₹14L (Global Product & UX Design Studios)",
                        contact: "+91-79-26623692",
                        website: "www.nid.edu",
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    delhi_extended: {
        name: "Delhi NCR",
        cities: {
            delhi: {
                name: "New Delhi",
                colleges: [
                    {
                        id: 301,
                        name: "National Institute of Fashion Technology (NIFT New Delhi)",
                        type: "Design & Architecture",
                        tier: "Tier 1",
                        rating: 4.9,
                        nirf: 1,
                        established: 1986,
                        courses: ["B.Des", "B.FTech", "M.Des", "M.F.M"],
                        specializations: ["Fashion Design", "Textile Design", "Fashion Communication", "Apparel Production"],
                        fees: "₹3.2L/year",
                        placements: "Avg: ₹12L, Highest: ₹38L (Global Fashion & UX Houses)",
                        contact: "+91-11-26542000",
                        website: "www.nift.ac.in",
                        ownership: "Government"
                    },
                    {
                        id: 302,
                        name: "School of Planning and Architecture (SPA Delhi)",
                        type: "Design & Architecture",
                        tier: "Tier 1",
                        rating: 4.8,
                        nirf: 4,
                        established: 1941,
                        courses: ["B.Arch", "B.Plan", "M.Arch", "M.Plan"],
                        specializations: ["Architectural Design", "Urban Planning", "Landscape Architecture", "Industrial Design"],
                        fees: "₹1.5L/year",
                        placements: "Avg: ₹10.5L, Highest: ₹28L",
                        contact: "+91-11-23702345",
                        website: "www.spa.ac.in",
                        ownership: "Government"
                    },
                    {
                        id: 303,
                        name: "Faculty of Management Studies (FMS Delhi)",
                        type: "Management",
                        tier: "Tier 1",
                        rating: 4.9,
                        nirf: 8,
                        established: 1954,
                        courses: ["MBA", "Executive MBA", "PhD"],
                        specializations: ["Finance", "Marketing", "Consulting", "Product Management"],
                        fees: "₹2.0L (Total Course)",
                        placements: "Avg: ₹34.1L, Highest: ₹1.2Cr (Highest ROI MBA in Asia)",
                        contact: "+91-11-27666382",
                        website: "fms.edu",
                        ownership: "Government"
                    },
                    {
                        id: 304,
                        name: "ICAR - Indian Agricultural Research Institute (IARI New Delhi)",
                        type: "Agriculture & Forestry",
                        tier: "Tier 1",
                        rating: 4.9,
                        nirf: 1,
                        established: 1905,
                        courses: ["M.Sc Agriculture", "M.Tech Agri", "PhD"],
                        specializations: ["Agronomy", "Genetics & Plant Breeding", "Soil Science", "Agri-Biotechnology"],
                        fees: "₹35K/year",
                        placements: "Avg: ₹11L (ICAR Scientist / Agri-Corporate)",
                        contact: "+91-11-25843378",
                        website: "www.iari.res.in",
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    maharashtra_extended: {
        name: "Maharashtra Extended",
        cities: {
            pune: {
                name: "Pune",
                colleges: [
                    {
                        id: 310,
                        name: "COEP Technological University (COEP Pune)",
                        type: "Engineering",
                        tier: "Tier 1",
                        rating: 4.7,
                        nirf: 52,
                        established: 1854,
                        courses: ["B.Tech", "M.Tech", "PhD"],
                        specializations: ["Computer Engineering", "AI & Data Science", "Robotics", "Mechanical"],
                        fees: "₹95K/year",
                        placements: "Avg: ₹11.5L, Highest: ₹50L",
                        contact: "+91-20-25507000",
                        website: "www.coep.org.in",
                        ownership: "Government"
                    },
                    {
                        id: 311,
                        name: "National Defence Academy (NDA Khadakwasla)",
                        type: "Aviation & Marine",
                        tier: "Tier 1",
                        rating: 5.0,
                        established: 1954,
                        courses: ["B.Sc Military Science", "B.Tech Defense", "B.A."],
                        specializations: ["Army Aviation", "Naval Warfare", "Air Force Flying Branch"],
                        fees: "Fully Sponsored (Stipend Provided)",
                        placements: "100% Commissioned Officers in Indian Armed Forces",
                        contact: "+91-20-25291700",
                        website: "nda.nic.in",
                        ownership: "Government"
                    },
                    {
                        id: 312,
                        name: "Tolani Maritime Institute (TMI Pune)",
                        type: "Aviation & Marine",
                        tier: "Tier 1",
                        rating: 4.8,
                        established: 1998,
                        courses: ["B.Tech Marine Engineering", "B.Sc Nautical Science"],
                        specializations: ["Marine Propulsion", "Navigation Systems", "Offshore Robotics"],
                        fees: "₹4.5L/year",
                        placements: "Avg: ₹16L (Global Shipping Lines - Maersk, NYK)",
                        contact: "+91-2114-669600",
                        website: "tmi.tolani.edu",
                        ownership: "Private"
                    },
                    {
                        id: 313,
                        name: "Symbiosis Law School (SLS Pune)",
                        type: "Law",
                        tier: "Tier 1",
                        rating: 4.7,
                        nirf: 6,
                        established: 1977,
                        courses: ["BA LL.B (Hons)", "BBA LL.B (Hons)", "LLM"],
                        specializations: ["Corporate Law", "Intellectual Property", "International Arbitration"],
                        fees: "₹3.8L/year",
                        placements: "Avg: ₹14.5L, Highest: ₹32L",
                        contact: "+91-20-26551100",
                        website: "www.symlaw.ac.in",
                        ownership: "Private"
                    }
                ]
            }
        }
    },
    karnataka_extended: {
        name: "Karnataka Sciences & Research",
        cities: {
            bengaluru: {
                name: "Bengaluru",
                colleges: [
                    {
                        id: 320,
                        name: "Indian Institute of Science (IISc Bangalore)",
                        type: "Pure Sciences & Research",
                        tier: "Tier 1",
                        rating: 5.0,
                        nirf: 1,
                        established: 1909,
                        courses: ["BS (Research)", "M.Tech", "M.Des", "Ph.D."],
                        specializations: ["Quantum Computing", "Aerospace Engineering", "Artificial Intelligence", "Molecular Biophysics"],
                        fees: "₹30K/year",
                        placements: "Avg: ₹28L, Highest: ₹85L (DeepTech & Global AI Labs)",
                        contact: "+91-80-22932004",
                        website: "www.iisc.ac.in",
                        ownership: "Government"
                    },
                    {
                        id: 321,
                        name: "St. John's Medical College Bengaluru",
                        type: "Medical",
                        tier: "Tier 1",
                        rating: 4.8,
                        nirf: 14,
                        established: 1963,
                        courses: ["MBBS", "MD", "MS", "DM Cardiology"],
                        specializations: ["Pediatrics", "Oncology", "Neuro Surgery", "Community Medicine"],
                        fees: "₹7.5L/year",
                        placements: "Avg: ₹15.8L (Clinical & Super-Specialty Residency)",
                        contact: "+91-80-49466000",
                        website: "www.stjohns.in",
                        ownership: "Private"
                    }
                ]
            }
        }
    },
    tamilnadu_extended: {
        name: "Tamil Nadu Medical & Engineering",
        cities: {
            chennai: {
                name: "Chennai",
                colleges: [
                    {
                        id: 330,
                        name: "Indian Institute of Technology Madras (IIT Madras)",
                        type: "Engineering",
                        tier: "Tier 1",
                        rating: 5.0,
                        nirf: 1,
                        established: 1959,
                        courses: ["B.Tech", "BS Data Science", "M.Tech", "Ph.D."],
                        specializations: ["Computer Science", "Artificial Intelligence", "Aerospace", "Ocean Engineering"],
                        fees: "₹2.2L/year",
                        placements: "Avg: ₹22.5L, Highest: ₹1.98Cr",
                        contact: "+91-44-22578000",
                        website: "www.iitm.ac.in",
                        ownership: "Government"
                    },
                    {
                        id: 331,
                        name: "Christian Medical College (CMC Vellore)",
                        type: "Medical",
                        tier: "Tier 1",
                        rating: 4.9,
                        nirf: 3,
                        established: 1900,
                        courses: ["MBBS", "MD", "MS", "M.Ch Neurosurgery"],
                        specializations: ["Cardiology", "Gastroenterology", "Pediatric Surgery", "Radiology"],
                        fees: "₹52K/year",
                        placements: "Avg: ₹18.2L (Global Clinical Residency)",
                        contact: "+91-416-2281000",
                        website: "www.cmch-vellore.edu",
                        ownership: "Private"
                    }
                ]
            }
        }
    },
    global_universities: {
        name: "Global Premier Universities",
        cities: {
            international: {
                name: "Global / Overseas",
                colleges: [
                    {
                        id: 401,
                        name: "Massachusetts Institute of Technology (MIT)",
                        type: "Global Premier Universities",
                        tier: "Tier 1",
                        rating: 5.0,
                        nirf: 1,
                        established: 1861,
                        courses: ["B.S. CS & AI", "B.S. Robotics", "Ph.D. Quantum Physics", "M.S. Media Lab"],
                        specializations: ["Artificial Intelligence", "Robotics", "Aerospace", "Biomedical Engineering"],
                        fees: "$60,000/year",
                        placements: "Avg: $145,000/year (Big Tech & DeepTech Founders)",
                        contact: "+1-617-253-1000",
                        website: "www.mit.edu",
                        ownership: "Private"
                    },
                    {
                        id: 402,
                        name: "Stanford University",
                        type: "Global Premier Universities",
                        tier: "Tier 1",
                        rating: 5.0,
                        nirf: 2,
                        established: 1885,
                        courses: ["B.S. Computer Science", "MS Symbolic Systems", "MBA", "Ph.D."],
                        specializations: ["Silicon Valley VC & Startups", "AI Systems", "Biotech Leadership"],
                        fees: "$62,000/year",
                        placements: "Avg: $150,000/year",
                        contact: "+1-650-723-2300",
                        website: "www.stanford.edu",
                        ownership: "Private"
                    },
                    {
                        id: 403,
                        name: "University of Oxford",
                        type: "Global Premier Universities",
                        tier: "Tier 1",
                        rating: 5.0,
                        nirf: 1,
                        established: 1096,
                        courses: ["BA PPE (Philosophy, Politics & Economics)", "BM BCh Medicine", "M.Sc AI", "Ph.D."],
                        specializations: ["Clinical Medicine", "Public Policy", "Quantum Computing", "International Law"],
                        fees: "£38,000/year",
                        placements: "Avg: £85,000/year (Global Diplomatic & Clinical Practice)",
                        contact: "+44-1865-270000",
                        website: "www.ox.ac.uk",
                        ownership: "Government"
                    },
                    {
                        id: 404,
                        name: "ETH Zurich (Swiss Federal Institute of Technology)",
                        type: "Global Premier Universities",
                        tier: "Tier 1",
                        rating: 4.9,
                        nirf: 7,
                        established: 1855,
                        courses: ["B.Sc Computer Science", "M.Sc Robotics", "Ph.D. Physics"],
                        specializations: ["Autonomous Systems", "Machine Learning", "Micro-Nanotechnology"],
                        fees: "CHF 1,500/year (Highly Subsidized)",
                        placements: "Avg: CHF 110,000/year",
                        contact: "+41-44-632-1111",
                        website: "ethz.ch",
                        ownership: "Government"
                    }
                ]
            }
        }
    },
    tier_classification_extended: {
        name: "Tier 1 to 3 Multi-Domain National Network",
        cities: {
            pan_india_tier123: {
                name: "National & Regional Hubs",
                colleges: [
                    // --- Tier 2 & Tier 3 Engineering ---
                    {
                        id: 501,
                        name: "MS Ramaiah Institute of Technology (MSRIT Bengaluru)",
                        type: "Engineering",
                        tier: "Tier 2",
                        rating: 4.5,
                        nirf: 67,
                        established: 1962,
                        courses: ["B.E.", "M.Tech", "MCA", "Ph.D."],
                        specializations: ["Computer Science", "Artificial Intelligence & Data Science", "Information Science", "ECE"],
                        fees: "₹2.4L/year",
                        placements: "Avg: ₹7.8L, Highest: ₹50L",
                        contact: "+91-80-23600822",
                        website: "www.msrit.edu",
                        ownership: "Private"
                    },
                    {
                        id: 502,
                        name: "Sinhgad College of Engineering (SCOE Vadgaon Pune)",
                        type: "Engineering",
                        tier: "Tier 3",
                        rating: 4.0,
                        established: 1996,
                        courses: ["B.E.", "M.E.", "MBA"],
                        specializations: ["Computer Engineering", "IT", "Mechanical", "Civil"],
                        fees: "₹1.15L/year",
                        placements: "Avg: ₹4.5L, Highest: ₹18L",
                        contact: "+91-20-24354705",
                        website: "www.sinhgad.edu",
                        ownership: "Private"
                    },
                    {
                        id: 503,
                        name: "D.Y. Patil College of Engineering (Akurdi Pune)",
                        type: "Engineering",
                        tier: "Tier 3",
                        rating: 4.1,
                        established: 1984,
                        courses: ["B.E.", "M.E."],
                        specializations: ["Artificial Intelligence & Data Science", "Robotics & Automation", "Computer Engineering"],
                        fees: "₹1.28L/year",
                        placements: "Avg: ₹4.8L, Highest: ₹26L",
                        contact: "+91-20-27653058",
                        website: "www.dypcoeakurdi.ac.in",
                        ownership: "Private"
                    },

                    // --- Tier 2 & Tier 3 Medical ---
                    {
                        id: 510,
                        name: "Kasturba Medical College (KMC Mangalore / Manipal)",
                        type: "Medical",
                        tier: "Tier 2",
                        rating: 4.7,
                        nirf: 30,
                        established: 1953,
                        courses: ["MBBS", "MD", "MS", "M.Ch"],
                        specializations: ["Anesthesiology", "General Medicine", "Pediatrics", "Orthopedics"],
                        fees: "₹17.8L/year",
                        placements: "Avg: ₹12.5L (Clinical Residency & Fellowship)",
                        contact: "+91-824-2422271",
                        website: "manipal.edu/kmc-mangalore",
                        ownership: "Private"
                    },
                    {
                        id: 511,
                        name: "MGM Medical College & Hospital (Navi Mumbai)",
                        type: "Medical",
                        tier: "Tier 3",
                        rating: 4.2,
                        established: 1989,
                        courses: ["MBBS", "MD", "MS", "B.Sc Nursing"],
                        specializations: ["General Surgery", "Obstetrics & Gynecology", "Radiology", "Dermatology"],
                        fees: "₹20L/year",
                        placements: "Avg: ₹6.5L (Hospital Residency)",
                        contact: "+91-22-27437900",
                        website: "www.mgmmcnm.edu.in",
                        ownership: "Private"
                    },
                    {
                        id: 512,
                        name: "Vydehi Institute of Medical Sciences & Research (Bengaluru)",
                        type: "Medical",
                        tier: "Tier 3",
                        rating: 4.1,
                        established: 2000,
                        courses: ["MBBS", "MD", "MS", "B.Sc Allied Health"],
                        specializations: ["Cardiology", "Neurology", "Emergency Medicine"],
                        fees: "₹14L/year",
                        placements: "Avg: ₹5.8L (Clinical Practice)",
                        contact: "+91-80-49069000",
                        website: "www.vims.ac.in",
                        ownership: "Private"
                    },

                    // --- Tier 2 & Tier 3 Management ---
                    {
                        id: 520,
                        name: "T. A. Pai Management Institute (TAPMI Manipal)",
                        type: "Management",
                        tier: "Tier 2",
                        rating: 4.6,
                        nirf: 42,
                        established: 1980,
                        courses: ["MBA (Core)", "MBA Banking & Financial Services", "MBA Marketing", "MBA HR"],
                        specializations: ["Fintech", "BFSI", "Brand Management", "Analytics"],
                        fees: "₹16.5L (Total)",
                        placements: "Avg: ₹15.7L, Highest: ₹24.8L",
                        contact: "+91-820-2701000",
                        website: "www.tapmi.edu.in",
                        ownership: "Private"
                    },
                    {
                        id: 521,
                        name: "Welingkar Institute of Management (WeSchool Mumbai)",
                        type: "Management",
                        tier: "Tier 2",
                        rating: 4.4,
                        nirf: 73,
                        established: 1977,
                        courses: ["MMS", "PGDM", "PGDM E-Business", "PGDM Healthcare"],
                        specializations: ["Digital Media & E-Commerce", "Retail Management", "Operations"],
                        fees: "₹13L (Total)",
                        placements: "Avg: ₹12.5L, Highest: ₹25L",
                        contact: "+91-22-24198300",
                        website: "www.welingkar.org",
                        ownership: "Private"
                    },
                    {
                        id: 522,
                        name: "Pune Institute of Business Management (PIBM Pune)",
                        type: "Management",
                        tier: "Tier 3",
                        rating: 4.1,
                        established: 2007,
                        courses: ["PGDM", "MBA"],
                        specializations: ["Financial Analytics", "Digital Marketing", "Supply Chain"],
                        fees: "₹7.8L (Total)",
                        placements: "Avg: ₹7.1L, Highest: ₹17L",
                        contact: "+91-20-66032000",
                        website: "www.pibm.in",
                        ownership: "Private"
                    },

                    // --- Tier 2 & Tier 3 Law ---
                    {
                        id: 530,
                        name: "ILS Law College (Pune)",
                        type: "Law",
                        tier: "Tier 2",
                        rating: 4.6,
                        established: 1924,
                        courses: ["BA LL.B", "LL.B (3 Year)", "LLM", "Diploma in Cyber Law"],
                        specializations: ["Litigation & Advocacy", "Constitutional Law", "Corporate & IPR Law"],
                        fees: "₹42K/year",
                        placements: "Avg: ₹8.5L (Chambers of Senior Advocates & Law Firms)",
                        contact: "+91-20-25656775",
                        website: "ilslaw.edu",
                        ownership: "Private"
                    },
                    {
                        id: 531,
                        name: "Bharati Vidyapeeth New Law College (Pune)",
                        type: "Law",
                        tier: "Tier 3",
                        rating: 4.1,
                        nirf: 76,
                        established: 1978,
                        courses: ["BA LL.B (5 Year)", "BBA LL.B", "LL.B", "LLM"],
                        specializations: ["Criminal Law", "Labor Law", "Cyber Security & Law"],
                        fees: "₹85K/year",
                        placements: "Avg: ₹5.2L",
                        contact: "+91-20-25444616",
                        website: "nlc.bharatividyapeeth.edu",
                        ownership: "Private"
                    },

                    // --- Tier 2 & Tier 3 Design & Architecture ---
                    {
                        id: 540,
                        name: "MIT Institute of Design (MIT-ID Pune)",
                        type: "Design & Architecture",
                        tier: "Tier 2",
                        rating: 4.5,
                        established: 2006,
                        courses: ["B.Des", "M.Des"],
                        specializations: ["Product Design", "User Experience (UX/UI) Design", "Animation Film Design"],
                        fees: "₹3.8L/year",
                        placements: "Avg: ₹9.2L, Highest: ₹22L",
                        contact: "+91-20-30273400",
                        website: "www.mitid.edu.in",
                        ownership: "Private"
                    },
                    {
                        id: 541,
                        name: "World University of Design (WUD Sonipat / NCR)",
                        type: "Design & Architecture",
                        tier: "Tier 3",
                        rating: 4.1,
                        established: 2018,
                        courses: ["B.Des", "B.Arch", "M.Des"],
                        specializations: ["Fashion Art", "Interior Architecture", "Game Design"],
                        fees: "₹2.8L/year",
                        placements: "Avg: ₹5.5L",
                        contact: "+91-7056770060",
                        website: "worlduniversityofdesign.ac.in",
                        ownership: "Private"
                    },

                    // --- Tier 2 & Tier 3 Arts, Science & Commerce ---
                    {
                        id: 550,
                        name: "Fergusson College (Autonomous Pune)",
                        type: "Arts & Science",
                        tier: "Tier 2",
                        rating: 4.6,
                        nirf: 41,
                        established: 1885,
                        courses: ["B.Sc Computer Science", "B.Sc Animation", "B.A. Economics", "M.Sc Data Science"],
                        specializations: ["Biotechnology", "Microbiology", "Data Science", "Psychology"],
                        fees: "₹12K - ₹65K/year",
                        placements: "Avg: ₹5.8L, Highest: ₹14L",
                        contact: "+91-20-67656000",
                        website: "www.fergusson.edu",
                        ownership: "Private"
                    },
                    {
                        id: 551,
                        name: "Modern College of Arts, Science & Commerce (Ganeshkhind Pune)",
                        type: "Arts & Science",
                        tier: "Tier 3",
                        rating: 4.0,
                        established: 1992,
                        courses: ["B.Sc Computer Science", "B.Com", "B.A.", "M.Sc Computer Science"],
                        specializations: ["Information Technology", "Commerce & Banking", "Organic Chemistry"],
                        fees: "₹25K/year",
                        placements: "Avg: ₹3.8L",
                        contact: "+91-20-25634021",
                        website: "moderncollegegk.org",
                        ownership: "Private"
                    },
                    {
                        id: 552,
                        name: "Ness Wadia College of Commerce (Pune)",
                        type: "Arts & Science",
                        tier: "Tier 3",
                        rating: 4.1,
                        established: 1969,
                        courses: ["B.Com", "BBA", "BBA Computer Applications", "M.Com"],
                        specializations: ["Cost & Works Accounting", "Banking & Finance", "Business Analytics"],
                        fees: "₹35K/year",
                        placements: "Avg: ₹4.2L",
                        contact: "+91-20-26167024",
                        website: "nesswadiacollege.edu.in",
                        ownership: "Private"
                    },

                    // --- Tier 2 & Tier 3 Aviation & Marine ---
                    {
                        id: 560,
                        name: "AMET University (Academy of Maritime Education & Training Chennai)",
                        type: "Aviation & Marine",
                        tier: "Tier 2",
                        rating: 4.4,
                        established: 1993,
                        courses: ["B.E. Marine Engineering", "B.Sc Nautical Science", "MBA Shipping"],
                        specializations: ["Harbor Technology", "Naval Architecture", "Port Management"],
                        fees: "₹3.5L/year",
                        placements: "Avg: ₹10.2L (Mercantile Marine & Global Tankers)",
                        contact: "+91-44-27444625",
                        website: "www.ametuniv.ac.in",
                        ownership: "Private"
                    },
                    {
                        id: 561,
                        name: "Samundra Institute of Maritime Studies (Lonavala Pune)",
                        type: "Aviation & Marine",
                        tier: "Tier 3",
                        rating: 4.2,
                        established: 2005,
                        courses: ["B.Tech Marine Engineering", "Graduate Marine Engineering (GME)"],
                        specializations: ["Ship Engine Overhaul", "Automated Cargo Handling"],
                        fees: "₹4.0L/year",
                        placements: "Avg: ₹8.5L (Executive Ship Management)",
                        contact: "+91-2114-399500",
                        website: "www.samundra.com",
                        ownership: "Private"
                    },

                    // --- Tier 2 & Tier 3 Agriculture & Forestry ---
                    {
                        id: 570,
                        name: "University of Agricultural Sciences (UAS GKVK Bengaluru)",
                        type: "Agriculture & Forestry",
                        tier: "Tier 2",
                        rating: 4.5,
                        nirf: 9,
                        established: 1964,
                        courses: ["B.Sc (Hons) Agriculture", "B.Tech Agricultural Engineering", "M.Sc Agri"],
                        specializations: ["Precision Farming", "Agricultural Marketing", "Food Technology"],
                        fees: "₹48K/year",
                        placements: "Avg: ₹6.8L (Agri-Business & State Agri Officers)",
                        contact: "+91-80-23330153",
                        website: "uasbangalore.edu.in",
                        ownership: "Government"
                    },
                    {
                        id: 571,
                        name: "Mahatma Phule Krishi Vidyapeeth (MPKV Rahuri Ahmednagar)",
                        type: "Agriculture & Forestry",
                        tier: "Tier 3",
                        rating: 4.1,
                        established: 1968,
                        courses: ["B.Sc (Hons) Agriculture", "B.Tech Agri Engg", "M.Sc Agronomy"],
                        specializations: ["Horticulture", "Irrigation Drainage Engineering", "Soil Conservation"],
                        fees: "₹32K/year",
                        placements: "Avg: ₹4.2L",
                        contact: "+91-2426-243208",
                        website: "mpkv.ac.in",
                        ownership: "Government"
                    }
                ]
            }
        }
    }
};

export default EXTRA_COLLEGES;

