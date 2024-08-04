import { useEffect, useState } from "react";
import MedsList from "../comps/UI/MedsList";
import * as SB from "../db/sb";
import { TABLES_NAMES } from "../helpers/sb.config";
import { TMed } from "../helpers/types";

export default function Pharmacie() {
  return (
    <div>
      <div className=" text-xl py-4 border-b w-full ">Patients</div>
      <MedsList />
    </div>
  );
}
