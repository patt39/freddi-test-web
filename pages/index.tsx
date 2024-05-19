import { getProductsApi, getSelectedProductsApi } from "@/components/api-site";
import { Products } from "@/components/product";
import { SelectedProducts } from "@/components/selected-product";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductsApi();
        setProducts(data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSelectedProductsApi();
        setSelectedProducts(data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const initialValue = 0;
  const sumPrice = selectedProducts.reduce(
    (accumulator: any, currentValue: any) => accumulator + currentValue.price,
    initialValue
  );

  const sumTax = selectedProducts.reduce(
    (accumulator: any, currentValue: any) => accumulator + currentValue.tax,
    initialValue
  );

  const item = products.filter((item) => item === 2)[0];
  console.log(item);

  return (
    <main
      className={`flex min-h-screen flex-col justify-between p-24 ${inter.className}`}
    >
      <div className="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:grid-cols-4 lg:max-w-full">
        {products.map((item, i) => (
          <Products item={item} index={i} key={i} />
        ))}
      </div>
      <div className=" mt-20">
        <div className="text-4xl my-4">Selected products</div>
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="uppercase">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Product
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Imported
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Price
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Tax
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y  text-center divide-gray-200">
            {selectedProducts.map((item, i) => (
              <SelectedProducts item={item} index={i} key={i} />
            ))}
          </tbody>
        </table>
        <div className="flex justify-end">
          <button
            onClick={() => setIsVisible((i: boolean) => !i)}
            className=" flex justify-end uppercase rounded border my-8 border-[#08c6c0] bg-[#08c6c0] px-12 py-3 text-sm font-medium text-white"
          >
            Generate Reciepte
          </button>
        </div>
        {isVisible ? (
          <div className="flex flex-wrap justify-end px-4 py-5 sm:p-6">
            <div className=" bg-white flex flex-wrap space-x-12 md:space-x-16 mt-4 shadow-lg min-w-96 rounded-xl">
              <div className="px-200 py-50 sm:p-6">
                <p className="mt-5 text-xl font-bold text-gray-900">
                  Total Amount: {item}
                  {sumPrice}
                </p>
                <p className="mt-5 text-xl text-gray-900">
                  Including tax: {sumTax}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
