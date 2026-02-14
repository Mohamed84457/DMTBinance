"use client";
// mui icons
// mui icons
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// mui
import { Tooltip } from "@mui/material";

import { useRouter } from "next/navigation";
export default function RouteBackComponent() {
  // route
  const route = useRouter();
  return (
    <Tooltip title="Back">
      <ArrowBackIosNewIcon
        onClick={() => route.back()}
        className="hover:text-[#F0B90B] cursor-pointer mb-3 hover:-translate"
      />
    </Tooltip>
  );
}
