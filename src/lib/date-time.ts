export function formatEastAfricaTime(value: string) {
  const formatted = new Intl.DateTimeFormat('en-UG', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Africa/Kampala',
  }).format(new Date(value));

  return `${formatted} EAT`;
}

export function localElectionDateTimeToUtc(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);
  if (!match) throw new Error('Enter a valid election date and time in Kampala local time.');

  const [, yearText, monthText, dayText, hourText, minuteText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const localAsUtc = Date.UTC(year, month - 1, day, hour, minute);
  const check = new Date(localAsUtc);

  if (
    check.getUTCFullYear() !== year
    || check.getUTCMonth() !== month - 1
    || check.getUTCDate() !== day
    || hour > 23
    || minute > 59
  ) {
    throw new Error('Enter a valid election date and time in Kampala local time.');
  }

  return new Date(localAsUtc - 3 * 60 * 60 * 1000).toISOString();
}

export function utcToLocalElectionDateTime(value: string) {
  return new Date(new Date(value).getTime() + 3 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 16);
}