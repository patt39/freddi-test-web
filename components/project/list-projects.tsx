/* eslint-disable jsx-a11y/anchor-is-valid */
import { DeleteOneProjectAPI } from '@/api-site/projects';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { MoreHorizontal, PencilIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { formateDate } from '../util/formate-date';
import { CreateOrUpdateProduct } from './create-or-update-project';

type Props = {
  item?: any;
  index: number;
};

const ListProjects = ({ item, index }: Props) => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { mutateAsync: saveMutation } = DeleteOneProjectAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await saveMutation({ projectId: item?.id });
      AlertSuccessNotification({
        text: 'Project deleted successfully',
      });
      setLoading(false);
      setIsOpen(false);
    } catch (error: any) {
      setLoading(false);
      setIsOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <TableRow key={index} className="dark:border-gray-800">
        <TableCell className="font-medium">{item?.title}</TableCell>
        <TableCell className="hidden md:table-cell">
          {formateDate(item?.createdAt, 'IT')}
        </TableCell>
        <TableCell>
          {item?.status === 'DEPLOY' && (
            <Badge
              variant="destructive"
              className="border-md dark:border-gray-800"
            >
              {item?.status}
            </Badge>
          )}
          {item?.status === 'INPROGRESS' && (
            <Badge variant="default" className="border-md dark:border-gray-800">
              {item?.status}
            </Badge>
          )}
          {item?.status === 'COMPLETED' && (
            <Badge variant="outline" className="border-md dark:border-gray-800">
              {item?.status}
            </Badge>
          )}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {item?.description}
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setIsEdit(true)}>
                <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                <span className="ml-2 cursor-pointer hover:text-indigo-600">
                  Edit
                </span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                <span className="ml-2 cursor-pointer hover:text-red-600">
                  Delete
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      <ActionModalDialog
        title="Delete?"
        loading={loading}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={() => deleteItem(item)}
        description="Are you sure you want to delete this?"
      />

      <CreateOrUpdateProduct
        project={item}
        showModal={isEdit}
        setShowModal={setIsEdit}
      />
    </>
  );
};

export { ListProjects };
