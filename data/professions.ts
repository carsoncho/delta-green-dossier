import { ProfessionBase } from "@/types/profession";

export const allProfessions: ProfessionBase[] = [
  {
    id: 1,
    name: "Anthropologist or Historian",
    description:
      "You study humanity. You’re concerned with the patterns that emerge over time, across land masses, cultures, and language groups. You might be a number-cruncher, a field worker trudging through the jungle, a consultant in a war zone, or a think-tank analyst sifting myth from history in studies of the Tcho-Tcho peoples.",
    additionalSkills: [
      {
        id: 1,
        name: "Anthropology",
        value: 40,
      },
      {
        id: 2,
        name: "Archeology",
        value: 40,
      },
      {
        id: 3,
        name: "HUMINT",
        value: 50,
      },
      {
        id: 4,
        name: "Navigate",
        value: 50,
      },
      {
        id: 5,
        name: "Ride",
        value: 50,
      },
      {
        id: 6,
        name: "Search",
        value: 60,
      },
      {
        id: 7,
        name: "Survival",
        value: 50,
      },
    ],
    bonds: 4,
    professionalSkills: [
      {
        id: 8,
        name: "Anthropology",
        value: 50,
      },
      {
        id: 9,
        name: "Archeology",
        value: 50,
      },
      {
        id: 10,
        name: "Bureaucracy",
        value: 40,
      },
      {
        id: 11,
        name: "Foreign Language",
        value: 50,
        inputLabel: "choose one",
      },
      {
        id: 12,
        name: "Foreign Language",
        value: 40,
        inputLabel: "choose another",
      },
      {
        id: 13,
        name: "History",
        value: 60,
      },
      {
        id: 14,
        name: "Occult",
        value: 40,
      },
      {
        id: 15,
        name: "Persuade",
        value: 40,
      },
    ],
    recommendedStats: "INT",
    rule: {
      type: "chooseIfNotOwned",
      count: 2,
      text: "Choose any two of these that you don’t already have",
    },
  },
  {
    id: 2,
    name: "Computer Scientist or Engineer",
    description:
      "Computers and machinery are the backbone of modern industry. You are a craftsman with data or machinery, possibly for the government and most definitely for profit. However you use your skills, the overlap between information technology and awareness of the unnatural could make this the most dangerous job on the planet.",
    additionalSkills: [
      {
        id: 1,
        name: "Accounting",
        value: 50,
      },
      {
        id: 2,
        name: "Bureaucracy",
        value: 50,
      },
      {
        id: 3,
        name: "Craft",
        value: 40,
        inputLabel: "choose one",
      },
      {
        id: 4,
        name: "Foreign Language",
        value: 40,
        inputLabel: "choose one",
      },
      {
        id: 5,
        name: "Heavy Machinery",
        value: 50,
      },
      {
        id: 6,
        name: "Law",
        value: 40,
      },
      {
        id: 7,
        name: "Science",
        value: 40,
        inputLabel: "choose one",
      },
    ],
    bonds: 3,
    professionalSkills: [
      {
        id: 8,
        name: "Computer Science",
        value: 60,
      },
      {
        id: 9,
        name: "Electrician",
        value: 30,
        baseSkill: "Craft",
      },
      {
        id: 10,
        name: "Mechanic",
        value: 30,
        baseSkill: "Craft",
      },
      {
        id: 11,
        name: "Microelectronics",
        value: 40,
        baseSkill: "Craft",
      },
      {
        id: 12,
        name: "Mathematics",
        value: 40,
        baseSkill: "Science",
      },
      {
        id: 13,
        name: "SIGINT",
        value: 40,
      },
    ],
    recommendedStats: "INT",
    rule: {
      type: "chooseIfNotOwned",
      count: 4,
      text: "Choose any four of these that you don’t already have",
    },
  },
  {
    id: 3,
    name: "Federal Agent",
    description:
      "Many Delta Green Agents are federal law enforcement officers, mostly from the FBI. Delta Green decided long ago that federal agents have the optimum balance of skills and mental stability needed to confront the unnatural. For other versions of this profession see FEDERAL AGENCIES",
    additionalSkills: [
      {
        id: 1,
        name: "Accounting",
        value: 60,
      },
      {
        id: 2,
        name: "Computer Science",
        value: 50,
      },
      {
        id: 3,
        name: "Foreign Language",
        value: 50,
        inputLabel: "choose one",
      },
      {
        id: 4,
        name: "Heavy Weapons",
        value: 50,
      },
      {
        id: 5,
        name: "Pharmacy",
        value: 50,
      },
    ],
    bonds: 3,
    professionalSkills: [
      {
        id: 6,
        name: "Alertness",
        value: 50,
      },
      {
        id: 7,
        name: "Bureaucracy",
        value: 40,
      },
      {
        id: 8,
        name: "Criminology",
        value: 50,
      },
      {
        id: 9,
        name: "Drive",
        value: 50,
      },
      {
        id: 10,
        name: "Firearms",
        value: 50,
      },
      {
        id: 11,
        name: "Forensics",
        value: 30,
      },
      {
        id: 12,
        name: "HUMINT",
        value: 60,
      },
      {
        id: 13,
        name: "Law",
        value: 30,
      },
      {
        id: 14,
        name: "Persuade",
        value: 50,
      },
      {
        id: 15,
        name: "Search",
        value: 50,
      },
      {
        id: 16,
        name: "Unarmed Combat",
        value: 60,
      },
    ],
    recommendedStats: "CON, POW, CHA",
    rule: {
      type: "choose",
      count: 1,
      text: "Choose one of these",
    },
  },
  {
    id: 4,
    name: "Physician",
    description:
      "Doctors are often the first to uncover signs of an unnatural incursion, and the most valuable investigators of its disastrous effects on humanity.",
    additionalSkills: [
      {
        id: 1,
        name: "Forensics",
        value: 50,
      },
      {
        id: 2,
        name: "Psychotherapy",
        value: 60,
      },
      {
        id: 3,
        name: "Science",
        value: 50,
        inputLabel: "choose one",
      },
      {
        id: 4,
        name: "Surgery",
        value: 50,
      },
    ],
    bonds: 3,
    professionalSkills: [
      {
        id: 5,
        name: "Bureaucracy",
        value: 50,
      },
      {
        id: 6,
        name: "First Aid",
        value: 60,
      },
      {
        id: 7,
        name: "Medicine",
        value: 60,
      },
      {
        id: 8,
        name: "Persuade",
        value: 40,
      },
      {
        id: 9,
        name: "Pharmacy",
        value: 50,
      },
      {
        id: 10,
        name: "Biology",
        value: 60,
        baseSkill: "Science",
      },
      {
        id: 11,
        name: "Search",
        value: 40,
      },
    ],
    recommendedStats: "INT, POW, DEX",
    rule: {
      type: "chooseIfNotOwned",
      count: 2,
      text: "Choose any two of these that you don’t already have",
    },
  },
  {
    id: 5,
    name: "Special Operator",
    description:
      "As part of a force like the U.S. Army Rangers, you volunteered for a more difficult path than other soldiers. You’ve spent years in the most grueling training on the planet, and now serve on the most dangerous missions around. For other versions of this profession (U.S. Army Special Forces, SEALs, USMC Raiders, FBI Hostage Rescue Team, CIA Special Operations Group, and so on), see FEDERAL AGENCIES",
    bonds: 2,
    professionalSkills: [
      {
        id: 1,
        name: "Alertness",
        value: 60,
      },
      {
        id: 2,
        name: "Athletics",
        value: 60,
      },
      {
        id: 3,
        name: "Demolitions",
        value: 40,
      },
      {
        id: 4,
        name: "Firearms",
        value: 60,
      },
      {
        id: 5,
        name: "Heavy Weapons",
        value: 50,
      },
      {
        id: 6,
        name: "Melee Weapons",
        value: 50,
      },
      {
        id: 7,
        name: "Land",
        value: 60,
        baseSkill: "Military Science",
      },
      {
        id: 8,
        name: "Navigate",
        value: 50,
      },
      {
        id: 9,
        name: "Stealth",
        value: 50,
      },
      {
        id: 10,
        name: "Survival",
        value: 50,
      },
      {
        id: 11,
        name: "Swim",
        value: 50,
      },
      {
        id: 12,
        name: "Unarmed Combat",
        value: 60,
      },
    ],
    recommendedStats: "STR, CON, POW",
  },
  {
    id: 6,
    name: "Scientist",
    description:
      "You expand human knowledge in a field such as biology, physics, or chemistry. When certain forms of knowledge cause insanity and death, it’s easy to conclude that some hypotheses should not be tested.",
    additionalSkills: [
      {
        id: 1,
        name: "Accounting",
        value: 50,
      },
      {
        id: 2,
        name: "Craft",
        value: 40,
        inputLabel: "choose one",
      },
      {
        id: 3,
        name: "Foreign Language",
        value: 40,
        inputLabel: "choose one",
      },
      {
        id: 4,
        name: "Forensics",
        value: 40,
      },
      {
        id: 5,
        name: "Law",
        value: 40,
      },
      {
        id: 6,
        name: "Pharmacy",
        value: 40,
      },
    ],
    bonds: 2,
    professionalSkills: [
      {
        id: 7,
        name: "Bureaucracy",
        value: 40,
      },
      {
        id: 8,
        name: "Computer Science",
        value: 40,
      },
      {
        id: 9,
        name: "Science",
        value: 60,
        inputLabel: "choose one",
      },
      {
        id: 10,
        name: "Science",
        value: 50,
        inputLabel: "choose another",
      },
      {
        id: 11,
        name: "Science",
        value: 50,
        inputLabel: "choose another",
      },
    ],
    recommendedStats: "INT",
    rule: {
      type: "choose",
      count: 3,
      text: "Choose any three of these",
    },
  },
  {
    id: 7,
    name: "Firefighter",
    description:
      "Your job oscillates between the tedium of maintaining your gear, exhilaration when the alarm finally comes, and the work of investigating a scene after the smoke has cleared.  If you’re involved with Delta Green, you clearly stumbled into something worse than a house fire.",
    bonds: 3,
    professionalSkills: [
      {
        name: "Alertness",
        value: 50,
      },
      {
        name: "Athletics",
        value: 60,
      },
      {
        name: "Electrician",
        value: 40,
        baseSkill: "Craft",
      },
      {
        name: "Mechanic",
        value: 40,
        baseSkill: "Craft",
      },
      {
        name: "Demolitions",
        value: 50,
      },
      {
        name: "Drive",
        value: 50,
      },
      {
        name: "First Aid",
        value: 50,
      },
      {
        name: "Forensics",
        value: 40,
      },
      {
        name: "Heavy Machinery",
        value: 50,
      },
      {
        name: "Navigate",
        value: 50,
      },
      {
        name: "Search",
        value: 40,
      },
    ],
    recommendedStats: "STR, DEX, CON",
  },
  {
    id: 8,
    name: "Criminal",
    description:
      "So much is illegal that there are broad economies of crime. This profile fits a hardened militant or a traditional “black collar” criminal: pimp, burglar, extortionist, or thug. If you want a white-collar criminal, choose Computer Scientist or Business Executive and make very risky decisions.",
    additionalSkills: [
      {
        id: 1,
        name: "Locksmithing",
        value: 40,
        baseSkill: "Craft",
      },
      {
        id: 2,
        name: "Demolitions",
        value: 40,
      },
      {
        id: 3,
        name: "Disguise",
        value: 50,
      },
      {
        id: 4,
        name: "Foreign Language",
        value: 40,
        inputLabel: "choose one",
      },
      {
        id: 5,
        name: "Forensics",
        value: 40,
      },
      {
        id: 6,
        name: "HUMINT",
        value: 50,
      },
      {
        id: 7,
        name: "Navigate",
        value: 50,
      },
      {
        id: 8,
        name: "Occult",
        value: 50,
      },
      {
        id: 9,
        name: "Pharmacy",
        value: 40,
      },
    ],
    bonds: 4,
    professionalSkills: [
      {
        id: 10,
        name: "Alertness",
        value: 50,
      },
      {
        id: 11,
        name: "Athletics",
        value: 50,
      },
      {
        id: 12,
        name: "Criminology",
        value: 60,
      },
      {
        id: 13,
        name: "Dodge",
        value: 40,
      },
      {
        id: 14,
        name: "Drive",
        value: 50,
      },
      {
        id: 15,
        name: "Firearms",
        value: 40,
      },
      {
        id: 16,
        name: "Law",
        value: 20,
      },
      {
        id: 17,
        name: "Melee Weapons",
        value: 40,
      },
      {
        id: 18,
        name: "Persuade",
        value: 50,
      },
      {
        id: 19,
        name: "Stealth",
        value: 50,
      },
      {
        id: 20,
        name: "Unarmed Combat",
        value: 50,
      },
    ],
    recommendedStats: "STR, DEX",
    rule: {
      type: "choose",
      count: 2,
      text: "Choose two from",
    },
  },
  {
    id: 9,
    name: "Foreign Service Officer",
    description:
      "You travel to strange lands, meet interesting people, and try to get along with them. Odds are you work for the State Department, though USAID, the Commercial Service and the Foreign Agriculture Service also have FSOs. Either way, you’ve had every opportunity to learn exotic and deadly things; the kinds of things that qualify you for Delta Green clearance.",
    bonds: 3,
    professionalSkills: [
      {
        id: 1,
        name: "Accounting",
        value: 40,
      },
      {
        id: 2,
        name: "Anthropology",
        value: 40,
      },
      {
        id: 3,
        name: "Bureaucracy",
        value: 60,
      },
      {
        id: 4,
        name: "Foreign Language",
        value: 50,
        inputLabel: "choose one",
      },
      {
        id: 5,
        name: "Foreign Language",
        value: 50,
        inputLabel: "choose another",
      },
      {
        id: 6,
        name: "Foreign Language",
        value: 40,
        inputLabel: "choose another",
      },
      {
        id: 7,
        name: "History",
        value: 40,
      },
      {
        id: 8,
        name: "HUMINT",
        value: 50,
      },
      {
        id: 9,
        name: "Law",
        value: 40,
      },
      {
        id: 10,
        name: "Persuade",
        value: 50,
      },
    ],
    recommendedStats: "INT, CHA",
  },
  {
    id: 10,
    name: "Intelligence Analyst",
    description:
      "In the FBI, NSA and CIA, there are those who gather information and those who decide what it means. You take information from disparate sources—newspapers, websites, informants, ELINT, and the assets developed by Case Officers — and figure out what it means. In short, your job is the piecing together of unrelated knowledge, a dangerous endeavor in the world of Delta Green.",
    bonds: 3,
    professionalSkills: [
      {
        id: 1,
        name: "Anthropology",
        value: 40,
      },
      {
        id: 2,
        name: "Bureaucracy",
        value: 50,
      },
      {
        id: 3,
        name: "Computer Science",
        value: 40,
      },
      {
        id: 4,
        name: "Criminology",
        value: 40,
      },
      {
        id: 5,
        name: "Foreign Language",
        value: 50,
        inputLabel: "choose one",
      },
      {
        id: 6,
        name: "Foreign Language",
        value: 50,
        inputLabel: "choose another",
      },
      {
        id: 7,
        name: "Foreign Language",
        value: 40,
        inputLabel: "choose another",
      },
      {
        id: 8,
        name: "History",
        value: 40,
      },
      {
        id: 9,
        name: "HUMINT",
        value: 50,
      },
      {
        id: 10,
        name: "SIGINT",
        value: 40,
      },
    ],
    recommendedStats: "INT",
  },
  {
    id: 11,
    name: "Intelligence Case Officer",
    description:
      "You recruit people to spy on their own countries for your agency, probably the CIA. Your job is to develop foreign intelligence sources (“assets”), communicate with them, and keep them under control, productive, and alive. It’s a hard business because you must view everyone as a potential threat, liar, or tool to further your agenda. If your name came to the attention of Delta Green, congratulations; you are now someone else’s asset.",
    bonds: 2,
    professionalSkills: [
      {
        id: 1,
        name: "Alertness",
        value: 50,
      },
      {
        id: 2,
        name: "Bureaucracy",
        value: 40,
      },
      {
        id: 3,
        name: "Criminology",
        value: 50,
      },
      {
        id: 4,
        name: "Disguise",
        value: 50,
      },
      {
        id: 5,
        name: "Drive",
        value: 40,
      },
      {
        id: 6,
        name: "Firearms",
        value: 40,
      },
      {
        id: 7,
        name: "Foreign Language",
        value: 50,
        inputLabel: "choose one",
      },
      {
        id: 8,
        name: "Foreign Language",
        value: 40,
        inputLabel: "choose another",
      },
      {
        id: 9,
        name: "HUMINT",
        value: 60,
      },
      {
        id: 10,
        name: "Persuade",
        value: 60,
      },
      {
        id: 11,
        name: "SIGINT",
        value: 40,
      },
      {
        id: 12,
        name: "Stealth",
        value: 50,
      },
      {
        id: 13,
        name: "Unarmed Combat",
        value: 50,
      },
    ],
    recommendedStats: "INT, POW, CHA",
  },
  {
    id: 12,
    name: "Lawyer or Business Executive",
    description:
      "You might be an author, an editor, a researcher for a company or any branch of the government, a blogger, a TV reporter, or a scholar of rare texts. With the unnatural, you’ve uncovered the story of a lifetime.",
    additionalSkills: [
      {
        id: 1,
        name: "Computer Science",
        value: 50,
      },
      {
        id: 2,
        name: "Criminology",
        value: 60,
      },
      {
        id: 3,
        name: "Foreign Language",
        value: 50,
        inputLabel: "choose one",
      },
      {
        id: 4,
        name: "Law",
        value: 50,
      },
      {
        id: 5,
        name: "Pharmacy",
        value: 50,
      },
    ],
    bonds: 4,
    professionalSkills: [
      {
        id: 6,
        name: "Accounting",
        value: 50,
      },
      {
        id: 7,
        name: "Bureaucracy",
        value: 50,
      },
      {
        id: 8,
        name: "HUMINT",
        value: 40,
      },
      {
        id: 9,
        name: "Persuade",
        value: 60,
      },
    ],
    recommendedStats: "INT, CHA",
    rule: {
      type: "choose",
      count: 4,
      text: "Choose four from",
    },
  },
  {
    id: 13,
    name: "Nurse or Paramedic",
    description:
      "Medical professionals are on the front line when awful things happen. Is that what brought you to the group’s attention?",
    additionalSkills: [
      {
        id: 1,
        name: "Drive",
        value: 60,
      },
      {
        id: 2,
        name: "Forensics",
        value: 40,
      },
      {
        id: 3,
        name: "Navigate",
        value: 50,
      },
      {
        id: 4,
        name: "Psychotherapy",
        value: 50,
      },
      {
        id: 5,
        name: "Search",
        value: 60,
      },
    ],
    bonds: 4,
    professionalSkills: [
      {
        id: 6,
        name: "Alertness",
        value: 40,
      },
      {
        id: 7,
        name: "Bureaucracy",
        value: 40,
      },
      {
        id: 8,
        name: "First Aid",
        value: 60,
      },
      {
        id: 9,
        name: "HUMINT",
        value: 40,
      },
      {
        id: 10,
        name: "Medicine",
        value: 40,
      },
      {
        id: 11,
        name: "Persuade",
        value: 40,
      },
      {
        id: 12,
        name: "Pharmacy",
        value: 40,
      },
      {
        id: 13,
        name: "Biology",
        value: 40,
        baseSkill: "Science",
      },
    ],
    recommendedStats: "INT, POW, CHA",
    rule: {
      type: "choose",
      count: 2,
      text: "Choose two from",
    },
  },
  {
    id: 14,
    name: "Police Officer",
    description:
      "You serve and protect. Police officers walk the beat in uniform. Deputy sheriffs answer to an elected law enforcer and have jurisdiction over an entire county. Detectives come in after the fact and put the pieces together.",
    additionalSkills: [
      {
        id: 1,
        name: "Forensics",
        value: 50,
      },
      {
        id: 2,
        name: "Heavy Machinery",
        value: 60,
      },
      {
        id: 3,
        name: "Heavy Weapons",
        value: 50,
      },
      {
        id: 4,
        name: "Ride",
        value: 60,
      },
    ],
    bonds: 3,
    professionalSkills: [
      {
        id: 5,
        name: "Alertness",
        value: 60,
      },
      {
        id: 6,
        name: "Bureaucracy",
        value: 40,
      },
      {
        id: 7,
        name: "Criminology",
        value: 40,
      },
      {
        id: 8,
        name: "Drive",
        value: 50,
      },
      {
        id: 9,
        name: "Firearms",
        value: 40,
      },
      {
        id: 10,
        name: "First Aid",
        value: 30,
      },
      {
        id: 11,
        name: "HUMINT",
        value: 50,
      },
      {
        id: 12,
        name: "Law",
        value: 30,
      },
      {
        id: 13,
        name: "Melee Weapons",
        value: 50,
      },
      {
        id: 14,
        name: "Navigate",
        value: 40,
      },
      {
        id: 15,
        name: "Persuade",
        value: 40,
      },
      {
        id: 16,
        name: "Search",
        value: 40,
      },
      {
        id: 17,
        name: "Unarmed Combat",
        value: 60,
      },
    ],
    recommendedStats: "STR, CON, POW",
    rule: {
      type: "choose",
      count: 1,
      text: "Choose one from",
    },
  },
  {
    id: 15,
    name: "Pilot or Sailor",
    description:
      "Air or sea, commercial or military, your duty is to keep your passengers alive and craft intact. This can lead to hard choices when your passengers put the vehicle in danger. Or are you a drone operator, flying a Predator from a thousand miles away? Either way, what op brought you to the attention of Delta Green?",
    additionalSkills: [
      {
        id: 1,
        name: "Foreign Language",
        value: 50,
        inputLabel: "choose one",
      },
      {
        id: 2,
        name: "Pilot",
        value: 50,
        inputLabel: "choose one",
      },
      {
        id: 3,
        name: "Heavy Weapons",
        value: 50,
      },
      {
        id: 4,
        name: "Military Science",
        value: 50,
        inputLabel: "choose one",
      },
    ],
    bonds: 3,
    professionalSkills: [
      {
        id: 5,
        name: "Alertness",
        value: 60,
      },
      {
        id: 6,
        name: "Bureaucracy",
        value: 30,
      },
      {
        id: 7,
        name: "Electrician",
        value: 40,
        baseSkill: "Craft",
      },
      {
        id: 8,
        name: "Mechanic",
        value: 40,
        baseSkill: "Craft",
      },
      {
        id: 9,
        name: "Navigate",
        value: 50,
      },
      {
        id: 10,
        name: "Pilot",
        value: 60,
        inputLabel: "choose one",
      },
      {
        id: 11,
        name: "Meteorology",
        value: 40,
        baseSkill: "Science",
      },
      {
        id: 12,
        name: "Swim",
        value: 40,
      },
    ],
    recommendedStats: "DEX, INT",
    rule: {
      type: "choose",
      count: 2,
      text: "Choose two from",
    },
  },
  {
    id: 16,
    name: "Program Manager",
    description:
      "You run an organization. Someone has to secure funding, move resources, and make connections, and that’s you.",
    additionalSkills: [
      {
        id: 1,
        name: "Anthropology",
        value: 30,
      },
      {
        id: 2,
        name: "Art",
        value: 30,
        inputLabel: "choose one",
      },
      {
        id: 3,
        name: "Craft",
        value: 30,
        inputLabel: "choose one",
      },
      {
        id: 4,
        name: "Science",
        value: 30,
        inputLabel: "choose one",
      },
    ],
    bonds: 4,
    professionalSkills: [
      {
        id: 5,
        name: "Accounting",
        value: 60,
      },
      {
        id: 6,
        name: "Bureaucracy",
        value: 60,
      },
      {
        id: 7,
        name: "Computer Science",
        value: 50,
      },
      {
        id: 8,
        name: "Criminology",
        value: 30,
      },
      {
        id: 9,
        name: "Foreign Language",
        value: 50,
        inputLabel: "choose one",
      },
      {
        id: 10,
        name: "History",
        value: 40,
      },
      {
        id: 11,
        name: "Law",
        value: 40,
      },
      {
        id: 12,
        name: "Persuade",
        value: 50,
      },
    ],
    recommendedStats: "INT, CHA",
    rule: {
      type: "choose",
      count: 1,
      text: "Choose one from",
    },
  },
  {
    id: 17,
    name: "Soldier or Marine",
    description:
      "Governments will always need boots on the ground and steady hands holding rifles. When war begins, civilization gets out of the way.",
    additionalSkills: [
      {
        id: 1,
        name: "Artillery",
        value: 40,
      },
      {
        id: 2,
        name: "Computer Science",
        value: 40,
      },
      {
        id: 3,
        name: "Craft",
        value: 40,
        inputLabel: "choose one",
      },
      {
        id: 4,
        name: "Demolitions",
        value: 40,
      },
      {
        id: 5,
        name: "Foreign Language",
        value: 40,
        inputLabel: "choose one",
      },
      {
        id: 6,
        name: "Heavy Machinery",
        value: 50,
      },
      {
        id: 7,
        name: "Heavy Weapons",
        value: 40,
      },
      {
        id: 8,
        name: "Search",
        value: 60,
      },
      {
        id: 9,
        name: "SIGINT",
        value: 40,
      },
      {
        id: 10,
        name: "Swim",
        value: 60,
      },
    ],
    bonds: 4,
    professionalSkills: [
      {
        id: 11,
        name: "Alertness",
        value: 50,
      },
      {
        id: 12,
        name: "Athletics",
        value: 50,
      },
      {
        id: 13,
        name: "Bureaucracy",
        value: 30,
      },
      {
        id: 14,
        name: "Drive",
        value: 40,
      },
      {
        id: 15,
        name: "Firearms",
        value: 40,
      },
      {
        id: 16,
        name: "First Aid",
        value: 40,
      },
      {
        id: 17,
        name: "Land",
        value: 40,
        baseSkill: "Military Science",
      },
      {
        id: 18,
        name: "Navigate",
        value: 40,
      },
      {
        id: 19,
        name: "Persuade",
        value: 30,
      },
      {
        id: 20,
        name: "Unarmed Combat",
        value: 50,
      },
    ],
    recommendedStats: "STR, CON",
    rule: {
      type: "choose",
      count: 3,
      text: "Choose three from",
    },
  },
];
