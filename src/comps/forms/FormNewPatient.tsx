import { DEP } from "../../other/const";

export default function FormNewPatient() {
  return (
    <form>
      <div>
        <div>
          <div>Nom</div>
          <input type="text" />
        </div>
        <div>
          <div>Nom</div>
          <input type="text" />
        </div>
        <div>
          <div>Nom</div>
          <input type="text" />
        </div>
        <div>
          <div>Nom</div>
          <input type="text" />
        </div>
        <div>
          <div>Nom</div>
          <input type="date" defaultValue={"2024-08-01"} />
        </div>
        <div>
          <div>Departement</div>
          <select>
            {Object.entries(DEP).map(
              (dep: [key: string, { code: string }], _: number) => (
                <option value={dep[1].code}>{dep[0]}</option>
              )
            )}
          </select>
        </div>
      </div>
    </form>
  );
}
