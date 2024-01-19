import { Input, Text, Button, Card } from '../components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';

const Home = () => {
  // use Navigate hook
  const router = useRouter();

  // interface for form props
  interface FormProps {
    email: string;
    name: string;
    password: string;
  }

  // useFormik hook
  const formMik = useFormik<FormProps>({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },

    // onSubmit function for submit form
    onSubmit: async (values) => {
      await fetch('https://mock-api.arikmpt.com/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      console.log('success');
      // navigate to login page
      router.push('/login');
    },

    // validation for username, email & password
    validationSchema: yup.object({
      name: yup.string().required('name tidak boleh kosong'),
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
    <Card border={false} className=" ">
      <Card border>
        {/* form element */}
        <form onSubmit={formMik.handleSubmit}>
          {/* Input name */}
          <div className="m-1">
            <Text>{'name'}</Text>
            <Input
              className="block border-emerald-700 border"
              name={'name'}
              value={formMik.values.name}
              onChange={formMik.handleChange('name')}
            />
            {/* add error validation text with yup for input name */}
            {formMik.errors.name && <Text>{formMik.errors.name}</Text>}
          </div>

          {/* Input Email */}
          <div className="m-1">
            <Text>{'Email'}</Text>
            <Input
              className="block border-emerald-700 border"
              name={'email'}
              value={formMik.values.email}
              onChange={formMik.handleChange('email')}
            />
            {/* add error validation text with yup for input email */}
            {formMik.errors.email && <Text>{formMik.errors.email}</Text>}
          </div>

          {/* Input Password */}
          <div className="m-1">
            <Text>{'Password'}</Text>
            <Input
              className="block border-emerald-700 border"
              name={'password'}
              type={'password'}
              value={formMik.values.password}
              onChange={formMik.handleChange('password')}
            />
            {/* add error validation text with yup for input password */}
            {formMik.errors.password && <Text>{formMik.errors.password}</Text>}
          </div>

          {/* Button Submit */}
          <Button label={'Submit'} type={'submit'} className={'bg-green-500'} />

          {/* "Login" button */}
          <Button
            label={'Login'}
            onClick={() => router.push('/login')}
            className={'bg-blue-500 mt-2'}
          />
        </form>
      </Card>
    </Card>
  );
};

export default Home;
