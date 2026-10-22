import { cards } from "../Constants/card";

const Info = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#0091DC]">
            Platform Capabilities
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
            Everything your clinic needs to run smoothly
          </h3>
          <p className="text-slate-600 text-sm">
            Replace legacy spreadsheets and disconnected paper logs with unified clinical tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0091DC] border border-blue-100">
                  {card.badge}
                </span>
                <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#0091DC] transition-colors">
                  {card.head}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
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
