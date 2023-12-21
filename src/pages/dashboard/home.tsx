import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';

const Page = () => {
  const title = 'Dashboard: Home';

  return (
    <DashboardLayout>
      <div>{title}</div>
    </DashboardLayout>
  );
};

export default Page;
