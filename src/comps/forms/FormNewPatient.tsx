import { DEP } from "../../helpers/const";
import { formatDateToYYYYMMDD } from "../../helpers/funcs";

export default function FormNewPatient() {
  return (
    <form>
      <div>
        <div>
          <div>Nom</div>
          <input
            type="text"
            className=" outline-none p-1 border border-sky-500 hover:border-sky-400 focus:border-purple-500  "
          />
        </div>
        <div>
          <div>Postnom</div>
          <input
            type="text"
            className=" outline-none p-1 border border-sky-500 hover:border-sky-400 focus:border-purple-500  "
          />
        </div>
        <div>
          <div>Prenom</div>
          <input
            type="text"
            className=" outline-none p-1 border border-sky-500 hover:border-sky-400 focus:border-purple-500  "
          />
        </div>
        <div>
          <div>Phone</div>
          <input
            type="text"
            className=" outline-none p-1 border border-sky-500 hover:border-sky-400 focus:border-purple-500  "
          />
        </div>
        <div>
          <div>DOB</div>
          <input
            type="date"
            defaultValue={formatDateToYYYYMMDD(new Date())}
            className=" outline-none p-1 border border-sky-500 hover:border-sky-400 focus:border-purple-500  "
          />
        </div>
        <div>
          <div>Departement</div>
          <select className=" outline-none p-1 border border-sky-500 hover:border-sky-400 focus:border-purple-500  ">
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
