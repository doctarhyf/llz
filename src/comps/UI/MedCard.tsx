import { TMed } from "../../helpers/types";
import Button from "./Button";

export default function MedCard({
  selectedMed,
  onMedCardOkay,
  onMedCardUpdate,
}: {
  selectedMed: TMed | undefined;
  onMedCardOkay: () => void;
  onMedCardUpdate: (med: TMed) => void;
}) {
  return (
    <div>
      <h1>{selectedMed?.nom}</h1>
      {selectedMed &&
        Object.entries(selectedMed).map((p, i) => (
          <div key={i}>
            <span className=" opacity-50 ">{p[0]}:</span>
            <span>{p[1]}</span>
          </div>
        ))}

      <div>
        <Button title="OK" onClick={onMedCardOkay} />
        <Button
          title="UPDATE"
          onClick={() => selectedMed && onMedCardUpdate(selectedMed)}
        />
      </div>
    </div>
  );
}
