"use client";

import { AddDeliveryPartner } from "@/components/Dashboard/DeliveryPartner/AddDeliveryPartner";
import DeliveryPartnerCard from "@/components/Dashboard/DeliveryPartner/DeliveryPartnerCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { USER_STATUS } from "@/consts/user.const";
import { TMeta, TResponse } from "@/types";
import {
  TDeliveryPartner,
  TDeliveryPartnersQueryParams,
} from "@/types/delivery-partner.type";
import { getCookie } from "@/utils/cookies";
import { fetchData } from "@/utils/requests";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCcw, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";

const mockDeliveryPartners: TDeliveryPartner[] = Array(24)
  .fill(null)
  .map((_, index) => ({
    email: `partner${index + 1}@example.com`,
    status: Object.keys(USER_STATUS)[index % 4] as keyof typeof USER_STATUS,
    isEmailVerified: index % 3 === 0,
    isDeleted: false,
    name: {
      firstName: `Partner${index + 1}`,
      lastName: `LastName${index + 1}`,
    },
    contactNumber: `+1 ${Math.floor(100000000 + Math.random() * 900000000)}`,
    profilePhoto: undefined,
    operationalData: {
      rating: {
        average: 3 + Math.random() * 2,
        totalReviews: Math.floor(10 + Math.random() * 90),
      },
    },
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    updatedAt: new Date(),
  }));

const sortOptions = {
  "createdAt-desc": {
    field: "-createdAt",
    label: "Newest First",
  },
  "createdAt-asc": {
    field: "createdAt",
    label: "Oldest First",
  },
  "name-asc": {
    field: "name",
    label: "Name (A-Z)",
  },
  "name-desc": {
    field: "-name",
    label: "Name (Z-A)",
  },
  "rating-desc": {
    field: "-operationalData.rating.average",

    label: "Highest Rated",
  },
  "rating-asc": {
    field: "operationalData.rating.average",

    label: "Lowest Rated",
  },
};

