export default function Cards() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="relative h-64 w-96 overflow-hidden rounded-2xl bg-white/90 p-6">
                <div className="absolute bottom-6 left-6 z-10">
                    <h2 className="text-sm font-medium text-neutral-900">Concept-first, not pixel-first.</h2>
                    <p className="text-xs text-neutral-500">Design used to start with design systems. <br />Now it starts with creative systems.</p>
                </div>
                <video
                    src="/platformGradientShader.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute -right-16 -top-16 h-72 w-72 object-cover scale-150"
                    style={{
                        maskImage: `radial-gradient(circle at 70% 30%, black 0%, black 35%, transparent 65%)`,
                        WebkitMaskImage: `radial-gradient(circle at 70% 30%, black 0%, black 35%, transparent 65%)`,
                    }}
                />
            </div>
        </div>
    )
}