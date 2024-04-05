import { Outlet } from "react-router-dom";
import Filter from "../filter";
import { FormProvider, useForm } from "react-hook-form";

export default function Layout() {

  const form = useForm()

  return (
    <FormProvider {...form}>
      <div className="theme-  bg-current ">
        <header >
          <div className="p-8">
            <Filter />
          </div>
        </header>

        <main>
          <div>
            <div>
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </FormProvider>
  );
}