export default function DeliveryPartners() {
  const [partnersResult, setPartnersResult] = useState<{
    data: TDeliveryPartner[];
    meta?: TMeta;
  }>({ data: mockDeliveryPartners });
  const [queryParams, setQueryParams] = useState<TDeliveryPartnersQueryParams>({
    limit: 10,
    page: 1,
    searchTerm: "",
    sort: "-createdAt",
    status: "",
    isEmailVerified: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    status: "",
    isEmailVerified: "",
  });

  async function getDeliveryPartners(params?: TDeliveryPartnersQueryParams) {
    try {
      const result = (await fetchData("/delivery-partners", {
        params: params || queryParams,
        headers: {
          authorization: getCookie("accessToken"),
        },
      })) as unknown as TResponse<TDeliveryPartner[]>;

      if (result.success) {
        setPartnersResult({
          data: result.data,
          meta: result.meta,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = (value: string) => {
    setQueryParams((prevQuery) => ({ ...prevQuery, searchTerm: value }));
    getDeliveryPartners({
      ...queryParams,
      searchTerm: value,
    });
  };

  const handleSort = (value: string) => {
    setQueryParams((prevQuery) => ({ ...prevQuery, sort: value }));
    getDeliveryPartners({
      ...queryParams,
      sort: value,
    });
  };

  const handleAddFilter = () => {
    if (activeFilters.status.length > 0) {
      setQueryParams((prevQuery) => ({
        ...prevQuery,
        status: queryParams.status,
      }));
    }
    if (activeFilters.isEmailVerified.length > 0) {
      setQueryParams((prevQuery) => ({
        ...prevQuery,
        isEmailVerified: queryParams.isEmailVerified,
      }));
    }
    getDeliveryPartners({
      ...queryParams,
      status: queryParams.status,
      isEmailVerified: queryParams.isEmailVerified,
    });
    setShowFilters(false);
  };

  const removeFilter = (key: "status" | "isEmailVerified") => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [key]: "",
    }));
    setQueryParams((prevQuery) => ({
      ...prevQuery,
      [key]: "",
    }));
    getDeliveryPartners({
      ...queryParams,
      [key]: "",
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({
      status: "",
      isEmailVerified: "",
    });
    setQueryParams((prevQuery) => ({
      ...prevQuery,
      status: "",
      isEmailVerified: "",
    }));
    getDeliveryPartners({
      ...queryParams,
      status: "",
      isEmailVerified: "",
    });
  };

  useEffect(() => {
    (() => getDeliveryPartners())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full p-8">
      <div className="bg-linear-to-r from-[#DC3173] to-[#FF6CAB] p-6 rounded-lg mb-6 shadow-lg">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Delivery Partners
            </h1>
            <p className="text-pink-100 mt-1">
              Manage your delivery partner network
            </p>
          </div>
          <AddDeliveryPartner refetch={getDeliveryPartners} />
        </div>
      </div>
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search partners..."
              value={queryParams.searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="w-full lg:w-48">
              <Select
                value={queryParams.sort}
                onValueChange={(value) => handleSort(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(sortOptions).map(([key, option]) => (
                    <SelectItem key={key} value={key}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              className={`flex items-center ${
                showFilters ||
                (activeFilters.isEmailVerified
                  ? 1
                  : 0 + activeFilters.status
                  ? 1
                  : 0) > 0
                  ? "border-[#DC3173] text-[#DC3173]"
                  : ""
              }`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters{" "}
              {activeFilters.isEmailVerified
                ? 1
                : 0 + activeFilters.status
                ? 1
                : 0}
            </Button>
          </div>
        </div>

        {Object.values(activeFilters).length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {activeFilters.status.length > 0 && (
              <Badge
                variant="outline"
                className="text-[#DC3173] border-[#DC3173]"
              >
                {activeFilters.status}
                <X
                  className="ml-2 h-4 w-4"
                  onClick={() => removeFilter("status")}
                />
              </Badge>
            )}
            {activeFilters.isEmailVerified.length > 0 && (
              <Badge
                variant="outline"
                className="text-[#DC3173] border-[#DC3173]"
              >
                {activeFilters.isEmailVerified}
                <X
                  className="ml-2 h-4 w-4"
                  onClick={() => removeFilter("isEmailVerified")}
                />
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-sm text-[#DC3173] hover:text-[#DC3173] hover:bg-pink-50"
            >
              <RefreshCcw className="h-3 w-3 mr-1" /> Clear All
            </Button>
          </div>
        )}

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              className="overflow-hidden"
            >
              <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Status
                    </label>
                    <Select
                      value={queryParams.status}
                      onValueChange={(value) =>
                        setActiveFilters((prevFilters) => ({
                          ...prevFilters,
                          status: value,
                        }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(USER_STATUS).map((status) => (
                          <SelectItem key={status} value={status || "a"}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email Verification
                    </label>
                    <Select
                      value={queryParams.isEmailVerified}
                      onValueChange={(value) =>
                        setActiveFilters((prevFilters) => ({
                          ...prevFilters,
                          isEmailVerified: value,
                        }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="verified">Verified</SelectItem>
                        <SelectItem value="not-verified">
                          Not Verified
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="ghost"
                    className="mr-2"
                    onClick={() => setShowFilters(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddFilter}>Apply Filters</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">
          Showing{" "}
          {((partnersResult.meta?.page || 1) - 1) *
            (partnersResult.meta?.limit || 10) +
            1}
          -
          {(partnersResult.meta?.page || 1) *
            (partnersResult.meta?.limit || 10)}{" "}
          of {partnersResult.meta?.total || 0} partners
        </p>
      </div>

      {partnersResult?.data?.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {partnersResult?.data?.map((partner) => (
              <DeliveryPartnerCard key={partner.email} partner={partner} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">No partners found</h3>
          <p className="text-gray-500 max-w-md">
            No delivery partners match your current filters. Try adjusting your
            search or filters to find what you&lsquo;re looking for.
          </p>
          <Button variant="outline" className="mt-4" onClick={clearAllFilters}>
            Clear All Filters
          </Button>
        </motion.div>
      )}
      {/* Pagination */}
      {partnersResult?.data?.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Pagination />
        </div>
      )}
    </div>
  );
}
