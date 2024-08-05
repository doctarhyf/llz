import { useEffect, useState } from "react";
//import { formatDateToYYYYMMDD } from "../../helpers/funcs";
import * as SB from "../../db/sb";
import { MEDS_FORMS } from "../../helpers/const";
import { TABLES_NAMES } from "../../helpers/sb.config";
import { IFormSelectField, TMed } from "../../helpers/types";
import Button from "../UI/Button";
import Loading from "../UI/Loading";

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

  function updateData(k: string, v: any) {
    setdata((prevState) => ({ ...prevState, [k]: v }));
  }

  useEffect(() => {
    console.log("data => ", data);
  }, [data]);

  function GenerateForm(fieldData: any[]) {
    return fieldData.map((it, i: number) => (
      <div key={i}>
        <div>{it.title}</div>
        {it.type === "select" && it.options ? (
          <select
            onChange={(e) => updateData(it.propName, e.target.value)}
            className=" outline-none p-1 border border-sky-500 hover:border-sky-400 focus:border-purple-500  "
          >
            {Object.values(it.options).map((op: any, i) => (
              <option key={i} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={it.type}
            value={data ? data[it.propName as keyof TMed] : ""}
            onChange={(e) => updateData(it.propName, e.target.value)}
            className=" outline-none p-1 border border-sky-500 hover:border-sky-400 focus:border-purple-500  "
          />
        )}
      </div>
    ));
  }

  return (
    <div>
      {loading && <Loading />}

      <div>{GenerateForm(FormFieldsData)}</div>

      <div>
        <Button title="SAVE" onClick={onSave} />
        <Button title="CANCEL" onClick={onCancel} />
      </div>
    </div>
  );
}
