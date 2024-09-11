"use client";
import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { useFetchItem } from "@/hooks/useFetchItem";
import { ExploreType } from "@/lib/types";
import { Input } from "@/components/ui/input";

const processCreatorsData = (data: any[]) => {
  return data.map((docData: any) => {
    let averageRating = 0;
    if (Array.isArray(docData.rating)) {
      if (docData.rating.length > 0) {
        averageRating =
          docData.rating.reduce(
            (acc: number, cur: any) => acc + cur.rating,
            0
          ) / docData.rating.length;
      }
    } else {
      averageRating = docData.rating;
    }

    return { ...docData, averageRating };
  });
};

interface ExploreProps {
  searchQuery: string;
  setSearchQuery: any;
  handleSearch: (query: string) => void;
}

const Explore: React.FC<ExploreProps> = ({
  searchQuery,
  handleSearch,
  setSearchQuery,
}) => {
  const [filteredItems, setFilteredItems] = useState<ExploreType[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // Sorting state
  const router = useRouter();
  const {
    data: items = [],
    isLoading,
    refetch,
  } = useFetchItem({
    collectionName: "creators",
    processData: processCreatorsData,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 1000);

    return () => clearInterval(intervalId);
  });

  useEffect(() => {
    let sortedItems = [...items];

    if (sortOrder === "asc") {
      sortedItems.sort((a, b) => a.averageRating - b.averageRating); // Ascending order
    } else if (sortOrder === "desc") {
      sortedItems.sort((a, b) => b.averageRating - a.averageRating); // Descending order
    }

    if (searchQuery) {
      const filtered = sortedItems.filter((item: ExploreType) =>
        item?.categories?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(sortedItems);
    }
  }, [searchQuery, items, sortOrder]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (handleSearch) {
      handleSearch(value);
    }
  };

  const handleSortChange = (order: "asc" | "desc") => {
    setSortOrder(order); // Update sorting order
  };

  const handleClick = (id: string) => {
    router.push(`/explore/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100svh]">
        <ClipLoader color="#501078" />
      </div>
    );
  }

  return (
    <div className="pt-[25%] lg:pt-[10%] px-4 sm:px-[6%] w-full">
      <div className="flex justify-between mb-[25px] lg:hidden">
        <Input
          className="w-full border-2 border-[black] h-[50px] focus-visible:ring-transparent focus-visible:ring-offset-0 outline-none"
          placeholder="Search by category"
          onChange={handleInputChange}
          value={searchQuery}
        />
        {/* Sort Button */}
        <div className="ml-4">
          <select
            className="border-2 border-black h-[50px] px-4"
            onChange={(e) => handleSortChange(e.target.value as "asc" | "desc")}
            value={sortOrder}
          >
            <option value="desc">Highest Rating</option>
            <option value="asc">Lowest Rating</option>
          </select>
        </div>
      </div>

      {searchQuery && filteredItems.length === 0 ? (
        <div className="flex justify-center items-center h-[50svh]">
          <p>No project found under the selected category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {filteredItems.map((creator: ExploreType) => (
            <div
              key={creator.id}
              className="bg-white p-4 rounded-lg shadow-lg lg:bg-none lg:rounded-none lg:shadow-none cursor-pointer"
              onClick={() => handleClick(creator.id)}
            >
              <div className="w-full h-[300px]">
                <img
                  src={creator.src || "/default-image.jpg"}
                  alt="creator's image"
                  className="w-full h-full object-cover rounded-[16px]"
                />
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2 rounded-full">
                  <img
                    src={creator.profileImage}
                    alt="profile-image"
                    className="rounded-full w-[30px] h-[30px]"
                  />
                  <p className="text-sm sm:text-lg md:text-[16px] font-bold">
                    {creator.name} - {creator.categories}
                  </p>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span key={index}>
                      {creator.averageRating! > index ? (
                        <AiFillStar className="text-[#FFD700]" size={18} />
                      ) : (
                        <AiOutlineStar className="text-[#FFD700]" size={18} />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { Explore };
