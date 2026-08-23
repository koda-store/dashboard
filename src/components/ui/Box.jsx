import React from 'react'

const Box = ({ icon, result, text }) => {
    return (
        <div className="border border-gray-200 dark:border-gray-700 p-8 bg-white dark:bg-gray-900 rounded-xl">
            <div
                className={`p-2 border inline-block rounded-lg ${text === "Total"
                        ? "border-cyan-500/20 dark:border-cyan-500/30 text-cyan-500 bg-cyan-500/10 dark:bg-cyan-500/20"
                        : text === "Featured"
                            ? "border-orange-200 dark:border-orange-700 text-orange-500 dark:text-orange-400 bg-orange-500/10 dark:bg-orange-500/20"
                            : text === "Out of Stock"
                                ? "border-red-500/20 dark:border-red-700 text-red-500 dark:text-red-400 bg-red-500/10 dark:bg-red-500/20"
                                : "border-green-400/50 dark:border-green-700 text-green-500 dark:text-green-400 bg-green-500/10 dark:bg-green-500/20"
                    }`}
            >
                {icon}
            </div>

            <div className="flex items-end justify-between mt-4">
                <h2 className="text-sm text-cyan-800 dark:text-cyan-300">
                    {text}
                </h2>

                <p className="font-semibold text-2xl text-cyan-950 dark:text-white">
                    {result}
                </p>
            </div>
        </div>
    )
}

export default Box