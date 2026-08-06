import { getElections } from './actions';
import { ElectionsClient } from './ElectionsClient';

export default async function ElectionsPage() {
  const elections = await getElections();
  return <ElectionsClient initialElections={elections} />;
}
