interface PageTitleProps {
  children: React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ children }) => (
  <h1 className="h1 text-center text-neutral-900">{children}</h1>
);

export default PageTitle;
