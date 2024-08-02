import { ReactNode } from "react";
import { TPatient } from "../../helpers/types";
import Button from "./Button";
import { GetDepartementLabel } from "../../helpers/funcs";

const EXCLUDE_COLS = ["id", "created_at", "photo"];

export default function PatientCard({
  selectedPatient,
  onPatientCardOk,
  onPatientCardUpdate,
  onPatientCardDelete,
  onPatientExitHospital,
}: {
  selectedPatient: TPatient | undefined;
  onPatientCardOk: (pat: TPatient | undefined) => void;
  onPatientCardUpdate: (pat: TPatient | undefined) => void;
  onPatientCardDelete: (pat: TPatient | undefined) => void;
  onPatientExitHospital: (pat: TPatient | undefined) => void;
}) {
  return selectedPatient ? (
    <div className="p-4 border h-fit w-full sm:w-fit">
      <div className="text-gray-500 font-serif italic">Patient ID</div>
      <div>
        {selectedPatient &&
          Object.entries(selectedPatient).map(([key, value], index) => (
            <div key={index}>
              {EXCLUDE_COLS.includes(key as never) ? (
                ""
              ) : (
                <div key={index}>
                  <span className=" text-slate-500 inline-block   ">{key}</span>
                  :{" "}
                  <span>
                    {key === "dep"
                      ? GetDepartementLabel(value as string)
                      : (value as ReactNode)}
                  </span>
                </div>
              )}
            </div>
          ))}
      </div>
      <div className="flex gap-2 flex-col lg:flex-row  ">
        <Button title="OK" onClick={() => onPatientCardOk(selectedPatient)} />
        <Button
          title="UPDATE"
          onClick={() => onPatientCardUpdate(selectedPatient)}
        />
        <Button
          title="DELETE"
          onClick={() => onPatientCardDelete(selectedPatient)}
        />
        <Button
          title="SORTIE HOPITAL"
          onClick={() => onPatientExitHospital(selectedPatient)}
        />
      </div>
    </div>
  ) : null;
}
