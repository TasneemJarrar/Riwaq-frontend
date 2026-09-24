const nodes = [
  { tag: "#Python", count: 340 },
  { tag: "#Figma", count: 218 },
  { tag: "#NextJS", count: 195 },
  { tag: "#PyTorch", count: 142 },
];

export default function ActiveNodesCard() {
  return (
    <div className="rounded-2xl border border-border bg-surface-1 p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">
          Active Exchange Nodes
        </h3>
        <span className="flex items-center gap-1.5 text-xs text-success-text">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Live
        </span>
      </div>

      <ul className="space-y-2.5">
        {nodes.map((node) => (
          <li
            key={node.tag}
            className="flex items-center justify-between text-sm"
          >
            <span className="font-medium text-text-secondary">{node.tag}</span>
            <span className="text-text-tertiary">{node.count} active swaps</span>
          </li>
        ))}
      </ul>
    </div>
  );
}