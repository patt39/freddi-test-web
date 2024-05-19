import { Trash2 } from "lucide-react";
import { deleteSelectedProductsApi } from "./api-site";

export const SelectedProducts = ({
  item,
  index,
}: {
  item: any;
  index: number;
}) => {
  const onDeleteProduct = async () => {
    try {
      await deleteSelectedProductsApi(item.id);
      location.reload();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <tr key={index}>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          {item.product.name}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {item.importStatus ? "YES" : "NO"}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {item.product.currency}
          {item.price.toFixed(2)}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {item.tax}
        </td>
        <td className="whitespace-nowrap px-4 py-2">
          <button onClick={() => onDeleteProduct()}>
            <Trash2 className="text-red-600" />
          </button>
        </td>
      </tr>
    </>
  );
};
