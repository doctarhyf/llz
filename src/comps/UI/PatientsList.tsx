import { GetDepartementLabel } from "../../helpers/funcs";
import { TPatient } from "../../helpers/types";

export default function PatientsList({
  patientsf,
  onPatientSelected,
  selectedPatient,
}: {
  patientsf: TPatient[] | undefined;
  onPatientSelected: (pat: TPatient) => void;
  selectedPatient: TPatient | undefined;
}) {
  return (
    <div className={`  ${selectedPatient ? "hidden" : "block"} w-full sm:w-52`}>
      {patientsf?.map((pat, i) => (
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
            <span className="flex-grow"> {GetDepartementLabel(pat.dep)} </span>
            {pat.left_at && (
              <span className="bg-red-500 text-white w-4 h-4 rounded-full  text-[8pt] font-bold   "></span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
