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
import { CreateOrUpdateProduct } from './create-or-update-product';

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
      <TableRow key={index}>
        {/* <TableCell className="hidden sm:table-cell">
                          <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src="/placeholder.svg"
                            width="64"
                          />
                        </TableCell> */}
        <TableCell className="font-medium">{item?.title}</TableCell>
        <TableCell className="hidden md:table-cell">
          {formateDate(item?.createdAt, 'IT')}
        </TableCell>
        <TableCell>
          {item?.status === 'DEPLOY' && (
            <Badge variant="destructive" className="border-md">
              {item?.status}
            </Badge>
          )}
          {item?.status === 'INPROGRESS' && (
            <Badge variant="default" className="border-md">
              {item?.status}
            </Badge>
          )}
          {item?.status === 'COMPLETED' && (
            <Badge variant="outline" className="border-md">
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

      {/* <div key={index} className="flex items-center py-4">

        <div className="min-w-0 flex-1 cursor-pointer">
          <div className="flex items-center text-gray-600">
            <button className="font-normal">
              <CalendarIcon className="size-4" />
            </button>
            <span className="ml-1.5 text-sm font-normal">
              {formateDate(item?.createdAt as Date)}
            </span>
          </div>

          <div className="mt-2 flex items-center">
            {item?.title ? (
              <p className="text-lg font-bold">
                <ReadMore html={String(item?.title ?? '')} value={100} />
              </p>
            ) : null}
          </div>

          <div className="mt-2 flex items-center font-medium text-gray-600">
            <span className="font-normal">
              <HeartIcon className="size-4" />
            </span>
            <span className="ml-1.5 text-sm">{item?.totalLike ?? 0}</span>

            <span className="ml-1.5">
              <MessageSquareIcon className="size-4" />
            </span>
            <span className="ml-1.5 text-sm">{item?.totalComment ?? 0}</span>

            <span className="ml-1.5">
              {item?.whoCanSee === 'PUBLIC' ? (
                <GlobeIcon className="size-4" />
              ) : (
                <LockKeyholeIcon className="size-4" />
              )}
            </span>
            <span className="ml-1.5 hidden text-sm font-normal lg:table-cell">
              {item?.whoCanSee}
            </span>
            <span className="ml-1.5">
              <IconTypePost className="size-4" type={item?.type as PostType} />
            </span>
            <span className="ml-1.5 hidden text-sm font-normal lg:table-cell">
              {item?.type}
            </span>
          </div>
        </div>

        <div className="py-4 text-right text-sm font-medium">
          <ButtonCopy
            size="icon"
            variant="link"
            link={`${process.env.NEXT_PUBLIC_SITE}/posts/${item?.slug}`}
            iconClassName="size-4 text-gray-600 hover:text-green-600"
          />

          <ButtonInput
            variant="link"
            type="button"
            size="icon"
            icon={
              <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
            }
            onClick={() =>
              push(
                `/posts/${
                  item?.id
                }/edit?type=${item?.type.toLocaleLowerCase()}`,
              )
            }
          />

          <ActionModalDialog
            title="Delete?"
            loading={loading}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onClick={() => deleteItem(item)}
            description="Are you sure you want to delete this?"
            buttonDialog={
              <ButtonInput
                variant="link"
                type="button"
                size="icon"
                icon={
                  <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                }
              />
            }
          />
        </div>
      </div> */}

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
