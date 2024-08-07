import { useState } from "react";
import FormLogin from "../comps/forms/FormLogin";
import TabsContainer from "../comps/UI/TabsContainer";
import { ITab } from "../helpers/types";

export default function Finances() {
  const TABS = {
    HOME: {
      label: "Home",
      comp: <FormLogin loading={true} login={onLogin} error={onError} />,
    },
    TAB1: { label: "tab1", comp: <div>Comp2</div> },
    TAB2: { label: "tab2", comp: <div>Comp3</div> },
  };

  const [seltab, setseltab] = useState<ITab>(TABS.HOME);
  function onTabSelected(tab: ITab) {
    setseltab(tab);
    console.log(tab);
  }

  function onLogin(ph: string, pw: string) {
    console.log(ph, pw);
  }

  function onError() {
    console.log("error");
  }

  return (
    <div>
      <div>Finances</div>
      <TabsContainer
        seltab={seltab}
        tabs={TABS}
        onTabSelected={onTabSelected}
      />
    </div>
  );
}
