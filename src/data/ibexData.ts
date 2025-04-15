
import { IbexData, IbexKnowledgeData, StateRanking, CourseData, StateActivityData } from '../types/ibex';

export const ibexOverTimeData: IbexData[] = [
  { year: 2008, midwest: 0.25, northeast: 0.29, south: 0.27, west: 0.28, overall: 0.27 },
  { year: 2009, midwest: 0.26, northeast: 0.27, south: 0.28, west: 0.28, overall: 0.27 },
  { year: 2010, midwest: 0.23, northeast: 0.24, south: 0.27, west: 0.24, overall: 0.25 },
  { year: 2012, midwest: 0.69, northeast: 0.68, south: 0.71, west: 0.75, overall: 0.71 },
  { year: 2014, midwest: 0.65, northeast: 0.71, south: 0.67, west: 0.66, overall: 0.67 },
  { year: 2016, midwest: 0.66, northeast: 0.72, south: 0.66, west: 0.67, overall: 0.67 },
  { year: 2019, midwest: 0.63, northeast: 0.71, south: 0.65, west: 0.66, overall: 0.65 },
];

export const iexOverTimeData = [
  { year: 2014, midwest: 0.47, northeast: 0.38, south: 0.40, west: 0.36, overall: 0.41 },
  { year: 2016, midwest: 0.39, northeast: 0.34, south: 0.34, west: 0.41, overall: 0.37 },
  { year: 2019, midwest: 0.63, northeast: 0.66, south: 0.51, west: 0.57, overall: 0.60 },
];

export const ibexKnowledgeData: IbexKnowledgeData[] = [
  { 
    year: 2008, 
    students: 3.46, 
    faculty: 5.59, 
    administrators: 4.37, 
    localCommunities: 4.20, 
    peopleInCountry: 3.93 
  },
  { 
    year: 2009, 
    students: 3.82, 
    faculty: 5.95, 
    administrators: 4.65, 
    localCommunities: 4.33, 
    peopleInCountry: 3.70 
  },
  { 
    year: 2010, 
    students: 3.63, 
    faculty: 5.20, 
    administrators: 4.12, 
    localCommunities: 4.30, 
    peopleInCountry: 3.96 
  },
  { 
    year: 2012, 
    students: 3.64, 
    faculty: 5.09, 
    administrators: 4.00, 
    localCommunities: 4.50, 
    peopleInCountry: 4.09 
  },
  { 
    year: 2014, 
    students: 3.37, 
    faculty: 4.73, 
    administrators: 3.75, 
    localCommunities: 4.27, 
    peopleInCountry: 3.96 
  },
  { 
    year: 2016, 
    students: 3.03, 
    faculty: 4.27, 
    administrators: 3.30, 
    localCommunities: 3.88, 
    peopleInCountry: 3.63 
  },
  { 
    year: 2019, 
    students: 2.96, 
    faculty: 4.14, 
    administrators: 3.11, 
    localCommunities: 3.99, 
    peopleInCountry: 3.69 
  },
];

export const courseData: CourseData[] = [
  {
    course: "International Business",
    years: { "2008": 51, "2012": 85, "2014": 71, "2016": 69, "2019": 59 }
  },
  {
    course: "International Marketing",
    years: { "2008": 22, "2012": 37, "2014": 26, "2016": 21, "2019": 24 }
  },
  {
    course: "International Management",
    years: { "2008": 13, "2012": 24, "2014": 2, "2016": 13, "2019": 14 }
  },
  {
    course: "International Economics",
    years: { "2008": 19, "2012": 26, "2014": 8, "2016": 15, "2019": 14 }
  },
  {
    course: "International Trade",
    years: { "2008": 16, "2012": 18, "2014": 5, "2016": 13, "2019": 13 }
  },
  {
    course: "International Entrepreneurship",
    years: { "2008": 0, "2012": 17, "2014": 8, "2016": 10, "2019": 11 }
  },
  {
    course: "International Logistics",
    years: { "2008": 0, "2012": 12, "2014": 8, "2016": 10, "2019": 11 }
  },
  {
    course: "International Accounting",
    years: { "2008": 1, "2012": 9, "2014": 8, "2016": 8, "2019": 7 }
  },
  {
    course: "International Sourcing",
    years: { "2008": 0, "2012": 7, "2014": 6, "2016": 6, "2019": 7 }
  },
  {
    course: "International Finance",
    years: { "2008": 8, "2012": 13, "2014": 6, "2016": 6, "2019": 5 }
  },
  {
    course: "International Strategy",
    years: { "2008": 0, "2012": 5, "2014": 4, "2016": 4, "2019": 5 }
  },
  {
    course: "International Human Resources",
    years: { "2008": 3, "2012": 8, "2014": 3, "2016": 3, "2019": 5 }
  }
];

