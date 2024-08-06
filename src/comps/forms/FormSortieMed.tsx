import { useState } from "react";
import { GenerateForm } from "../../helpers/funcs";
import Button from "../UI/Button";

interface ISortieMed {
  created_at?: Date;
  id?: number;
  nom: string;
  stock?: number;
  price: number;
  qty_sortie: number;
  qty_restant?: number;
}

const FormFieldsData = [
  { title: "Nom", propName: "nom", type: "text" },

  { title: "Prix", propName: "nom", type: "text" },
  { title: "Qte a sortir", propName: "nom", type: "text" },

  /*  {
    title: "Forme",
    propName: "forme",
    type: "select",
    options: MEDS_FORMS,
  }, */
];

export default function FormSortieMed() {
  const [data, setdata] = useState<ISortieMed>({
    nom: "Med",
    stock: 0,
    price: 0,
    qty_sortie: 0,
    qty_restant: 0,
  });

  function updateFormDataState(k: string, v: any) {
    setdata((prevState) => ({ ...prevState, [k]: v }));
  }

  return (
    <div>
      <h1>Sortie Med</h1>
      <div>{GenerateForm(FormFieldsData, data, updateFormDataState)}</div>
      <div>
        <Button title="OK" onClick={() => console.log("cool")} />
      </div>
    </div>
  );
}
