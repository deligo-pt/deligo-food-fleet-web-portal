"use client"
import { JSX, useMemo, useState } from "react";
import { Search, Eye, Smartphone, MapPin,  } from "lucide-react";



type Partner = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  vehicle: string;
  rating: number;
  online: boolean;
  activeOrders: number;
  lastSeen: string;
  avatarColor: string;
};

const DELIGO = "#DC3173";

const sampleData: Partner[] = [
  {
    id: "DP-1001",
    name: "João Silva",
    phone: "+351 912 345 678",
    email: "joao.silva@example.pt",
    city: "Lisbon",
    vehicle: "Bicycle",
    rating: 4.6,
    online: true,
    activeOrders: 2,
    lastSeen: "Online",
    avatarColor: "bg-pink-400",
  },
  {
    id: "DP-1002",
    name: "Maria Fernandes",
    phone: "+351 919 222 333",
    email: "maria.f@example.pt",
    city: "Porto",
    vehicle: "Motorbike",
    rating: 4.8,
    online: false,
    activeOrders: 0,
    lastSeen: "5 min ago",
    avatarColor: "bg-rose-300",
  },
  {
    id: "DP-1003",
    name: "Rui Costa",
    phone: "+351 914 111 222",
    email: "rui.costa@example.pt",
    city: "Coimbra",
    vehicle: "Scooter",
    rating: 4.3,
    online: true,
    activeOrders: 1,
    lastSeen: "Online",
    avatarColor: "bg-amber-300",
  },
];

export default function ActiveDeliveryPartnersPage(): JSX.Element {
  const [partners] = useState<Partner[]>(sampleData); // Replace with fetch from API
  const [query, setQuery] = useState("");
  const [preview, setPreview] = useState<Partner | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return partners;
    return partners.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.phone.toLowerCase().includes(q) ||
        (p.email || "").toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.vehicle.toLowerCase().includes(q)
    );
  }, [partners, query]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <style>{`:root{--deligo:${DELIGO}}`}</style>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Active Delivery Partners</h1>
          <p className="text-sm text-gray-600">Live availability · online status · active orders</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center bg-white rounded-lg shadow-sm overflow-hidden w-full sm:w-96">
            <span className="p-2 text-gray-500">
              <Search size={16} />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search partners by name, phone, city or vehicle"
              className="px-3 py-2 outline-none text-sm w-full"
            />
          </div>
        </div>
      </div>

      {/* Table container */}
      <div className="bg-white rounded-2xl shadow ring-1 ring-gray-100 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="min-w-full table-fixed divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm text-gray-500 w-56">Partner</th>
                <th className="px-4 py-3 text-left text-sm text-gray-500 hidden md:table-cell">City</th>
                <th className="px-4 py-3 text-left text-sm text-gray-500 hidden lg:table-cell">Vehicle</th>
                <th className="px-4 py-3 text-left text-sm text-gray-500">Status</th>
                <th className="px-4 py-3 text-left text-sm text-gray-500">Active Orders</th>
                <th className="px-4 py-3 text-right text-sm text-gray-500 w-28">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No partners found.
                  </td>
                </tr>
              )}

              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold text-white ${p.avatarColor}`}
                        aria-hidden
                      >
                        {p.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>

                      <div className="truncate">
                        <div className="text-sm font-medium text-gray-900 truncate">{p.name}</div>
                        <div className="text-xs text-gray-500 truncate">{p.id}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 hidden md:table-cell text-sm">{p.city}</td>

                  <td className="px-4 py-4 hidden lg:table-cell text-sm">{p.vehicle}</td>

                  <td className="px-4 py-4 text-sm">
                    {p.online ? (
                      <span className="inline-flex items-center gap-2 text-green-600 font-medium">
                        <span className="h-2 w-2 rounded-full bg-green-600 inline-block" /> Online
                      </span>
                    ) : (
                      <span className="text-gray-500">Last seen: {p.lastSeen}</span>
                    )}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium">{p.activeOrders}</td>

                  <td className="px-4 py-4 text-right">
                    <div className="inline-flex items-center justify-end gap-2">
                      <button
                        onClick={() => setPreview(p)}
                        className="px-3 py-2 rounded-md bg-white border shadow-sm text-sm flex items-center gap-2 hover:scale-105 transform transition"
                        aria-label={`Preview ${p.name}`}
                      >
                        <Eye size={14} /> Preview
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* footer */}
        <div className="px-4 py-3 flex items-center justify-between text-sm text-gray-600">
          <div>Showing <strong>{filtered.length}</strong> active partners</div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-md border text-xs">Prev</button>
            <button className="px-3 py-1 rounded-md border text-xs">Next</button>
          </div>
        </div>
      </div>

      {/* Preview Drawer */}
      {preview && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setPreview(null)} />

          <aside className="ml-auto w-full sm:w-96 bg-white shadow-2xl rounded-l-2xl p-6 overflow-y-auto animate-slide-in">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{preview.name}</h3>
                <p className="text-xs text-gray-500">{preview.id} • {preview.city}</p>
              </div>

              <div className="text-xs text-gray-400">Preview only</div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className={`h-14 w-14 rounded-full flex items-center justify-center text-white ${preview.avatarColor}`}>
                  {preview.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                </div>

                <div>
                  <div className="text-sm font-medium">{preview.name}</div>
                  <div className="text-xs text-gray-500">{preview.email || "—"}</div>
                  <div className="text-xs text-gray-500">{preview.phone}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-gray-50">
                  <div className="text-xs text-gray-500">Vehicle</div>
                  <div className="font-medium">{preview.vehicle}</div>
                </div>

                <div className="p-3 rounded-lg bg-gray-50">
                  <div className="text-xs text-gray-500">Rating</div>
                  <div className="font-medium">{preview.rating.toFixed(1)}</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 flex items-center gap-3">
                <Smartphone size={18} className="text-gray-600" />
                <div className="text-sm">
                  Status: <strong>{preview.online ? "Online" : "Offline"}</strong>
                  {!preview.online && <div className="text-xs text-gray-500">Last seen: {preview.lastSeen}</div>}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium">Active orders</div>
                <div className="text-xs text-gray-500">{preview.activeOrders} active order(s)</div>
              </div>

              <div>
                <div className="text-sm font-medium">Location (last known)</div>
                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                  <MapPin size={14} /> Last known: {preview.city}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium">Activity</div>
                <ul className="mt-2 text-xs text-gray-500 space-y-1">
                  <li>Joined: {new Date().toLocaleDateString()}</li>
                  <li>Trips: —</li>
                  <li>Rating: {preview.rating.toFixed(1)}</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* small animation */}
      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(8px); opacity: 0 }
          to { transform: translateX(0); opacity: 1 }
        }
        .animate-slide-in { animation: slide-in 180ms cubic-bezier(.2,.9,.2,1) both }
      `}</style>
    </div>
  );
}
