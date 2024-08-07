import { useState } from "react";
import { DEPARTEMENTS } from "../../helpers/const";
//import { formatDateToYYYYMMDD } from "../../helpers/funcs";
import { IDepartment, TPatient } from "../../helpers/types";
import Button from "../UI/Button";
import * as SB from "../../db/sb";
import { TABLES_NAMES } from "../../helpers/sb.config";
import Loading from "../UI/Loading";
import ButtonsCont from "../UI/ButtonsCont";

type FormProps = {
  onPatientAdded: (patient: TPatient) => void;
  onCancel: () => void;
  onPatientAddError: (error: any) => void;
  updatingPatient: TPatient | undefined;
  onPatientUpdated: (patient: TPatient) => void;
};

export default function FormPatient({
  onCancel,
  onPatientAdded,
  onPatientAddError,
  updatingPatient,
  onPatientUpdated,
}: FormProps) {
  const [data, setdata] = useState<TPatient>(
    updatingPatient || {
      nom: "Mutunda",
      postnom: "Koji",
      prenom: "Franvale",
      phone: "0893092849",
      dob: "1989-05-15",
      dep: DEPARTEMENTS.SOINS_CURRATIFS.code,
    }
  );
  const [loading, setloading] = useState<boolean>(false);

  async function onSave() {
    setloading(true);
    let res: any;

    if (updatingPatient) {
      res = await SB.UpdateItem(TABLES_NAMES.PATIENTS, data);
    } else {
      res = await SB.InsertItem(TABLES_NAMES.PATIENTS, data);
    }

    if (res.id) {
      if (updatingPatient) {
        onPatientUpdated(res as TPatient);
      } else {
        onPatientAdded(res as TPatient);
      }
    } else if (res.error) {
      onPatientAddError(res as any);
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
                  : ({ nom: e.target.value } as TPatient)
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
                  : ({ postnom: e.target.value } as TPatient)
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
                  : ({ prenom: e.target.value } as TPatient)
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
                  : ({ phone: e.target.value } as TPatient)
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
                  : ({ dob: e.target.value } as TPatient)
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
                  : ({ dep: e.target.value } as TPatient)
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
        </div>
      </div>

      <ButtonsCont>
        <Button title="SAVE" onClick={onSave} />
        <Button title="CANCEL" onClick={onCancel} />
      </ButtonsCont>
    </div>
  );
}
