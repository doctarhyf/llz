import { useRef } from "react";
import Logo from "../Logo";
import ButtonLoading from "../UI/ButtonLoading";

type props = {
  login: (phone: string, password: string) => void;
  error: any;
  loading: boolean;
};

export default function FormLogin({ login, error, loading }: props) {
  const rphone = useRef<HTMLInputElement | null>(null);
  const rpassword = useRef<HTMLInputElement | null>(null);

  async function onLogin() {
    const phone = rphone.current?.value || "";
    const password = rpassword.current?.value || "";

    login(phone, password);
  }

  return (
    <section className=" flex  h-[100vh]  ">
      <div className="  w-full md:w-1/2 p-4 ">
        <div className="  flex flex-col items-center ">
          <Logo small={false} dark={false} iconOnly={false} />
          <div className=" w-full sm:w-fit">
            <div className=" text-slate-500 text-sm mt-2 ">Phone</div>
            <div>
              <input
                ref={rphone}
                className=" w-full sm:w-52 outline-none border p-1 hover:border-sky-700 focus:border-purple-600"
                type="text"
                placeholder="089302849"
                defaultValue={"0893092849"}
              />
            </div>
          </div>
          <div className=" w-full sm:w-fit">
            <div className=" text-slate-500 text-sm mt-2 ">Phone</div>
            <div>
              <input
                ref={rpassword}
                className=" w-full sm:w-52 outline-none border p-1 hover:border-sky-700 focus:border-purple-600"
                type="password"
                placeholder="000000"
                defaultValue={"000000"}
              />
            </div>
          </div>

          <ButtonLoading loading={loading} title="Login" onClick={onLogin} />

          <div className=" text-[10pt] text-center my-6 dark:text-white/90 text-black/90 absolute bottom-0  ">
            <div>&copy;LaLouise 2024, all rights reserved.</div>
            <div>
              Code and design by <a href="/">@doctarhyf</a>
            </div>
          </div>

          {error && error.error && (
            <div className="  bg-red-500 text-white p-1 rounded-md text-xs ">
              {JSON.stringify(error)}
            </div>
          )}
        </div>
      </div>
      <div className=" bg-gradient-to-br from-sky-500 text-white to-purple-600   hidden md:block bg-black/20 w-1/2  p-4 ">
        <div className=" text-xl font-serif italic ">
          Bienvenu chez la louise
        </div>
        <ul className=" list-disc list-inside text-sm text-white/90  ">
          <li>Gestion des malades</li>
          <li>Gestion des infirmiers</li>
          <li>Gestion des RDV</li>
          <li>Gestion finance</li>
        </ul>
      </div>
    </section>
  );
}
