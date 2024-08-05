import { useEffect, useState } from "react";
import FormMed from "../comps/forms/FormMed";
import MedsList from "../comps/UI/MedsList";
import * as SB from "../db/sb";
import { TMed } from "../helpers/types";
import Loading from "../comps/UI/Loading";
import { TABLES_NAMES } from "../helpers/sb.config";
import Button from "../comps/UI/Button";
import MedCard from "../comps/UI/MedCard";
//cool

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
    loadData();
    setShowForm(false);
    setSelectedMed(undefined);
    setUpdatingMed(undefined);
  }

  function onCancel() {
    setSelectedMed(undefined);
    setUpdatingMed(undefined);
    setShowForm(false);
  }

  function onMedAddError(med: TMed) {
    console.log(med);
  }

  function onMedUpdated(med: TMed) {
    console.log(med);
    init();
    loadData();
  }

  function onMedSelected(med: TMed) {
    console.log(med);
    setSelectedMed(med);
  }

  function onMedCardOkay() {
    setSelectedMed(undefined);
  }

  function onMedCardUpdate(med: TMed) {
    setSelectedMed(undefined);
    setUpdatingMed(med);
  }

  async function onMedCardDelete(med: TMed) {
    if (window.confirm(`Delete "${med.nom}"?`)) {
      console.log(med);
      setloading(true);
      const r = await SB.DeleteItem(TABLES_NAMES.MEDS, med);
      if (r === null) {
        loadData();
        alert("Med deleted!");
        init();
      }
      setloading(false);
    }
  }

  function init() {
    setSelectedMed(undefined);
    setUpdatingMed(undefined);
    setShowForm(false);
  }

  return (
    <div>
      <div className=" text-xl py-4 border-b w-full ">Pharmacie</div>
      {}
      {loading && <Loading />}
      <div>
        <input
          type="search"
          value={q}
          onChange={(e) => setq(e.target.value)}
          className=" w-full  sm:w-52 outline-none border p-1 hover:border-sky-700 focus:border-purple-600"
        />
      </div>

      {(showForm || updatingMed) && (
        <FormMed
          updatingMed={updatingMed}
          onMedAdded={onMedAdded}
          onCancel={onCancel}
          onMedAddError={onMedAddError}
          onMedUpdated={onMedUpdated}
        />
      )}

      {!selectedMed && !updatingMed && !showForm && (
        <div>
          <Button title="New Med" onClick={() => setShowForm(true)} />
          <MedsList onMedSelected={onMedSelected} medsf={medsf} />
        </div>
      )}

      {selectedMed && (
        <MedCard
          onMedCardDelete={onMedCardDelete}
          selectedMed={selectedMed}
          onMedCardOkay={onMedCardOkay}
          onMedCardUpdate={onMedCardUpdate}
        />
      )}
    </div>
  );
}
