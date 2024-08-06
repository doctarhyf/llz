import { useEffect, useState } from "react";
import FormMed from "../comps/forms/FormMed";
import Loading from "../comps/UI/Loading";
import MedCard from "../comps/UI/MedCard";
import MedsList from "../comps/UI/MedsList";
import * as SB from "../db/sb";
import { TABLES_NAMES } from "../helpers/sb.config";
import { ISortieMed, TMed } from "../helpers/types";
import FormSortieMed from "../comps/forms/FormSortieMed";
//cool

export default function Pharmacie() {
  const [meds, setmeds] = useState<TMed[]>([]);
  const [medsf, setmedsf] = useState<TMed[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [q, setq] = useState<string>("");
  const [selectedMed, setSelectedMed] = useState<TMed | undefined>(undefined);
  const [updatingMed, setUpdatingMed] = useState<TMed | undefined>(undefined);
  const [showForm, setShowForm] = useState<boolean | undefined>();
  const [medSortie, setMedSortie] = useState<TMed | undefined>(undefined);

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

  function onMedListSortieMed(med: TMed) {
    setMedSortie(med);
  }

  async function onMedSortieSuccess(m: ISortieMed) {
    setMedSortie(undefined);
    alert("Med sortie success \n" + JSON.stringify(m));
    await loadData();
  }

  function onMedSortieError(_: any) {
    alert("error");
  }

  return (
    <div>
      <div className=" text-xl py-4 border-b w-full ">Pharmacie</div>

      {loading && <Loading />}

      {(showForm || updatingMed) && (
        <FormMed
          updatingMed={updatingMed}
          onMedAdded={onMedAdded}
          onCancel={onCancel}
          onMedAddError={onMedAddError}
          onMedUpdated={onMedUpdated}
        />
      )}

      {!selectedMed && !updatingMed && !showForm && !medSortie && (
        <div>
          <div>
            <input
              placeholder="Recherche medicaments ..."
              type="search"
              value={q}
              onChange={(e) => setq(e.target.value)}
              className=" w-full  sm:w-52 outline-none border p-1 hover:border-sky-700 focus:border-purple-600"
            />
          </div>

          <MedsList
            onMedListNewMed={() => setShowForm(true)}
            onMedListSortieMed={onMedListSortieMed}
            onMedSelected={onMedSelected}
            medsf={medsf}
          />
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

      {medSortie && (
        <FormSortieMed
          med={medSortie}
          onMedSortieSuccess={onMedSortieSuccess}
          onMedSortieError={onMedSortieError}
        />
      )}
    </div>
  );
}
