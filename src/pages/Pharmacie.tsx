import { useEffect, useState } from "react";
import FormMed from "../comps/forms/FormMed";
import MedsList from "../comps/UI/MedsList";
import * as SB from "../db/sb";
import { TMed } from "../helpers/types";
import Loading from "../comps/UI/Loading";
import { TABLES_NAMES } from "../helpers/sb.config";
import Button from "../comps/UI/Button";

type TError = [k: string, v: any];

export default function Pharmacie() {
  const [meds, setmeds] = useState<TMed[]>([]);
  const [medsf, setmedsf] = useState<TMed[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [q, setq] = useState<string>("");
  const [selectedMed, setSelectedMed] = useState<TMed | undefined>(undefined);
  const [updatingMed, setUpdatingMed] = useState<TMed | undefined>(undefined);
  const [showForm, setShowForm] = useState<boolean | undefined>();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterMeds(q);
  }, [q]);

  function filterMeds(q: string) {
    if (q === "") {
      setmedsf(meds);
      return;
    }

    setmedsf(meds.filter((m) => m.nom.toLowerCase().includes(q.toLowerCase())));
  }

  async function loadData() {
    console.log(meds);
    setloading(true);
    const m = (await SB.LoadAllItems(TABLES_NAMES.MEDS)) as any;

    setmeds(m);
    setmedsf(m);

    if (m.error) {
      setmeds([]);
      setmedsf([]);
    }
    setloading(false);
  }

  function onMedAdded(med: TMed) {
    console.log(med);
  }

  function onCancel() {
    setShowForm(false);
  }

  function onMedAddError(med: TMed) {
    console.log(med);
  }

  function onMedUpdated(med: TMed) {
    console.log(med);
    setUpdatingMed(med);
  }

  function onMedSelected(med: TMed) {
    console.log(med);
    setSelectedMed(med);
  }

  return (
    <div>
      <div className=" text-xl py-4 border-b w-full ">Pharmacie</div>
      <Button title="New Med" onClick={() => setShowForm(true)} />
      {loading && <Loading />}
      <div>
        <input
          type="search"
          value={q}
          onChange={(e) => setq(e.target.value)}
          className=" w-full  sm:w-52 outline-none border p-1 hover:border-sky-700 focus:border-purple-600"
        />
      </div>
      {selectedMed || showForm || updatingMed ? (
        <FormMed
          updatingMed={updatingMed}
          onMedAdded={onMedAdded}
          onCancel={onCancel}
          onMedAddError={onMedAddError}
          onMedUpdated={onMedUpdated}
        />
      ) : (
        <MedsList onMedSelected={onMedSelected} medsf={medsf} />
      )}
    </div>
  );
}
