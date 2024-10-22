import { Link } from 'react-router-dom';

interface BreadcrumbLink {
  name: string;
  url?: string; // url is optional for the last breadcrumb (current page)
}

interface BreadcrumbProps {
  links: BreadcrumbLink[];
}

const Breadcrumb = ({ links }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Display the last breadcrumb name as the title */}
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {links[links.length - 1].name}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          {links.map((link, index) => (
            <li key={index}>
              {link.url ? (
                <Link className="font-medium text-primary" to={link.url}>
                  {link.name} {index < links.length - 1 && '/'}
                </Link>
              ) : (
                <span className="font-medium text-primary">
                  {link.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
