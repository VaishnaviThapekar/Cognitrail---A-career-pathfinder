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
                        ownership: "Government"
                    }
                ]
            }
        }
    }
};

export default EXTRA_COLLEGES;
