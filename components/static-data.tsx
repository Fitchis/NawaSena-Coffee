export function StaticData() {
  return (
    <div className="hidden md:block w-full">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-[#D92A2A] text-white divide-x divide-white/20">
        <div className="py-8 text-center">
          <div className="text-3xl font-extrabold">5K+</div>
          <div className="text-xs mt-1 opacity-90">Pelanggan Puas</div>
        </div>

        <div className="py-8 text-center">
          <div className="text-3xl font-extrabold">30+</div>
          <div className="text-xs mt-1 opacity-90">Varian Menu</div>
        </div>

        <div className="py-8 text-center">
          <div className="text-3xl font-extrabold">4.9</div>
          <div className="text-xs mt-1 opacity-90">Rating Google</div>
        </div>

        <div className="py-8 text-center">
          <div className="text-3xl font-extrabold">3th</div>
          <div className="text-xs mt-1 opacity-90">Pengalaman</div>
        </div>
      </div>
    </div>
  );
}
