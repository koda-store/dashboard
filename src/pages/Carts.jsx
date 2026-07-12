import { ShoppingCart } from "lucide-react";
function Carts() {
  return (
    <div className="flex">
      <div
        className="
          flex-1
          mt-10
          bg-transparent
        "
      >
        {/* Header */}
        <div
          className="
            bg-white
            dark:bg-slate-900
            shadow-sm
            mb-8
            relative overflow-hidden rounded-xl border border-cyan-200 dark:border-cyan-900 bg-gradient-to-r from-white to-cyan-200/20 dark:from-gray-900 dark:to-cyan-950/30 p-8 max-sm:flex-col max-sm:items-start max-sm:gap-8
          "
        >
          <p className="text-xs uppercase tracking-[2px] text-cyan-800 dark:text-cyan-300 pl-0.5">
            Carts
          </p>

          <h1 className="font-bold text-xl sm:text-3xl text-cyan-950 dark:text-white">
            Cart Overview
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-sm">
            View all shopping carts returned from the API, including customer
            information, products, quantities, and total items.
          </p>
        </div>

        {/* Empty State */}
        <div
          className="
        flex
        flex-col
        items-center
        justify-center
        gap-4
        pt-15 pb-15
        rounded-3xl
        border-2
        border-dashed
        border-slate-300
        dark:border-slate-700
        bg-white
        dark:bg-slate-900
        shadow-sm
      "
        >
          <div
            className="
          w-20
          h-20
          rounded-full
          bg-cyan-100
          dark:bg-cyan-500/10
          flex
          items-center
          justify-center
        "
          >
            <ShoppingCart
              size={36}
              className="text-cyan-600 dark:text-cyan-400"
            />
          </div>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            No Carts Found
          </h2>

          <p className="text-center text-slate-500 dark:text-slate-400 max-w-md">
            There are currently no shopping carts available from the API. Once data
            becomes available, it will appear here automatically.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Carts;