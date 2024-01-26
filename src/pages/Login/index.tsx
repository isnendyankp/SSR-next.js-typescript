import { Input, Text, Button, Card } from '../../components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';

const Login = () => {
  // use Navigate router hook
  const router = useRouter(); 

  // interface for form props
  interface FormProps {
    email: string;
    password: string;
  }

  // useFormik hook
  const formMik = useFormik<FormProps>({
    initialValues: {
      email: '',
      password: '',
    },

    // onSubmit function for login form
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          'https://mock-api.arikmpt.com/api/user/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          // if response is ok, you can use it here
          const data = await response.json();
          // set token to local storage
          localStorage.setItem('token', data.data.token);
          console.log(data);
          // navigate to list page
          router.push('/PokemonList');
        }
      } catch (error) {
        // catch any network error or any error thrown in the fetch call
        console.log(
          'There has been a problem with your fetch operation: ' +
            (error as Error).message
        );
      }
    },

    // validation for username, email & password
    validationSchema: yup.object({
      // name: yup.string().required('name tidak boleh kosong'),
      email: yup
        .string()
        .email('Email tidak valid')
        .required('Email tidak boleh kosong'),
      password: yup
        .string()
        .min(8, 'Password minimal 8 karakter')
        .required('Password tidak boleh kosong'),
    }),
  });

  return (
    <Card
      border={false}
      className="flex items-center justify-center min-h-screen bg-gray-200 "
    >
      <Card border className="p-10 bg-white shadow-lg rounded-lg">
        <form
          onSubmit={formMik.handleSubmit}
          className="space-y-6"
          data-testid="login-form"
        >
          <div className="space-y-2">
            <Text className="font-bold text-lg">{'Email'}</Text>
            <Input
              className="block border-emerald-700 border w-full p-2 rounded-lg"
              name={'email'}
              value={formMik.values.email}
              onChange={formMik.handleChange('email')}
            />
            {formMik.errors.email && <Text>{formMik.errors.email}</Text>}
          </div>

          <div className="space-y-2">
            <Text className="font-bold text-lg">{'Password'}</Text>
            <Input
              className="block border-emerald-700 border w-full p-2 rounded-lg"
              name={'password'}
              type={'password'}
              value={formMik.values.password}
              onChange={formMik.handleChange('password')}
            />
            {formMik.errors.password && <Text>{formMik.errors.password}</Text>}
          </div>

          <div className="flex justify-between items-center">
            <Button
              label={'Register'}
              onClick={() => router.push('/')}
              className={'bg-blue-500 mt-2 py-2 px-4 rounded-lg'}
            />

            <Button
              label={'Login'}
              type={'submit'}
              className={'bg-green-500 py-2 px-4 rounded-lg'}
            />
          </div>
        </form>
      </Card>
    </Card>
  );
};

export default Login;