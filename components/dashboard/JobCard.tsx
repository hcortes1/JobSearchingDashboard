// TODO: Phase 5 — display job listing from search results with apply button
interface JobCardProps {
  title: string;
  company: string;
  location: string;
  type: string;
  postedAt: string;
  url: string;
}

export default function JobCard({ title, company, location, type, postedAt, url }: JobCardProps) {
  return (
    <div className="bg-white border rounded-lg p-4 space-y-2">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{company} · {location}</p>
      <div className="flex gap-2 text-xs">
        <span className="bg-gray-100 px-2 py-1 rounded">{type}</span>
        <span className="text-muted-foreground">{postedAt}</span>
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
        View listing →
      </a>
    </div>
  );
}
