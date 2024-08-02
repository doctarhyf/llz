import { useEffect, useState } from "react";
import FormPatient from "../comps/forms/FormPatient";
import Button from "../comps/UI/Button";
import { TPatient } from "../helpers/types";
import Alert, { TAlertMessage } from "../comps/UI/Alert";
import { TABLES_NAMES } from "../helpers/sb.config";
import * as SB from "../db/sb";

import PatientsList from "../comps/UI/PatientsList";
import PatientCard from "../comps/UI/PatientCard";
export default function Patients() {
  const [patients, setPatients] = useState<TPatient[]>();
  const [patientsf, setPatientsf] = useState<TPatient[]>();
  const [showFormPatient, setShowFormPatient] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<TAlertMessage | undefined>(
    undefined
  );
  const [q, setq] = useState<string>("");
  const [selectedPatient, setSelectedPatient] = useState<TPatient | undefined>(
    undefined
  );

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

  function onPatientSelected(pat: TPatient) {
    console.log(pat);
    setSelectedPatient(pat);
  }

  function onPatientCardOk(pat: TPatient | undefined) {
    setSelectedPatient(undefined);
    console.log(pat);
  }

  function onPatientCardUpdate(pat: TPatient | undefined) {
    // setSelectedPatient(undefined);
    setShowFormPatient(true);
    console.log(pat);
  }

  function onPatientCardDelete(pat: TPatient | undefined) {
    setSelectedPatient(undefined);
    if (window.confirm(`Delete ${pat?.prenom} ${pat?.nom}?`)) {
    } else {
    }
    //console.log(pat);
  }

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
          <div className="flex gap-4 py-4  ">
            <PatientsList
              onPatientSelected={onPatientSelected}
              patientsf={patientsf}
              selectedPatient={selectedPatient}
            />
            <PatientCard
              onPatientCardOk={onPatientCardOk}
              onPatientCardUpdate={onPatientCardUpdate}
              onPatientCardDelete={onPatientCardDelete}
              selectedPatient={selectedPatient}
            />
          </div>
        </div>
      )}
    </div>
  );
}
