import { useEffect, useState } from "react";
import FormMed from "../comps/forms/FormMed";
import Loading from "../comps/UI/Loading";
import MedCard from "../comps/UI/MedCard";
import MedsList from "../comps/UI/MedsList";
import * as SB from "../db/sb";
import { TABLES_NAMES } from "../helpers/sb.config";
import { ISortieMed, ITab, TMed, TTabs } from "../helpers/types";
import FormSortieMed from "../comps/forms/FormSortieMed";
import TabsContainer from "../comps/UI/TabsContainer";
//cool

export default function Pharmacie() {
  const [loading, setloading] = useState<boolean>(false);

  const [selectedMed, setSelectedMed] = useState<TMed | undefined>(undefined);
  const [updatingMed, setUpdatingMed] = useState<TMed | undefined>(undefined);

  const [medSortie, setMedSortie] = useState<TMed | undefined>(undefined);

  function onMedAdded(med: TMed) {
    console.log(med);

    setSelectedMed(undefined);
    setUpdatingMed(undefined);
    setseltab(TABS.MEDS_LIST);
  }

  function onCancel() {
    setSelectedMed(undefined);
    setUpdatingMed(undefined);
    setseltab(TABS.MEDS_LIST);
    console.log("cool");
  }

  function onMedAddError(med: TMed) {
    console.log(med);
  }

  function onMedUpdated(med: TMed) {
    console.log(med);
    init();
  }

  function onMedSelected(med: TMed) {
    //setNextTab(TABS.MEDS_CARD);
    setSelectedMed(med);
  }
  //beta 1
  useEffect(() => {
    if (selectedMed) {
      setseltab(TABS.MEDS_CARD);
    } else {
      setseltab(TABS.MEDS_LIST);
    }
  }, [selectedMed]);

  function onMedCardOkay() {
    setSelectedMed(undefined);
  }

  function onMedCardUpdate(med: TMed) {
    //setSelectedMed(undefined);
    setUpdatingMed(med);
    // setseltab(TABS.FORM_MED);
    //alert("cool");
  }

  useEffect(() => {
    if (updatingMed) {
      setseltab(TABS.FORM_MED);
    } else {
      setseltab(TABS.MEDS_LIST);
    }
  }, [updatingMed]);

  async function onMedCardDelete(med: TMed) {
    if (window.confirm(`Delete "${med.nom}"?`)) {
      console.log(med);
      setloading(true);
      const r = await SB.DeleteItem(TABLES_NAMES.MEDS, med);
      if (r === null) {
        alert("Med deleted!");
        init();
      }
      setloading(false);
    }
  }

  function init() {
    setSelectedMed(undefined);
    setUpdatingMed(undefined);
  }

  function onMedListSortieMed(med: TMed) {
    setMedSortie(med);
  }

  useEffect(() => {
    setseltab(TABS.FORM_SORTIE);
  }, [medSortie]);

  async function onMedSortieSuccess(m: ISortieMed) {
    setMedSortie(undefined);
    alert("Med sortie success \n" + JSON.stringify(m));
  }

  function onMedSortieError(_: any) {
    alert("error");
  }

  /* function onMedListNewMed() {
    setseltab(TABS.FORM_MED);
  } */

  let TABS: TTabs = {
    MEDS_LIST: {
      label: "LISTE PRODUITS",
      comp: (
        <MedsList
          // onMedListNewMed={onMedListNewMed}
          selectedMed={selectedMed}
          onMedListSortieMed={onMedListSortieMed}
          onMedSelected={onMedSelected}
        />
      ),
    },
    FORM_MED: {
      label: "NOUVEAU PRODUIT",
      comp: (
        <FormMed
          updatingMed={updatingMed}
          onMedAdded={onMedAdded}
          onCancel={onCancel}
          onMedAddError={onMedAddError}
          onMedUpdated={onMedUpdated}
        />
      ),
      hide: true,
    },

    MEDS_CARD: {
      label: " Med Card ",
      comp: selectedMed ? (
        <MedCard
          onMedCardDelete={onMedCardDelete}
          selectedMed={selectedMed}
          onMedCardOkay={onMedCardOkay}
          onMedCardUpdate={onMedCardUpdate}
        />
      ) : (
        <div>No selected med : {selectedMed}</div>
      ),
      hide: true,
    },
    FORM_SORTIE: {
      label: "Form Sortie",
      comp: (
        <FormSortieMed
          med={medSortie}
          onMedSortieSuccess={onMedSortieSuccess}
          onMedSortieError={onMedSortieError}
        />
      ),
      hide: true,
    },
  };

  const [seltab, setseltab] = useState<ITab>(TABS.FORM_MED);
  function onTabSelected(tab: ITab) {
    setseltab(tab);
    console.log(tab);
  }

  return (
    <div>
      <div className=" text-xl py-4 border-b w-full ">Pharmacie</div>

      {loading && <Loading />}

      <TabsContainer
        tabs={TABS}
        seltab={seltab}
        onTabSelected={onTabSelected}
      />
    </div>
  );
}
