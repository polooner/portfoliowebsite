import { readdirSync, statSync } from "fs"
import { join } from "path"
import { ExperimentNav } from "./components/experiment-nav"

function getExperiments() {
  const dir = join(process.cwd(), "app/design-experiments")
  const entries = readdirSync(dir)

  return entries
    .filter((entry) => {
      const fullPath = join(dir, entry)
      return (
        statSync(fullPath).isDirectory() &&
        !entry.startsWith("_") &&
        entry !== "components"
      )
    })
    .map((folder) => ({
      name: folder
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      path: `/design-experiments/${folder}`,
    }))
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const experiments = getExperiments()

  return (
    <div className="dark font-greed">
      {children}
      <ExperimentNav experiments={experiments} />
    </div>
  )
}
