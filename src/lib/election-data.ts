import { supabaseAdmin } from '@/lib/supabase';

export type CandidateProfile = {
  id: string;
  name: string;
  slogan: string;
  manifesto: string;
  image_url: string;
};

export type ElectionWithCandidates = {
  id: string;
  title: string;
  description: string | null;
  status: 'draft' | 'active' | 'live' | 'closed';
  starts_at: string;
  ends_at: string;
  candidates: CandidateProfile[];
};

export type ReceiptEntry = {
  id: string;
  election_title: string;
  receipt_hash: string;
  created_at: string;
  voter_email: string;
};

const fallbackElections: ElectionWithCandidates[] = [
  {
    id: 'guild-president-2026',
    title: '2026 Student Guild Presidential Election',
    description: 'Vote for the next Student Guild President for the 2026 academic cycle.',
    status: 'active',
    starts_at: new Date().toISOString(),
    ends_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    candidates: [
      {
        id: 'candidate-john',
        name: 'John Okello',
        slogan: 'Actionable leadership for a stronger student experience.',
        manifesto: 'I will prioritise transparent student governance, stronger funding for clubs and welfare, and a more responsive student leadership model.',
        image_url: '/logo.jpeg',
      },
      {
        id: 'candidate-sarah',
        name: 'Sarah Namukasa',
        slogan: 'Innovation, inclusion, and accountability in every decision.',
        manifesto: 'My campaign focuses on digital student services, inclusive welfare programs, and practical policy reforms that improve campus life.',
        image_url: '/logo.jpeg',
      },
      {
        id: 'candidate-daniel',
        name: 'Daniel Atim',
        slogan: 'An accountable voice for every student across campus.',
        manifesto: 'I will advocate for better student engagement, more transparent governance, and resources that support academic, welfare, and leadership growth.',
        image_url: '/logo.jpeg',
      },
    ],
  },
  {
    id: 'faculty-law-2026',
    title: 'Faculty of Law Representative',
    description: 'Represent the Faculty of Law on the student leadership board.',
    status: 'active',
    starts_at: new Date().toISOString(),
    ends_at: new Date(Date.now() + 1000 * 60 * 60 * 36).toISOString(),
    candidates: [
      {
        id: 'law-candidate-1',
        name: 'Nadine Musinguzi',
        slogan: 'Justice-driven leadership rooted in student advocacy.',
        manifesto: 'I will push for stronger policy engagement, transparent student representation, and a more connected faculty leadership structure.',
        image_url: '/logo.jpeg',
      },
      {
        id: 'law-candidate-2',
        name: 'Isaac Kato',
        slogan: 'Practical representation for the next generation of legal leaders.',
        manifesto: 'My agenda focuses on faculty visibility, timely communication, and stronger support for student advocacy and academic participation.',
        image_url: '/logo.jpeg',
      },
    ],
  },
];

function isSupabaseConfigured() {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
}

export async function getVoterElectionData() {
  if (!isSupabaseConfigured()) {
    return fallbackElections;
  }

  try {
    const { data: elections, error: electionsError } = await supabaseAdmin
      .from('elections')
      .select('*')
      .in('status', ['active', 'live'])
      .order('starts_at', { ascending: false });

    if (electionsError || !elections?.length) {
      return fallbackElections;
    }

    const electionIds = elections.map((election) => election.id);
    const { data: candidatesData, error: candidatesError } = await supabaseAdmin
      .from('candidates')
      .select('*')
      .in('election_id', electionIds);

    if (candidatesError) {
      return fallbackElections;
    }

    return elections.map((election) => ({
      id: election.id,
      title: election.title,
      description: election.description,
      status: (election.status === 'live' ? 'live' : 'active') as ElectionWithCandidates['status'],
      starts_at: election.starts_at,
      ends_at: election.ends_at,
      candidates: (candidatesData || [])
        .filter((candidate) => candidate.election_id === election.id)
        .map((candidate) => ({
          id: candidate.id,
          name: candidate.name,
          slogan: candidate.slogan || candidate.manifesto || 'Committed to student leadership.',
          manifesto: candidate.manifesto || 'No manifesto added yet.',
          image_url: candidate.image_url || candidate.photo_url || '/logo.jpeg',
        })),
    }));
  } catch (error) {
    return fallbackElections;
  }
}

export async function getVoterReceiptData(userId: string | null) {
  if (!userId) {
    return [] as ReceiptEntry[];
  }

  if (!isSupabaseConfigured()) {
    return [
      {
        id: 'fallback-receipt-1',
        election_title: '2026 Student Guild Presidential Election',
        receipt_hash: 'EVOTE-AB12CD34EF56GH78IJ90KL12MN',
        created_at: new Date().toISOString(),
        voter_email: 'student@cavendish.ac.ug',
      },
    ] as ReceiptEntry[];
  }

  try {
    const { data: voterRow, error: voterError } = await supabaseAdmin
      .from('voters')
      .select('id, email')
      .eq('clerk_id', userId)
      .single();

    if (voterError || !voterRow) {
      return [] as ReceiptEntry[];
    }

    const voterId = voterRow.id;
    const voterEmail = voterRow.email;

    const { data: rows, error } = await supabaseAdmin
      .from('receipts')
      .select('id, receipt_hash, election_id, created_at')
      .eq('voter_id', voterId)
      .order('created_at', { ascending: false });

    if (error || !rows?.length) {
      return [] as ReceiptEntry[];
    }

    const electionIds = rows.map((row) => row.election_id);
    const { data: elections, error: electionError } = await supabaseAdmin
      .from('elections')
      .select('id, title')
      .in('id', electionIds);

    if (electionError) {
      return [] as ReceiptEntry[];
    }

    const titleMap = new Map((elections || []).map((election) => [election.id, election.title]));

    return rows.map((row) => ({
      id: row.id,
      election_title: titleMap.get(row.election_id) || 'Official Election Receipt',
      receipt_hash: row.receipt_hash,
      created_at: row.created_at,
      voter_email: voterEmail,
    }));
  } catch (error) {
    return [] as ReceiptEntry[];
  }
}
