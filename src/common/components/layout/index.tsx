import { Outlet } from "react-router-dom";
import Filter from "../filter";
import { FormProvider, useForm } from "react-hook-form";

export default function Layout() {

  const form = useForm({mode : 'onChange'})


  return (
    <FormProvider {...form}>
      <div className="theme-  bg-current ">
      <header className="header">
        <div className="header-container p-8">
          <div className="header-inner">
            <Filter />
          </div>
        </div>
      </header>

        <main>
            <div className="px-8">
              <Outlet />
            </div>
        </main>
      </div>
    </FormProvider>
  );
}
