// Type definitions for Election Data

export interface PartyResult {
  party: string;
  seats: number;
  votes_pct?: string;
  color: string;
}

export interface LokSabhaData {
  title: string;
  level: string;
  description: string;
  total_seats: number;
  tenure_years: number;
  last_election: {
    year: number;
    phase: number;
    dates: string[];
    result_date: string;
    total_votes_polled: string;
    voter_turnout: string;
    registered_voters: string;
    total_candidates: number;
    total_polling_stations: number;
    party_results: PartyResult[];
    alliance_results: { alliance: string; seats: number }[];
  };
  next_election: number;
}

export interface ElectionCalendar {
  election: string;
  level: string;
  seats: number;
  expected?: string;
  actual?: string;
  result?: string;
  status: string;
  note?: string;
}

export interface ElectionData {
  lok_sabha: LokSabhaData;
  rajya_sabha: Record<string, unknown>;
  vidhan_sabha: {
    all_states: Array<{
      state: string;
      seats: number;
      last_election: number;
      next_election: number;
      ruling: string;
      governor: string;
    }>;
    recent_elections: Array<{
      state: string;
      year: number;
      month: string;
      total_seats: number;
      turnout: string;
      result: PartyResult[];
      govt_formed: string;
    }>;
  };
  election_calendar_2025_26: ElectionCalendar[];
}

// Type for Candidates
export interface Candidate {
  id: string;
  name: string;
  constituency: string;
  state: string;
  party: string;
  party_symbol?: string;
  election_id: string;
  education: string;
  declared_assets: string;
  liabilities: string;
  criminal_cases: number;
  age: number;
  position?: string;
  affidavit_url: string;
  summary: string;
}

// Type for Elections
export interface Election {
  id: string;
  type: string;
  state?: string;
  year: number;
  phases: number;
  announcement_date?: string;
  voting_dates?: string[];
  results_date?: string;
  status: string;
  total_seats: number;
  voter_turnout?: string;
  winner?: string;
  description: string;
}

// Type for Eligibility Questions
export interface EligibilityQuestion {
  id: string;
  label: string;
  type: string;
  key: string;
  placeholder?: string;
  invert?: boolean;
  options?: { v: string; l: string }[];
}