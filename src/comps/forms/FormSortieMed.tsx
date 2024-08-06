import { useEffect, useState } from "react";
import { GenerateForm } from "../../helpers/funcs";
import Button from "../UI/Button";
import { TMed } from "../../helpers/types";

interface ISortieMed {
  created_at?: Date;
  id?: number;
  med_id?: number;
  stock?: number;
  price?: number;
  tot_price?: number;
  stock_out?: number;
  stock_left?: number;
}

const FormFieldsData = [
  { title: "Qte a sortir", propName: "stock_out", type: "number" },
];

export default function FormSortieMed({
  med,
  onMedSortieOk,
}: {
  med: TMed | undefined;
  onMedSortieOk: () => void;
}) {
  const [stock_out, set_stock_out] = useState<number>(0);
  const [smed, setsmed] = useState<ISortieMed>({});
  const [error, seterror] = useState<any>(undefined);

  useEffect(() => {
    seterror(undefined);
    if (med) {
      const meds: ISortieMed = {
        id: med.id,
        stock: med.quantity,
        price: med.price,
        tot_price: parseFloat((stock_out * med.price).toFixed(2)),
        stock_out: stock_out,
        stock_left: med.quantity - stock_out,
      };

      if (meds.stock_left && meds.stock_left < 0) {
        seterror(`Unsufficient stock, max sortie ${med.quantity}`);
      }
      setsmed(meds);
      console.log(meds);
    }
  }, [med, stock_out]);

  return (
    <div>
      {!med ? (
        <div>No med selected</div>
      ) : (
        <div>
          <h1>{med.nom}</h1>
          <div>
            {GenerateForm(FormFieldsData, stock_out, (_: string, v: any) =>
              set_stock_out(v)
            )}
          </div>
          <div>
            <span>Stock restant:</span>
            <span>{smed.stock_left}</span>
          </div>
          <div>
            <span>Price:</span>
            <span>{med.price}</span>
          </div>
          <div>
            <span>Tot Price:</span>
            <span>{smed.tot_price}</span>
          </div>
          {error && (
            <div className="p-1 w-fit px-2 rounded-md bg-red-300 border border-red-900 text-red-800 text-xs">
              {JSON.stringify(error)}
            </div>
          )}
        </div>
      )}
      <div>{!error && <Button title="OK" onClick={onMedSortieOk} />}</div>
    </div>
  );
}
