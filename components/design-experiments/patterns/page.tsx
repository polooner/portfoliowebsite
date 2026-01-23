export default function Page() {
    // === CONFIGURABLE CONSTANTS ===
    const NUM_PLATFORMS = 3;
    const PLATFORM_WIDTH = 200;      // width in isometric x-axis
    const PLATFORM_DEPTH = 200;      // depth in isometric y-axis
    const PLATFORM_HEIGHT = 30;      // thickness of each platform
    const PLATFORM_GAP = 60;         // vertical distance between platforms
    const CORNER_RADIUS = 10;        // radius for rounded corners (0 = sharp)

    const SVG_WIDTH = 800;
    const SVG_HEIGHT = 700;
    const CENTER_X = SVG_WIDTH / 2;
    const CENTER_Y = SVG_HEIGHT / 2;

    // Isometric projection helpers (30 degree angles)
    const ISO_ANGLE = Math.PI / 6; // 30 degrees
    const cos30 = Math.cos(ISO_ANGLE);
    const sin30 = Math.sin(ISO_ANGLE);

    // Convert 3D point to 2D isometric
    const toIso = (x: number, y: number, z: number) => ({
        x: CENTER_X + (x - y) * cos30,
        y: CENTER_Y + (x + y) * sin30 - z,
    });

    type Point = { x: number; y: number };

    // Get offset point along edge from corner
    const offset = (from: Point, toward: Point, r: number) => {
        const dx = toward.x - from.x;
        const dy = toward.y - from.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const clampedR = Math.min(r, len / 2);
        return {
            x: from.x + (dx / len) * clampedR,
            y: from.y + (dy / len) * clampedR,
        };
    };

    // Generate rounded polygon path from points
    const roundedPath = (points: Point[], radius: number) => {
        if (radius === 0) {
            return `M ${points.map((p) => `${p.x},${p.y}`).join(" L ")} Z`;
        }

        const n = points.length;
        let path = "";

        for (let i = 0; i < n; i++) {
            const prev = points[(i - 1 + n) % n];
            const curr = points[i];
            const next = points[(i + 1) % n];

            const start = offset(curr, prev, radius);
            const end = offset(curr, next, radius);

            if (i === 0) {
                path = `M ${start.x},${start.y}`;
            } else {
                path += ` L ${start.x},${start.y}`;
            }

            path += ` Q ${curr.x},${curr.y} ${end.x},${end.y}`;
        }

        return path + " Z";
    };

    // Generate platform at given z-level
    const Platform = ({ zLevel, index }: { zLevel: number; index: number }) => {
        const w = PLATFORM_WIDTH / 2;
        const d = PLATFORM_DEPTH / 2;
        const h = PLATFORM_HEIGHT;

        // 8 corners of the box
        // Top face corners
        const topBackLeft = toIso(-w, -d, zLevel + h);
        const topBackRight = toIso(w, -d, zLevel + h);
        const topFrontRight = toIso(w, d, zLevel + h);
        const topFrontLeft = toIso(-w, d, zLevel + h);

        // Bottom face corners
        const botBackLeft = toIso(-w, -d, zLevel);
        const botBackRight = toIso(w, -d, zLevel);
        const botFrontRight = toIso(w, d, zLevel);
        const botFrontLeft = toIso(-w, d, zLevel);

        const r = CORNER_RADIUS;
        const topFacePoints = [topBackLeft, topBackRight, topFrontRight, topFrontLeft];
        const bottomFacePoints = [botBackLeft, botBackRight, botFrontRight, botFrontLeft];

        // Front face: wraps around all four corners
        const frontFacePath = `
            M ${offset(botFrontLeft, botBackLeft, r).x},${offset(botFrontLeft, botBackLeft, r).y}
            Q ${botFrontLeft.x},${botFrontLeft.y} ${offset(botFrontLeft, botFrontRight, r).x},${offset(botFrontLeft, botFrontRight, r).y}
            L ${offset(botFrontRight, botFrontLeft, r).x},${offset(botFrontRight, botFrontLeft, r).y}
            Q ${botFrontRight.x},${botFrontRight.y} ${offset(botFrontRight, botBackRight, r).x},${offset(botFrontRight, botBackRight, r).y}
            L ${offset(topFrontRight, topBackRight, r).x},${offset(topFrontRight, topBackRight, r).y}
            Q ${topFrontRight.x},${topFrontRight.y} ${offset(topFrontRight, topFrontLeft, r).x},${offset(topFrontRight, topFrontLeft, r).y}
            L ${offset(topFrontLeft, topFrontRight, r).x},${offset(topFrontLeft, topFrontRight, r).y}
            Q ${topFrontLeft.x},${topFrontLeft.y} ${offset(topFrontLeft, topBackLeft, r).x},${offset(topFrontLeft, topBackLeft, r).y}
            Z
        `;

        // Right face: wraps around all four corners
        const rightFacePath = `
            M ${offset(botBackRight, botBackLeft, r).x},${offset(botBackRight, botBackLeft, r).y}
            Q ${botBackRight.x},${botBackRight.y} ${offset(botBackRight, botFrontRight, r).x},${offset(botBackRight, botFrontRight, r).y}
            L ${offset(botFrontRight, botBackRight, r).x},${offset(botFrontRight, botBackRight, r).y}
            Q ${botFrontRight.x},${botFrontRight.y} ${offset(botFrontRight, botFrontLeft, r).x},${offset(botFrontRight, botFrontLeft, r).y}
            L ${offset(topFrontRight, topFrontLeft, r).x},${offset(topFrontRight, topFrontLeft, r).y}
            Q ${topFrontRight.x},${topFrontRight.y} ${offset(topFrontRight, topBackRight, r).x},${offset(topFrontRight, topBackRight, r).y}
            L ${offset(topBackRight, topFrontRight, r).x},${offset(topBackRight, topFrontRight, r).y}
            Q ${topBackRight.x},${topBackRight.y} ${offset(topBackRight, topBackLeft, r).x},${offset(topBackRight, topBackLeft, r).y}
            Z
        `;

        return (
            <g key={index}>
                {/* Bottom face - black to block see-through */}
                <path
                    d={roundedPath(bottomFacePoints, CORNER_RADIUS)}
                    fill="black"
                    stroke="none"
                />
                {/* Front face with curved top edge */}
                <path
                    d={frontFacePath}
                    fill="white"
                    stroke="#fff"
                    strokeWidth="1"
                />
                {/* Right face with curved top edge */}
                <path
                    d={rightFacePath}
                    fill="white"
                    stroke="#fff"
                    strokeWidth="1"
                />
                {/* Top face - rounded */}
                <path
                    d={roundedPath(topFacePoints, CORNER_RADIUS)}
                    fill="black"
                    stroke="#fff"
                    strokeWidth="1"
                />
            </g>
        );
    };

    // Generate platforms from bottom to top
    const platforms = Array.from({ length: NUM_PLATFORMS }, (_, i) => {
        const zLevel = i * (PLATFORM_HEIGHT + PLATFORM_GAP);
        return <Platform key={i} zLevel={zLevel} index={i} />;
    });

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-background">
            <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
                {platforms}
            </svg>
        </div>
    );
}