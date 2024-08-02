import { useEffect, useState } from "react";
import FormPatient from "../comps/forms/FormPatient";
import Button from "../comps/UI/Button";
import { TPatient } from "../helpers/types";
import Alert, { TAlertMessage } from "../comps/UI/Alert";
import { TABLES_NAMES } from "../helpers/sb.config";
import * as SB from "../db/sb";

import { GetDepartementFullName } from "../helpers/funcs";
export default function Patients() {
  const [patients, setPatients] = useState<TPatient[]>();
  const [patientsf, setPatientsf] = useState<TPatient[]>();
  const [showFormPatient, setShowFormPatient] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<TAlertMessage | undefined>(
    undefined
  );
  const [q, setq] = useState<string>("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const p = (await SB.LoadAllItems(TABLES_NAMES.PATIENTS)) as TPatient[];
    setPatients(p);
    setPatientsf(p);
  }

  function onPatientAdded(pat: TPatient) {
    alert(JSON.stringify(pat));
    setShowFormPatient(false);
    setAlertMessage({ type: "success", message: "New patient added!" });
  }
  function onPatientAddError(error: any) {
    alert(JSON.stringify(error));
    setAlertMessage({
      type: "error",
      message: `Error adding patient. ${JSON.stringify(error)}`,
    });
  }

  useEffect(() => {
    const ql = q.toLowerCase();

    if (ql === "") {
      setPatientsf(patients);
    } else {
      const pf = patients?.filter(
        (p) =>
          p.nom.toLowerCase().includes(ql) ||
          p.postnom.toLowerCase().includes(ql) ||
          p.prenom.toLowerCase().includes(ql) ||
          p.phone.toLowerCase().includes(ql) ||
          p.dob.toLowerCase().includes(ql)
      );

      setPatientsf(pf);
    }
  }, [q]);

  return (
    <div className="">
      <div className=" text-xl py-4 border-b w-full ">Patients</div>
      <div>
        <Button
          title="Nouveau Patient"
          onClick={() => setShowFormPatient(!showFormPatient)}
        />
      </div>
      {showFormPatient ? (
        <FormPatient
          onPatientAdded={onPatientAdded}
          onPatientAddError={onPatientAddError}
          onCancel={() => setShowFormPatient(false)}
        />
      ) : (
        <div>
          <input
            type="search"
            value={q}
            onChange={(e) => setq(e.target.value)}
            className=" w-full sm:w-52 outline-none border p-1 hover:border-sky-700 focus:border-purple-600"
          />
          <Alert alertMessage={alertMessage} />
          <div>
            {patientsf?.map((u, i) => (
              <div
                key={i}
                className="  cursor-pointer hover:bg-sky-500 hover:text-white  border p-2 my-1 border-slate-500 hover:border-sky-500"
              >
                <div>
                  {u.prenom}, {u.nom} {u.postnom}{" "}
                </div>
                <div className=" font-bold text-sky-400 text-xs text-center  ">
                  {GetDepartementFullName(u.dep)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
