import Link from "next/link";
import { readdirSync, statSync } from "fs";
import { join } from "path";

function getExperiments() {
  const dir = join(process.cwd(), "app/design-experiments");
  const entries = readdirSync(dir);

  return entries
    .filter((entry) => {
      const fullPath = join(dir, entry);
      return (
        statSync(fullPath).isDirectory() &&
        !entry.startsWith("_") &&
        entry !== "components"
      );
    })
    .map((folder) => ({
      name: folder
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      path: `/design-experiments/${folder}`,
    }));
}

export default function DesignExperimentsPage() {
  const experiments = getExperiments();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-2 text-sm">
        {experiments.map((experiment) => (
          <Link
            key={experiment.path}
            href={experiment.path}
            className="hover:underline"
          >
            {experiment.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
