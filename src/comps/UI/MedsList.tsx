import { useEffect, useState } from "react";
import { TMed } from "../../helpers/types";
import { TABLES_NAMES } from "../../helpers/sb.config";
import * as SB from "../../db/sb";
import Loading from "./Loading";
import Button from "./Button";

export default function MedsList() {
  //const [loading, setloading] = useState<boolean>(false)

  const [meds, setmeds] = useState<TMed[]>([]);
  const [medsf, setmedsf] = useState<TMed[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [q, setq] = useState<string>("");
  const [selectedMed, setSelectedMed] = useState<TMed | undefined>(undefined);
  const [updatingMed, setUpdatingMed] = useState<TMed | undefined>(undefined);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterMeds(q);
  }, [q]);

  function filterMeds(q: string) {
    if (q === "") {
      setmedsf(meds);
      return;
    }

    setmedsf(
      meds.filter((m) => m.medName.toLowerCase().includes(q.toLowerCase()))
    );
  }

  async function loadData() {
    console.log(meds);
    setloading(true);
    const m = (await SB.LoadAllItems(TABLES_NAMES.MEDS)) as TMed[];
    setmeds(m);
    setmedsf(m);
    console.log(m);
    setloading(false);
  }

  return (
    <div>
      <h1>Meds</h1>

      <div>
        <input
          type="search"
          value={q}
          onChange={(e) => setq(e.target.value)}
          className=" w-full  sm:w-52 outline-none border p-1 hover:border-sky-700 focus:border-purple-600"
        />
        {loading && <Loading />}
      </div>

      {!selectedMed && (
        <table className=" table  ">
          <tr className=" table-row ">
            <td className=" table-cell  ">No</td>
            {/* <td className=" table-cell  ">created_at</td> */}
            <td className=" table-cell  ">Produit</td>
            <td className=" table-cell  ">Stock</td>
            <td className=" table-cell  ">Type</td>
            <td className=" table-cell  ">Prix</td>
            <td className=" table-cell  ">Photo</td>

            {/* <td className=" table-cell  ">medSoldBy</td> */}
          </tr>
          {medsf.map((m, i) => (
            <tr
              key={i}
              className=" table-row hover:bg-sky-700 hover:cursor-pointer hover:text-white "
              onClick={(_) => setSelectedMed(m)}
            >
              <td className=" table-cell  ">{i + 1}</td>
              {/* <td className=" table-cell  ">{m.created_at}</td> */}
              <td className=" table-cell  ">{m.medName}</td>
              <td className=" table-cell  ">{m.medAmount}</td>
              <td className=" table-cell  ">{m.medType}</td>
              <td className=" table-cell  ">{m.medPrice} FC</td>
              <td className=" table-cell  ">
                <div className=" w-14 h-14 bg-slate-800 rounded-md overflow-hidden "></div>
              </td>

              {/* <td className=" table-cell  ">{m.medSoldBy}</td> */}
            </tr>
          ))}
        </table>
      )}

      {updatingMed && (
        <div>
          Updating
          <div>
            <Button title="OK" onClick={() => setUpdatingMed(undefined)} />
          </div>
        </div>
      )}

      {selectedMed && (
        <div>
          <div className=" w-48 h-48 shadow-md bg-slate-700 overflow-hidden rounded-md my-4   "></div>
          {Object.entries(selectedMed).map((d, i) => (
            <div key={i}>
              <span className=" opacity-50 ">{d[0]}:</span>
              <span className=" font-bold  ">{d[1]}</span>
            </div>
          ))}

          <div className="flex flex-col">
            <Button title="OK" onClick={() => setSelectedMed(undefined)} />
            <Button
              title="UPDATE"
              onClick={() => {
                setUpdatingMed(selectedMed);
                setSelectedMed(undefined);
              }}
            />
            <Button title="SORTIE" onClick={() => setSelectedMed(undefined)} />
          </div>
        </div>
      )}
    </div>
  );
}
