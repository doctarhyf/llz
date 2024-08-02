import { useState } from "react";
import { DEPARTEMENTS } from "../../helpers/const";
import { formatDateToYYYYMMDD } from "../../helpers/funcs";
import { Patient } from "../../helpers/types";
import Button from "../Button";

export default function FormNewPatient({ onCancel }: { onCancel: () => void }) {
  const [data, setdata] = useState<Patient>();

  function onSave() {
    console.log(data);
  }

  return (
    <div>
      <div>
        {/* <div>
          <div>Photo</div>
          <div className="w-48 h-48 bg-slate-600 my-2"></div>
          <input
            type="file"
            className=" outline-none p-1 border border-sky-500 hover:border-sky-400 focus:border-purple-500  "
          /> thisdisi
        </div> */}

        <div>
          <div>Nom</div>
          <input
            type="text"
            value={data?.nom}
            onChange={(e) =>
              setdata((old) =>
                old
                  ? { ...old, nom: e.target.value }
                  : ({ nom: e.target.value } as Patient)
              )
            }
            className=" outline-none p-1 border border-sky-500 hover:border-sky-400 focus:border-purple-500  "
          />
        </div>
        <div>
          <div>Postnom</div>
          <input
            type="text"
            value={data?.postnom}
            onChange={(e) =>
              setdata((old) =>
                old
                  ? { ...old, postnom: e.target.value }
                  : ({ postnom: e.target.value } as Patient)
              )
            }
            className=" outline-none p-1 border border-sky-500 hover:border-sky-400 focus:border-purple-500  "
          />
        </div>
        <div>
          <div>Prenom</div>
          <input
            type="text"
            value={data?.prenom}
            onChange={(e) =>
              setdata((old) =>
                old
                  ? { ...old, prenom: e.target.value }
                  : ({ prenom: e.target.value } as Patient)
              )
            }
            className=" outline-none p-1 border border-sky-500 hover:border-sky-400 focus:border-purple-500  "
          />
        </div>
        <div>
          <div>Phone</div>
          <input
            type="text"
            value={data?.phone}
            onChange={(e) =>
              setdata((old) =>
                old
                  ? { ...old, phone: e.target.value }
                  : ({ phone: e.target.value } as Patient)
              )
            }
            className=" outline-none p-1 border border-sky-500 hover:border-sky-400 focus:border-purple-500  "
          />
        </div>
        <div>
          <div>DOB</div>
          <input
            type="date"
            defaultValue={formatDateToYYYYMMDD(new Date())}
            value={data?.dob}
            onChange={(e) =>
              setdata((old) =>
                old
                  ? { ...old, dob: e.target.value }
                  : ({ dob: e.target.value } as Patient)
              )
            }
            className=" outline-none p-1 border border-sky-500 hover:border-sky-400 focus:border-purple-500  "
          />
        </div>
        <div>
          <div>Departement</div>
          <select
            onChange={(e) =>
              setdata((old) =>
                old
                  ? { ...old, dep: e.target.value }
                  : ({ dep: e.target.value } as Patient)
              )
            }
            className=" outline-none p-1 border border-sky-500 hover:border-sky-400 focus:border-purple-500  "
          >
            {Object.entries(DEPARTEMENTS).map(
              (dep: [key: string, { code: string }], i: number) => (
                <option key={i} value={dep[0]}>
                  {dep[1].code}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      <div>
        <Button title="SAVE" onClick={onSave} />
        <Button title="CANCEL" onClick={onCancel} />
      </div>
    </div>
  );
}
