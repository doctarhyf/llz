import { useEffect, useState } from "react";
import * as SB from "../../db/sb";
import { GenerateForm } from "../../helpers/funcs";
import { TABLES_NAMES } from "../../helpers/sb.config";
import { ISortieMed, TMed } from "../../helpers/types";
import ButtonLoading from "../UI/ButtonLoading";

const FormFieldsData = [
  { title: "Qte a sortir", propName: "stock_out", type: "number" },
];

export default function FormSortieMed({
  med,
  onMedSortieSuccess,
  onMedSortieError,
}: {
  med: TMed | undefined;
  onMedSortieSuccess: (s: ISortieMed) => void;
  onMedSortieError: (e: any) => void;
}) {
  const [stock_out, set_stock_out] = useState<number>(0);
  const [smed, setsmed] = useState<ISortieMed>({});
  const [error, seterror] = useState<any>(undefined);
  const [loading, setloading] = useState<boolean>(false);

  useEffect(() => {
    seterror(undefined);
    if (med) {
      const meds: ISortieMed = {
        med_id: med.id,
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

  async function onSortieMed(sortieMed: ISortieMed) {
    setloading(true);
    const r = await SB.InsertItem(TABLES_NAMES.MEDS_SORTIES, sortieMed);

    if (r.id) {
      const d = await SB.UpdateItem(TABLES_NAMES.MEDS, {
        id: r.med_id,
        quantity: smed.stock_left,
      });
      console.log(d);
      onMedSortieSuccess(r as ISortieMed);
    } else {
      onMedSortieError(r);
    }
    setloading(false);
    console.log(r);
  }

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
      <div>
        {!error && (
          <ButtonLoading
            loading={loading}
            title="OK"
            onClick={() => onSortieMed(smed)}
          />
        )}
      </div>
    </div>
  );
}
