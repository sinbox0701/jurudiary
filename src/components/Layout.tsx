interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <div className="flex flex-col justify-center items-center">{children}</div>;
}
