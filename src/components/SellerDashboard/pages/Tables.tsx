import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import TableTwo from '../components/Tables/TableTwo';



const Tables = () => {
  const breadcrumbLinks = [
      { name: 'Home', url: '/' },
      { name: 'Tables', url: '/tables' },
      { name: 'Current Page' }, // No URL for the current page
  ];
  return (
    <>
            <Breadcrumb links={breadcrumbLinks} />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
      </div>
    </>
  );
};

export default Tables;
