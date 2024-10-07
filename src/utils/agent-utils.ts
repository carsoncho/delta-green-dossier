import { FullName, IAgent, IStats } from "@/types/agent";
import { Skill } from "@/types/skills";

const familyNames = [
  "Li",
  "Smith",
  "Patel",
  "Kim",
  "García",
  "Müller",
  "Khan",
  "Nguyen",
  "Dubois",
  "Rossi",
  "Silva",
  "Yamamoto",
  "Nair",
  "Cohen",
  "Haddad",
  "Andersson",
  "Chukwu",
  "Ivanov",
  "Svensson",
  "Tanaka",
  "O'Connor",
  "Dimitrov",
  "Zhang",
  "Johansson",
  "Rodríguez",
  "Pacheco",
  "Singh",
  "Murphy",
  "Wong",
  "Da Silva",
  "Dimitriou",
  "Kowalski",
  "Bălan",
  "Gupta",
  "Adebayo",
  "Kuznetsov",
  "Petrović",
  "Larsen",
  "Fernández",
  "Jönsson",
  "Park",
  "Al-Mansour",
  "Osei",
  "Smirnov",
  "Iqbal",
  "Hassan",
  "Popescu",
  "Alonso",
  "Dubois",
  "Yamashita",
  "Erdogan",
  "Schmidt",
  "Lebedev",
  "Sousa",
  "Vasiliev",
  "Lavoie",
  "Kaur",
  "Ivanova",
  "Torres",
  "Åberg",
  "Afolayan",
  "Özdemir",
  "Yilmaz",
  "Fofana",
  "Lindberg",
  "Sato",
  "Mendoza",
  "Kimura",
  "Hussein",
  "Müller",
  "Nakamura",
  "Brown",
  "Martinez",
  "Fernandes",
  "Schneider",
  "Ali",
  "Weber",
  "Abbas",
  "Takeda",
  "López",
  "Singhal",
  "Okafor",
  "Moreau",
  "Hernández",
  "Pavlov",
  "Aliyev",
  "Ng",
  "Thakur",
  "Amin",
  "Becker",
  "Moreno",
  "Costa",
  "Siddiqui",
  "Mori",
  "Rizzo",
  "Lund",
  "Singh",
  "Ochoa",
  "Fischer",
  "Wang",
  "Kumar",
  "Zhao",
  "Pérez",
];

const givenNames = [
  "Liam",
  "Emma",
  "Noah",
  "Olivia",
  "Aiden",
  "Ava",
  "Ethan",
  "Isabella",
  "Mason",
  "Sophia",
  "Lucas",
  "Mia",
  "Logan",
  "Amelia",
  "Jacob",
  "Harper",
  "William",
  "Evelyn",
  "James",
  "Abigail",
  "Benjamin",
  "Emily",
  "Alexander",
  "Ella",
  "Michael",
  "Avery",
  "Daniel",
  "Scarlett",
  "Matthew",
  "Grace",
  "Henry",
  "Chloe",
  "Joseph",
  "Victoria",
  "Samuel",
  "Aria",
  "David",
  "Lily",
  "Carter",
  "Aubrey",
  "Owen",
  "Zoe",
  "Wyatt",
  "Penelope",
  "John",
  "Riley",
  "Jack",
  "Layla",
  "Luke",
  "Lillian",
  "Jayden",
  "Nora",
  "Dylan",
  "Addison",
  "Grayson",
  "Ellie",
  "Levi",
  "Stella",
  "Isaac",
  "Hannah",
  "Gabriel",
  "Paisley",
  "Julian",
  "Audrey",
  "Mateo",
  "Brooklyn",
  "Anthony",
  "Bella",
  "Jaxon",
  "Claire",
  "Lincoln",
  "Skylar",
  "Joshua",
  "Lucy",
  "Christopher",
  "Savannah",
  "Andrew",
  "Anna",
  "Theodore",
  "Samantha",
  "Caleb",
  "Caroline",
  "Ryan",
  "Genesis",
  "Asher",
  "Aaliyah",
  "Nathan",
  "Kennedy",
  "Thomas",
  "Kinsley",
  "Leo",
  "Maya",
  "Isaiah",
  "Naomi",
  "Charles",
  "Ariana",
  "Josiah",
  "Elena",
  "Hudson",
  "Sarah",
  "Christian",
  "Madelyn",
  "Hunter",
  "Alexa",
];

export function AgentName(agent: IAgent) {
  return `${agent.givenName} ${agent.familyName}`;
}

export function GenerateFullName(): FullName {
  const getRandomName = (nameList: string[]) => {
    const randomIndex = Math.floor(Math.random() * nameList.length);
    return nameList[randomIndex];
  };

  return {
    givenName: getRandomName(givenNames),
    familyName: getRandomName(familyNames),
  };
}

export type AttributeKey = keyof IStats;
export const AgentStats: Record<AttributeKey, string> = {
  str: "Strength",
  con: "Constitution",
  dex: "Dexterity",
  int: "Intelligence",
  pow: "Power",
  cha: "Charisma",
};

// Helper function to check if all stats are filled
export function AreStatsFilled(agent: IAgent) {
  if (agent.statGenerationMode === "point_buy") {
    const totalPoints = GetTotalPoints(agent);
    return totalPoints === 72;
  } else if (agent.statGenerationMode === "manual") {
    return (
      agent.stats?.str !== undefined &&
      agent.stats?.con !== undefined &&
      agent.stats?.dex !== undefined &&
      agent.stats?.int !== undefined &&
      agent.stats?.pow !== undefined &&
      agent.stats?.cha !== undefined
    );
  }
  return false;
}

/**
 * Helper to determine total points for agent.
 * @param agent
 * @returns
 *   The total score of all agent stats.
 */
export function GetTotalPoints(agent: IAgent) {
  if (!agent.stats) return 0;

  return Object.values(agent.stats).reduce((acc, value) => {
    return acc + (value || 0); // Add value if it exists, otherwise add 0
  }, 0);
}

/**
 * Helper to get a skill's name. Should only be used after knowing the agent has completed the profession step of the builder.
 *
 * @param skill The skill to get the name for.
 * @returns The skill's name as a string.
 */
export function GetSkillName(skill: Skill) {
  if (skill.requiresInput) {
    return `${skill.name} (${skill.userInput})`;
  }

  return `${skill.name}`;
}
