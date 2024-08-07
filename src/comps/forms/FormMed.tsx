import { useEffect, useState } from "react";
//import { formatDateToYYYYMMDD } from "../../helpers/funcs";
import * as SB from "../../db/sb";
import { MEDS_FORMS } from "../../helpers/const";
import { TABLES_NAMES } from "../../helpers/sb.config";
import { TMed } from "../../helpers/types";
import Button from "../Buttons/Button";
import Loading from "../UI/Loading";
import { GenerateForm } from "../../helpers/funcs";
import ButtonLoading from "../Buttons/ButtonLoading";

type FormProps = {
  onMedAdded: (patient: TMed) => void;
  onCancel: () => void;
  onMedAddError: (error: any) => void;
  updatingMed: TMed | undefined;
  onMedUpdated: (patient: TMed) => void;
};

const FormFieldsData = [
  { title: "Nom", propName: "nom", type: "text" },
  { title: "Nom Generique", propName: "nom_generique", type: "text" },
  { title: "Dosage", propName: "dosage", type: "text" },
  {
    title: "Forme",
    propName: "forme",
    type: "select",
    options: MEDS_FORMS,
  },
  { title: "Fabricant", propName: "fabricant", type: "text" },
  { title: "Date d'expiration", propName: "exp_date", type: "date" },
  {
    title: "Avec Prescription?",
    propName: "need_presc",
    type: "select",
    options: {
      OUI: {
        label: "OUI",
        description: "",
        value: "OUI",
      },
      NON: {
        label: "NON",
        description: "",
        value: "NON",
      },
    },
  },
  { title: "Quantite", propName: "quantity", type: "number" },
  { title: "Prix", propName: "price", type: "number" },
  { title: "Remarques", propName: "remarques", type: "text" },
  { title: "Photo", propName: "photo", type: "file" },
];

export default function FormMed({
  onCancel,
  onMedAdded,
  onMedAddError,
  updatingMed,
  onMedUpdated,
}: FormProps) {
  const [data, setdata] = useState<TMed>(
    updatingMed || {
      nom: "Aspirine",
      nom_generique: "Acide Acétylsalicylique",
      dosage: "500 mg",
      forme: "Comprimé",
      fabricant: "Bayer",
      exp_date: "2025-01-01",
      need_presc: "Non",
      quantity: 100,
      price: 5.99,
      remarques: "Utilisé pour soulager la douleur",
    }
  );
  const [loading, setloading] = useState<boolean>(false);

  async function onSave() {
    setloading(true);
    let res: any;

    if (updatingMed) {
      res = await SB.UpdateItem(TABLES_NAMES.MEDS, data);
    } else {
      res = await SB.InsertItem(TABLES_NAMES.MEDS, data);
    }

    console.log("updiiinnngg", res);

    if (res.id) {
      if (updatingMed) {
        onMedUpdated(res as TMed);
      } else {
        onMedAdded(res as TMed);
      }
    } else if (res.error) {
      onMedAddError(res as any);
    }

    setloading(false);
  }

  function updateFormDataState(k: string, v: any) {
    setdata((prevState) => ({ ...prevState, [k]: v }));
  }

  useEffect(() => {
    console.log("data => ", data);
  }, [data]);

  return (
    <div>
      {loading && <Loading />}

      {updatingMed ? <div>Updateing ID:{data.id}</div> : <div>New Med</div>}
      <div>{GenerateForm<TMed>(FormFieldsData, data, updateFormDataState)}</div>

      <div>
        <ButtonLoading loading={loading} title="SAVE" onClick={onSave} />
        <Button title="CANCEL" onClick={onCancel} />
      </div>
    </div>
  );
}
