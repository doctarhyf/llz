import { ITab, TTabs } from "../../helpers/types";

export default function TabsContainer({
  tabs,
  onTabSelected,
  seltab,
}: {
  tabs: TTabs;
  onTabSelected: (tab: ITab) => void;
  seltab: ITab;
}) {
  return (
    <div>
      <div className=" flex gap-4 border-b border-b-sky-500  ">
        {Object.values(tabs).map((t: ITab, i: number) =>
          t.hide ? null : (
            <button
              onClick={(_) => onTabSelected(t)}
              key={i}
              className={` ${
                t.label === seltab.label && " bg-sky-500 p-1 text-white  "
              }   `}
            >
              {t.label}
            </button>
          )
        )}
      </div>

      <div>{seltab.comp}</div>
    </div>
  );
}
