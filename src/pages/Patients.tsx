import { useState } from "react";
import FormNewPatient from "../comps/forms/FormNewPatient";
import Button from "../comps/Button";

export default function Patients() {
  //const [loading, setloading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <div className="">
      <div className=" text-xl py-4 border-b w-full ">Patients</div>
      <div>
        <Button
          title="Nouveau Patient"
          onClick={() => setShowForm(!showForm)}
        />
      </div>
      {showForm ? (
        <FormNewPatient onCancel={() => setShowForm(false)} />
      ) : (
        <div>
          <input type="search" />
          <div></div>
        </div>
      )}
    </div>
  );
}