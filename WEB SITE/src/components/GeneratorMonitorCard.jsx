export default function GeneratorMonitorCard(props) {
    // Memformat angka menjadi 2 desimal dengan aman
    const v = props.data.v !== null ? props.data.v.toFixed(2) : "--";
    const i = props.data.i !== null ? props.data.i.toFixed(2) : "--";
    const p = props.data.p !== null ? props.data.p.toFixed(2) : "--";
  
    return (
      <div class={`rounded-xl shadow-sm border-t-4 ${props.themeColor} overflow-hidden bg-white flex flex-col`}>
        {/* Header Kartu */}
        <div class="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 class={`font-bold flex items-center gap-2 ${props.textColor}`}>
            {props.icon} {props.title}
          </h2>
          {/* Indikator Kedip */}
          <span class="flex h-3 w-3 relative">
            <span class={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${props.data.v ? 'bg-green-400' : 'bg-gray-400'}`}></span>
            <span class={`relative inline-flex rounded-full h-3 w-3 ${props.data.v ? 'bg-green-500' : 'bg-gray-500'}`}></span>
          </span>
        </div>
        
        {/* Body Kartu: Grid 3 Kolom untuk V, A, W */}
        <div class="p-4 grid grid-cols-3 gap-2 divide-x divide-gray-100">
          
          {/* Kolom Tegangan */}
          <div class="flex flex-col items-center justify-center text-center">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tegangan</span>
            <div class="flex items-baseline gap-1 text-blue-600">
              <span class="text-2xl font-black">{v}</span>
              <span class="text-xs font-bold">V</span>
            </div>
          </div>
  
          {/* Kolom Arus */}
          <div class="flex flex-col items-center justify-center text-center">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Arus</span>
            <div class="flex items-baseline gap-1 text-orange-500">
              <span class="text-2xl font-black">{i}</span>
              <span class="text-xs font-bold">A</span>
            </div>
          </div>
  
          {/* Kolom Daya */}
          <div class="flex flex-col items-center justify-center text-center bg-gray-50 rounded-lg py-1">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Daya Input</span>
            <div class="flex items-baseline gap-1 text-green-600">
              <span class="text-2xl font-black">{p}</span>
              <span class="text-xs font-bold">W</span>
            </div>
          </div>
  
        </div>
      </div>
    );
  }