export const stateRankings: StateRanking[] = [
  // Highly Active states (IBEX >= 0.70)
  { state: "South Dakota", rank: 1, score: 0.85, category: "Highly Active" },
  { state: "New Hampshire", rank: 2, score: 0.84, category: "Highly Active" },
  { state: "Delaware", rank: 3, score: 0.83, category: "Highly Active" },
  { state: "Mississippi", rank: 4, score: 0.82, category: "Highly Active" },
  { state: "Alabama", rank: 5, score: 0.81, category: "Highly Active" },
  { state: "Nevada", rank: 6, score: 0.80, category: "Highly Active" },
  { state: "Louisiana", rank: 7, score: 0.79, category: "Highly Active" },
  { state: "New Jersey", rank: 8, score: 0.78, category: "Highly Active" },
  { state: "Idaho", rank: 9, score: 0.77, category: "Highly Active" },
  { state: "Georgia", rank: 10, score: 0.76, category: "Highly Active" },
  { state: "Oregon", rank: 11, score: 0.75, category: "Highly Active" },
  { state: "Massachusetts", rank: 12, score: 0.74, category: "Highly Active" },
  { state: "Kentucky", rank: 13, score: 0.73, category: "Highly Active" },
  { state: "Colorado", rank: 14, score: 0.72, category: "Highly Active" },
  { state: "Utah", rank: 15, score: 0.71, category: "Highly Active" },
  { state: "Iowa", rank: 16, score: 0.70, category: "Highly Active" },
  
  // Active states (IBEX 0.60-0.69)
  { state: "Missouri", rank: 17, score: 0.69, category: "Active" },
  { state: "South Carolina", rank: 18, score: 0.68, category: "Active" },
  { state: "Vermont", rank: 19, score: 0.68, category: "Active" },
  { state: "Maryland", rank: 20, score: 0.67, category: "Active" },
  { state: "Connecticut", rank: 21, score: 0.67, category: "Active" },
  { state: "Indiana", rank: 22, score: 0.66, category: "Active" },
  { state: "North Carolina", rank: 23, score: 0.66, category: "Active" },
  { state: "Texas", rank: 24, score: 0.65, category: "Active" },
  { state: "Pennsylvania", rank: 25, score: 0.65, category: "Active" },
  { state: "Kansas", rank: 26, score: 0.64, category: "Active" },
  { state: "Arizona", rank: 27, score: 0.64, category: "Active" },
  { state: "California", rank: 28, score: 0.64, category: "Active" },
  { state: "New York", rank: 29, score: 0.63, category: "Active" },
  { state: "Minnesota", rank: 30, score: 0.63, category: "Active" },
  { state: "Michigan", rank: 31, score: 0.62, category: "Active" },
  { state: "Ohio", rank: 32, score: 0.62, category: "Active" },
  { state: "Arkansas", rank: 33, score: 0.61, category: "Active" },
  { state: "Florida", rank: 34, score: 0.61, category: "Active" },
  { state: "Washington", rank: 35, score: 0.61, category: "Active" },
  { state: "West Virginia", rank: 36, score: 0.60, category: "Active" },
  { state: "Montana", rank: 37, score: 0.60, category: "Active" },
  { state: "Wyoming", rank: 38, score: 0.60, category: "Active" },
  { state: "Nebraska", rank: 39, score: 0.60, category: "Active" },
  { state: "Oklahoma", rank: 40, score: 0.60, category: "Active" },
  { state: "Illinois", rank: 41, score: 0.60, category: "Active" },
  { state: "Maine", rank: 42, score: 0.60, category: "Active" },
  { state: "Virginia", rank: 43, score: 0.60, category: "Active" },
  { state: "Hawaii", rank: 44, score: 0.60, category: "Active" },
  { state: "North Dakota", rank: 45, score: 0.60, category: "Active" },
  { state: "Wisconsin", rank: 46, score: 0.60, category: "Active" },
  { state: "New Mexico", rank: 47, score: 0.60, category: "Active" },
  
  // Less Active states (IBEX 0.30-0.59)
  { state: "Rhode Island", rank: 48, score: 0.55, category: "Less Active" },
  { state: "Tennessee", rank: 49, score: 0.50, category: "Less Active" },
  { state: "Alaska", rank: 50, score: 0.30, category: "Less Active" }
];

