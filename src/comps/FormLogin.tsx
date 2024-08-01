import { useRef } from "react";

export default function FormLogin({
  login,
  error,
  loading,
}: {
  login: (phone: string, password: string) => void;
  error: any;
  loading: boolean;
}) {
  const rphone = useRef<HTMLInputElement | null>(null);
  const rpassword = useRef<HTMLInputElement | null>(null);

  async function onLogin() {
    const phone = rphone.current?.value || "";
    const password = rpassword.current?.value || "";

    login(phone, password);
  }

  return (
    <section className=" flex bg-red-600 h-[100vh]  ">
      <div className=" bg-sky-600 text-white w-full md:w-1/2 p-4 ">
        <div className=" md:mx-0 items-center flex flex-col justify-center   ">
          <div className=" text-4xl ">LaLouise</div>
          <div>
            <div>Phone</div>
            <div>
              <input
                ref={rphone}
                className=" border-transparent hover:border-sky-300 focus:border-sky-400 outline-none p-1 rounded-md bg-slate-800 text-white  "
                type="text"
                placeholder="089302849"
              />
            </div>
          </div>
          <div>
            <div>Password</div>
            <div>
              <input
                ref={rpassword}
                className=" border-transparent hover:border-sky-300 focus:border-sky-400 outline-none p-1 rounded-md bg-slate-800 text-white  "
                type="password"
                placeholder="000000"
              />
            </div>
          </div>

          {error && error.error && (
            <div className="  bg-red-500 text-white p-1 rounded-md text-xs ">
              {JSON.stringify(error)}
            </div>
          )}

          {loading && <div>Loading ...</div>}

          <div>
            <button
              onClick={onLogin}
              className="bg-white/20 my-2 hover:bg-white/40 border-slate-400 rounded-md p-2 "
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <div className="  hidden md:block bg-black w-1/2  p-4 ">Promo</div>
    </section>
  );
}
