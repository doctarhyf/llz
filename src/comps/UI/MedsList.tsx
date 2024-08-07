import { TMed } from "../../helpers/types";
import Button from "../Buttons/Button";

type props = {
  onMedSelected: (med: TMed) => void;
  onMedListSortieMed: (med: TMed) => void;
  onMedListNewMed: () => void;
  medsf: TMed[];
  selectedMed: TMed | undefined;
};

export default function MedsList({
  onMedSelected,
  medsf,
  onMedListSortieMed,
  onMedListNewMed,
  selectedMed,
}: props) {
  return (
    <div>
      <Button title="New Med" onClick={onMedListNewMed} />

      <table className=" table  ">
        <tr className=" table-row ">
          <td className=" table-cell  ">ID</td>
          {/* <td className=" table-cell  ">created_at</td> */}
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
            {/* <td className=" table-cell  ">{m.created_at}</td> */}
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