export const stateActivity: StateActivityData[] = [
  // Highly Active States (0.71 - 0.85)
  { state: "Alabama", score: 0.78, activityLevel: "Highly Active" },
  { state: "Arizona", score: 0.77, activityLevel: "Highly Active" },
  { state: "Colorado", score: 0.76, activityLevel: "Highly Active" },
  { state: "Georgia", score: 0.75, activityLevel: "Highly Active" },
  { state: "Idaho", score: 0.75, activityLevel: "Highly Active" },
  { state: "Indiana", score: 0.74, activityLevel: "Highly Active" },
  { state: "Kansas", score: 0.74, activityLevel: "Highly Active" },
  { state: "Louisiana", score: 0.73, activityLevel: "Highly Active" },
  { state: "Maryland", score: 0.73, activityLevel: "Highly Active" },
  { state: "Mississippi", score: 0.72, activityLevel: "Highly Active" },
  { state: "Nevada", score: 0.72, activityLevel: "Highly Active" },
  { state: "New Jersey", score: 0.72, activityLevel: "Highly Active" },
  { state: "North Carolina", score: 0.71, activityLevel: "Highly Active" },
  { state: "Oklahoma", score: 0.71, activityLevel: "Highly Active" },
  { state: "Oregon", score: 0.71, activityLevel: "Highly Active" },
  { state: "Pennsylvania", score: 0.71, activityLevel: "Highly Active" },
  { state: "South Dakota", score: 0.71, activityLevel: "Highly Active" },
  { state: "Utah", score: 0.71, activityLevel: "Highly Active" },
  { state: "Virginia", score: 0.71, activityLevel: "Highly Active" },
  { state: "West Virginia", score: 0.71, activityLevel: "Highly Active" },
  
  // Active States (0.60 - 0.69)
  { state: "California", score: 0.69, activityLevel: "Active" },
  { state: "Connecticut", score: 0.68, activityLevel: "Active" },
  { state: "Delaware", score: 0.67, activityLevel: "Active" },
  { state: "Florida", score: 0.66, activityLevel: "Active" },
  { state: "Hawaii", score: 0.65, activityLevel: "Active" },
  { state: "Iowa", score: 0.64, activityLevel: "Active" },
  { state: "Kentucky", score: 0.63, activityLevel: "Active" },
  { state: "Maine", score: 0.63, activityLevel: "Active" },
  { state: "Massachusetts", score: 0.62, activityLevel: "Active" },
  { state: "Michigan", score: 0.62, activityLevel: "Active" },
  { state: "Missouri", score: 0.61, activityLevel: "Active" },
  { state: "Nebraska", score: 0.61, activityLevel: "Active" },
  { state: "New Hampshire", score: 0.61, activityLevel: "Active" },
  { state: "New York", score: 0.61, activityLevel: "Active" },
  { state: "Ohio", score: 0.60, activityLevel: "Active" },
  { state: "South Carolina", score: 0.60, activityLevel: "Active" },
  { state: "Texas", score: 0.60, activityLevel: "Active" },
  
  // Less Active States (0.30 - 0.59)
  { state: "Alaska", score: 0.59, activityLevel: "Less Active" },
  { state: "Arkansas", score: 0.58, activityLevel: "Less Active" },
  { state: "Illinois", score: 0.57, activityLevel: "Less Active" },
  { state: "Minnesota", score: 0.56, activityLevel: "Less Active" },
  { state: "Montana", score: 0.55, activityLevel: "Less Active" },
  { state: "New Mexico", score: 0.54, activityLevel: "Less Active" },
  { state: "North Dakota", score: 0.53, activityLevel: "Less Active" },
  { state: "Rhode Island", score: 0.52, activityLevel: "Less Active" },
  { state: "Tennessee", score: 0.51, activityLevel: "Less Active" },
  { state: "Vermont", score: 0.50, activityLevel: "Less Active" },
  { state: "Washington", score: 0.45, activityLevel: "Less Active" },
  { state: "Wisconsin", score: 0.40, activityLevel: "Less Active" },
  { state: "Wyoming", score: 0.35, activityLevel: "Less Active" }
];

export const ibcTeam = [
  {
    name: "Dr. Tomas Hult",
    title: "Director",
    bio: "Dr. Tomas Hult is the Director of IBC since 2001 and he founded IBEX in 2008. Hult is Byington Endowed Chair, Professor of Marketing and International Business, and one of most cited business scholars in the world.",
    email: "hult@msu.edu",
    image: "tomas-hult.jpg" 
  },
  {
    name: "Dr. Sarah Singer",
    title: "Assistant Director",
    bio: "Dr. Sarah Singer is the coordinator for community college programming and works closely with community colleges nationwide to enhance international business education.",
    email: "singersa@msu.edu",
    image: "sarah-singer.jpg"
  },
  {
    name: "William Motz",
    title: "Community College Liaison",
    bio: "William 'Bill' Motz, Business Professor, Lansing Community College is long-standing partner in IBEX benchmarking and community college activities.",
    email: "motzw@lcc.edu",
    image: "bill-motz.jpg"
  }
];
