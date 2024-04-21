import { Outlet } from "react-router-dom";
import Filter from "../filter";
import { FormProvider, useForm } from "react-hook-form";
import { Suspense } from "react";
import Spinner from "../spinner";

export default function Layout() {
  const form = useForm({ mode: "onChange", defaultValues: { annotate_type: "price" } });

  return (
    <Suspense fallback={<Spinner />}>
      <FormProvider {...form}>
        <div className="theme-bg-current flex flex-col size-full">
          <header className="header">
            <div className="header-container p-8">
              <div className="header-inner">
                <Filter />
              </div>
            </div>
          </header>

          <main className="grow">
            <div className="px-8 h-full">
              <Outlet />
            </div>
          </main>
        </div>
      </FormProvider>
    </Suspense>
  );
}
