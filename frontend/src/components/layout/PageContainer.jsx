function PageContainer({ children }) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      {children}
    </div>
  );
}

export default PageContainer;