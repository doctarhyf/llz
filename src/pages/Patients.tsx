import { useState } from "react";
import FormNewPatient from "../comps/forms/FormNewPatient";

export default function Patients() {
  //const [loading, setloading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <div className="">
      <div className=" text-xl py-4 border-b w-full ">Patients</div>
      <div>
        <button onClick={(_) => setShowForm(!showForm)}>NEW AGENT</button>
      </div>
      {showForm ? (
        <FormNewPatient />
      ) : (
        <div>
          <input type="search" />
          <div></div>
        </div>
      )}
    </div>
  );
}
