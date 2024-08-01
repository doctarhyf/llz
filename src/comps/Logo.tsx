import hospital from "../assets/hospital.png";

export default function Logo({
  small,
  dark,
}: {
  small: boolean;
  dark: boolean;
}) {
  return (
    <div
      className={`  ${
        small ? " flex flex-col " : "text-4xl"
      } flex items-center gap-2 `}
    >
      <span
        className={`   ${small ? " w-9 h-9  " : " w-12 h-12"} inline-block  `}
      >
        <img src={hospital} />
      </span>
      <span className={` font-serif italic ${dark && "text-white"}`}>
        LaLouise
      </span>
    </div>
  );
}
