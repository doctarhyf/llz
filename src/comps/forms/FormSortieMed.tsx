import { useState } from "react";
import { GenerateForm } from "../../helpers/funcs";

interface ISortieMed {}

export default function FormSortieMed() {
  const [data, setdata] = useState<ISortieMed | undefined>(undefined);

  const fieldData: any = [{}];

  function updateFormDataState(k: string, v: any) {
    setdata((prevState) => ({ ...prevState, [k]: v }));
  }

  return (
    <div>
      <h1>Sortie Med</h1>
      <div>{GenerateForm(fieldData, data, updateFormDataState)}</div>
    </div>
  );
}
