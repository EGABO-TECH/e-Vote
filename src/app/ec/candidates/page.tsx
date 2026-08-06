import { getCandidates } from './actions';
import { CandidatesClient } from './CandidatesClient';

export default async function CandidatesPage() {
  const candidates = await getCandidates();
  return <CandidatesClient initialCandidates={candidates} />;
}
