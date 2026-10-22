import { cards } from "../Constants/card";

const Info = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
            Platform Capabilities
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Everything your clinic needs to run smoothly
          </h3>
          <p className="text-neutral-500 text-xs sm:text-sm">
            Replace legacy spreadsheets and disconnected paper logs with unified clinical tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card) => (
            <div
              key={card.id}
              className="p-5 sm:p-6 rounded-xl border border-neutral-200 bg-white shadow-xs hover:border-neutral-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200">
                  {card.badge}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-neutral-900">
                  {card.head}
                </h4>
                <p className="text-neutral-600 text-xs leading-relaxed">
                  {card.para}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Info;
