import { useEffect, useState } from "react";
import FormPatient from "../comps/forms/FormPatient";
import Button from "../comps/UI/Button";
import { TPatient } from "../helpers/types";

export default function Patients() {
  const [users, setusers] = useState<TPatient[]>();
  const [usersf, setusersf] = useState<TPatient[]>();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [q, setq] = useState<string>("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {}

  useEffect(() => {}, [q]);

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
        <FormPatient onCancel={() => setShowForm(false)} />
      ) : (
        <div>
          <input
            type="search"
            className=" w-full sm:w-52 outline-none border p-1 hover:border-sky-700 focus:border-purple-600"
          />
          <div>
            {usersf?.map((u, i) => (
              <div key={i}>
                <div>
                  {u.prenom}, {u.nom} {u.postnom}{" "}
                </div>
                <div>{u.dep}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
