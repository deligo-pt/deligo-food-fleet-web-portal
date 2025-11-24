"use client"
import React, { JSX, useMemo, useState } from "react";
import { Search, Eye, Plus, FileText } from "lucide-react";



type Partner = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  vehicle: string;
  rating: number;
  joinedAt: string;
  documents: { id: string; type: string; name: string }[];
  avatarColor?: string;
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
    joinedAt: "2025-11-01T09:23:00Z",
    documents: [{ id: "d1", type: "ID", name: "Cartão de Cidadão.pdf" }],
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
    joinedAt: "2025-10-28T14:12:00Z",
    documents: [],
    avatarColor: "bg-rose-300",
  },
];

export default function PendingVerificationPage(): JSX.Element {
  const [partners, setPartners] = useState<Partner[]>(sampleData);
  const [query, setQuery] = useState("");
  const [activePartner, setActivePartner] = useState<Partner | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Add form state
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    vehicle: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

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

  function handleAddOpen() {
    setForm({ name: "", phone: "", email: "", city: "", vehicle: "" });
    setFormError(null);
    setIsAddOpen(true);
  }

  function handleFormChange<K extends keyof typeof form>(k: K, v: string) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  function generateId() {
    return "DP-" + Math.floor(1000 + Math.random() * 9000).toString();
  }

  function validateForm() {
    if (!form.name.trim()) return "Name is required";
    if (!form.phone.trim()) return "Phone is required";
    if (!form.city.trim()) return "City is required";
    return null;
  }

  function handleAddSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const err = validateForm();
    if (err) {
      setFormError(err);
      return;
    }
    const newPartner: Partner = {
      id: generateId(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      city: form.city.trim(),
      vehicle: form.vehicle.trim() || "Unknown",
      rating: 0,
      joinedAt: new Date().toISOString(),
      documents: [],
      avatarColor: ["bg-rose-200", "bg-pink-200", "bg-amber-200"][Math.floor(Math.random() * 3)],
    };
    setPartners((p) => [newPartner, ...p]);
    setIsAddOpen(false);
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <style>{`:root{--deligo:${DELIGO}}`}</style>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Delivery Partners — Pending Verification</h1>
          <p className="text-sm text-gray-600">Fleet manager can Preview and Add partners only.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white rounded-lg shadow-sm overflow-hidden w-full sm:w-auto">
            <span className="p-2 text-gray-500">
              <Search size={16} />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search partners by name, phone, city or vehicle"
              className="px-3 py-2 outline-none text-sm w-64 sm:w-80"
            />
          </div>

          <button
            onClick={handleAddOpen}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-white shadow"
            style={{ backgroundColor: DELIGO }}
            aria-label="Add partner"
          >
            <Plus size={16} /> Add Partner
          </button>
        </div>
      </div>

      {/* Table container — avoids unwanted horizontal scroll by hiding less important columns on small screens */}
      <div className="bg-white rounded-2xl shadow ring-1 ring-gray-100 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="min-w-full table-fixed divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm text-gray-500 w-56">Partner</th>
                <th className="px-4 py-3 text-left text-sm text-gray-500 hidden md:table-cell">Contact</th>
                <th className="px-4 py-3 text-left text-sm text-gray-500">City</th>
                <th className="px-4 py-3 text-left text-sm text-gray-500 hidden lg:table-cell">Vehicle</th>
                <th className="px-4 py-3 text-right text-sm text-gray-500 w-28">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
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

                  <td className="px-4 py-4 hidden md:table-cell">
                    <div className="text-sm text-gray-700 truncate">{p.phone}</div>
                    <div className="text-xs text-gray-400 truncate">{p.email || "—"}</div>
                  </td>

                  <td className="px-4 py-4 text-sm">{p.city}</td>

                  <td className="px-4 py-4 hidden lg:table-cell text-sm">{p.vehicle}</td>

                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => setActivePartner(p)}
                      className="px-3 py-2 rounded-md bg-white border shadow-sm text-sm flex items-center gap-2 hover:scale-105 transform transition"
                      aria-label={`Preview ${p.name}`}
                    >
                      <Eye size={14} /> Preview
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer summary */}
        <div className="px-4 py-3 flex items-center justify-between text-sm text-gray-600">
          <div>Showing <strong>{filtered.length}</strong> partners</div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-md border text-xs">Prev</button>
            <button className="px-3 py-1 rounded-md border text-xs">Next</button>
          </div>
        </div>
      </div>

      {/* Preview Drawer */}
      {activePartner && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setActivePartner(null)} />

          <aside className="ml-auto w-full sm:w-96 bg-white shadow-2xl rounded-l-2xl p-6 overflow-y-auto animate-slide-in">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{activePartner.name}</h3>
                <p className="text-xs text-gray-500">{activePartner.id} • {activePartner.city}</p>
              </div>

              {/* Note: no verify/reject here per request */}
              <div className="text-xs text-gray-400">Preview only</div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className={`h-14 w-14 rounded-full flex items-center justify-center text-white ${activePartner.avatarColor}`}>
                  {activePartner.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                </div>

                <div>
                  <div className="text-sm font-medium">{activePartner.name}</div>
                  <div className="text-xs text-gray-500">{activePartner.email || "—"}</div>
                  <div className="text-xs text-gray-500">{activePartner.phone}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-gray-50">
                  <div className="text-xs text-gray-500">Vehicle</div>
                  <div className="font-medium">{activePartner.vehicle}</div>
                </div>

                <div className="p-3 rounded-lg bg-gray-50">
                  <div className="text-xs text-gray-500">Rating</div>
                  <div className="font-medium">{activePartner.rating.toFixed(1)}</div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Documents</div>
                  <div className="text-xs text-gray-400">{activePartner.documents.length} files</div>
                </div>

                <div className="mt-3 space-y-2">
                  {activePartner.documents.length === 0 && (
                    <div className="text-xs text-gray-400">No documents uploaded</div>
                  )}

                  {activePartner.documents.map((d) => (
                    <div key={d.id} className="flex items-center justify-between gap-3 p-2 rounded-md border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-gray-100"><FileText size={16} /></div>
                        <div>
                          <div className="text-sm font-medium">{d.name}</div>
                          <div className="text-xs text-gray-400">{d.type}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a className="text-xs" href="#" onClick={(e)=>e.preventDefault()}>View</a>
                        <button className="text-xs">Download</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium">Activity (recent)</div>
                <ul className="mt-2 text-xs text-gray-500 space-y-2">
                  <li>Joined: {new Date(activePartner.joinedAt).toLocaleString()}</li>
                  <li>Trips: —</li>
                  <li>Last login: —</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Add Partner Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsAddOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Add Partner</h3>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  value={form.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm w-full"
                  placeholder="Full name *"
                  required
                />
                <input
                  value={form.phone}
                  onChange={(e) => handleFormChange("phone", e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm w-full"
                  placeholder="Phone *"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  value={form.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm w-full"
                  placeholder="Email (optional)"
                />
                <input
                  value={form.city}
                  onChange={(e) => handleFormChange("city", e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm w-full"
                  placeholder="City *"
                  required
                />
              </div>

              <input
                value={form.vehicle}
                onChange={(e) => handleFormChange("vehicle", e.target.value)}
                className="px-3 py-2 border rounded-md text-sm w-full"
                placeholder="Vehicle (e.g., Motorbike, Bicycle)"
              />

              {formError && <div className="text-xs text-red-600">{formError}</div>}

              <div className="flex items-center justify-end gap-2 mt-2">
                <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 rounded-md border">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md text-white"
                  style={{ backgroundColor: DELIGO }}
                >
                  Add partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* small animation styles */}
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
