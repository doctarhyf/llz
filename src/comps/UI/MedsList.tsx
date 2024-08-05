import { TMed } from "../../helpers/types";

type props = {
  onMedSelected: (med: TMed) => void;

  //selectedMed: (med: TMed) => void;
  medsf: TMed[];
};

export default function MedsList({ onMedSelected, medsf }: props) {
  //const [loading, setloading] = useState<boolean>(false)

  return (
    <div>
      <h1>Meds</h1>

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
        </tr>
        {medsf.map((m, i) => (
          <tr
            key={i}
            className=" table-row hover:bg-sky-700 hover:cursor-pointer hover:text-white "
            onClick={(_) => onMedSelected(m)}
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

            {/* <td className=" table-cell  ">{m.medSoldBy}</td> */}
          </tr>
        ))}
      </table>
    </div>
  );
}
