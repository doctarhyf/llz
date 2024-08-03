import { useState } from "react";
import { GetDepartementLabel } from "../../helpers/funcs";
import { IDepartment, TPatient } from "../../helpers/types";
import { DEPARTEMENTS } from "../../helpers/const";

export default function PatientsList({
  patientsf,
  onPatientSelected,
  selectedPatient,
}: {
  patientsf: TPatient[] | undefined;
  onPatientSelected: (pat: TPatient) => void;
  selectedPatient: TPatient | undefined;
}) {
  const [dep, setdep] = useState<string>("all");
  const [showExit, setShowExit] = useState<boolean | undefined>(true);

  return (
    <div className={`  ${selectedPatient ? "hidden" : "block"} w-full sm:w-52`}>
      <div className="my-2">
        <div>
          Filter by Departement (
          {
            patientsf?.filter((it) => (dep === "all" ? true : it.dep === dep))
              .length
          }
          )
        </div>
        <select
          value={dep}
          onChange={(e) => setdep(e.target.value)}
          className=" w-full outline-none p-1 border border-sky-500 hover:border-sky-400 focus:border-purple-500  "
        >
          {Object.entries(DEPARTEMENTS).map(
            (dep: [key: string, d: IDepartment], i: number) => (
              <option key={i} value={dep[1].code}>
                {dep[1].label}
              </option>
            )
          )}
          <option selected value={"all"}>
            ALL
          </option>
        </select>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={showExit}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setShowExit(e.target.checked);
            }}
          />
          AFFICHER SORTIES HOPITAL
        </label>
      </div>
      <div>
        {patientsf
          ?.filter((it) => (dep === "all" ? true : it.dep === dep))
          .filter((it) => (showExit ? true : !it.left_at))
          .map((pat, i) => (
            <div
              key={i}
              onClick={(_) => onPatientSelected(pat)}
              className={` ${
                pat.id === selectedPatient?.id && "bg-sky-800"
              } w-full  cursor-pointer hover:bg-sky-500 hover:text-white 
             border p-2 mb-4 border-slate-500 hover:border-sky-500`}
            >
              <div className={` ${pat.left_at && " line-through italic "}  `}>
                {pat.prenom}, {pat.nom} {pat.postnom}{" "}
              </div>
              <div className="flex  gap-2 items-center font-bold text-sky-400 text-xs   ">
                <span className="flex-grow">
                  {" "}
                  {GetDepartementLabel(pat.dep)}{" "}
                </span>
                {pat.left_at && (
                  <span className="bg-red-500 text-white w-4 h-4 rounded-full  text-[8pt] font-bold   "></span>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
