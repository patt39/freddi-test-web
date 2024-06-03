import { CreateOrUpdateOneProjectAPI } from '@/api-site/projects';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonInput } from '../ui-setting';
import { SelectInput, TextAreaInput, TextInput } from '../ui-setting/shadcn';

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().nullable().optional(),
});

const CreateOrUpdateProduct = ({
  showModal,
  setShowModal,
  project,
}: {
  showModal: boolean;
  setShowModal: any;
  project?: any;
}) => {
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  useEffect(() => {
    if (project) {
      const fields = ['title', 'description', 'status'];
      fields?.forEach((field: any) => setValue(field, project[field]));
    }
  }, [project, setValue]);

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrUpdateOneProjectAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<any> = async (payload: any) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        projectId: project?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Progetto salvato con sucesso',
      });
      setShowModal(false);
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      {showModal ? (
        <div className="min-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
          <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
          <div className="relative m-auto max-h-screen w-full max-w-2xl overflow-y-scroll rounded-xl bg-white  p-5 shadow-lg dark:bg-[#121212]">
            <button
              className="float-right border-0 bg-transparent text-black"
              onClick={() => setShowModal(false)}
            >
              <span className="opacity-7 block size-6 rounded-full py-0 text-xl  dark:text-white">
                <XIcon />
              </span>
            </button>
            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex-auto justify-center p-2">
                {hasErrors && (
                  <div className="bg-white py-6 dark:bg-[#121212]">
                    <div className="rounded-lg bg-red-100">
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <p className="ml-3 text-sm font-medium text-red-500">
                            {hasErrors}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <TextInput
                    control={control}
                    label="Title"
                    type="text"
                    name="title"
                    placeholder="Title project"
                    errors={errors}
                  />
                </div>
                <div className="mb-4">
                  <SelectInput
                    firstOptionName="Choose status?"
                    label="Status"
                    control={control}
                    errors={errors}
                    placeholder="Select status"
                    valueType="text"
                    name="status"
                    dataItem={[
                      { id: 1, name: 'DEPLOY' },
                      { id: 1, name: 'INPROGRESS' },
                      { id: 1, name: 'COMPLETED' },
                    ]}
                  />
                </div>
                <div className="mb-4">
                  <TextAreaInput
                    control={control}
                    label="Description (optional)"
                    name="description"
                    placeholder="description project"
                    errors={errors}
                  />
                </div>

                <div className="mt-4 flex items-center space-x-4">
                  <ButtonInput
                    type="button"
                    className="w-full"
                    variant="outline"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </ButtonInput>

                  <ButtonInput
                    type="submit"
                    className="w-full"
                    variant="primary"
                    disabled={loading}
                    loading={loading}
                  >
                    Save
                  </ButtonInput>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { CreateOrUpdateProduct };
