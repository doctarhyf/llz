import { useEffect, useState } from "react";
import * as SB from "../../db/sb";
import { TABLES_NAMES } from "../../helpers/sb.config";
import { TMed } from "../../helpers/types";
import Button from "../Buttons/Button";
import FormMed from "../forms/FormMed";
import Loading from "./Loading";

type props = {
  onMedSelected: (med: TMed) => void;
  onMedListSortieMed: (med: TMed) => void;
  selectedMed: TMed | undefined;
  //onMedListNewMed: () => void;
};

export default function MedsList({
  onMedSelected,
  onMedListSortieMed,
  selectedMed,
}: //onMedListNewMed,
props) {
  const [meds, setmeds] = useState<TMed[]>([]);
  const [medsf, setmedsf] = useState<TMed[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [showFormNew, setShowFormNew] = useState<boolean>(false);
  const [q, setq] = useState<string>("");

  useEffect(() => {
    loadData();
  }, []);

  function filterMeds(q: string): string {
    console.log(q);
    if (q === "") {
      setmedsf(meds);

      return "";
    }

    setmedsf(
      meds.filter((m) => {
        return (
          m.nom.toLowerCase().includes(q.toLowerCase()) ||
          m.nom_generique?.toLowerCase().includes(q.toLowerCase()) ||
          m.price.toString().includes(q) ||
          m.dosage?.toLowerCase().includes(q.toLowerCase()) ||
          m.forme?.toLowerCase().includes(q.toLowerCase())
        );
      })
    );
    return q;
  }

  async function loadData() {
    console.log(meds);
    setloading(true);
    const m = (await SB.LoadAllItems(TABLES_NAMES.MEDS)) as any;

    setmeds(m);
    setmedsf(m);

    if (m.error) {
      setmeds([]);
      setmedsf([]);
    }
    setloading(false);
  }

  return showFormNew ? (
    <FormMed
      onCancel={() => setShowFormNew(false)}
      onMedAdded={(med) => alert("Med added")}
      onMedAddError={() => alert("Error addfing med!")}
      onMedUpdated={(med) => alert("On med updated")}
      updatingMed={selectedMed}
      key={0}
    />
  ) : (
    <div className=" container my-4  ">
      {loading && <Loading />}
      <Button title="New Med" onClick={() => setShowFormNew(true)} />
      <div>
        <input
          placeholder="Recherche medicaments ..."
          type="search"
          value={q}
          onChange={(e) => {
            setq(filterMeds(e.target.value));
          }}
          className=" w-full  sm:w-52 outline-none border p-1 hover:border-sky-700 focus:border-purple-600"
        />
      </div>

      <table className=" table  ">
        <tr className=" table-row ">
          <td className=" table-cell  ">ID</td>
          <td className=" table-cell  ">Nom</td>
          <td className=" table-cell  ">Nom Generique</td>
          <td className=" table-cell  ">Dosage</td>
          <td className=" table-cell  ">Forme</td>
          <td className=" table-cell  ">Prix</td>
          <td className=" table-cell  ">Quantite</td>
          <td className=" table-cell  ">Photo</td>
          <td className=" table-cell  ">Controls</td>
        </tr>
        {medsf.map((m, i) => (
          <tr
            key={i}
            className={` table-row hover:bg-sky-700 hover:cursor-pointer hover:text-white ${
              selectedMed &&
              selectedMed.id === m.id &&
              " bg-slate-800 text-white "
            } `}
          >
            <td className=" table-cell  ">{m.id}</td>
            <td className=" table-cell  ">{m.nom}</td>
            <td className=" table-cell  ">{m.nom_generique}</td>
            <td className=" table-cell  ">{m.dosage}</td>
            <td className=" table-cell  ">{m.forme}</td>
            <td className=" table-cell  ">{m.price} FC</td>
            <td className=" table-cell  ">{m.quantity}</td>
            <td className=" table-cell  ">
              <div className=" w-14 h-14 bg-slate-800 rounded-md overflow-hidden "></div>
            </td>
            <td className=" table-cell  ">
              <div className="flex flex-col ">
                <Button
                  small
                  title="SORTIE"
                  onClick={() => onMedListSortieMed(m)}
                />
                <Button small title="INFO" onClick={() => onMedSelected(m)} />
              </div>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
