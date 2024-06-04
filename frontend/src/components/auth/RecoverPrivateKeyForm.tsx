import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from "react-hook-form";
import { keyRecoverySchema, keyRecoverySchemaType } from '../../schemas/auth';
import { FormInput } from '../ui/FormInput';
import { useVerifyPassword } from '../../hooks/useAuth/useVerifyPassword';

export const RecoverPrivateKeyForm = () => {

  const { register, handleSubmit, formState: { errors }} = useForm<keyRecoverySchemaType>({resolver:zodResolver(keyRecoverySchema)})

  const {verifyPassword,isLoading} = useVerifyPassword()

  const onSubmit: SubmitHandler<keyRecoverySchemaType> = ({password}) => {
    verifyPassword({password})
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">

        <div className='flex flex-col gap-y-4'>

            <h2 className="text-xl font-bold">Recover Your Private Key</h2>

            <p>
              It looks like we've detected that your private key is missing. Don't worry, you can easily recover it by entering your account password. After entering your correct password, you will receive a verification email. Please click on the verify button in that email. Once verified, we will restore your private key, and you'll be back to normal in no time.
            </p>

        </div>

        <div className='flex flex-col gap-y-2'>
            <FormInput
            register={{...register("password")}}
            autoComplete='current-password'
            placeholder='Password'
            error={errors.password?.message}
            />
        </div>

        <button disabled={isLoading} type='submit' className='bg-primary px-12 py-2 self-center rounded-sm'>Submit</button>


    </form>
  );
};
