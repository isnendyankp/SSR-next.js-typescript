import { Input, Text, Button, Card } from '../components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  interface FormProps {
    email: string;
    name: string;
    password: string;
  }

  const formMik = useFormik<FormProps>({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },

    onSubmit: async (values) => {
      await fetch('https://mock-api.arikmpt.com/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      router.push('/Login');
    },

    validationSchema: yup.object({
      name: yup.string().required('Name tidak boleh kosong'),
      email: yup
        .string()
        .email('Email harus valid')
        .required('Email tidak boleh kosong'),
      password: yup
        .string()
        .min(8, 'Password harus setidaknya berisi 8 karakter')
        .required('Password tidak boleh kosong'),
    }),
  });

  return (
    <Card border={false} className="flex justify-center items-center">
      <Card
        border
        className="p-6 rounded-lg border-emerald-500 shadow-lg w-1/2"
      >
        <form onSubmit={formMik.handleSubmit} className="space-y-4">
          <div>
            <Text className="block font-semibold text-emerald-700">Name</Text>
            <Input
              className="w-full px-3 py-2 border-emerald-700 border rounded-md"
              name={'name'}
              value={formMik.values.name}
              onChange={formMik.handleChange('name')}
            />

            {formMik.errors.name && (
              <Text className="text-red-500">{formMik.errors.name}</Text>
            )}
          </div>

          <div>
            <Text className="block font-semibold text-emerald-700">Email</Text>
            <Input
              className="w-full px-3 py-2 border-emerald-700 border rounded-md"
              name={'email'}
              value={formMik.values.email}
              onChange={formMik.handleChange('email')}
            />

            {formMik.errors.email && (
              <Text className="text-red-500">{formMik.errors.email}</Text>
            )}
          </div>

          <div>
            <Text className="block font-semibold text-emerald-500">
              Password
            </Text>
            <Input
              className="w-full px-3 py-2 border-emerald-700 border rounded-md"
              name={'password'}
              type={'password'}
              value={formMik.values.password}
              onChange={formMik.handleChange('password')}
            />

            {formMik.errors.password && (
              <Text className="text-red-500">{formMik.errors.password}</Text>
            )}
          </div>

          <div>
            <Button
              label={'Submit'}
              type={'submit'}
              className={'w-full bg-green-500 text-white rounded-md py-2'}
            />

            <Button
              label={'Login'}
              onClick={() => router.push('/Login')}
              className={'w-full bg-blue-500 mt-2 text-white rounded-md py-2'}
            />
          </div>
        </form>
      </Card>
    </Card>
  );
};

export default Home;