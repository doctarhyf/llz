import { useState } from "react";
//import { formatDateToYYYYMMDD } from "../../helpers/funcs";
import * as SB from "../../db/sb";
import { TABLES_NAMES } from "../../helpers/sb.config";
import { TMed } from "../../helpers/types";
import Button from "../UI/Button";
import Loading from "../UI/Loading";

type FormProps = {
  onMedAdded: (patient: TMed) => void;
  onCancel: () => void;
  onMedAddError: (error: any) => void;
  updatingMed: TMed | undefined;
  onMedUpdated: (patient: TMed) => void;
};

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

  return (
    <div>
      {loading && <Loading />}
      <div>
        <div>
          <div>Nom</div>
          <input
            type="text"
            value={data?.nom}
            onChange={(e) =>
              setdata((old) =>
                old
                  ? { ...old, nom: e.target.value }
                  : ({ nom: e.target.value } as TMed)
              )
            }
            className=" outline-none p-1 border border-sky-500 hover:border-sky-400 focus:border-purple-500  "
          />
        </div>
        {/*  <div>
          <div>Nom Generique</div>
          <input
            type="text"
            value={data?.postnom}
            onChange={(e) =>
              setdata((old) =>
                old
                  ? { ...old, postnom: e.target.value }
                  : ({ postnom: e.target.value } as TMed)
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
                  : ({ prenom: e.target.value } as TMed)
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
                  : ({ phone: e.target.value } as TMed)
              )
            }
            className=" outline-none p-1 border border-sky-500 hover:border-sky-400 focus:border-purple-500  "
          />
        </div>
        <div>
          <div>DOB</div>
          <input
            type="date"
            value={data?.dob}
            onChange={(e) =>
              setdata((old) =>
                old
                  ? { ...old, dob: e.target.value }
                  : ({ dob: e.target.value } as TMed)
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
                  : ({ dep: e.target.value } as TMed)
              )
            }
            className=" outline-none p-1 border border-sky-500 hover:border-sky-400 focus:border-purple-500  "
          >
            {Object.entries(DEPARTEMENTS).map(
              (dep: [key: string, d: IDepartment], i: number) => (
                <option
                  key={i}
                  selected={dep[1].code === data.dep}
                  value={dep[1].code}
                >
                  {dep[1].label}
                </option>
              )
            )}
          </select>
        </div> */}
      </div>

      <div>
        <Button title="SAVE" onClick={onSave} />
        <Button title="CANCEL" onClick={onCancel} />
      </div>
    </div>
  );
}
