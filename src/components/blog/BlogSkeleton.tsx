export default function BlogSkeleton() {
    return (
        Array.from({ length: 12 }).map((_, index) => (
            <div
                key={index}
            >
                <div className="animate-pulse flex flex-wrap flex-col rounded-xl bg-white shadow h-full group">
                    <div className="w-full h-40 md:h-64 bg-gray-200"></div>
                    <div className="py-6 px-5">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <div className="w-24 h-2 md:h-3 rounded-full bg-gray-300"></div>
                            <div className="w-24 h-2 md:h-3 rounded-full bg-gray-300"></div>
                        </div>
                        <div className="w-full h-3 rounded-full bg-gray-300 mb-4"></div>
                        <div className="flex flex-wrap items-center gap-4 mt-4">
                            <div className="w-32 h-2 md:h-3 rounded-full bg-gray-300"></div>
                            <div className="w-40 h-2 md:h-3 rounded-full bg-gray-300"></div>
                        </div>
                    </div>
                </div>
            </div>
        ))
    )
}