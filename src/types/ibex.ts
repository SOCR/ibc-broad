
export interface IbexData {
  year: number;
  midwest: number;
  northeast: number;
  south: number;
  west: number;
  overall: number;
}

export interface IbexKnowledgeData {
  year: number;
  students: number;
  faculty: number;
  administrators: number;
  localCommunities: number;
  peopleInCountry: number;
}

export interface StateRanking {
  state: string;
  rank: number;
  score: number;
  category: 'Highly Active' | 'Active' | 'Less Active';
}

export interface CourseData {
  course: string;
  years: {
    [year: string]: number;
  };
}

export type ActivityLevel = 'Highly Active' | 'Active' | 'Less Active';

export interface StateActivityData {
  state: string;
  score: number;
  activityLevel: ActivityLevel;
}
