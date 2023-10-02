import React, { FormEvent, ChangeEvent, useState } from "react";
import Image from "next/image";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useDebounce } from "../hooks/useDebounce";
import * as ProjectRegistry from "../abi/ProjectRegistry.json";
import { PhotoIcon } from "@heroicons/react/24/outline";

const initialFormData = {
  githubLink: null as string | null,
  description: null as string | null,
  file: null as File | null,
};

export const CreateProjectForm = () => {
  const [beneficiary, setBeneficary] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: ProjectRegistry.address,
    abi: ProjectRegistry.abi,
    functionName: "registerProject",
    args: [beneficiary, initialFormData],
    // overrides: {
    //   gasLimit: 1800000,
    // },
  });

  const { data, error, isError, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  // Handle upload file
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    setFormData({ ...formData, file: selectedFile || null });
  };

  // Handle form submit
  const hanldeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.file) {
      console.log("Selected file:", formData);
    } else {
      alert("Please Upload a Cover photo for your project");
    }
    //write?.();
  };

  return (
    <div className="space-y-10  divide-gray-900/10 ">
      <div className="">
        <form className="bg-slate-800 shadow-sm  sm:rounded-xl ">
          <div className="px-4 py-6 sm:p-8">
            <div className="">
              <div className="sm:col-span-4 mb-6">
                <label
                  htmlFor="address"
                  className="text-sm font-medium leading-6 text-gray-400"
                >
                  Beneficiary
                </label>
                <div className="mt-1">
                  <div className="flex">
                    <input
                      type="text"
                      name="website"
                      id="website"
                      className="p-2 w-full rounded-md text-sm text-black bg-gray-200"
                      placeholder="address"
                      onChange={(e) => setBeneficary(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4 mb-6">
                <label
                  htmlFor="address"
                  className="text-sm font-medium leading-6 text-gray-400"
                >
                  Github
                </label>
                <div className="mt-1">
                  <div className="flex">
                    <input
                      type="text"
                      name="website"
                      id="website"
                      className="p-2 w-full rounded-md text-sm text-black bg-gray-200"
                      placeholder="paste you link here"
                      onChange={(e) =>
                        setFormData({ ...formData, githubLink: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full mb-6">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-400"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="w-full text-sm text-black rounded-md p-2 outline-none bg-gray-200 resize-none min-h-[150px]"
                    placeholder="describe your project in a few words"
                    defaultValue={""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Upload file */}
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-white"
              >
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                <div className="text-center">
                  {formData.file ? (
                    <Image
                      src={URL.createObjectURL(formData.file)}
                      alt="Cover photo"
                      width={200}
                      height={200}
                    />
                  ) : (
                    <>
                      <div className="mt-4 flex flex-col text-sm leading-6 text-gray-400 ">
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-500"
                          aria-hidden="true"
                        />
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-lg bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-200 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-400 "
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </label>

                        <p className="pl-1">or drag and drop</p>
                        <p className="text-xs leading-5 text-gray-400">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 px-4 py-4 sm:px-8">
            <button
              type="submit"
              className="rounded-full capitalize font-normal font-white w-full  transition-all tracking-widest flex items-center justify-center hover:bg-white hover:text-black border-2"
              onClick={hanldeSubmit}
            >
              Send Transaction
            </button>
          </div>
        </form>
      </div>
      {isSuccess && (
        <div className="text-green-300">
          Successfully Created a Project!
          <div>
            <a href={`https://goerli.etherscan.io/tx/${data?.hash}`}>
              Check etherscan Transaction Hash
            </a>
          </div>
        </div>
      )}
      {isError && (
        <div className="text-red-500 mt-4 ">Error: {error?.message}</div>
      )}
      {/* <div className="border-2 w-full">
        <a
          href="/projects"
          className="border-4 border-sky-200 text-center rounded-md  text-red-300"
        >
          Check out registered Proyects
        </a>
      </div> */}
    </div>
  );
};
