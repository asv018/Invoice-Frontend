/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const onClick = (url: string) => {
    router.push(`/${url}`);
  };
  return (
    <>
      <>
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                Invoice Generator
                <br className="hidden lg:inline-block" />

              </h1>
              <p className="mb-8 leading-relaxed">
                  levitation infotech
              </p>
              <div className="flex gap-5 justify-center">
                <Button
                  onClick={() => onClick("dashboard")}
                  color="primary"
                  variant="flat"
                >
                  Get started
                </Button>
              </div>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <img
                className="object-cover object-center rounded"
                alt="hero"
                src="https://www.pngmart.com/files/8/Invoice-PNG-Photos.png"
              />
            </div>
          </div>
        </section>
      </>
    </>
  );
}
