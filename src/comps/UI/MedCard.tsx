import { TMed } from "../../helpers/types";
import Button from "../Buttons/Button";
import ButtonsCont from "../Buttons/ButtonsCont";

export default function MedCard({
  selectedMed,
  onMedCardOkay,
  onMedCardUpdate,
  onMedCardDelete,
}: {
  selectedMed: TMed;
  onMedCardOkay: () => void;
  onMedCardUpdate: (med: TMed) => void;
  onMedCardDelete: (med: TMed) => void;
}) {
  return (
    <div>
      <h1>{selectedMed.nom}</h1>
      {Object.entries(selectedMed).map((p, i) => (
        <div key={i}>
          <span className=" opacity-50 ">{p[0]}:</span>
          <span>{p[1]}</span>
        </div>
      ))}

      <ButtonsCont>
        <Button title="OK" onClick={onMedCardOkay} />
        <Button title="UPDATE" onClick={() => onMedCardUpdate(selectedMed)} />
        <Button title="DELETE" onClick={() => onMedCardDelete(selectedMed)} />
      </ButtonsCont>
    </div>
  );
}
