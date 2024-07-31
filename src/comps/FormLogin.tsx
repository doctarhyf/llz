export default function FormLogin() {
  return (
    <section className=" flex bg-red-600 h-[100vh]  ">
      <div className=" bg-sky-600 text-white w-full md:w-1/2 p-4 ">
        <div className=" md:mx-0 items-center flex flex-col justify-center   ">
          <div className=" text-4xl ">LaLouise</div>
          <div>
            <div>Phone</div>
            <div>
              <input
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
                className=" border-transparent hover:border-sky-300 focus:border-sky-400 outline-none p-1 rounded-md bg-slate-800 text-white  "
                type="password"
                placeholder="000000"
              />
            </div>
          </div>

          <div>
            <button className="bg-white/20 my-2 hover:bg-white/40 border-slate-400 rounded-md p-2 ">
              Login
            </button>
          </div>
        </div>
      </div>
      <div className="  hidden md:block bg-black w-1/2  p-4 ">Promo</div>
    </section>
  );
}
