import { useEffect, useState } from "react";
import FormPatient from "../comps/forms/FormPatient";
import Button from "../comps/UI/Button";
import { TPatient } from "../helpers/types";
import Alert, { TAlertMessage } from "../comps/UI/Alert";
import { TABLES_NAMES } from "../helpers/sb.config";
import * as SB from "../db/sb";

import PatientsList from "../comps/UI/PatientsList";
import PatientCard from "../comps/UI/PatientCard";
import Loading from "../comps/UI/Loading";

export default function Patients() {
  const [loading, setloading] = useState<boolean>(false);
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

  async function loadData(deleteAlert: boolean = false) {
    setloading(true);
    const p = (await SB.LoadAllItems(TABLES_NAMES.PATIENTS)) as TPatient[];
    setPatients(p);
    setPatientsf(p);
    setloading(false);
    if (deleteAlert) setAlertMessage(undefined);
  }

  function onPatientAdded(pat: TPatient) {
    alert(JSON.stringify(pat));
    setShowFormPatient(false);
    setAlertMessage({ type: "success", message: "New patient added!" });
    loadData(true);
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
    setAlertMessage(undefined);
  }

  function onPatientCardUpdate(pat: TPatient | undefined) {
    // setSelectedPatient(undefined);
    setShowFormPatient(true);
    console.log(pat);
  }

  function onPatientUpdated(pat: TPatient | undefined) {
    setShowFormPatient(false);
    loadData();
    console.log(pat);
    alert("updated");
    if (selectedPatient) {
      setSelectedPatient(pat);
    }
  }

  async function onPatientCardDelete(pat: TPatient | undefined) {
    if (window.confirm(`Delete ${pat?.prenom} ${pat?.nom}?`)) {
      const r = await SB.DeleteItem(TABLES_NAMES.PATIENTS, pat);

      if (null === r) {
        setSelectedPatient(undefined);
        setPatientsf((old) => old?.filter((it) => it.id !== pat?.id));
      }
    }
  }

  async function onPatientExitHospital(pat: TPatient | undefined) {
    console.log(pat);
    if (
      window.confirm(`Sortie hopital du patient ${pat?.prenom} ${pat?.nom}?`)
    ) {
      const r = await SB.UpdateItem(TABLES_NAMES.PATIENTS, {
        id: pat?.id,
        left_at: new Date().toISOString(),
      });
      console.log(r);
      if (r.id) {
        alert(`Le patient "${pat?.prenom} ${pat?.nom}" a quitte l'hopital`);
        setSelectedPatient(undefined);
        loadData();
      } else {
        console.log(r);
        alert("Error \n" + JSON.stringify(r));
      }
    }
  }

  return (
    <div className="">
      <div className=" text-xl py-4 border-b w-full ">Patients</div>

      <div className="flex gap-2">
        <Button
          title="Nouveau Patient"
          onClick={() => setShowFormPatient(!showFormPatient)}
        />
        <Button
          title="Refrresh"
          onClick={() => {
            loadData();
            setSelectedPatient(undefined);
          }}
        />
      </div>

      {showFormPatient ? (
        <FormPatient
          onPatientUpdated={onPatientUpdated}
          onPatientAdded={onPatientAdded}
          onPatientAddError={onPatientAddError}
          onCancel={() => setShowFormPatient(false)}
          updatingPatient={selectedPatient}
        />
      ) : (
        <div className="flex flex-col">
          <input
            type="search"
            value={q}
            onChange={(e) => setq(e.target.value)}
            className=" w-full sm:w-52 outline-none border p-1 hover:border-sky-700 focus:border-purple-600"
          />
          {loading && <Loading />}
          <Alert alertMessage={alertMessage} />
          <div className="flex gap-4 py-4    ">
            <PatientsList
              onPatientSelected={onPatientSelected}
              patientsf={patientsf}
              selectedPatient={selectedPatient}
            />
            <PatientCard
              onPatientExitHospital={onPatientExitHospital}
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
