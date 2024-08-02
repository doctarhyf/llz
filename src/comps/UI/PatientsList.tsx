import { GetDepartementFullName } from "../../helpers/funcs";
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
          <div>
            {pat.prenom}, {pat.nom} {pat.postnom}{" "}
          </div>
          <div className=" font-bold text-sky-400 text-xs   ">
            {GetDepartementFullName(pat.dep)}
          </div>
        </div>
      ))}
    </div>
  );
}
