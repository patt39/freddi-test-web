import Image from "next/image";
import { useState } from "react";
import { changeProductStatusApi, createSelectedProductsApi } from "./api-site";

export const Products = ({ item, index }: { item: any; index: number }) => {
  const [importStatus, setImportStatus] = useState(item.isApplyImportTax);

  const handleCheckboxChange = async () => {
    try {
      await changeProductStatusApi(item.id);
      setImportStatus((i: boolean) => !i);
    } catch (error: any) {
      console.log(error);
    }
  };

  const onProductCreate = async () => {
    try {
      await createSelectedProductsApi(item.id);
      location.reload();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={index}
        className="block rounded-lg p-4 shadow-sm shadow-indigo-100"
      >
        <div className="relative">
          <div className="block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl">
            <Image
              alt=""
              width={400}
              height={20}
              src={item.image}
              className="h-56 rounded-md object-cover"
            />
          </div>
          <span className="absolute px-3 py-1 text-xs font-bold tracking-widest text-white uppercase bg-black rounded left-3 top-3">
            {item.category}
          </span>
        </div>

        <div className="mt-4">
          <div>
            <p className="font-medium my-2">{item.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              {item.currency}
              {item.price.toFixed(2)}
            </p>
          </div>

          <fieldset>
            <legend className="sr-only">Checkboxes</legend>

            <div className="space-y-2">
              <label
                htmlFor="Option1"
                className="flex my-2 cursor-pointer items-start gap-4"
              >
                <div className="flex border-[#08c6c0] items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded  border-gray-300"
                    id="Option1"
                    checked={importStatus}
                    onChange={handleCheckboxChange}
                  />
                </div>

                <div>
                  <p className="text-gray-500 border-[#08c6c0]">
                    Apply import duty
                  </p>
                </div>
              </label>
            </div>
          </fieldset>
          <button
            onClick={() => onProductCreate()}
            className="inline-block w-full uppercase text-center mt-2 rounded border border-[#08c6c0] bg-[#08c6c0] px-12 py-3 text-sm font-medium text-white"
          >
            add to cart
          </button>
        </div>
      </div>
    </>
  );
};
