import { SkillBase } from "@/types/skills";

export const baseSkills: SkillBase[] = [
  {
    name: "Accounting",
    description:
      "The study of finance and business. Use it to sift through financial records for anomalies, such as a hidden bank account or money laundering.",
    baseValue: 10,
    requiresInput: false,
  },
  {
    name: "Alertness",
    description:
      "Alertness detects danger. Use it to hear a safety being switched off, to understand the mumbling on the other side of a wall, to spot the bulge of a pistol hidden under a jacket, or to catch someone who is trying to escape notice using Stealth.",
    baseValue: 20,
    requiresInput: false,
  },
  {
    name: "Anthropology",
    description:
      "The study of living human cultures. Use it to understand morals, religious beliefs, customs, and mores, and to identify (but not translate) obscure languages.",
    baseValue: 0,
    requiresInput: false,
  },
  {
    name: "Archeology",
    description:
      "The study of ancient and historic human material remains and environmental data.",
    baseValue: 0,
    requiresInput: false,
  },
  {
    name: "Art",
    description:
      "Making and repairing sophisticated tools and structures. Each Craft type is a separate skill: Architect, Carpenter, Electrician, Gunsmith, Locksmith, Mechanic, Microelectronics, Plumber, etc.",
    baseValue: 0,
    requiresInput: true,
  },
  {
    name: "Artillery",
    description:
      "Safe and accurate use of mortars, missiles, howitzers, tank cannons, and other heavy gunnery.",
    baseValue: 0,
    requiresInput: false,
  },
  {
    name: "Athletics",
    description:
      "Your Agent trains to get the most out of his or her strength and agility. Use Athletics to outrun someone, jump an intimidating gap, climb in a crisis, land safely in a fall of up to three meters, hit a target with a thrown knife or put a grenade exactly on target, or catch something without warning.",
    baseValue: 30,
    requiresInput: false,
  },
  {
    name: "Bureaucracy",
    description:
      "Manipulating the rules and personalities that govern an organization. Use it to locate and borrow supplies, convince an official to provide information or resources, gain credentials for access to a restricted area, or create a false online history.",
    baseValue: 10,
    requiresInput: false,
  },
  {
    name: "Computer Science",
    description:
      "The study of computers and computational systems. Use it to develop software, break encryption, hack systems, or protect against intrusions.",
    baseValue: 0,
    requiresInput: false,
  },
  {
    name: "Craft",
    description:
      "Making and repairing sophisticated tools and structures. Each Craft type is a separate skill: Architect, Carpenter, Electrician, Gunsmith, Locksmith, Mechanic, Microelectronics, Plumber, etc.",
    baseValue: 0,
    requiresInput: true,
  },
  {
    name: "Criminology",
    description:
      "Knowledge of criminal and conspiratorial behavior. Use it to identify and predict criminal behavior, deduce relationships between members of a conspiracy, analyze criminal activity, examine witness statements, or know whom to talk to in the criminal underground.",
    baseValue: 10,
    requiresInput: false,
  },
  {
    name: "Demolitions",
    description:
      "The study of explosives and their use. Use it to create, detect, and disarm bombs, or to demolish structures safely.",
    baseValue: 10,
    requiresInput: false,
  },
  {
    name: "Disguise",
    description:
      "Alter your Agent’s appearance, voice, posture, body language, and mannerisms to avoid recognition without drawing attention.",
    baseValue: 10,
    requiresInput: false,
  },
  {
    name: "Dodge",
    description:
      "Evading danger and attacks through instinct and reflexes. Against firearms and explosives, Dodge can get an Agent to cover before bullets and shrapnel fly.",
    baseValue: 30,
    requiresInput: false,
  },
  {
    name: "Drive",
    description:
      "Handling an automobile or a motorcycle safely in a crisis. Use this skill to keep a vehicle safe in a high-speed pursuit or on dangerous terrain.",
    baseValue: 20,
    requiresInput: false,
  },
  {
    name: "Firearms",
    description:
      "Safe and accurate shooting with small arms in combat. Use it to hit a target despite the adrenaline, panic, and shock of violence interfering with hand-eye coordination.",
    baseValue: 20,
    requiresInput: false,
  },
  {
    name: "First Aid",
    description:
      "Basic medical treatment. Use it to stabilize a patient, treat minor injuries, or provide initial care before professional medical help arrives.",
    baseValue: 10,
    requiresInput: false,
  },
  {
    name: "Foreign Language",
    description:
      "The ability to speak, read, and write in a language other than your Agent’s native language.",
    baseValue: 0,
    requiresInput: true,
  },
  {
    name: "Forensics",
    description:
      "Gathering detailed information and evidence using forensic equipment. Use it to record biometric data, determine details about a weapon used or the accelerant that started a fire, discern crucial clues that an ordinary searcher wouldn’t recognize, clean a scene of incriminating evidence, or collect, analyze, and compare fingerprints and DNA samples.",
    baseValue: 0,
    requiresInput: false,
  },
  {
    name: "Heavy Machinery",
    description:
      "Safe operation of a tractor, crane, bulldozer, tank, heavy truck, or other big machine in a crisis.",
    baseValue: 10,
    requiresInput: false,
  },
  {
    name: "Heavy Weapons",
    description:
      "The use of large, crew-served weapons such as machine guns, rocket launchers, and anti-tank weapons.",
    baseValue: 0,
    requiresInput: false,
  },
  {
    name: "History",
    description:
      "The study of past events, particularly in human affairs. Use it to understand historical contexts, recognize historical artifacts, and deduce historical facts.",
    baseValue: 10,
    requiresInput: false,
  },
  {
    name: "HUMINT",
    description:
      "The skill of gathering information from a subject—especially information the subject would rather conceal—through observation, conversation, or examining patterns of behavior and relationships. Use HUMINT to recognize signs of dishonesty from verbal cues and body language, gauge attitude and intentions, cultivate sources of information about a subject, determine what it would take to get a subject to cooperate, or recognize clues of what a subject wants to conceal. HUMINT can notice signs of mental illness, but Psychotherapy would be needed to diagnose and treat a specific malady. If your Agent also has Criminology, HUMINT can be used to compile a psychological profile to help find a subject. A subject who deliberately tries to deceive your Agent can attempt a Persuade test to oppose your Agent’s HUMINT.",
    baseValue: 10,
    requiresInput: false,
  },
  {
    name: "Law",
    description:
      "Using laws and courts to your Agent’s advantage. Use it to get your Agent’s way in court, to determine the correct procedures for handling evidence in a prosecution or a civil case (and how to undermine them), to bullshit your Agent’s way out of legal trouble, or to minimize legal risks. The Law skill applies to your Agent’s native country; using it with another country’s laws requires special training.",
    baseValue: 0,
    requiresInput: false,
  },
  {
    name: "Medicine",
    description:
      "The science and practice of diagnosing, treating, and preventing disease. Use it to provide medical care, diagnose illnesses, and perform surgeries.",
    baseValue: 0,
    requiresInput: false,
  },
  {
    name: "Melee Weapons",
    description:
      "Combat with hand-to-hand weapons. Use it to fight with knives, clubs, and other melee weapons.",
    baseValue: 30,
    requiresInput: false,
  },
  {
    name: "Military Science",
    description:
      "Knowledge of military culture, techniques, and regulations. Use it to identify threats in a battlefield, find accurate ranges, recognize weaknesses in a fortification, deduce the training level of a soldier or unit, reconstruct the events of a battle, or deploy forces advantageously in combat. Each type of Military Science is its own skill. The usual types are Land, Air, and Sea.",
    baseValue: 0,
    requiresInput: true,
  },
  {
    name: "Navigate",
    description:
      "Finding your way quickly with maps, charts and tables, orienteering, instruments, or dead reckoning.",
    baseValue: 10,
    requiresInput: false,
  },
  {
    name: "Occult",
    description:
      "Knowledge of the supernatural, mystical, and magical traditions. Use it to understand occult symbols, rituals, and artifacts.",
    baseValue: 10,
    requiresInput: false,
  },
  {
    name: "Persuade",
    description:
      "The ability to convince others to believe or do something. Use it to negotiate, influence, or manipulate others.",
    baseValue: 20,
    requiresInput: false,
  },
  {
    name: "Pharmacy",
    description:
      "The science of preparing and dispensing drugs. Use it to identify medications, understand their effects, and prepare pharmaceutical compounds.",
    baseValue: 0,
    requiresInput: false,
  },
  {
    name: "Pilot",
    description:
      "Piloting, navigating, and captaining waterborne, airborne, or aerospace vehicles. Use it to keep a vessel safe in a crisis, such as through a storm or in a dangerous pursuit. Each vessel type is a separate skill: Airplane, Drone, Helicopter, Small Boat, Ship, Space Shuttle, etc. At the Handler’s discretion, skill with one craft may allow piloting a related kind of craft.",
    baseValue: 0,
    requiresInput: true,
  },
  {
    name: "Psychotherapy",
    description:
      "The treatment of mental disorder by psychological rather than medical means. Use it to diagnose and treat psychological conditions.",
    baseValue: 10,
    requiresInput: false,
  },
  {
    name: "Ride",
    description:
      "The ability to ride animals, such as horses. Use it to control and care for the animal during travel or in dangerous situations.",
    baseValue: 0,
    requiresInput: false,
  },
  {
    name: "Science",
    description:
      "The study of the natural world through observation and experiment. Each type of Science is its own skill: Biology, Chemistry, Physics, etc.",
    baseValue: 0,
    requiresInput: true,
  },
  {
    name: "Search",
    description:
      "The skill of finding hidden things. Use it to locate evidence, search a room, or find a hidden object or person.",
    baseValue: 20,
    requiresInput: false,
  },
  {
    name: "SIGINT",
    description:
      "Signals intelligence. It encompasses encryption, communications intelligence, electronic intelligence, electronic security systems, surveillance of radio and digital communications, and the making and breaking of codes. Use it to install bugs and wiretaps or to find them.",
    baseValue: 0,
    requiresInput: false,
  },
  {
    name: "Stealth",
    description:
      "The skill of moving quietly and avoiding detection. Use it to sneak past guards, hide from pursuers, or move without being seen.",
    baseValue: 10,
    requiresInput: false,
  },
  {
    name: "Surgery",
    description:
      "The branch of medicine that treats injuries, diseases, and deformities by manual or operative methods. Use it to perform surgical procedures.",
    baseValue: 0,
    requiresInput: false,
  },
  {
    name: "Survival",
    description:
      "The skill of staying alive in dangerous environments. Use it to find food and water, build shelter, and navigate in the wilderness.",
    baseValue: 10,
    requiresInput: false,
  },
  {
    name: "Swim",
    description:
      "The ability to swim. Use it to move through water safely and efficiently.",
    baseValue: 0,
    requiresInput: false,
  },
  {
    name: "Unarmed Combat",
    description:
      "Self-defense. A fight between untrained combatants often involves more shoving and shouting than real violence. Use Unarmed Combat to hurt or kill an opponent with your Agent’s bare hands (or feet, elbows, teeth, or head).",
    baseValue: 40,
    requiresInput: false,
  },
  {
    name: "Unnatural",
    description:
      "Knowledge of things man was not meant to know. Use it to understand and resist the effects of the unnatural.",
    baseValue: 0,
    requiresInput: false,
  },
];
