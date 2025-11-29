"use client";

import AllFilters from "@/components/Filtering/AllFilters";
import PaginationComponent from "@/components/Filtering/PaginationComponent";
import { TMeta } from "@/types";
import { TDeliveryPartner } from "@/types/delivery-partner.type";
import { format } from "date-fns";
import { AlertTriangle, Eye, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";

const DELIGO = "#DC3173";

// type Partner = {
//   id: string;
//   name: string;
//   phone: string;
//   email?: string;
//   city: string;
//   vehicle: string;
//   reason: string;
//   suspendedAt: string;
//   avatarColor: string;
// };

// const sampleData: Partner[] = [
//   {
//     id: "DP-4431",
//     name: "Hugo Martins",
//     phone: "+351 912 222 111",
//     email: "hugo.m@example.pt",
//     city: "Lisbon",
//     vehicle: "Motorbike",
//     reason: "Multiple customer complaints",
//     suspendedAt: "2025-11-19T10:30:00Z",
//     avatarColor: "bg-rose-400",
//   },
//   {
//     id: "DP-4420",
//     name: "Carla Duarte",
//     phone: "+351 919 111 444",
//     email: "carla.d@example.pt",
//     city: "Porto",
//     vehicle: "Bicycle",
//     reason: "Verification documents expired",
//     suspendedAt: "2025-11-17T14:20:00Z",
//     avatarColor: "bg-pink-300",
//   },
// ];

interface IProps {
  partnersResult: { data: TDeliveryPartner[]; meta?: TMeta };
}

const sortOptions = [
  { label: "Newest First", value: "-createdAt" },
  { label: "Oldest First", value: "createdAt" },
  { label: "Name (A-Z)", value: "name.firstName" },
  { label: "Name (Z-A)", value: "-name.lastName" },
];

export default function SuspendedPartners({ partnersResult }: IProps) {
  const router = useRouter();
  //   const [partners, setPartners] = useState(sampleData);
  //   const [query, setQuery] = useState("");
  //   const [active, setActive] = useState<Partner | null>(null);

  //   const filtered = useMemo(() => {
  //     const q = query.toLowerCase();
  //     return partners.filter(
  //       (p) =>
  //         p.name.toLowerCase().includes(q) ||
  //         p.phone.toLowerCase().includes(q) ||
  //         (p.email || "").toLowerCase().includes(q) ||
  //         p.city.toLowerCase().includes(q) ||
  //         p.vehicle.toLowerCase().includes(q)
  //     );
  //   }, [partners, query]);

  //   function reinstate(id: string) {
  //     setPartners((prev) => prev.filter((p) => p.id !== id));
  //     setActive(null);
  //   }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <style>{`:root{--deligo:${DELIGO}}`}</style>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="text-red-500" /> Suspended Delivery
            Partners
          </h1>
          <p className="text-sm text-gray-600">
            Fleet Manager can preview & reinstate suspended couriers.
          </p>
        </div>

        {/* Search */}
        {/* <div className="flex items-center bg-white/60 backdrop-blur-xl rounded-xl shadow border border-white/20 overflow-hidden w-full sm:w-96">
          <span className="p-2 text-gray-500">
            <Search size={16} />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search suspended partners…"
            className="px-3 py-2 outline-none text-sm bg-transparent w-full"
          />
        </div> */}
      </div>

      <AllFilters sortOptions={sortOptions} />

      {/* Grid card layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {partnersResult.data?.map((p) => (
          <div
            key={p._id}
            className="group bg-white/40 backdrop-blur-xl border border-white/30 shadow-lg rounded-2xl p-5 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center text-white text-sm font-semibold`}
              >
                {p.name?.firstName || p.name?.lastName
                  ? p.name?.firstName?.[0] + " " + p.name?.lastName?.[0]
                  : "N/A"}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {p.name?.firstName} {p.name?.lastName}
                </h3>
                <p className="text-xs text-gray-500">{p.userId}</p>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <p>
                <strong>Reason:</strong> {p.remarks}
              </p>
              <p>
                <strong>Location:</strong> {p.address?.city}
              </p>
              <p>
                <strong>Vehicle:</strong> {p.vehicleInfo?.vehicleType}
              </p>
              <p className="text-xs text-gray-500">
                Suspended:{" "}
                {p.approvedOrRejectedOrBlockedAt &&
                  format(p.approvedOrRejectedOrBlockedAt, "dd/MM/yyyy")}
              </p>
            </div>

            <div className="flex items-center justify-between mt-5">
              <button
                onClick={() => router.push(`/agent/delivery-partners/${p._id}`)}
                className="px-3 py-2 text-sm rounded-md bg-white border shadow-sm flex items-center gap-2 hover:scale-105 transition"
              >
                <Eye size={14} /> Preview
              </button>

              <button
                // onClick={() => reinstate(p.id)}
                className="px-3 py-2 text-sm rounded-md text-white shadow flex items-center gap-2 hover:scale-105 transition"
                style={{ backgroundColor: DELIGO }}
              >
                <RefreshCcw size={14} /> Reinstate
              </button>
            </div>
          </div>
        ))}
      </div>

      {!!partnersResult?.meta?.totalPage && (
        <div className="px-4 my-4">
          <PaginationComponent
            totalPages={partnersResult?.meta?.totalPage as number}
          />
        </div>
      )}

      {/* Preview Drawer */}
      {/* {active && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setActive(null)}
          />

          <aside className="ml-auto w-full sm:w-96 bg-white shadow-2xl rounded-l-2xl p-6 overflow-y-auto animate-slide-in">
            <h3 className="text-xl font-semibold">{active.name}</h3>
            <p className="text-xs text-gray-500">
              {active.id} • {active.city}
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className={`h-14 w-14 rounded-full flex items-center justify-center text-white text-xl ${active.avatarColor}`}
                >
                  {active.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium">{active.name}</p>
                  <p className="text-xs text-gray-500">{active.email}</p>
                  <p className="text-xs text-gray-500">{active.phone}</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-xs text-gray-500">Suspension Reason</p>
                <p className="font-medium">{active.reason}</p>
              </div>

              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-xs text-gray-500">Suspended On</p>
                <p className="font-medium">
                  {new Date(active.suspendedAt).toLocaleString()}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-xs text-gray-500">Vehicle</p>
                <p className="font-medium">{active.vehicle}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Documents</h4>
                <div className="text-xs text-gray-500 flex items-center gap-2 p-2 border rounded-md bg-white">
                  <FileText size={16} /> No documents available
                </div>
              </div>

              <button
                onClick={() => reinstate(active.id)}
                className="w-full py-2 mt-4 rounded-md text-white font-medium shadow-md"
                style={{ backgroundColor: DELIGO }}
              >
                Reinstate Partner
              </button>
            </div>
          </aside>
        </div>
      )} */}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 220ms cubic-bezier(0.2, 0.9, 0.2, 1) both;
        }
      `}</style>
    </div>
  );
}
